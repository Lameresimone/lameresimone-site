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
  { label: 'Blog', href: '/blog' },
  { label: 'Régimes alimentaires', href: '/regimes-alimentaires' },
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
  { label: 'Blog', href: '/blog' },
  { label: 'Régimes alimentaires', href: '/regimes-alimentaires' },
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
  plafond:
    "Plafond annuel de dépenses ouvrant droit au crédit d'impôt : 12 000€ par foyer fiscal (montant pouvant être majoré selon votre situation — voir avec l'Urssaf).",
};

export const creditImpotEtapes = [
  {
    titre: 'Je vous inscris au service',
    texte:
      "Une fois vos conditions d'éligibilité vérifiées, vous recevez un mail de l'Urssaf pour activer votre compte sur particulier.urssaf.fr.",
  },
  {
    titre: 'Après chaque prestation',
    texte:
      "J'émets une demande de paiement sur laquelle votre avance de 50% est automatiquement déduite. Vous la validez en ligne (ou elle l'est automatiquement sous 48h).",
  },
  {
    titre: "L'Urssaf gère le règlement",
    texte:
      "Elle prélève votre reste à charge sur votre compte, puis me verse directement l'intégralité de la prestation. Rien à déclarer de votre côté.",
  },
];

export const creditImpotFaq = [
  {
    question: 'Faut-il être imposable pour en bénéficier ?',
    reponse:
      "Non. Il s'agit d'un crédit d'impôt, pas d'une simple réduction : il s'applique que vous soyez imposable ou non. Si vous n'êtes pas imposable, l'avantage vous est tout de même accordé grâce à l'avance immédiate.",
  },
  {
    question: 'Quelles conditions dois-je remplir ?',
    reponse:
      "Résider en France, disposer d'un numéro fiscal et avoir déjà effectué au moins une déclaration de revenus. Ce sont les conditions de base fixées par l'Urssaf pour activer le service.",
  },
  {
    question: 'Puis-je cumuler avec un autre membre de mon foyer qui utilise déjà l\'avance immédiate ?',
    reponse:
      "Non, un seul membre du foyer fiscal peut recourir à des services à la personne avec l'avance immédiate à la fois.",
  },
  {
    question: "Puis-je en bénéficier si je perçois déjà l'APA ou la PCH ?",
    reponse:
      "Non, l'avance immédiate n'est pas cumulable avec une prise en charge financière par un tiers, comme l'aide personnalisée d'autonomie (APA) ou la prestation de compensation du handicap (PCH).",
  },
  {
    question: "Comment j'active le service ?",
    reponse:
      "Je m'occupe de votre inscription auprès de l'Urssaf. Une fois vos conditions vérifiées, vous recevez un mail pour activer votre compte sur particulier.urssaf.fr — c'est gratuit et rapide.",
  },
];

