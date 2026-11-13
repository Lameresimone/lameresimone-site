// Gabarits d'e-mail (HTML avec CSS en ligne, compatible clients mail).
// On utilise des tableaux plutôt que flex/grid pour la compatibilité
// (notamment Outlook desktop, qui ignore la plupart du CSS moderne).

// Référencé en pièce jointe inline (voir submission-created.js), pas par URL
// distante : le site est encore privé, donc une image chargée par URL ne
// s'afficherait pas dans les clients mail.
export const LOGO_CID = 'logo-cartouche';

const COLORS = {
  wine: '#7D394D',
  wineDark: '#6A2F40',
  wineDeeper: '#4E2431',
  olive: '#6D6C53',
  oliveDark: '#55543F',
  cream: '#FAF3ED',
  creamCard: '#F1E6DA',
  ink: '#2A2118',
  inkSoft: '#5A5044',
  line: 'rgba(42,33,24,0.12)',
};

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function prestationLines(data) {
  const lines = [`${escapeHtml(data.formuleLabel)} : ${data.formuleKey === 'Confort' ? '4' : '5'} plats cuisinés prêts à déguster`, 'Une cuisine propre et rangée'];
  if (data.optionCourses) lines.push('Option : je fais vos courses');
  if (data.petitsDejeuners > 0) lines.push(`Option : ${data.petitsDejeuners} petit${data.petitsDejeuners > 1 ? 's' : ''} déjeuner${data.petitsDejeuners > 1 ? 's' : ''}`);
  if (data.gouters > 0) lines.push(`Option : ${data.gouters} goûter${data.gouters > 1 ? 's' : ''}`);
  if (data.personnesEnPlus > 0) lines.push(`Option : ${data.personnesEnPlus} personne${data.personnesEnPlus > 1 ? 's' : ''} en plus`);
  return lines;
}

/**
 * E-mail envoyé à la personne qui offre le bon (email_offrant), avec le
 * visuel du bon cadeau en HTML et le récapitulatif pratique.
 */
