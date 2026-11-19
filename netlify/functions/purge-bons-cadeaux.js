// Fonction planifiée (mensuelle) : supprime du store `bons-cadeaux` les bons
// dont la date de validité est dépassée depuis plus de 3 ans (voir
// lib/bons-cadeaux-purge.js pour la logique et la note sur l'absence
// d'impact sur l'unicité des codes).
//
// Format v2 (export default + config.schedule) : Netlify Blobs est configuré
// automatiquement, pas besoin de connectLambda(event) comme dans le handler
// v1 de submission-created.js.
import { getStore } from '@netlify/blobs';
import { purgeExpiredBonsCadeaux } from './lib/bons-cadeaux-purge.js';

export default async () => {
  const store = getStore('bons-cadeaux');
  const deleted = await purgeExpiredBonsCadeaux(store);
  console.log(`Purge bons cadeaux : ${deleted} bon(s) supprimé(s) (validité dépassée depuis plus de 3 ans).`);
  return new Response('ok');
};

export const config = {
  schedule: '0 4 1 * *',
};