export const faqGroups = [
  {
    titre: 'Le service',
    items: [
      {
        question: 'Comment se déroule une prestation de batchcooking ?',
        reponse:
          "Après un premier échange sur vos goûts, intolérances et habitudes alimentaires, je compose vos menus, je peux faire vos courses si vous le souhaitez, puis je viens cuisiner directement chez vous. À la fin de la prestation, vous retrouvez 4 à 5 plats faits maison dans votre frigo et une cuisine propre et rangée.",
      },
      {
        question: 'Dans quelles villes intervenez-vous ?',
        reponse:
          "J'interviens à Lille et dans les communes alentours. Si vous avez un doute sur votre secteur, contactez-moi directement, je vous confirmerai rapidement si je peux me déplacer chez vous.",
      },
      {
        question: 'Prenez-vous en compte les allergies et intolérances ?',
        reponse:
          "Oui, c'est même l'un des points abordés dès notre premier échange. Je m'adapte à vos allergies, intolérances et préférences alimentaires, avec une vraie spécialité pour les recettes sans gluten.",
      },
      {
        question: 'Que se passe-t-il si je ne suis pas chez moi pendant la prestation ?',
        reponse:
          "Il suffit de me laisser un accès à votre domicile (clé, digicode, boîte à clés...) le temps de la prestation. Nous en discutons ensemble en amont pour que tout se passe simplement.",
      },
      {
        question: "Travaillez-vous dans le respect des normes d'hygiène ?",
        reponse:
          "Oui, je suis formée HACCP (normes d'hygiène alimentaire professionnelles) et je travaille chez vous exactement comme en cuisine professionnelle.",
      },
    ],
  },
  {
    titre: 'Tarifs & engagement',
    items: [
      {
        question: 'Quelles sont les formules proposées ?',
        reponse:
          "Deux formules : Confort (4 plats cuisinés, à partir de 85€ après crédit d'impôt) et Sérénité (5 plats cuisinés, à partir de 99€ après crédit d'impôt). Les deux incluent une cuisine propre et rangée en fin de prestation.",
        lien: { texte: 'Détail complet sur la page', label: "L'offre", href: '/offre' },
      },
      {
        question: 'Le prix affiché inclut-il les courses ?',
        reponse:
          "Non, le tarif affiché concerne uniquement la prestation de cuisine. Vous pouvez faire vos courses vous-même en amont, ou choisir l'option \"je fais vos courses\" (+20€, soit 40€ avant crédit d'impôt) — les courses elles-mêmes ne sont pas éligibles au crédit d'impôt.",
      },
      {
        question: "Puis-je m'abonner pour bénéficier d'une réduction ?",
        reponse:
          "Oui : -5% sur un rythme de 2 prestations par mois, et -8% sur un rythme de 4 prestations par mois. Sans engagement reste possible si vous préférez tester ponctuellement.",
      },
      {
        question: "Comment fonctionne le crédit d'impôt de 50% ?",
        reponse:
          "En tant que prestataire agréée services à la personne, mes prestations ouvrent droit à un crédit d'impôt de 50%. Grâce à l'avance immédiate de l'Urssaf, vous ne payez que votre part dès le départ, sans avance de trésorerie ni déclaration à faire.",
        lien: { texte: 'Tous les détails sur la page', label: "Crédit d'impôt", href: '/credit-impot' },
      },
      {
        question: 'Puis-je annuler ou reporter une prestation ?',
        reponse:
          "Oui, contactez-moi dès que possible. Une prestation peut généralement être reportée sous réserve de disponibilité — je fais au maximum pour m'adapter à vos imprévus.",
      },
    ],
  },
  {
    titre: 'Pratique',
    items: [
      {
        question: 'Dois-je fournir du matériel de cuisine particulier ?',
        reponse:
          "Non, je m'adapte à votre équipement habituel. Si un ustensile précis venait à manquer pour une recette, nous en discutons en amont.",
      },
      {
        question: 'Comment sont conservés les plats préparés ?',
        reponse:
          "Les plats sont conditionnés dans des contenants adaptés et placés directement dans votre réfrigérateur. Ils se conservent généralement 3 à 4 jours ; au-delà, je vous conseille de les congeler.",
      },
    ],
  },
];

export const regimes = [
  {
    titre: 'Sans gluten',
    texte:
      "C'est le régime que je pratique moi-même au quotidien. Je connais les bonnes alternatives, les pièges à éviter, et je cuisine des plats sans gluten aussi gourmands que les autres — sans jamais donner l'impression d'un régime de contrainte.",
    icone: 'M12 3a9 9 0 0 0 0 18',
    iconeCercle: true,
    badge: 'Ma spécialité',
  },
  {
    titre: 'Sans lactose',
    texte:
      "Je m'adapte avec des alternatives végétales et des recettes pensées sans produits laitiers, sans perdre en gourmandise.",
    icone: 'M8 2v4M16 2v4M3 10h18M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z',
  },
  {
    titre: 'Végétarien & flexitarien',
    texte:
      "Des repas riches en protéines végétales, savoureux et équilibrés, que vous soyez végétarien·ne au quotidien ou simplement en réduction de viande.",
    icone: 'M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 3 17 3s.5 5-3 10c0 0 5-2 7-8 0 0 3 12-10 15Z',
  },
  {
    titre: 'Vegan',
    texte:
      "Des repas 100% végétaux, pensés pour rester complets et équilibrés, sans aucun produit d'origine animale.",
    icone: 'M12 2 3 7v6c0 5 4 8.5 9 9 5-.5 9-4 9-9V7l-9-5Z',
  },
  {
    titre: 'IG bas & diabète',
    texte:
      "Des repas pensés pour limiter les pics glycémiques, avec des associations d'aliments qui stabilisent l'énergie sur la durée.",
    icone: 'M3 3v18h18M7 14l4-4 3 3 5-6',
  },
  {
    titre: 'Anti-inflammatoire',
    texte:
      'Le régime que je pratique moi-même : des produits frais, peu transformés, riches en oméga-3, fruits et légumes de saison.',
    icone: 'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z',
  },
];

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

export const blogArticles = [
  {
    tag: 'Astuces batchcooking',
    title: '5 astuces pour réussir son batchcooking du dimanche',
    excerpt:
      'Planification, courses, cuisson, conservation : les bons réflexes pour cuisiner efficacement et sans stress.',
    date: '4 septembre 2026',
    dateIso: '2026-09-04',
    readTime: '5 min',
    slug: '5-astuces-batchcooking-dimanche',
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
