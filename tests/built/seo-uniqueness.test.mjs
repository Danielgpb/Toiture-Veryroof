// Anti-cannibalisation sur le site construit : titles, H1 et meta descriptions uniques ; mot-clé principal présent dans title + H1.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { keywords } from '../../src/data/keywords.ts';
import { allServicePages } from '../../src/data/services.ts';
import { activeZones } from '../../src/data/zones.ts';
import { site } from '../../src/data/site.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
const pages = new Map();
before(async () => {
  for (const f of (await readdir(dist)).filter((f) => f.endsWith('.html') && !['index.html', '404.html'].includes(f))) {
    const html = await readFile(join(dist, f), 'utf8');
    pages.set(f.replace(/\.html$/, ''), { title: text(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? ''), h1: text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? ''), desc: decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '') });
  }
});

test('titles, H1 et meta descriptions sont uniques sur tout le site', () => {
  for (const field of ['title', 'h1', 'desc']) {
    const seen = new Map();
    for (const [slug, p] of pages) {
      const v = fold(p[field]);
      assert.ok(v.length > 0, `${slug} : ${field} vide`);
      assert.ok(!seen.has(v), `${field} identique : ${seen.get(v)} et ${slug} (« ${p[field]} »)`);
      seen.set(v, slug);
    }
  }
});

const written = async (slug) => { try { await access(fileURLToPath(new URL(`../../src/data/pages/${slug}.json`, import.meta.url))); return true; } catch { return false; } };

test('chaque page rédigée (accueil, services, communes) porte son mot-clé principal dans son title et son H1', async () => {
  const slugs = [site.homeSlug, ...allServicePages().map((p) => p.slug), ...activeZones.map((z) => z.slug)];
  let checked = 0;
  for (const slug of slugs) {
    const p = pages.get(slug); assert.ok(p, `page construite manquante : ${slug}`);
    if (slug !== site.homeSlug && !(await written(slug))) continue; // placeholder : H1 générique, contrôlé à la rédaction (Prompts 5-6)
    checked++;
    for (const w of fold(keywords[slug].primary).split(' ').filter(Boolean)) {
      assert.ok(fold(p.title).includes(w), `${slug} : « ${w} » absent du title « ${p.title} »`);
      assert.ok(fold(p.h1).includes(w), `${slug} : « ${w} » absent du H1 « ${p.h1} »`);
    }
  }
  assert.ok(checked >= 1, 'au moins l’accueil doit être contrôlé');
});
