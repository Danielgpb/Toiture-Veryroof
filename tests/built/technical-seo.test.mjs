// Prompt 8 — SEO technique sur le site construit : sitemap, robots, métas, hiérarchie des titres, JSON-LD, maillage, mobile, images, 404.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { site, staticPages } from '../../src/data/site.ts';
import { allServicePages, serviceGroups } from '../../src/data/services.ts';
import { activeZones } from '../../src/data/zones.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const pages = new Map();
before(async () => {
  for (const f of (await readdir(dist)).filter((f) => f.endsWith('.html'))) pages.set(f.replace(/\.html$/, ''), await readFile(join(dist, f), 'utf8'));
});
// L'accueil est désormais index.html et compte parmi les pages indexables. Sortent du lot : la 404
// et couvreur-bruxelles.html, qui n'est plus qu'une page de redirection vers la racine.
const indexable = () => [...pages].filter(([slug]) => slug !== '404' && slug !== 'couvreur-bruxelles');
const withSchema = new Set([site.homeSlug, 'services', 'a-propos', 'contact', ...allServicePages().map((p) => p.slug)]);

test('sitemap.xml : toutes les pages indexables, une seule fois, avec lastmod, changefreq et priorité par type de page', async () => {
  const xml = await readFile(join(dist, 'sitemap.xml'), 'utf8');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  const expected = [`${site.domain}${site.homeHref}`, ...[...allServicePages().map((p) => p.slug), ...staticPages.map((s) => s.slug), ...activeZones.map((z) => z.slug)].map((s) => `${site.domain}/${s}`)];
  assert.deepEqual([...locs].sort(), [...expected].sort());
  assert.equal(new Set(locs).size, locs.length, 'URL en double');
  assert.equal(locs.length, indexable().length, 'autant d’URL que de pages HTML indexables (hors 404 et redirection racine)');
  for (const u of xml.match(/<url>[\s\S]*?<\/url>/g)) {
    assert.match(u, /<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
    assert.match(u, /<changefreq>(weekly|monthly|yearly)<\/changefreq>/);
    assert.match(u, /<priority>(1\.0|0\.[3-8])<\/priority>/);
  }
  const entry = (slug) => xml.match(new RegExp(`<loc>${site.domain}/${slug}</loc>[\\s\\S]*?</url>`))[0];
  assert.match(entry(''), /<changefreq>weekly<\/changefreq>[\s\S]*<priority>1\.0<\/priority>/);
  for (const g of serviceGroups) { assert.match(entry(g.slug), /<priority>0\.8<\/priority>/, g.slug); for (const ch of g.children) assert.match(entry(ch.slug), /<priority>0\.6<\/priority>/, ch.slug); }
  assert.match(entry('services'), /<priority>0\.7<\/priority>/);
  assert.match(entry('a-propos'), /<priority>0\.5<\/priority>/);
  assert.match(entry('contact'), /<priority>0\.5<\/priority>/);
});

test('robots.txt : tout autorisé, sitemap déclaré, aucun blocage global', async () => {
  const txt = await readFile(join(dist, 'robots.txt'), 'utf8');
  assert.match(txt, /User-agent: \*\s*\nAllow: \/\s*\n/);
  assert.ok(txt.includes(`Sitemap: ${site.domain}/sitemap.xml`));
  assert.ok(!/^Disallow: \/\s*$/m.test(txt), 'Disallow: / interdit');
});

test('chaque page : lang fr, viewport, canonique auto-référente, title ≤ 60 unique, description ≤ 160 unique, un seul H1, Open Graph, icônes', () => {
  const titles = new Map(); const descs = new Map();
  for (const [slug, html] of indexable()) {
    assert.match(html, /<html lang="fr">/, slug);
    assert.match(html, /<meta name="viewport" content="width=device-width, initial-scale=1"/, slug);
    const title = text(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '');
    assert.ok(title.length > 0 && title.length <= 60, `${slug} : title ${title.length} car. « ${title} »`);
    assert.ok(!titles.has(title), `${slug} : title identique à ${titles.get(title)}`); titles.set(title, slug);
    const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '');
    assert.ok(desc.length > 0 && desc.length <= 160, `${slug} : description ${desc.length} car.`);
    assert.ok(!descs.has(desc), `${slug} : description identique à ${descs.get(desc)}`); descs.set(desc, slug);
    assert.equal((html.match(/<h1[\s>]/g) || []).length, 1, `${slug} : un seul H1`);
    // L'accueil vit à la racine : sa canonique est le domaine nu, pas le domaine suivi d'un slug.
    const self = slug === site.homeSlug ? `${site.domain}${site.homeHref}` : `${site.domain}/${slug}`;
    assert.ok(html.includes(`<link rel="canonical" href="${self}"`), `${slug} : canonique auto-référente`);
    for (const p of ['og:type', 'og:site_name', 'og:locale', 'og:title', 'og:description', 'og:url', 'og:image']) assert.match(html, new RegExp(`<meta property="${p}" content="[^"]+"`), `${slug} : ${p}`);
    assert.ok(html.includes(`<meta property="og:url" content="${self}"`), `${slug} : og:url = canonique`);
    assert.match(html, new RegExp(`<meta property="og:image" content="${site.domain}/[^"]+\\.(jpg|webp|png)"`), `${slug} : og:image absolue`);
    assert.match(html, /<meta name="twitter:card" content="summary_large_image"/, slug);
    assert.match(html, /<link rel="icon" href="\/favicon\.svg" type="image\/svg\+xml"/, slug);
    assert.match(html, /<link rel="apple-touch-icon" href="\/apple-touch-icon\.png"/, slug);
  }
});

