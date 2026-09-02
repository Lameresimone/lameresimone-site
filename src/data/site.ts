export const site = {
  name: 'La mère Simone',
  tagline: 'Batchcooking à domicile',
  description: 'Des repas faits maison, cuisinés chez vous par une cheffe.',
  url: 'https://lameresimone.fr',
  secteur: 'Lille et alentours',
};

export const contact = {
  email: 'lameresimone.pro@gmail.com',
  instagram: '@la_mere_simone_',
  instagramUrl: 'https://www.instagram.com/la_mere_simone_/',
  siret: '98938305400016',
};

export const nav = [
  { label: 'Accueil', href: '/' },
  { label: "L'offre", href: '/offre' },
  { label: 'Qui suis-je', href: '/qui-suis-je' },
  { label: "Crédit d'impôt", href: '/credit-impot' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Contact', href: '/contact' },
];

export const navCta = { label: 'Demander mon devis', href: '/contact' };

/** Message ponctuel affiché dans le bandeau du haut (promo, annonce...). Laisser vide si aucun message actif. */
export const brandBarMessage = '';

export const footerSiteLinks = [
  { label: 'Accueil', href: '/' },
  { label: "L'offre", href: '/offre' },
  { label: 'Qui suis-je', href: '/qui-suis-je' },
  { label: "Crédit d'impôt", href: '/credit-impot' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Avis', href: '/#avis' },
];

export const footerLegalLinks = [
  { label: 'Mentions légales', href: '/mentions-legales' },
  { label: 'CGV', href: '/mentions-legales' },
  { label: 'Politique de confidentialité', href: '/politique-confidentialite' },
  { label: 'Cookies', href: '/cookies' },
];

export const creditImpot = {
  taux: 50,
  label: "de crédit d'impôt immédiat sur la prestation",
};

export const trustItems = [
  { titre: 'Produits frais', sousTitre: 'de saison' },
  { titre: 'Fait maison', sousTitre: 'avec amour' },
  { titre: 'Sur mesure', sousTitre: 'selon vos goûts' },
];

export const trustMini = [
  'Agréée services à la personne',
  "50% de crédit d'impôt immédiat",
  'Formée HACCP',
];

export const beneficesOffre = [
  'Cuisine maison — produits frais et de saison',
  'Plus de temps pour vous, en famille...',
  "Des recettes qui s'adaptent à vos envies",
  "Pas envie de faire les courses ? Je m'en occupe",
];

export const etapesCommentCaMarche = [
  {
    numero: '01',
    titre: 'On fait connaissance',
    texte:
      'Vous remplissez un questionnaire sur vos préférences alimentaires et intolérances puis vous choisissez vos 4 à 5 plats de la semaine dans la carte, avec les options petit déjeuner et goûter si besoin.',
  },
  {
    numero: '02',
    titre: 'Je prépare tout',
    texte:
      "Je prépare la liste de courses (je peux même m'occuper des courses !) et je viens cuisiner chez vous tous vos repas de la semaine.",
  },
  {
    numero: '03',
    titre: 'Vous profitez',
    texte: '4 à 5 plats faits maison prêts à être dégustés. La semaine est réglée, adieu la charge mentale !',
  },
];

export const engagementModes = [
  { id: 'ponctuel', label: 'Sans engagement', remise: null },
  { id: 'mensuel2', label: '2x / mois', remise: '-5%' },
  { id: 'mensuel4', label: '4x / mois', remise: '-8%' },
] as const;

export const engagementSavingsLabel: Record<string, string> = {
  mensuel2: 'Engagement 2 séances/mois',
  mensuel4: 'Engagement 4 séances/mois — meilleur prix',
};

export const formules = [
  {
    id: 'confort',
    nom: 'Formule Confort',
    nbPlats: 4,
    nbPortions: 4,
    prix: { ponctuel: { client: 85, avant: 170 }, mensuel2: { client: 81, avant: 162 }, mensuel4: { client: 78, avant: 156 } },
    avantages: ['4 plats cuisinés prêts à déguster', 'Une cuisine propre et rangée'],
  },
  {
    id: 'serenite',
    nom: 'Formule Sérénité',
    nbPlats: 5,
    nbPortions: 4,
    prix: { ponctuel: { client: 99, avant: 198 }, mensuel2: { client: 94, avant: 188 }, mensuel4: { client: 91, avant: 182 } },
    avantages: ['5 plats cuisinés prêts à déguster', 'Une cuisine propre et rangée'],
  },
] as const;

export const optionsFormules = [
  { label: 'Je fais vos courses', prix: "(+20€, soit 40€ avant crédit d'impôt)" },
  { label: 'Goûter, petit déjeuner', prix: "(+7,50€/unité, soit 15€ avant crédit d'impôt)" },
];

export const portionsNote =
  'Plats généreux pensés pour 4 personnes — si vous êtes moins nombreux, vous en profitez sur plusieurs repas.\nSupplément +10€ au-delà de 4 personnes (soit 20€ avant crédit d\'impôt).';

export const parcours = [
  {
    titre: 'CAP Cuisine - Major de Promo',
    soustitre: 'Ecole Hôtelière de Cannes',
    icone: '/images/icons/cap.png',
  },
  {
    titre: 'Formation HACCP',
    soustitre: "Normes d'hygiène alimentaire professionnelles",
    icone: '/images/icons/spray.png',
  },
  {
    titre: 'Restaurants gastronomiques + traiteur',
    soustitre: 'Expérience en cuisine professionnelle',
    icone: '/images/icons/chefhat.png',
  },
  {
    titre: 'Chef de produit culinaire',
    soustitre: 'Box de recettes à domicile',
    icone: '/images/icons/bowl.png',
  },
  {
    titre: 'Créatrice de contenu culinaire',
    soustitre: 'Magazine de cuisine',
    icone: '/images/icons/newspaper.png',
  },
];

export const valeursCuisine = [
  {
    titre: 'Fait avec amour',
    texte: "J'adore faire plaisir et rendre service. Chez vous, je cuisine comme je le ferais pour ma propre famille.",
    icone: 'M12 21s-7-4.6-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.4-7 10-7 10Z',
  },
  {
    titre: 'Bon pour le corps',
    texte: 'Produits frais, de saison, cuisinés sans superflu. Et une vraie spécialité pour les recettes sans gluten.',
    icone: 'M4 11h16a8 8 0 0 1-7 8h-2a8 8 0 0 1-7-8Z M8 11c0-3 1.5-5 2-6M12 11c0-3.5.5-5.5 1.5-7M16 11c0-2.5-.5-4-1.5-5.5',
  },
  {
    titre: 'Bon pour la tête',
    texte: "Manger bien sans y penser, c'est un luxe que vous méritez. Je m'occupe de tout pour que vous profitiez.",
    icone: 'M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.5.5.8 1 .9 1.7l.1.8h6l.1-.8c.1-.7.4-1.2.9-1.7A6 6 0 0 0 12 3Z',
  },
];

export const avisClients = [
  {
    note: 5,
    texte:
      "[Exemple à remplacer] Un accompagnement bienveillant, des plats savoureux et une vraie tranquillité d'esprit pour toute la semaine.",
    nom: 'Prénom N.',
    placeholder: true,
  },
  {
    note: 5,
    texte:
      "[Exemple à remplacer] Ponctuelle, à l'écoute de nos goûts et de nos allergies. On adore retrouver le frigo plein le dimanche soir !",
    nom: 'Prénom N.',
    placeholder: true,
  },
  {
    note: 5,
    texte:
      "[Exemple à remplacer] Un vrai gain de temps, une cuisine impeccable en partant, et des recettes qu'on n'aurait jamais osé faire nous-mêmes.",
    nom: 'Prénom N.',
    placeholder: true,
  },
];