export function renderVoucherEmailHtml(data) {
  const prestation = prestationLines(data)
    .map((line) => `<li style="padding:10px 0;border-bottom:1px solid ${COLORS.line};font-size:14px;font-weight:600;color:${COLORS.ink};list-style:none;">${line}</li>`)
    .join('');

  const message = data.message
    ? `<tr><td style="padding-top:20px;font-size:14px;font-style:italic;color:${COLORS.inkSoft};line-height:1.6;">&laquo; ${escapeHtml(data.message)} &raquo;<br><strong style="font-style:normal;color:${COLORS.wine};">${escapeHtml(data.prenomOffrant)}</strong></td></tr>`
    : '';

  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Votre bon cadeau La mère Simone</title>
  </head>
  <body style="margin:0;padding:24px 16px;background:#E9E1D8;font-family:Georgia,'Times New Roman',serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:${COLORS.cream};border-radius:8px;overflow:hidden;">
            <tr>
              <td style="padding:32px 32px 8px;">
                <img src="cid:${LOGO_CID}" alt="La mère Simone" height="40" style="display:block;height:40px;width:auto;border:0;" />
              </td>
            </tr>
            <tr>
              <td style="padding:16px 32px 0;">
                <p style="margin:0;font-size:12px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:${COLORS.oliveDark};font-family:Arial,sans-serif;">Bon cadeau</p>
                <h1 style="margin:10px 0 0;font-size:30px;line-height:1.15;font-weight:900;color:${COLORS.wine};font-family:Arial,sans-serif;">Une prestation de batchcooking à domicile</h1>
                <p style="margin:20px 0 0;font-size:15px;color:${COLORS.inkSoft};font-family:Arial,sans-serif;">Offert à <strong style="color:${COLORS.ink};">${escapeHtml(data.prenomBeneficiaire)}</strong></p>
                <p style="margin:4px 0 0;font-size:15px;color:${COLORS.inkSoft};font-family:Arial,sans-serif;">De la part de <strong style="color:${COLORS.ink};">${escapeHtml(data.prenomOffrant)}</strong></p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin-top:20px;border-top:1px solid ${COLORS.line};font-family:Arial,sans-serif;">
                  ${prestation}
                </table>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;">${message}</table>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 32px;background:${COLORS.wine};">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-family:Arial,sans-serif;color:#fff;">
                  <tr>
                    <td style="font-size:11px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.75);padding-bottom:8px;">Valeur du bon</td>
                  </tr>
                  <tr>
                    <td style="font-size:40px;font-weight:900;line-height:1;padding-bottom:16px;">${escapeHtml(data.valeurBonFormatee)}</td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid rgba(255,255,255,0.25);padding-top:16px;font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Valable 6 mois</td>
                  </tr>
                  <tr>
                    <td style="font-size:17px;font-weight:bold;padding-top:4px;padding-bottom:16px;">jusqu&rsquo;au ${escapeHtml(data.validite)}</td>
                  </tr>
                  <tr>
                    <td style="border-top:1px solid rgba(255,255,255,0.25);padding-top:16px;font-size:13px;font-weight:bold;letter-spacing:1.5px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Code du bon</td>
                  </tr>
                  <tr>
                    <td style="padding-top:6px;">
                      <span style="display:inline-block;background:rgba(255,255,255,0.16);border-radius:6px;padding:8px 14px;font-weight:bold;letter-spacing:1.5px;font-size:16px;">${escapeHtml(data.code)}</span>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="height:20px;background-color:${COLORS.cream};background-image:linear-gradient(90deg, ${COLORS.wine} 50%, transparent 50%);background-size:40px 100%;font-size:0;line-height:0;">&nbsp;</td>
            </tr>
            <tr>
              <td style="padding:16px 32px 28px;font-family:Arial,sans-serif;font-size:12px;color:${COLORS.inkSoft};line-height:1.6;">
                Prestation à domicile, secteur de la métropole lilloise. Les produits des courses ne sont pas
                compris dans le bon. Le crédit d&rsquo;impôt de 50% est accordé aux foyers éligibles et dépend
                de leur situation. La mère Simone &middot; SIRET 98938305400016 &middot; lameresimone.fr
              </td>
            </tr>
          </table>

          <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;margin-top:20px;">
            <tr>
              <td style="padding:0 8px;font-family:Arial,sans-serif;font-size:16px;color:${COLORS.ink};line-height:1.85;">
                <p style="margin:0 0 16px;font-weight:bold;color:${COLORS.wine};">Comment offrir ce bon ?</p>
                <p style="margin:0 0 12px;">
                  Montant à virer directement à ${escapeHtml(data.prenomBeneficiaire)}, selon son droit au crédit
                  d&rsquo;impôt (sommes à virer au foyer, vous ne me payez rien directement) :
                </p>
                <ul style="margin:0 0 16px;padding-left:20px;">
                  <li style="margin-bottom:8px;">Si le foyer a le droit au crédit d&rsquo;impôt : <strong>${escapeHtml(data.montantFoyerEligibleFormate)}</strong></li>
                  <li>S&rsquo;il n&rsquo;a pas le droit, la prestation complète : <strong>${escapeHtml(data.montantFoyerNonEligibleFormate)}</strong></li>
                </ul>
                <p style="margin:0 0 12px;font-weight:bold;">Les 3 étapes :</p>
                <ol style="margin:0 0 16px;padding-left:20px;">
                  <li style="margin-bottom:8px;">Vous virez la somme correspondante à ${escapeHtml(data.prenomBeneficiaire)}.</li>
                  <li style="margin-bottom:8px;">Le foyer m&rsquo;écrit à lameresimone.pro@gmail.com en indiquant le code <strong>${escapeHtml(data.code)}</strong>.</li>
                  <li>Nous fixons ensemble la date de la prestation.</li>
                </ol>
                <p style="margin:0;color:${COLORS.inkSoft};font-size:15px;">
                  Une question ? Écrivez-moi à lameresimone.pro@gmail.com.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

/**
 * Copie de suivi envoyée à lameresimone.pro@gmail.com à chaque bon émis.
 */
export function renderInternalCopyHtml(data) {
  const rows = [
    ['Code', data.code],
    ['Émis le', data.issuedAtFr],
    ['Valable jusqu\'au', data.validite],
    ['Formule', data.formuleLabel],
    ['Récapitulatif', data.recapitulatif],
    ['Valeur du bon', data.valeurBonFormatee],
    ['Montant à virer (foyer éligible)', data.montantFoyerEligibleFormate],
    ['Montant à virer (foyer non éligible)', data.montantFoyerNonEligibleFormate],
    ['Bénéficiaire(s)', data.prenomBeneficiaire],
    ['Offert par', data.prenomOffrant],
    ['Email de l\'offrant', data.emailOffrant],
    ['Message', data.message || '(aucun)'],
  ];

  const rowsHtml = rows
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid ${COLORS.line};font-weight:bold;color:${COLORS.ink};white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:6px 12px;border-bottom:1px solid ${COLORS.line};color:${COLORS.inkSoft};">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:24px;background:#fff;font-family:Arial,sans-serif;color:${COLORS.ink};">
    <h1 style="font-size:20px;color:${COLORS.wine};">Nouveau bon cadeau émis</h1>
    <p style="font-size:13px;color:${COLORS.inkSoft};">À conserver pour le suivi (liste des bons en circulation).</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;font-size:14px;border-collapse:collapse;">
      ${rowsHtml}
    </table>
  </body>
</html>`;
}

/**
 * E-mail d'alerte envoyé si le traitement automatique d'une soumission
 * échoue (bon cadeau ou devis), avec la soumission brute pour pouvoir
 * répondre à la main.
 */
export function renderFailureNoticeHtml(formLabel, rawFields, errorMessage) {
  const rows = Object.entries(rawFields)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:6px 12px;border-bottom:1px solid ${COLORS.line};font-weight:bold;color:${COLORS.ink};white-space:nowrap;">${escapeHtml(key)}</td><td style="padding:6px 12px;border-bottom:1px solid ${COLORS.line};color:${COLORS.inkSoft};">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  return `<!doctype html>
<html lang="fr">
  <body style="margin:0;padding:24px;background:#fff;font-family:Arial,sans-serif;color:${COLORS.ink};">
    <h1 style="font-size:20px;color:#B3261E;">Échec du traitement automatique (${escapeHtml(formLabel)})</h1>
    <p style="font-size:14px;color:${COLORS.inkSoft};">
      Une soumission du formulaire ${escapeHtml(formLabel)} n&rsquo;a pas pu être traitée automatiquement.
      Erreur : <strong>${escapeHtml(errorMessage)}</strong>
    </p>
    <p style="font-size:14px;color:${COLORS.inkSoft};">Voici la soumission complète, à traiter manuellement :</p>
    <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;max-width:640px;font-size:13px;border-collapse:collapse;">
      ${rows}
    </table>
  </body>
</html>`;
}
