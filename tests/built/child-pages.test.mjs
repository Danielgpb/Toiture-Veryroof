// Pages enfants et services généraux construites (Prompt 6) + page Services.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { allServicePages, serviceGroups, generalServices } from '../../src/data/services.ts';
import { keywords } from '../../src/data/keywords.ts';
import { site } from '../../src/data/site.ts';
import { processHeading } from '../../src/data/process.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const words = (t) => (t.match(/[\p{L}\p{N}’'-]+/gu) || []).length;
const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
const ANCHORS = ['couvreur à Bruxelles', 'entreprise de toiture à Bruxelles', 'Toiture Veryroof, votre couvreur bruxellois', 'notre entreprise de couverture à Bruxelles'];
const exists = async (p) => { try { await access(p); return true; } catch { return false; } };

const leaves = allServicePages().filter((p) => p.kind === 'child' || p.kind === 'general');
const pages = {};
let services = '';
before(async () => {
  for (const p of leaves) {
    if (!(await exists(join(root, 'src/data/pages', `${p.slug}.json`)))) continue;
    pages[p.slug] = { html: await readFile(join(dist, `${p.slug}.html`), 'utf8'), content: JSON.parse(await readFile(join(root, 'src/data/pages', `${p.slug}.json`), 'utf8')), page: p };
  }
  services = await readFile(join(dist, 'services.html'), 'utf8');
});

test('les 26 pages enfants et générales ont un contenu rédigé et construit', () => {
  assert.equal(Object.keys(pages).length, leaves.length, `rédigées : ${Object.keys(pages).length}/${leaves.length}`);
});

test('title, meta description, H1, canonique et mot-clé principal', () => {
  for (const [slug, { html, content }] of Object.entries(pages)) {
    assert.equal(text(html.match(/<title>([^<]*)<\/title>/)[1]), content.metaTitle, slug);
    assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)[1]), content.metaDescription, slug);
    const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
    assert.equal(h1s.length, 1); assert.equal(h1s[0], content.h1, slug);
    assert.match(html, new RegExp(`<link rel="canonical" href="${site.domain}/${slug}"\\s*/?>`));
    for (const w of fold(keywords[slug].primary).split(' ').filter(Boolean)) assert.ok(fold(content.metaTitle + ' ' + content.h1).includes(w), `${slug} : « ${w} » absent du title/H1`);
  }
});

test('hero, 4 H2 dans l’ordre, 600 à 1 000 mots (interface comprise), lien retour vers le parent ou l’accueil, services liés, schema', () => {
  for (const [slug, { html, content, page }] of Object.entries(pages)) {
    assert.match(html, /<img[^>]*class="shero__bg"[^>]*fetchpriority="high"[^>]*alt="[^"]{25,}"/, `${slug} : image du hero`);
    assert.equal((html.match(/fetchpriority="high"/g) || []).length, 1, `${slug} : une seule image LCP`);
    // L'article s'arrête à la première section qui suit : galerie de chantier, FAQ (hors budget Core 30, testée dans faq.test.mjs) ou grille.
    const articleEnd = Math.min(...['id="sources"', 'id="chantier"', 'id="faq"', 'id="services-lies"'].map((m) => html.indexOf(m)).filter((i) => i > 0));
    const article = html.slice(html.indexOf('id="contenu"'), articleEnd);
    const related = html.slice(html.indexOf('id="services-lies"'), html.indexOf('id="cta-final"'));
    const cta = html.slice(html.indexOf('id="cta-final"'), html.indexOf('<footer'));
    const h2s = [...article.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/g)].map((m) => text(m[1]));
    const v2 = !!content.problems && !content.when;
    assert.deepEqual(h2s, v2 ? [content.problems.h2, content.tech.h2, processHeading, content.cost.h2] : [content.when.h2, content.process.h2, content.cost.h2, content.why.h2], `${slug} : H2`);
    if (v2) {
      const n = [...article.matchAll(/class="zone-problems__item"/g)].length;
      assert.ok(n >= 5 && n <= 8, `${slug} : ${n} couples problème → solution (5–8)`);
      assert.equal([...article.matchAll(/<ol[\s\S]*?<\/ol>/g)].length, 1, `${slug} : liste des étapes`);
    }
    const total = words(text(article)) + words(text(related)) + words(text(cta)) + words(text(html.slice(html.indexOf('class="shero__sub'), html.indexOf('class="shero__cta'))));
    assert.ok(v2 ? total >= 350 && total <= 1100 : total >= 600 && total <= 1050, `${slug} : ${total} mots`);
    if (page.parentSlug) {
      assert.ok(cta.includes(`href="/${page.parentSlug}"`), `${slug} : lien retour vers le parent /${page.parentSlug} dans le CTA`);
      assert.ok(related.includes(`href="/${page.parentSlug}"`), `${slug} : parent dans les services liés`);
      assert.match(html, new RegExp(`aria-label="Fil d'Ariane"[\\s\\S]*?href="/${page.parentSlug}"`), `${slug} : parent dans le fil d'Ariane`);
    } else {
      const home = [...cta.matchAll(/<a href="\/couvreur-bruxelles">([^<]+)<\/a>/g)].map((m) => decode(m[1]));
      assert.ok(home.some((a) => ANCHORS.includes(a)), `${slug} : lien accueil avec ancre autorisée (${home.join(' | ')})`);
      for (const g of serviceGroups) assert.ok(related.includes(`href="/${g.slug}"`), `${slug} : hub ${g.slug} dans les services liés`);
    }
    assert.ok(cta.includes(`href="${site.phoneHref}"`) && !html.includes('[['), `${slug} : téléphone dans le CTA, pas de [[ résiduel`);
    const nodes = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { const b = JSON.parse(m[1]); return b['@graph'] ?? [b]; });
    const service = nodes.find((n) => n['@type'] === 'Service');
    assert.equal(service?.serviceType, page.name, `${slug} : schema Service`);
    assert.equal(service.provider['@id'], `${site.domain}/#organisation`);
    assert.ok(nodes.some((n) => n['@type'] === 'RoofingContractor' && n['@id'] === `${site.domain}/#organisation`), `${slug} : organisation résoluble`);
    assert.equal(nodes.find((n) => n['@type'] === 'RoofingContractor').address?.addressRegion, site.address.region, `${slug} : addressRegion`);
    const crumbs = nodes.find((n) => n['@type'] === 'BreadcrumbList');
    assert.equal(crumbs.itemListElement.length, page.parentSlug ? 4 : 3, `${slug} : fil d'Ariane`);
  }
});

test('page Services : H2 de chaque hub lié, une carte par page service avec sa description, CTA final', () => {
  assert.match(services, /<h1[^>]*>Services de toiture à Bruxelles/);
  for (const g of serviceGroups) {
    assert.match(services, new RegExp(`<h2[^>]*><a href="/${g.slug}"[^>]*>${g.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/'/g, "(?:'|&#39;)")}</a></h2>`), `services : H2 lié ${g.slug}`);
  }
  for (const p of [...serviceGroups.flatMap((g) => g.children), ...generalServices]) {
    const cardStart = services.search(new RegExp(`<h3[^>]*><a href="/${p.slug}"`));
    assert.ok(cardStart > -1, `services : carte ${p.slug}`);
    if (pages[p.slug] || serviceGroups.some((g) => g.children.some((c) => c.slug === p.slug))) {
      const card = services.slice(cardStart, services.indexOf('</article>', cardStart));
      assert.ok(words(text(card)) >= 12, `services : description manquante pour ${p.slug}`);
    }
  }
  assert.ok(services.includes('id="cta-final"') && services.includes(`href="${site.phoneHref}"`));
});