test('hiérarchie des titres : aucun saut de niveau (H1 → H2 → H3)', () => {
  for (const [slug, html] of indexable()) {
    const body = html.slice(html.indexOf('<body'));
    let prev = 0;
    for (const m of body.matchAll(/<h([1-6])[\s>]/g)) { const l = +m[1]; assert.ok(l <= prev + 1, `${slug} : saut de h${prev} à h${l}`); prev = l; }
  }
});

test('JSON-LD : chaque bloc est valide, l’organisation porte le même @id et le même NAP sur toutes les pages qui en ont', () => {
  for (const [slug, html] of indexable()) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    if (!withSchema.has(slug)) continue;
    assert.ok(blocks.length >= 1, `${slug} : JSON-LD attendu`);
    for (const b of blocks) assert.equal(b['@context'], 'https://schema.org', slug);
    const nodes = blocks.flatMap((b) => b['@graph'] ?? [b]);
    const org = nodes.find((n) => n['@type'] === 'RoofingContractor');
    assert.ok(org, `${slug} : nœud RoofingContractor`);
    assert.equal(org['@id'], `${site.domain}/#organisation`, slug);
    assert.equal(org.name, site.name, slug);
    assert.equal(org.telephone, site.phoneHref.replace('tel:', ''), slug);
    if (org.address) { assert.equal(org.address.streetAddress, site.address.street, slug); assert.equal(org.address.postalCode, site.address.postalCode, slug); assert.equal(org.address.addressRegion, site.address.region, slug); }
    for (const s of nodes.filter((n) => n['@type'] === 'Service')) { assert.ok(s.serviceType && s.provider?.['@id'] === org['@id'], `${slug} : Service lié à l’organisation`); assert.ok(s.areaServed, `${slug} : areaServed`); }
  }
  const home = [...pages.get(site.homeSlug).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1])).flatMap((b) => b['@graph'] ?? [b]).find((n) => n['@type'] === 'RoofingContractor');
  for (const k of ['email', 'priceRange', 'url', 'image']) assert.ok(home[k], `accueil : ${k}`);
});

test('maillage : accueil → hubs/services/à propos/contact, services → toutes les pages, hubs → enfants + accueil, enfants → parent, navigation partout', () => {
  const home = pages.get(site.homeSlug); const main = home.slice(home.indexOf('<main'), home.indexOf('</main>'));
  for (const g of serviceGroups) assert.ok(main.includes(`href="/${g.slug}"`), `accueil → ${g.slug} dans le contenu`);
  const services = pages.get('services');
  for (const p of allServicePages()) assert.ok(services.includes(`href="/${p.slug}"`), `services → ${p.slug}`);
  for (const g of serviceGroups) {
    const hub = pages.get(g.slug); const hubMain = hub.slice(hub.indexOf('<main'), hub.indexOf('</main>'));
    for (const ch of g.children) { assert.ok(hubMain.includes(`href="/${ch.slug}"`), `${g.slug} → ${ch.slug}`); const c = pages.get(ch.slug); assert.ok(c.slice(c.indexOf('<main'), c.indexOf('</main>')).includes(`href="/${g.slug}"`), `${ch.slug} → parent`); }
    assert.ok(hubMain.includes(`href="${site.homeHref}"`), `${g.slug} → accueil dans le contenu`);
  }
  for (const [slug, html] of indexable()) for (const h of [site.homeHref, '/services', '/a-propos', '/contact']) assert.ok(html.includes(`href="${h}"`), `${slug} : navigation → ${h}`);
});

