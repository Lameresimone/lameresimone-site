# Fonction d'envoi du bon cadeau

`submission-created.js` se déclenche automatiquement à chaque soumission du
formulaire Netlify Forms `bon-cadeau` (uniquement celui-ci — les autres
formulaires du site, comme le formulaire « guide » de l'accueil, sont
ignorés).

Elle recalcule tous les montants côté serveur (jamais de confiance dans les
valeurs envoyées par le navigateur), génère un code unique `LMS-AAMM-XXXX`,
envoie le bon par mail à la personne qui l'offre, envoie une copie de suivi à
`lameresimone.pro@gmail.com`, et prévient par mail en cas d'échec avec la
soumission complète pour un envoi manuel.

## À configurer avant la mise en ligne

1. **Compte Resend** (ou équivalent) : créer un compte sur
   [resend.com](https://resend.com), ajouter le domaine `lameresimone.fr` et
   suivre les instructions pour configurer les enregistrements DNS **SPF**,
   **DKIM** et **DMARC** — sans ça, les mails partiront en spam ou seront
   refusés par les boîtes des destinataires.
2. **Variable d'environnement Netlify** : dans l'interface Netlify du site →
   *Site configuration* → *Environment variables*, ajouter :
   - `RESEND_API_KEY` : la clé API générée dans Resend. Ne jamais la mettre
     dans le code ni la committer.
3. **Adresse d'expédition** : le code envoie depuis
   `bons@lameresimone.fr` (modifiable dans `submission-created.js`,
   constante `FROM_ADDRESS`). Cette adresse doit appartenir au domaine
   vérifié dans Resend. La réponse (reply-to) part vers
   `lameresimone.pro@gmail.com`.
4. **Netlify Blobs** : utilisé pour garantir l'unicité des codes de bons.
   Aucune configuration requise — disponible automatiquement sur les sites
   déployés sur Netlify.

## Tester en local

Les fonctions pures (calcul des montants, génération du code) peuvent être
testées sans réseau :

```bash
node -e "import('./netlify/functions/lib/pricing.js').then(m => console.log(m.computeBonCadeau({ formule: 'Confort', personnes_en_plus: '1' })))"
```

Le handler complet (`submission-created.js`) a besoin de Netlify Blobs et de
Resend, donc du contexte d'exécution Netlify réel : le plus simple est de
tester via `netlify dev` (CLI Netlify) après avoir renseigné
`RESEND_API_KEY` dans un fichier `.env` local, ou de soumettre le formulaire
une fois le site déployé sur Netlify.
