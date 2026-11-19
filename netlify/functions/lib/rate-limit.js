// Limite anti-abus par clé (adresse e-mail ou IP) sur une fenêtre glissante
// simplifiée : un compteur par fenêtre fixe, stocké dans Netlify Blobs.
// Suffisant pour freiner un envoi en rafale sans dépendre d'un service externe.
export async function isRateLimited(store, key, max, windowMs) {
  const now = Date.now();
  const record = (await store.get(key, { type: 'json' })) ?? { count: 0, windowStart: now };

  if (now - record.windowStart > windowMs) {
    record.count = 0;
    record.windowStart = now;
  }

  record.count += 1;
  await store.setJSON(key, record);
  return record.count > max;
}