test('mobile : numéro cliquable, menu burger, bouton d’appel flottant ou barre collante, aucune ancre # hors liens intentionnels', () => {
  for (const [slug, html] of indexable()) {
    assert.ok(html.includes(`href="${site.phoneHref}"`), `${slug} : lien tel:`);
    assert.match(html, /class="burger"/, `${slug} : bouton de menu`);
    assert.ok(/class="floating-call"/.test(html) || /class="sticky-cta"/.test(html), `${slug} : CTA mobile`);
    const anchors = [...html.replace(/<script[\s\S]*?<\/script>/g, '').matchAll(/href="(#[^"]*)"/g)].map((m) => m[1]).filter((a) => !['#main', '#devis'].includes(a));
    assert.deepEqual(anchors, [], `${slug} : ancres inattendues`);
  }
});

test('images : alt, dimensions, chargement différé sauf l’image du hero', () => {
  for (const [slug, html] of indexable()) {
    for (const m of html.matchAll(/<img\b[^>]*>/g)) {
      const tag = m[0];
      assert.match(tag, /\balt="/, `${slug} : alt manquant ${tag.slice(0, 90)}`);
      assert.match(tag, /\bwidth="\d+"/, `${slug} : width ${tag.slice(0, 90)}`);
      assert.match(tag, /\bheight="\d+"/, `${slug} : height ${tag.slice(0, 90)}`);
      // fetchpriority="high" = image LCP du hero ; "low" = logos du bandeau défilant, qui ne peuvent pas
      // être différés sans rester blancs quand la marque entre par la droite. Tout le reste est différé.
      if (!/fetchpriority="(high|low)"/.test(tag)) assert.match(tag, /loading="lazy"/, `${slug} : lazy ${tag.slice(0, 90)}`);
    }
  }
});

test('page 404 : design du site, message utile, liens accueil / services / hubs, numéro', () => {
  const html = pages.get('404');
  assert.ok(html.includes('<header') && html.includes('<footer'), 'en-tête et pied de page');
  assert.match(html, /<h1[^>]*>Page introuvable<\/h1>/);
  for (const h of [site.homeHref, '/services', '/contact', ...serviceGroups.map((g) => `/${g.slug}`)]) assert.ok(html.includes(`href="${h}"`), `404 → ${h}`);
  assert.ok(html.includes(`href="${site.phoneHref}"`));
  assert.ok(!/\b(404|erreur serveur)\b/i.test(text(html.slice(html.indexOf('<main'), html.indexOf('</main>')))), 'pas de code d’erreur affiché');
});

test('porte de publication : aucun placeholder visible ([…], photo à remplacer, « à venir » d’un réseau), un seul e-mail (site.email)', () => {
  for (const [slug, html] of indexable()) {
    const visible = text(html.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, ''));
    assert.deepEqual([...visible.matchAll(/\[[^\]]{1,60}\]/g)].map((m) => m[0]), [], `${slug} : placeholder visible`);
    assert.ok(!/photo à remplacer|lien à ajouter|: à venir/i.test(visible + html.replace(/<!--[\s\S]*?-->/g, '')), `${slug} : élément « à remplacer / à venir »`);
    for (const m of html.matchAll(/mailto:([^"]+)"/g)) assert.equal(m[1], site.email, `${slug} : e-mail ${m[1]}`);
  }
});

test('aucune fuite du montage interne dans le code source public', () => {
  // Les pages servies sont lisibles par tout le monde : ni le nom de l'outil de suivi des demandes,
  // ni sa base de données, ni les noms de variables d'environnement ne doivent y apparaître.
  for (const [slug, html] of pages) {
    for (const fuite of ['Suivi Leads', 'supabase', 'LEADAPP_', 'FORMULAIRE_SECRET', 'BRANCHER LE FORMULAIRE']) {
      assert.ok(!html.toLowerCase().includes(fuite.toLowerCase()), `${slug} : « ${fuite} » visible dans le HTML servi`);
    }
  }
});
