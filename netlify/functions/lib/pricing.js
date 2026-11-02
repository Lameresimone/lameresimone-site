// Grille tarifaire des bons cadeaux (valeurs avant crédit d'impôt).
// Ne jamais faire confiance aux montants envoyés par le navigateur : ce module
// recalcule tout côté serveur à partir des champs bruts du formulaire.

export const FORMULES = {
  Confort: { label: 'Formule Confort', valeur: 170 },
  Sérénité: { label: 'Formule Sérénité', valeur: 198 },
};

const PRIX_PERSONNE_EN_PLUS = 20;
const PRIX_OPTION_COURSES = 40;
const PRIX_PETIT_DEJEUNER = 15;
const PRIX_GOUTER = 15;
const MAX_PERSONNES_EN_PLUS = 4;
const MAX_UNITES_OPTION = 4;

/** Ramène une valeur de formulaire à un entier positif, borné à [0, max]. */
function clampCount(value, max) {
  const n = Math.trunc(Number(value));
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}

function formatEuros(amount) {
  const rounded = Math.round(amount * 100) / 100;
  return `${rounded.toString().replace('.', ',')}€`;
}

/**
 * Recalcule le récapitulatif complet d'un bon cadeau à partir des champs bruts
 * du formulaire Netlify. Lève une erreur si la formule est invalide.
 */
export function computeBonCadeau(fields) {
  const formuleKey = fields.formule === 'Sérénité' ? 'Sérénité' : fields.formule === 'Confort' ? 'Confort' : null;
  if (!formuleKey) {
    throw new Error(`Formule invalide reçue du formulaire : ${JSON.stringify(fields.formule)}`);
  }
  const formule = FORMULES[formuleKey];

  const personnesEnPlus = clampCount(fields.personnes_en_plus, MAX_PERSONNES_EN_PLUS);
  const optionCourses = fields.option_courses === 'oui';
  const petitsDejeuners = clampCount(fields.petits_dejeuners, MAX_UNITES_OPTION);
  const gouters = clampCount(fields.gouters, MAX_UNITES_OPTION);

  const lignes = [{ label: formule.label, montant: formule.valeur }];
  let valeurBon = formule.valeur;

  if (personnesEnPlus > 0) {
    const montant = personnesEnPlus * PRIX_PERSONNE_EN_PLUS;
    valeurBon += montant;
    lignes.push({ label: `${personnesEnPlus} personne${personnesEnPlus > 1 ? 's' : ''} en plus`, montant });
  }
  if (optionCourses) {
    valeurBon += PRIX_OPTION_COURSES;
    lignes.push({ label: 'Je fais vos courses', montant: PRIX_OPTION_COURSES });
  }
  if (petitsDejeuners > 0) {
    const montant = petitsDejeuners * PRIX_PETIT_DEJEUNER;
    valeurBon += montant;
    lignes.push({ label: `${petitsDejeuners} petit${petitsDejeuners > 1 ? 's' : ''} déjeuner${petitsDejeuners > 1 ? 's' : ''}`, montant });
  }
  if (gouters > 0) {
    const montant = gouters * PRIX_GOUTER;
    valeurBon += montant;
    lignes.push({ label: `${gouters} goûter${gouters > 1 ? 's' : ''}`, montant });
  }

  const montantFoyerEligible = valeurBon / 2;
  const montantFoyerNonEligible = valeurBon;

  return {
    formuleKey,
    formuleLabel: formule.label,
    personnesEnPlus,
    optionCourses,
    petitsDejeuners,
    gouters,
    lignes,
    valeurBon,
    montantFoyerEligible,
    montantFoyerNonEligible,
    recapitulatif: lignes.map((l) => l.label).join(' + '),
    valeurBonFormatee: formatEuros(valeurBon),
    montantFoyerEligibleFormate: formatEuros(montantFoyerEligible),
    montantFoyerNonEligibleFormate: formatEuros(montantFoyerNonEligible),
  };
}

export { formatEuros };
