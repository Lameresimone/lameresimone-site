import { getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { computeBonCadeau } from './lib/pricing.js';
import { generateUniqueCode, formatValidityDate } from './lib/voucher-code.js';
import { renderVoucherEmailHtml, renderInternalCopyHtml, renderFailureNoticeHtml } from './lib/email-template.js';

const OWNER_EMAIL = 'lameresimone.pro@gmail.com';
const FROM_ADDRESS = 'La mère Simone <bons@lameresimone.fr>';

function formatDateFr(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function notifyOwnerOfFailure(resend, rawFields, error) {
  try {
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      subject: "Échec de l'envoi d'un bon cadeau — à renvoyer à la main",
      html: renderFailureNoticeHtml(rawFields, error instanceof Error ? error.message : String(error)),
    });
  } catch (notifyError) {
    // Dernier recours : si même la notification d'échec échoue (Resend down, clé
    // invalide...), on le trace dans les logs de la fonction, qui restent consultables
    // depuis le tableau de bord Netlify.
    console.error('Bon cadeau : échec du traitement ET de la notification de secours.', {
      originalError: error,
      notifyError,
      rawFields,
    });
  }
}

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body ?? '{}').payload;
  } catch {
    return { statusCode: 200, body: 'ignored: invalid payload' };
  }

  // submission-created se déclenche pour TOUS les formulaires du site (ex: le
  // formulaire "guide" de l'accueil) : on ne traite que le formulaire bon-cadeau.
  if (!payload || payload.form_name !== 'bon-cadeau') {
    return { statusCode: 200, body: 'ignored: not the bon-cadeau form' };
  }

  const fields = payload.data ?? {};

  let resend;
  try {
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch (configError) {
    // Si la clé Resend elle-même manque ou est invalide, on ne peut même pas
    // envoyer de mail d'alerte : seule la trace dans les logs Netlify reste.
    console.error('Bon cadeau : Resend mal configuré (RESEND_API_KEY manquante ou invalide).', configError, { fields });
    return { statusCode: 200, body: 'misconfigured' };
  }

  try {
    if (!fields.prenom_beneficiaire || !fields.prenom_offrant || !fields.email_offrant) {
      throw new Error('Champs obligatoires manquants dans la soumission (bénéficiaire, offrant ou email).');
    }

    const computed = computeBonCadeau(fields);

    const issueDate = new Date();
    const store = getStore('bons-cadeaux');
    const code = await generateUniqueCode(issueDate, async (candidate) => (await store.get(candidate)) !== null);
    const validite = formatValidityDate(issueDate);

    const emailData = {
      ...computed,
      code,
      validite,
      issuedAtFr: formatDateFr(issueDate),
      prenomBeneficiaire: fields.prenom_beneficiaire,
      prenomOffrant: fields.prenom_offrant,
      emailOffrant: fields.email_offrant,
      message: fields.message ?? '',
    };

    // On envoie d'abord le bon à la personne qui l'offre : c'est l'envoi qui
    // compte vraiment. Le code n'est marqué comme utilisé qu'une fois cet envoi
    // confirmé, pour ne jamais laisser de code "orphelin" réservé pour un bon
    // jamais réellement délivré.
    await resend.emails.send({
      from: FROM_ADDRESS,
      to: fields.email_offrant,
      replyTo: OWNER_EMAIL,
      subject: 'Votre bon cadeau La mère Simone',
      html: renderVoucherEmailHtml(emailData),
    });

    await store.setJSON(code, {
      code,
      issuedAt: issueDate.toISOString(),
      validUntil: validite,
      ...computed,
      prenomBeneficiaire: fields.prenom_beneficiaire,
      prenomOffrant: fields.prenom_offrant,
      emailOffrant: fields.email_offrant,
    });

    // Copie de suivi : son échec ne doit pas faire échouer l'envoi déjà réussi
    // au client, donc on l'isole dans son propre try/catch.
    try {
      await resend.emails.send({
        from: FROM_ADDRESS,
        to: OWNER_EMAIL,
        subject: `Bon cadeau émis : ${code}`,
        html: renderInternalCopyHtml(emailData),
      });
    } catch (copyError) {
      console.error('Bon cadeau : le bon a bien été envoyé au client, mais la copie de suivi a échoué.', copyError);
    }

    return { statusCode: 200, body: 'ok' };
  } catch (error) {
    console.error('Bon cadeau : échec du traitement de la soumission.', error);
    await notifyOwnerOfFailure(resend, fields, error);
    return { statusCode: 200, body: 'handled failure' };
  }
};
