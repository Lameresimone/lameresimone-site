import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { prestationLines } from './email-template.js';
import { getLogoBuffer } from './logo-data.js';

// Même mise en page que la carte du mail (bon-cadeau-visuel.html) : colonne
// principale + bandeau coloré à droite avec la valeur, la validité et le
// code, logo inclus. Format A5 paysage.
const PAGE_W = 595.28;
const PAGE_H = 419.53;
const RIGHT_W = 210;
const LEFT_W = PAGE_W - RIGHT_W;
const MARGIN = 40;
// Bande pleine largeur en bas de page (mentions légales), sous les deux
// colonnes : évite que leur texte ne passe sous le bandeau bordeaux de droite.
const BOTTOM_BAND_H = 54;
const CONTENT_H = PAGE_H - BOTTOM_BAND_H;

const COLOR = {
  wine: rgb(0x7d / 255, 0x39 / 255, 0x4d / 255),
  wineDeeper: rgb(0x4e / 255, 0x24 / 255, 0x31 / 255),
  cream: rgb(0xfa / 255, 0xf3 / 255, 0xed / 255),
  ink: rgb(0x2a / 255, 0x21 / 255, 0x18 / 255),
  inkSoft: rgb(0x5a / 255, 0x50 / 255, 0x44 / 255),
  oliveDark: rgb(0x55 / 255, 0x54 / 255, 0x3f / 255),
  white: rgb(1, 1, 1),
};

