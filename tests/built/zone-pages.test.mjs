// Pages communes construites (Prompt 9, docs/core30/prompt-9-pages-communes.md) : hero, sections locales, quartiers, règles, FAQ, maillage.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { activeZones, zoneTerm } from '../../src/data/zones.ts';
import { site } from '../../src/data/site.ts';
import { processSteps, processHeading } from '../../src/data/process.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/ /g, ' ');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (t) => (t.match(/[\p{L}\p{N}’'-]+/gu) || []).length;
const pages = {};
before(async () => {
  for (const z of activeZones) {
    const html = await readFile(join(dist, `${z.slug}.html`), 'utf8');
    const content = JSON.parse(await readFile(join(root, 'src/data/pages', `${z.slug}.json`), 'utf8'));
    pages[z.slug] = { html, content, zone: z };
  }
});

test('chaque commune : hero illustré, H1 « Couvreur à <commune> », H2 dans l’ordre (problèmes → solutions, étapes, règles, quartiers et repères), 5 à 8 problèmes, 4 étapes, quartiers listés, 250 mots et plus', () => {
  for (const [slug, { html, content, zone }] of Object.entries(pages)) {
    assert.match(html, /<img[^>]*class="shero__bg"[^>]*fetchpriority="high"/, `${slug} : image du hero`);
    const h1 = text(html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/)?.[1] ?? '');
    assert.equal(h1, content.h1, `${slug} : H1`);
    const expectedStart = zoneTerm(zone) === 'Couvreur' ? `Couvreur à ${zone.name}` : `Toiture ${zone.name}`;
    assert.ok(content.h1.startsWith(expectedStart), `${slug} : H1 doit commencer par « ${expectedStart} »`);
    const article = html.slice(html.indexOf('id="contenu"'), Math.min(...['id="sources"', 'id="chantier"', 'id="faq"'].map((m) => html.indexOf(m)).filter((i) => i > 0)));
    const h2s = [...article.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
    assert.deepEqual(h2s, [content.problems.h2, content.areaHeading ?? `Nos quartiers à ${zone.name}`, processHeading, content.rules.h2, 'Pourquoi appeler Toiture Veryroof ?'], `${slug} : H2`);
    const problems = [...article.matchAll(/class="zone-problems__item"/g)].length;
    assert.ok(problems >= 5 && problems <= 8, `${slug} : ${problems} couples problème → solution (5–8)`);
    const steps = [...(article.match(/<ol[\s\S]*?<\/ol>/)?.[0] ?? '').matchAll(/<strong[^>]*>([\s\S]*?)<\/strong>/g)].map((m) => text(m[1]));
    assert.deepEqual(steps, processSteps.map((st) => st.title.replace('{commune}', zone.name)), `${slug} : étapes`);
    const areaText = text(article.match(/id="quartiers"[\s\S]*?<\/section>/)?.[0] ?? '');
    for (const q of [...content.quartiers, ...content.landmarks]) assert.ok(areaText.includes(q), `${slug} : quartier ou repère « ${q} » absent`);
    assert.ok(words(text(article)) >= 250, `${slug} : ${words(text(article))} mots dans l'article`);
  }
});

test('chaque commune : fil d’Ariane vers le hub des zones, lien accueil, au moins 4 pages services liées, autres communes en grille, numéro cliquable, schema (organisation, FAQPage, areaServed)', () => {
  for (const [slug, { html, zone }] of Object.entries(pages)) {
    assert.match(html, /aria-label="Fil d'Ariane"[\s\S]*?href="\/zones-d-intervention"/, `${slug} : hub des zones dans le fil d'Ariane`);
    assert.ok(html.includes(`href="${site.homeHref}"`), `${slug} : lien accueil`);
    const serviceLinks = new Set([...html.matchAll(/href="\/([a-z-]+-bruxelles)"/g)].map((m) => m[1]));
    assert.ok(serviceLinks.size >= 4, `${slug} : ${serviceLinks.size} pages services liées (min 4)`);
    for (const other of activeZones.filter((z) => z.slug !== slug)) assert.ok(html.includes(`href="/${other.slug}"`), `${slug} : lien vers ${other.slug}`);
    assert.ok(html.includes(`href="${site.phoneHref}"`), `${slug} : numéro cliquable`);
    const graph = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => JSON.parse(m[1])['@graph']);
    const org = graph.find((n) => n['@type'] === 'RoofingContractor');
    assert.equal(org?.['@id'], `${site.domain}/#organisation`, `${slug} : @id organisation`);
    assert.equal(org?.areaServed?.name, zone.name, `${slug} : areaServed`);
    assert.equal(graph.filter((n) => n['@type'] === 'FAQPage').length, 1, `${slug} : FAQPage`);
    assert.ok(!/Contenu en cours de rédaction/.test(html), `${slug} : placeholder encore visible`);
  }
});
