// Limite anti-abus par clé (adresse e-mail ou IP) sur une fenêtre glissante
// simplifiée : un compteur par fenêtre fixe, stocké dans Netlify Blobs.
// Suffisant pour freiner un envoi en rafale sans dépendre d'un service externe.
//
// Durée de conservation (annoncée dans la politique de confidentialité) :
// 24h. Une entrée plus ancienne que ça est supprimée dès qu'elle est
// retouchée (ci-dessous, dans isRateLimited) ; celles qui ne sont plus
// jamais retouchées (une seule soumission, jamais répétée) sont nettoyées
// par la fonction planifiée quotidienne purge-rate-limit.js, qui appelle
// purgeExpiredRateLimitEntries.
export const RATE_LIMIT_RETENTION_MS = 24 * 60 * 60 * 1000;

export async function isRateLimited(store, key, max, windowMs, retentionMs = RATE_LIMIT_RETENTION_MS) {
  const now = Date.now();
  const stored = await store.get(key, { type: 'json' });
  const isStale = Boolean(stored) && now - stored.windowStart > retentionMs;
  if (isStale) {
    await store.delete(key);
  }

  const record = stored && !isStale ? stored : { count: 0, windowStart: now };
  if (now - record.windowStart > windowMs) {
    record.count = 0;
    record.windowStart = now;
  }

  record.count += 1;
  await store.setJSON(key, record);
  return record.count > max;
}

/**
 * Supprime du store les entrées (clés `ip:...` et `email:...`) inactives
 * depuis plus que `retentionMs`, donc jamais retouchées depuis par
 * isRateLimited. Retourne le nombre d'entrées supprimées.
 */
export async function purgeExpiredRateLimitEntries(store, retentionMs = RATE_LIMIT_RETENTION_MS) {
  const now = Date.now();
  const { blobs } = await store.list();
  let deleted = 0;

  for (const { key } of blobs) {
    const record = await store.get(key, { type: 'json' });
    if (record && now - record.windowStart > retentionMs) {
      await store.delete(key);
      deleted += 1;
    }
  }

  return deleted;
}
