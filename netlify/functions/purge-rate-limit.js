// Fonction planifiée (quotidienne) : nettoie le store anti-abus des entrées
// inactives depuis plus de 24h (voir lib/rate-limit.js). Complète le nettoyage
// « au passage suivant » fait par isRateLimited, qui ne joue que si la même
// adresse e-mail ou IP resoumet un formulaire ; celles qui ne reviennent
// jamais ne seraient sinon jamais nettoyées.
//
// Format v2 (export default + config.schedule) : contrairement au handler v1
// de submission-created.js, Netlify Blobs est ici configuré automatiquement,
// pas besoin de connectLambda(event).
import { getStore } from '@netlify/blobs';
import { purgeExpiredRateLimitEntries } from './lib/rate-limit.js';

export default async () => {
  const store = getStore('rate-limit-submissions');
  const deleted = await purgeExpiredRateLimitEntries(store);
  console.log(`Purge anti-abus : ${deleted} entrée(s) supprimée(s) (inactives depuis plus de 24h).`);
  return new Response('ok');
};

export const config = {
  schedule: '0 3 * * *',
};
