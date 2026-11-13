import { connectLambda, getStore } from '@netlify/blobs';
import { Resend } from 'resend';
import { computeBonCadeau } from './lib/pricing.js';
import { generateUniqueCode, formatValidityDate } from './lib/voucher-code.js';
import { renderVoucherEmailHtml, renderInternalCopyHtml, renderFailureNoticeHtml, LOGO_CID } from './lib/email-template.js';
import { renderVoucherPdf } from './lib/voucher-pdf.js';
import { getLogoBuffer } from './lib/logo-data.js';

const OWNER_EMAIL = 'lameresimone.pro@gmail.com';
const FROM_ADDRESS = 'La mère Simone <bonjour@lameresimone.fr>';

// Le SDK Resend ne lève PAS d'exception sur un échec d'envoi (clé invalide,
// domaine non vérifié, adresse refusée...) : il retourne { error } sans
// rejeter la promesse. Sans ce garde-fou, un envoi silencieusement raté
// serait traité comme un succès partout dans ce fichier.
async function sendOrThrow(resend, params) {
  const { data, error } = await resend.emails.send(params);
  if (error) {
    // Message complet de l'erreur Resend (nom, code, détail) dans les logs de
    // la fonction, avant de la relayer comme exception à la logique appelante.
    console.error(`Resend a renvoyé une erreur pour l'envoi "${params.subject}" (destinataire : ${params.to}) :`, error);
    throw new Error(`Échec de l'envoi Resend (${params.subject}) : ${error.message ?? JSON.stringify(error)}`);
  }
  return data;
}

function formatDateFr(date) {
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const yyyy = date.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

async function notifyOwnerOfFailure(resend, formLabel, rawFields, error) {
  try {
    await sendOrThrow(resend, {
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      subject: `Échec du traitement automatique (${formLabel}), à traiter à la main`,
      html: renderFailureNoticeHtml(formLabel, rawFields, error instanceof Error ? error.message : String(error)),
    });
  } catch (notifyError) {
    // Dernier recours : si même la notification d'échec échoue (Resend down, clé
    // invalide...), on le trace dans les logs de la fonction, qui restent consultables
    // depuis le tableau de bord Netlify.
    console.error(`${formLabel} : échec du traitement ET de la notification de secours.`, {
      originalError: error,
      notifyError,
      rawFields,
    });
  }
}

/**
 * Formulaire bon-cadeau : recalcule les montants, génère un code unique,
 * envoie le bon par mail et une copie de suivi au propriétaire du site.
 */
async function handleBonCadeau(resend, fields, event) {
  if (!fields.prenom_beneficiaire || !fields.prenom_offrant || !fields.email_offrant) {
    throw new Error('Champs obligatoires manquants dans la soumission (bénéficiaire, offrant ou email).');
  }

  const computed = computeBonCadeau(fields);

  // Cette fonction utilise le format "v1" (handler recevant un event au
  // format API Gateway) : Netlify Blobs n'y est pas configuré automatiquement
  // comme en v2, il faut l'initialiser explicitement à partir de l'event
  // avant le premier getStore(). Appelé ici (et non en tête du handler) pour
  // qu'un échec reste couvert par le même traitement d'erreur que le reste
  // de cette fonction (notification au propriétaire du site).
  connectLambda(event);
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

  const pdfBytes = await renderVoucherPdf(emailData);

  // On envoie d'abord le bon à la personne qui l'offre : c'est l'envoi qui
  // compte vraiment. Le code n'est marqué comme utilisé qu'une fois cet envoi
  // confirmé, pour ne jamais laisser de code "orphelin" réservé pour un bon
  // jamais réellement délivré.
  await sendOrThrow(resend, {
    from: FROM_ADDRESS,
    to: fields.email_offrant,
    replyTo: OWNER_EMAIL,
    subject: 'Votre bon cadeau La mère Simone',
    html: renderVoucherEmailHtml(emailData),
    attachments: [
      // Logo en pièce jointe inline (CID), pas par URL distante : le site
      // est encore privé, une image chargée par URL ne s'afficherait pas.
      { filename: 'logo-la-mere-simone.png', content: getLogoBuffer(), contentType: 'image/png', contentId: LOGO_CID },
      // Bon cadeau en PDF (A5 paysage), à imprimer ou transférer au foyer.
      { filename: `bon-cadeau-${code}.pdf`, content: pdfBytes, contentType: 'application/pdf' },
    ],
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
    await sendOrThrow(resend, {
      from: FROM_ADDRESS,
      to: OWNER_EMAIL,
      subject: `Bon cadeau émis : ${code}`,
      html: renderInternalCopyHtml(emailData),
    });
  } catch (copyError) {
    console.error('Bon cadeau : le bon a bien été envoyé au client, mais la copie de suivi a échoué.', copyError);
  }
}

// Le formulaire devis (page Contact) n'a volontairement aucun traitement
// automatique ici : pas de mail au demandeur (la confirmation affichée sur
// la page suffit), pas de mail au propriétaire du site (ça passe par les
// notifications natives de Netlify Forms, voir netlify/functions/README.md).
// submission-created se déclenchant pour tous les formulaires du site, il
// est donc simplement ignoré plus bas, comme n'importe quel autre formulaire
// non listé dans FORM_HANDLERS.

const FORM_HANDLERS = {
  'bon-cadeau': { run: handleBonCadeau, label: 'Bon cadeau' },
};

export const handler = async (event) => {
  let payload;
  try {
    payload = JSON.parse(event.body ?? '{}').payload;
  } catch {
    return { statusCode: 200, body: 'ignored: invalid payload' };
  }

  // submission-created se déclenche pour TOUS les formulaires du site : on
  // ignore ceux qu'on ne traite pas automatiquement.
  const formConfig = payload && FORM_HANDLERS[payload.form_name];
  if (!formConfig) {
    return { statusCode: 200, body: `ignored: unhandled form (${payload?.form_name ?? 'unknown'})` };
  }

  const fields = payload.data ?? {};

  let resend;
  try {
    resend = new Resend(process.env.RESEND_API_KEY);
  } catch (configError) {
    // Si la clé Resend elle-même manque ou est invalide, on ne peut même pas
    // envoyer de mail d'alerte : seule la trace dans les logs Netlify reste.
    console.error(`${formConfig.label} : Resend mal configuré (RESEND_API_KEY manquante ou invalide).`, configError, { fields });
    return { statusCode: 200, body: 'misconfigured' };
  }

  try {
    await formConfig.run(resend, fields, event);
    return { statusCode: 200, body: 'ok' };
  } catch (error) {
    console.error(`${formConfig.label} : échec du traitement de la soumission.`, error);
    await notifyOwnerOfFailure(resend, formConfig.label, fields, error);
    return { statusCode: 200, body: 'handled failure' };
  }
};
