// Purge du store `bons-cadeaux` : supprime les bons dont la date de validité
// (émission + 6 mois, voir voucher-code.js) est dépassée depuis plus que
// `retentionYears` (3 ans par défaut). Logique isolée du handler planifié
// (purge-bons-cadeaux.js) pour pouvoir la tester avec un store en mémoire.
//
// Sans impact sur l'unicité des codes : un code a la forme LMS-AAMM-XXXX où
// AAMM est le mois d'ÉMISSION. generateUniqueCode() ne teste jamais que des
// candidats préfixés par le mois courant (voir voucher-code.js) ; un bon
// purgé ici a plus de 3 ans et demi d'ancienneté, donc un préfixe AAMM
// différent de tout candidat généré aujourd'hui ou dans le futur proche. Sa
// suppression ne peut donc jamais provoquer de collision de code.
const RETENTION_YEARS = 3;

function parseFrenchDate(str) {
  const [dd, mm, yyyy] = str.split('/').map(Number);
  return new Date(yyyy, mm - 1, dd);
}

export async function purgeExpiredBonsCadeaux(store, retentionYears = RETENTION_YEARS, now = Date.now()) {
  const { blobs } = await store.list();
  let deleted = 0;

  for (const { key } of blobs) {
    const record = await store.get(key, { type: 'json' });
    if (!record?.validUntil) continue;

    const expiry = parseFrenchDate(record.validUntil);
    expiry.setFullYear(expiry.getFullYear() + retentionYears);

    if (now > expiry.getTime()) {
      await store.delete(key);
      deleted += 1;
    }
  }

  return deleted;
}
