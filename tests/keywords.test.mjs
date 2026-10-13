import { test } from 'node:test';
import assert from 'node:assert/strict';
import { keywords } from '../src/data/keywords.ts';
import { allServicePages } from '../src/data/services.ts';
import { activeZones } from '../src/data/zones.ts';
import { site, staticPages } from '../src/data/site.ts';

const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ').replace(/\s+/g, ' ').trim();

test('chaque page du site a un mot-clé principal, et un seul', () => {
  const slugs = [site.homeSlug, ...staticPages.filter((p) => !p.slug.startsWith('mentions') && !p.slug.startsWith('politique')).map((p) => p.slug), ...allServicePages().map((p) => p.slug), ...activeZones.map((z) => z.slug)];
  for (const s of slugs) assert.ok(keywords[s]?.primary, `page sans mot-clé principal : ${s}`);
  for (const s of Object.keys(keywords)) assert.ok(slugs.includes(s), `mot-clé pour une page inconnue : ${s}`);
});

test('aucun mot-clé principal n’est partagé par deux pages (anti-cannibalisation)', () => {
  const seen = new Map();
  for (const [slug, k] of Object.entries(keywords)) {
    const key = fold(k.primary);
    assert.ok(!seen.has(key), `mot-clé « ${k.primary} » partagé par ${seen.get(key)} et ${slug}`);
    seen.set(key, slug);
  }
});

test('un mot-clé principal n’est jamais contenu tel quel dans celui d’une page sœur (seul le parent générique peut l’être)', () => {
  const parentOf = new Map(allServicePages().map((p) => [p.slug, p.parentSlug]));
  const entries = Object.entries(keywords).map(([slug, k]) => [slug, fold(k.primary)]);
  for (const [a, ka] of entries) {
    for (const [b, kb] of entries) {
      if (a === b || !kb.includes(ka)) continue;
      // ka est contenu dans kb : toléré seulement si a est le parent (ou l'accueil) de b
      const ok = parentOf.get(b) === a || a === site.homeSlug || (a === 'toiture-plate-bruxelles' && b === 'isolation-toiture-plate-bruxelles') || (a === 'toiture-plate-bruxelles' && b === 'reparation-toiture-plate-bruxelles');
      assert.ok(ok, `« ${keywords[a].primary} » (${a}) est contenu dans « ${keywords[b].primary} » (${b}) sans lien parent-enfant`);
    }
  }
});
