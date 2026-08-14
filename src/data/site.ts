export const site = {
  name: 'La mère Simone',
  tagline: 'Batchcooking à domicile',
  description: 'Des repas faits maison, cuisinés chez vous.',
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
  { label: 'Contact', href: '/contact' },
];

export const creditImpot = {
  taux: 50,
  label: "de crédit d'impôt sur la prestation",
};

export const formules = [
  {
    id: 'confort',
    nom: 'Formule Confort',
    prixApresCredit: 85,
    prixAvantCredit: 170,
    nbPlats: 4,
    nbPortions: 4,
    avantages: [
      '4 plats cuisinés prêts à déguster',
      'Une cuisine propre et rangée',
      'Option je fais vos courses',
      'Option goûter, petit déjeuner sur devis',
    ],
  },
  {
    id: 'serenite',
    nom: 'Formule Sérénité',
    prixApresCredit: 99,
    prixAvantCredit: 198,
    nbPlats: 5,
    nbPortions: 4,
    avantages: [
      '5 plats cuisinés prêts à déguster',
      'Une cuisine propre et rangée',
      'Option je fais vos courses',
      'Option goûter, petit déjeuner sur devis',
    ],
  },
] as const;

export const argumentsClesAccueil = [
  { titre: 'Produits frais', sousTitre: 'DE SAISON' },
  { titre: 'Fait maison', sousTitre: 'AVEC AMOUR' },
  { titre: 'Sur mesure', sousTitre: 'SELON VOS GOÛTS' },
  { titre: 'Agrée SAP', sousTitre: `${creditImpot.taux}% CREDIT IMPOT` },
];

export const beneficesOffre = [
  { texte: 'Cuisine maison\nProduits frais et de saison' },
  { texte: 'Moins de temps en cuisine,\nplus de temps en famille' },
  { texte: "Des recettes qui s'adaptent\nà vos envies" },
  { texte: 'Terminé les courses, je m’en occupe' },
  { texte: `Un crédit d'impôt de ${creditImpot.taux}%\nsur la prestation` },
];

export const etapesCommentCaMarche = [
  {
    numero: '01',
    titre: 'On fait connaissance',
    texte: 'Vous remplissez un questionnaire sur vos goûts, intolérances et habitudes alimentaires.',
  },
  {
    numero: '02',
    titre: 'Je prépare tout',
    texte: 'Je compose vos menus, fais les courses et je viens cuisiner chez vous',
  },
  {
    numero: '03',
    titre: 'Vous profitez',
    texte: '4 à 5 plats faits maison dans votre frigo. La semaine est réglée, sans effort.',
  },
];

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
    texte: "J'adore faire plaisir et rendre service.\nChez vous, je cuisine comme je le ferais pour ma propre famille.",
  },
  {
    titre: 'Bon pour le corps',
    texte: 'Produits frais, de saison, cuisinés sans superflu. Et une vraie spécialité pour les recettes sans gluten',
  },
  {
    titre: 'Bon pour la tête',
    texte: "Manger bien sans y penser, c'est un luxe que vous méritez.\nJe m'occupe de tout pour que vous profitiez.",
  },
];
