// Garde-fous issus de la revue du Prompt 3 (page construite : dist/index.html + bundles _astro).
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import accueil from '../../src/data/accueil.json' with { type: 'json' };

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
let html = '';
let css = '';
let scripts = '';
before(async () => {
  html = await readFile(join(dist, 'index.html'), 'utf8');
  const assets = await readdir(join(dist, '_astro'));
  const read = (ext) => Promise.all(assets.filter((f) => f.endsWith(ext)).map((f) => readFile(join(dist, '_astro', f), 'utf8')));
  css = (await read('.css')).join('\n');
  scripts = [html, ...(await read('.js'))].join('\n');
});

const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const slice = (fromId, toMarker) => html.slice(html.indexOf(`id="${fromId}"`), html.indexOf(toMarker.startsWith('<') ? toMarker : `id="${toMarker}"`));

test('le formulaire poste vers la page qui le contient, jamais vers la racine redirigée', () => {
  const form = html.match(/<form[^>]*name="devis"[^>]*>/)[0];
  assert.match(form, /action="\/"/);
  assert.match(form, /method="POST"/i);
  assert.match(form, /data-netlify="true"/);
  const sec = slice('devis', 'zones');
  assert.match(sec, /<input[^>]*type="hidden"[^>]*name="form-name"[^>]*value="devis"/);
  assert.match(sec, /<input[^>]*name="bot-field"/);
  assert.ok(!/fetch\(\s*["']\/["']/.test(scripts), 'le script ne doit pas poster vers "/"');
  assert.ok(/\.redirected/.test(scripts), 'une réponse redirigée doit être traitée comme un échec');
});

test('les ancres atterrissent sous le header collant et la barre mobile ne couvre pas le pied de page', () => {
  assert.match(css, /scroll-padding-top\s*:/);
  assert.match(css, /padding-bottom\s*:\s*calc\(5rem\s*\+\s*env\(safe-area-inset-bottom\)\)/);
});

test('les boutons accent utilisent la teinte foncée conforme AA', () => {
  assert.match(css, /\.btn--accent\s*\{[^}]*(var\(--color-accent-dark\)|#b84f1e)/i);
  assert.match(css, /\.sticky-cta__call[^{]*\{[^}]*(var\(--color-accent-dark\)|#b84f1e)/i);
});

test('le hero a une vraie image de fond et les textes annexes viennent du JSON validé', () => {
  const hero = slice('hero', 'pourquoi-nous');
  assert.match(hero, /<picture[^>]*>[\s\S]*?<img[^>]*fetchpriority="high"/, 'photo du hero en <picture>');
  const cat = slice('categories', 'services-phares');
  assert.equal((cat.match(/<img[^>]*loading="lazy"[^>]*>/g) || []).length, 3, 'une photo par carte catégorie');
  const core = slice('services-phares', 'realisations');
  assert.equal((core.match(/<img[^>]*loading="lazy"[^>]*>/g) || []).length, 2, 'une photo par service phare');
  for (const img of [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0])) assert.match(img, /alt="[^"]{25,}"/, `alt trop court : ${img.slice(0, 80)}`);
  assert.ok(text(hero).includes(accueil.hero.eyebrow));
  const lead = slice('devis', 'zones');
  for (const p of accueil.leadFormPoints) assert.ok(text(lead).includes(p), `puce manquante : ${p}`);
  const about = slice('a-propos', 'faq');
  for (const b of accueil.about.badges) assert.ok(text(about).includes(b), `badge manquant : ${b}`);
  const cta = slice('cta-final', '<footer');
  assert.ok(text(cta).includes(accueil.finalCta.hours));
  assert.ok(!/\[[^\]]+\]/.test(text(html)), 'aucun placeholder entre crochets sur l’accueil');
});

test('le lien vers le hub des zones est bien dans le paragraphe de la section zones', () => {
  const zones = slice('zones', 'a-propos');
  assert.match(zones, /<p[^>]*class="section-lead"[^>]*>[\s\S]*?<a href="\/zones-d-intervention">/);
});

test('les réponses du schema FAQ sont identiques aux réponses affichées', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const faq = blocks.flatMap((b) => b['@graph'] ?? [b]).find((n) => n['@type'] === 'FAQPage');
  assert.deepEqual(faq.mainEntity.map((q) => q.acceptedAnswer.text), accueil.faq.map((q) => q.answer));
});

test('version publiable : aucun placeholder entre crochets visible sur l’accueil (les informations manquantes sont masquées, pas affichées)', () => {
  assert.deepEqual([...text(html).matchAll(/\[[^\]]+\]/g)].map((m) => m[0]), []);
});
