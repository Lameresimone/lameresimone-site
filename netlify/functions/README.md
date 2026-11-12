# Fonction d'envoi automatique du bon cadeau

`submission-created.js` se déclenche automatiquement à chaque soumission
d'un formulaire Netlify Forms du site, mais ne traite que le formulaire
`bon-cadeau` : recalcule tous les montants côté serveur (jamais de
confiance dans les valeurs envoyées par le navigateur), génère un code
unique `LMS-AAMM-XXXX`, envoie le bon par mail à la personne qui l'offre,
envoie une copie de suivi à `lameresimone.pro@gmail.com`, et prévient par
mail en cas d'échec avec la soumission complète pour un envoi manuel.

Le formulaire `devis` (page Contact) est volontairement ignoré par cette
fonction : **aucun mail automatique n'est envoyé au demandeur**, la
confirmation affichée dans la page suffit. La notification de la demande à
`lameresimone.pro@gmail.com` passe uniquement par les notifications
natives de Netlify Forms, à activer dans le tableau de bord (voir plus
bas) — ce n'est pas ce code qui l'envoie.

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
5. **Notification de devis par mail** (dashboard Netlify, pas dans le code) :
   Netlify → le site → *Forms* → *Settings and usage* → *Form notifications*
   → *Add notification* → *Email notification* → entrer l'adresse
   `lameresimone.pro@gmail.com`, choisir le formulaire `devis`, enregistrer.
   Netlify Forms doit avoir détecté le formulaire au moins une fois (après
   le premier déploiement contenant la page Contact à jour) pour qu'il
   apparaisse dans cette liste ; sinon, vérifier dans l'onglet *Forms* qu'il
   est bien listé avant de configurer la notification.
6. **Domaine personnalisé `lameresimone.fr`** (dashboard Netlify + chez le
   registrar du domaine, pas dans le code) :
   - Netlify → le site → *Domain management* → *Add a domain* → saisir
     `lameresimone.fr`.
   - Netlify indique alors les enregistrements DNS à créer chez le
     registrar du domaine (soit déléguer les NS à Netlify, soit ajouter un
     enregistrement `A`/`ALIAS` vers le load balancer Netlify, selon
     l'option choisie).
   - Une fois le DNS propagé, Netlify provisionne automatiquement un
     certificat HTTPS (Let's Encrypt) pour le domaine : HTTPS actif sans
     étape supplémentaire.

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
