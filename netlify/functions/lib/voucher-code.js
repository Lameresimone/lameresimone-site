// Génération du code unique du bon cadeau, au format LMS-AAMM-XXXX.
// AAMM = année (2 chiffres) + mois (2 chiffres) d'émission.
// XXXX = 4 caractères aléatoires, alphabet sans caractères ambigus
// (pas de 0, O, 1, I, L) pour rester lisible sur un bon imprimé.

const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

function randomSuffix(length = 4) {
  let suffix = '';
  for (let i = 0; i < length; i += 1) {
    suffix += ALPHABET[Math.floor(Math.random() * ALPHABET.length)];
  }
  return suffix;
}

/** Préfixe AAMM à partir d'une date d'émission (année/mois sur 2 chiffres chacun). */
export function periodPrefix(date) {
  const yy = String(date.getFullYear() % 100).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  return `${yy}${mm}`;
}

/** Génère un candidat de code pour une date d'émission donnée. Ne garantit pas l'unicité seul. */
export function generateCandidateCode(date) {
  return `LMS-${periodPrefix(date)}-${randomSuffix()}`;
}

/**
 * Génère un code garanti unique en interrogeant `isCodeTaken` (fonction async
 * qui retourne true si le code existe déjà) et en retirant jusqu'à `maxAttempts` fois.
 */
export async function generateUniqueCode(date, isCodeTaken, maxAttempts = 15) {
  for (let attempt = 0; attempt < maxAttempts; attempt += 1) {
    const candidate = generateCandidateCode(date);
    // eslint-disable-next-line no-await-in-loop
    const taken = await isCodeTaken(candidate);
    if (!taken) return candidate;
  }
  throw new Error("Impossible de générer un code de bon cadeau unique après plusieurs essais.");
}

/** Date de validité : date d'émission + 6 mois, formatée JJ/MM/AAAA. */
export function formatValidityDate(issueDate) {
  const validUntil = new Date(issueDate.getTime());
  validUntil.setMonth(validUntil.getMonth() + 6);

  const dd = String(validUntil.getDate()).padStart(2, '0');
  const mm = String(validUntil.getMonth() + 1).padStart(2, '0');
  const yyyy = validUntil.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}