function wrapText(text, font, size, maxWidth) {
  const words = text.split(' ');
  const lines = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (current && font.widthOfTextAtSize(candidate, size) > maxWidth) {
      lines.push(current);
      current = word;
    } else {
      current = candidate;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * Génère le PDF du bon cadeau (A5 paysage), à joindre au mail envoyé à la
 * personne qui l'offre. `data` a la même forme que pour renderVoucherEmailHtml.
 */
export async function renderVoucherPdf(data) {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage([PAGE_W, PAGE_H]);

  const helvetica = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const bold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const italic = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  const logoImage = await pdfDoc.embedPng(getLogoBuffer());
  const logoW = 110;
  const logoH = (logoImage.height / logoImage.width) * logoW;

  // Fond crème sur toute la page, bandeau bordeaux à droite (au-dessus de la
  // bande de mentions légales pleine largeur, jamais derrière elle).
  page.drawRectangle({ x: 0, y: 0, width: PAGE_W, height: PAGE_H, color: COLOR.cream });
  page.drawRectangle({ x: LEFT_W, y: BOTTOM_BAND_H, width: RIGHT_W, height: CONTENT_H, color: COLOR.wine });
  page.drawLine({
    start: { x: 0, y: BOTTOM_BAND_H },
    end: { x: PAGE_W, y: BOTTOM_BAND_H },
    thickness: 3,
    color: COLOR.wine,
  });

  const leftMaxWidth = LEFT_W - MARGIN * 2;
  // Bas de la zone de contenu de la colonne gauche : au-dessus du séparateur
  // pleine largeur, avec un peu d'air pour que rien ne le touche.
  const leftContentFloor = BOTTOM_BAND_H + 14;
  let y = PAGE_H - MARGIN;

  page.drawImage(logoImage, { x: MARGIN, y: y - logoH, width: logoW, height: logoH });
  y -= logoH + 20;

  page.drawText('BON CADEAU', { x: MARGIN, y, size: 10, font: bold, color: COLOR.oliveDark });
  y -= 20;

  const titleLines = wrapText('Une prestation de batchcooking à domicile', bold, 22, leftMaxWidth);
  for (const line of titleLines) {
    page.drawText(line, { x: MARGIN, y, size: 22, font: bold, color: COLOR.wine });
    y -= 24;
  }
  y -= 4;

  page.drawText('Offert à', { x: MARGIN, y, size: 13, font: helvetica, color: COLOR.inkSoft });
  page.drawText(data.prenomBeneficiaire, {
    x: MARGIN + helvetica.widthOfTextAtSize('Offert à ', 13),
    y,
    size: 14,
    font: bold,
    color: COLOR.ink,
  });
  y -= 18;

  page.drawText('De la part de', { x: MARGIN, y, size: 13, font: helvetica, color: COLOR.inkSoft });
  page.drawText(data.prenomOffrant, {
    x: MARGIN + helvetica.widthOfTextAtSize('De la part de ', 13),
    y,
    size: 14,
    font: bold,
    color: COLOR.ink,
  });
  y -= 22;

  page.drawLine({ start: { x: MARGIN, y }, end: { x: LEFT_W - MARGIN, y }, thickness: 1, color: COLOR.inkSoft, opacity: 0.25 });
  y -= 16;

  for (const line of prestationLines(data)) {
    page.drawText(line, { x: MARGIN, y, size: 12, font: bold, color: COLOR.ink });
    y -= 16;
  }

  if (data.message) {
    y -= 8;
    // Le message est un texte libre (jusqu'à 220 caractères, voir le
    // formulaire) : sa taille s'adapte à l'espace restant au-dessus du
    // séparateur plutôt que de risquer un chevauchement pour un message long.
    const availableHeight = y - leftContentFloor;
    let messageSize = 12;
    let messageLines = [];
    for (const size of [12, 11, 10, 9, 8]) {
      messageSize = size;
      messageLines = wrapText(`« ${data.message} »`, italic, size, leftMaxWidth);
      const lineHeight = size * 1.35;
      if (messageLines.length * lineHeight + lineHeight + 4 <= availableHeight) break;
    }
    const lineHeight = messageSize * 1.35;
    for (const line of messageLines) {
      page.drawText(line, { x: MARGIN, y, size: messageSize, font: italic, color: COLOR.inkSoft });
      y -= lineHeight;
    }
    page.drawText(`— ${data.prenomOffrant}`, { x: MARGIN, y, size: Math.min(messageSize, 11), font: bold, color: COLOR.wine });
  }

  // Bandeau de droite : valeur, validité, code.
  const rightX = LEFT_W + 28;
  const rightMaxWidth = RIGHT_W - 56;
  let ry = PAGE_H - MARGIN;

  page.drawText('VALEUR DU BON', { x: rightX, y: ry, size: 10, font: bold, color: COLOR.white, opacity: 0.75 });
  ry -= 34;
  page.drawText(data.valeurBonFormatee, { x: rightX, y: ry, size: 34, font: bold, color: COLOR.white });
  ry -= 36;

  page.drawLine({ start: { x: rightX, y: ry }, end: { x: rightX + rightMaxWidth, y: ry }, thickness: 1, color: COLOR.white, opacity: 0.35 });
  ry -= 20;
  page.drawText('VALABLE 6 MOIS', { x: rightX, y: ry, size: 9, font: bold, color: COLOR.white, opacity: 0.75 });
  ry -= 16;
  page.drawText(`jusqu'au ${data.validite}`, { x: rightX, y: ry, size: 13, font: bold, color: COLOR.white });
  ry -= 30;

  page.drawLine({ start: { x: rightX, y: ry }, end: { x: rightX + rightMaxWidth, y: ry }, thickness: 1, color: COLOR.white, opacity: 0.35 });
  ry -= 20;
  page.drawText('CODE DU BON', { x: rightX, y: ry, size: 9, font: bold, color: COLOR.white, opacity: 0.75 });
  ry -= 20;
  page.drawRectangle({ x: rightX, y: ry - 6, width: rightMaxWidth, height: 26, color: COLOR.white, opacity: 0.16 });
  page.drawText(data.code, { x: rightX + 10, y: ry, size: 13, font: bold, color: COLOR.white });

  // Bandeau bas pleine largeur, mentions légales (sous le séparateur déjà
  // tracé en haut de cette fonction, à BOTTOM_BAND_H).
  const legalY = BOTTOM_BAND_H - 20;
  const legalLines = wrapText(
    "Prestation à domicile, secteur de la métropole lilloise. Les produits des courses ne sont pas compris dans le bon. Le crédit d'impôt de 50% est accordé aux foyers éligibles et dépend de leur situation. La mère Simone, SIRET 98938305400016, lameresimone.fr",
    helvetica,
    8,
    PAGE_W - MARGIN * 2
  );
  let legalLineY = legalY;
  for (const line of legalLines) {
    page.drawText(line, { x: MARGIN, y: legalLineY, size: 8, font: helvetica, color: COLOR.inkSoft });
    legalLineY -= 11;
  }

  return pdfDoc.save();
}
