// Pages hubs construites (Prompt 4 catégories + Prompt 5 services phares) : dist/<slug>.html pour chaque groupe ayant un contenu rédigé.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { serviceGroups } from '../../src/data/services.ts';
import { keywords } from '../../src/data/keywords.ts';
import { site } from '../../src/data/site.ts';
import accueil from '../../src/data/accueil.json' with { type: 'json' };
import { processHeading } from '../../src/data/process.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (t) => (t.match(/[\p{L}\p{N}’'-]+/gu) || []).length;
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const ANCHORS = ['couvreur à Bruxelles', 'entreprise de toiture à Bruxelles', 'Toiture Veryroof, votre couvreur bruxellois', 'notre entreprise de couverture à Bruxelles'];
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const categories = serviceGroups; // catégories ET services phares
const pages = {};
before(async () => {
  for (const g of categories) {
    if (!(await exists(join(root, 'src/data/pages', `${g.slug}.json`)))) continue;
    pages[g.slug] = { html: await readFile(join(dist, `${g.slug}.html`), 'utf8'), content: JSON.parse(await readFile(join(root, 'src/data/pages', `${g.slug}.json`), 'utf8')), group: g };
  }
});

test('les 5 pages hubs (3 catégories + 2 services phares) ont un contenu rédigé et construit', () => {
  assert.equal(Object.keys(pages).length, categories.length, `pages rédigées : ${Object.keys(pages).join(', ') || 'aucune'}`);
});

test('title, meta description, H1 et canonique viennent du contenu et ciblent le mot-clé principal', () => {
  for (const [slug, { html, content }] of Object.entries(pages)) {
    assert.equal(text(html.match(/<title>([^<]*)<\/title>/)[1]), content.metaTitle, slug);
    assert.ok(content.metaTitle.length <= 60, `${slug} : title ${content.metaTitle.length} car.`);
    assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)[1]), content.metaDescription, slug);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
    assert.equal(h1s.length, 1, `${slug} : un seul H1`); assert.equal(h1s[0], content.h1);
    assert.match(html, new RegExp(`<link rel="canonical" href="${site.domain}/${slug}"\\s*/?>`));
    for (const w of fold(keywords[slug].primary).split(' ')) assert.ok(fold(content.metaTitle + ' ' + content.h1).includes(w), `${slug} : « ${w} » absent du title/H1`);
    for (const term of keywords[slug].avoid || []) assert.ok(!fold(content.metaTitle + ' ' + content.h1).includes(fold(term)), `${slug} : title/H1 cible « ${term} » (cannibalisation)`);
  }
});

test('hero : photo LCP préchargée, fil d’Ariane, sous-titre, CTA appel + devis, 4 signaux de confiance', () => {
  for (const [slug, { html }] of Object.entries(pages)) {
    assert.match(html, /<img[^>]*class="shero__bg"[^>]*fetchpriority="high"[^>]*alt="[^"]{25,}"/, `${slug} : image du hero`);
    assert.match(html, /<link rel="preload" as="image" href="\/_astro\/[^"]+\.webp"/, `${slug} : préchargement`);
    assert.match(html, /aria-label="Fil d'Ariane"[\s\S]*?href="\/couvreur-bruxelles"[\s\S]*?href="\/services"/, `${slug} : fil d'Ariane`);
    const hero = html.slice(html.indexOf('id="hero"'), html.indexOf('id="contenu"'));
    assert.ok(hero.includes(`href="${site.phoneHref}"`) && hero.includes('href="/contact"'), `${slug} : CTA du hero`);
    for (const t of accueil.trustStrip) assert.ok(text(hero).includes(t), `${slug} : signal « ${t} »`);
  }
});

test('contenu : 1 000 à 1 300 mots (+ interface), 4 H2 (5 pour un service phare) dans l’ordre, chaque service enfant lié dans le texte ET dans la grille, un lien accueil avec une ancre autorisée', () => {
  for (const [slug, { html, group, content }] of Object.entries(pages)) {
    // L'article s'arrête à la première section qui suit : galerie de chantier, FAQ (hors budget Core 30, testée dans faq.test.mjs) ou grille.
    const articleEnd = Math.min(...['id="sources"', 'id="chantier"', 'id="faq"', 'id="services-enfants"'].map((m) => html.indexOf(m)).filter((i) => i > 0));
    const article = html.slice(html.indexOf('id="contenu"'), articleEnd);
    const grid = html.slice(html.indexOf('id="services-enfants"'), html.indexOf('id="cta-final"'));
    const cta = html.slice(html.indexOf('id="cta-final"'), html.indexOf('<footer'));
    const total = words(text(article)) + words(text(grid)) + words(text(cta)) + words(text(html.slice(html.indexOf('class="shero__sub'), html.indexOf('class="shero__cta'))));
    // Le contenu validé fait 1 000–1 300 mots (validateur) ; ici s'ajoutent les libellés d'interface (boutons, titres de grille, noms des cartes).
    const v2 = !!content.tech && !content.services;
    assert.ok(v2 ? total >= 400 && total <= 1200 : total >= 1000 && total <= 1420, `${slug} : ${total} mots (interface comprise)`);
    const h2s = [...article.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
    if (v2) {
      assert.deepEqual(h2s, [content.problems.h2, content.tech.h2, processHeading, content.cost.h2], `${slug} : H2`);
    } else {
      const expected = group.kind === 'core' ? 5 : 4;
      assert.equal(h2s.length, expected, `${slug} : ${expected} H2 attendus dans l'article, ${h2s.length} trouvés`);
      if (group.kind === 'core') assert.ok(content.expect, `${slug} : section « À quoi vous attendre » attendue`);
      assert.ok(/bruxell/i.test(h2s[2]), `${slug} : le 3e H2 doit être local`);
    }
    for (const child of group.children) {
      assert.ok(article.includes(`<a href="/${child.slug}">${child.name.replace(/'/g, '&#39;')}</a>`) || article.includes(`<a href="/${child.slug}">${child.name}</a>`), `${slug} : [[${child.name}]] non lié dans le texte`);
      assert.ok(grid.includes(`href="/${child.slug}"`), `${slug} : ${child.slug} absent de la grille`);
    }
    const home = [...cta.matchAll(/<a href="\/couvreur-bruxelles">([^<]+)<\/a>/g)].map((m) => decode(m[1]));
    assert.ok(home.some((a) => ANCHORS.includes(a)), `${slug} : lien accueil avec ancre autorisée manquant (${home.join(' | ')})`);
    assert.ok(!/href="[^"]*#/.test(article + grid + cta), `${slug} : lien avec ancre # interdit`);
    assert.ok(cta.includes(`href="${site.phoneHref}"`), `${slug} : téléphone dans le CTA final`);
    assert.ok(!html.includes('[['), `${slug} : marqueur [[ résiduel dans le HTML`);
    assert.equal((html.match(/fetchpriority="high"/g) || []).length, 1, `${slug} : une seule image LCP`);
    const expectedH2 = content.services ? [content.problems.h2, content.services.h2, content.local.h2, ...(content.expect ? [content.expect.h2] : []), content.why.h2] : [content.problems.h2, content.tech.h2, processHeading, content.cost.h2];
    assert.deepEqual(h2s, expectedH2, `${slug} : ordre des H2`);
  }
});

test('schema.org : Service lié à l’organisation, catalogue des enfants, fil d’Ariane', () => {
  for (const [slug, { html, group }] of Object.entries(pages)) {
    const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
    const nodes = blocks.flatMap((b) => b['@graph'] ?? [b]);
    const service = nodes.find((n) => n['@type'] === 'Service');
    assert.ok(service, `${slug} : Service manquant`);
    assert.equal(service.serviceType, group.name); assert.equal(service.provider['@id'], `${site.domain}/#organisation`);
    assert.equal(service.hasOfferCatalog.itemListElement.length, group.children.length);
    assert.deepEqual(service.hasOfferCatalog.itemListElement.map((o) => o.itemOffered.url), group.children.map((ch) => `${site.domain}/${ch.slug}`), `${slug} : URL du catalogue`);
    const org = nodes.find((n) => n['@type'] === 'RoofingContractor');
    assert.equal(org.address?.addressRegion, site.address.region, `${slug} : addressRegion`);
    assert.equal(org?.['@id'], `${site.domain}/#organisation`, `${slug} : nœud organisation résoluble`);
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.length, 3); assert.equal(crumbs.itemListElement[2].name, group.name);
  }
});
