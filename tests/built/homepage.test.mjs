// Test de la page d'accueil CONSTRUITE (dist/couvreur-bruxelles.html). Lancer `npm run build` avant.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import accueil from '../../src/data/accueil.json' with { type: 'json' };
import { site, pending } from '../../src/data/site.ts';
import { serviceGroups, generalServices } from '../../src/data/services.ts';
import { activeZones } from '../../src/data/zones.ts';

const file = fileURLToPath(new URL('../../dist/couvreur-bruxelles.html', import.meta.url));
let html = '';
before(async () => { html = await readFile(file, 'utf8'); });

const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, '')).replace(/\s+/g, ' ').trim();
const SECTION_IDS = ['hero', 'pourquoi-nous', ...(pending.reviewsEmbed ? ['avis'] : []), 'devis', 'categories', 'services-phares', 'zones', 'a-propos', 'faq', 'zones-liste', 'cta-final'];

test('title, meta description et canonique viennent du contenu validé', () => {
  assert.equal(text(html.match(/<title>([^<]*)<\/title>/)[1]), accueil.metaTitle);
  assert.equal(decode(html.match(/<meta name="description" content="([^"]*)"/)[1]), accueil.metaDescription);
  assert.match(html, new RegExp(`<link rel="canonical" href="${site.domain}/${site.homeSlug}"\\s*/?>`));
});

test('un seul H1, exactement le H1 rédigé, avec couvreur + toiture + Bruxelles', () => {
  const h1s = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  assert.equal(h1s.length, 1);
  assert.equal(h1s[0], accueil.hero.h1);
  for (const kw of ['Couvreur', 'toiture', 'Bruxelles']) assert.ok(h1s[0].includes(kw), `H1 sans « ${kw} »`);
});

test('les 11 sections sont présentes dans l’ordre imposé par le Prompt 3', () => {
  const positions = SECTION_IDS.map((id) => html.indexOf(`id="${id}"`));
  positions.forEach((p, i) => assert.ok(p > -1, `section manquante : ${SECTION_IDS[i]}`));
  for (let i = 1; i < positions.length; i++) assert.ok(positions[i] > positions[i - 1], `${SECTION_IDS[i]} doit suivre ${SECTION_IDS[i - 1]}`);
});

test('le hero porte une image de fond (pas un aplat), le sous-titre exact, les CTA et 4 signaux de confiance', () => {
  const hero = html.slice(html.indexOf('id="hero"'), html.indexOf('id="pourquoi-nous"'));
  assert.match(hero, /<picture[^>]*>[\s\S]*?<source[^>]*media="\(max-width: 700px\)"[^>]*srcset="\/_astro\/[^"]+\.webp[^"]*"/, 'variante mobile du hero absente');
  assert.match(hero, /<img[^>]*src="\/_astro\/[^"]+\.webp"[^>]*fetchpriority="high"[^>]*alt="[^"]{25,}"/, 'photo du hero (LCP) absente ou sans alt');
  assert.ok(text(hero).includes(accueil.hero.subheadline));
  assert.ok(hero.includes(`href="${site.phoneHref}"`));
  assert.ok(hero.includes('href="#devis"'));
  for (const t of accueil.trustStrip) assert.ok(text(hero).includes(t), `signal manquant : ${t}`);
});

test('« Pourquoi nous » affiche les 4 différenciateurs rédigés, juste après le hero', () => {
  const sec = html.slice(html.indexOf('id="pourquoi-nous"'), html.indexOf('id="avis"'));
  assert.ok(text(sec).includes(accueil.whyChooseUs.heading));
  for (const it of accueil.whyChooseUs.items) {
    assert.ok(text(sec).includes(it.headline), `différenciateur manquant : ${it.headline}`);
    assert.ok(text(sec).includes(it.explanation));
  }
  assert.equal((sec.match(/<svg/g) || []).length >= 4, true, 'une icône par différenciateur');
});

test('la section avis Google : emplacement commenté, affichée seulement avec un code d’intégration', () => {
  assert.ok(html.includes('COLLER ICI LE CODE D’INTÉGRATION DES AVIS GOOGLE'), 'commentaire d’emplacement');
  if (pending.reviewsEmbed) {
    const sec = html.slice(html.indexOf('id="avis"'), html.indexOf('id="devis"'));
    assert.ok(text(sec).includes(accueil.reviewsHeading) && sec.includes(pending.reviewsEmbed));
  } else {
    assert.ok(!html.includes('id="avis"'), 'pas de section avis vide');
    assert.ok(!text(html).includes('avis Google'), 'aucune mention d’avis sans avis');
  }
});

test('le formulaire de devis a les bons champs, la liste des services et la réassurance', () => {
  const sec = html.slice(html.indexOf('id="devis"'), html.indexOf('id="categories"'));
  for (const name of ['nom', 'telephone', 'email']) assert.match(sec, new RegExp(`<input[^>]*name="${name}"[^>]*required`), `champ ${name} requis manquant`);
  assert.match(sec, /<select[^>]*name="service"[^>]*required/);
  assert.match(sec, /<textarea[^>]*name="message"/);
  assert.match(sec, /<button[^>]*type="submit"/);
  const options = [...sec.matchAll(/<option[^>]*>([^<]*)<\/option>/g)].map((m) => text(m[1]));
  for (const g of serviceGroups) assert.ok(options.includes(g.name), `option manquante : ${g.name}`);
  for (const s of generalServices) assert.ok(options.includes(s.name), `option manquante : ${s.name}`);
  assert.ok(options.includes('Autre / je ne sais pas'));
  assert.ok(text(sec).includes(accueil.leadFormReassurance));
  assert.ok(sec.includes('<!-- BRANCHER LE FORMULAIRE : Netlify Forms (actif tel quel sur Netlify) + relais /.netlify/functions/lead vers l\'app Suivi Leads'));
});

test('cartes catégories et services phares pointent vers les bonnes URL', () => {
  const cat = html.slice(html.indexOf('id="categories"'), html.indexOf('id="services-phares"'));
  const core = html.slice(html.indexOf('id="services-phares"'), html.indexOf('id="zones"'));
  assert.ok(text(cat).includes(accueil.categories.heading));
  assert.ok(text(core).includes(accueil.coreServices.heading));
  for (const it of accueil.categories.items) { assert.ok(cat.includes(`href="${it.slug}"`), `lien manquant ${it.slug}`); assert.ok(text(cat).includes(it.description)); }
  for (const it of accueil.coreServices.items) { assert.ok(core.includes(`href="${it.slug}"`), `lien manquant ${it.slug}`); assert.ok(text(core).includes(it.description)); }
  assert.ok(html.includes('href="/services"'));
});

test('zones, à propos, FAQ et liste compacte des communes', () => {
  const zones = html.slice(html.indexOf('id="zones"'), html.indexOf('id="a-propos"'));
  assert.ok(text(zones).includes(accueil.serviceAreaParagraph));
  for (const z of activeZones) assert.ok(html.includes(`href="/${z.slug}"`), `zone ${z.slug} non liée`);
  assert.ok(html.includes('href="/zones-d-intervention"'));
  const about = html.slice(html.indexOf('id="a-propos"'), html.indexOf('id="faq"'));
  assert.ok(text(about).includes(accueil.about.paragraph));
  assert.match(about, /<img[^>]*loading="lazy"/, 'photo (placeholder) de l’équipe en lazy loading');
  const faq = html.slice(html.indexOf('id="faq"'), html.indexOf('id="zones-liste"'));
  for (const q of accueil.faq) assert.ok(text(faq).includes(q.question) && text(faq).includes(q.answer), `FAQ incomplète : ${q.question}`);
  assert.equal((faq.match(/<details/g) || []).length, accueil.faq.length, 'un accordéon par question');
  const compact = html.slice(html.indexOf('id="zones-liste"'), html.indexOf('id="cta-final"'));
  assert.ok(compact.includes('href="/zones-d-intervention"'));
});

test('CTA final : titre rédigé, téléphone, deux boutons', () => {
  const sec = html.slice(html.indexOf('id="cta-final"'), html.indexOf('<footer'));
  assert.ok(text(sec).includes(accueil.finalCta.headline) && text(sec).includes(accueil.finalCta.subtext));
  assert.ok(sec.includes(`href="${site.phoneHref}"`) && sec.includes('href="#devis"'));
});

test('schema.org : RoofingContractor (NAP + @id), 2 Service, FAQPage à 6 questions', () => {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
  const all = blocks.flatMap((b) => (b['@graph'] ? b['@graph'] : [b]));
  const biz = all.find((n) => n['@type'] === 'RoofingContractor');
  assert.ok(biz, 'LocalBusiness/RoofingContractor manquant');
  assert.equal(biz['@id'], `${site.domain}/#organisation`);
  assert.equal(biz.telephone, '+32460229960');
  assert.equal(biz.address.streetAddress, site.address.street);
  assert.equal(biz.address.postalCode, site.address.postalCode);
  assert.equal(biz.address.addressCountry, 'BE');
  assert.ok(Array.isArray(biz.areaServed) && biz.areaServed.length >= 20);
  const services = all.filter((n) => n['@type'] === 'Service');
  assert.equal(services.length, 2);
  for (const s of services) assert.equal(s.provider['@id'], `${site.domain}/#organisation`);
  const faq = all.find((n) => n['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, accueil.faq.length);
  assert.deepEqual(faq.mainEntity.map((q) => q.name), accueil.faq.map((q) => q.question));
});

test('mobile : barre CTA collante sur l’accueil (à la place du bouton flottant), tous les téléphones cliquables', () => {
  assert.ok(html.includes('class="sticky-cta"'), 'barre CTA collante manquante');
  assert.ok(!html.includes('class="floating-call"'), 'le bouton flottant doit être remplacé par la barre sur l’accueil');
  assert.ok(html.split(`href="${site.phoneHref}"`).length - 1 >= 4, 'au moins 4 liens tel: sur la page');
  const visible = html.replace(/<meta[^>]*>/g, '').replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(new RegExp(`<a [^>]*href="${site.phoneHref.replace(/[+]/g, '\\+')}"[^>]*>[\\s\\S]*?<\\/a>`, 'g'), '');
  assert.ok(!text(visible).includes(site.phoneDisplay), 'un numéro affiché (texte visible) hors lien tel:');
});

test('performance : chaque <img> a width, height et loading="lazy" ; l’image du hero est préchargée', () => {
  const hero = html.slice(html.indexOf('id="hero"'), html.indexOf('id="pourquoi-nous"'));
  const imgs = [...html.matchAll(/<img[^>]*>/g)].map((m) => m[0]);
  assert.ok(imgs.length >= 1);
  for (const img of imgs) {
    assert.match(img, /width="\d+"/, img); assert.match(img, /height="\d+"/, img); assert.match(img, /alt="/, img);
    if (hero.includes(img)) { assert.match(img, /fetchpriority="high"/, 'image LCP : fetchpriority="high"'); assert.doesNotMatch(img, /loading="lazy"/, 'image LCP jamais en lazy'); }
    else assert.match(img, /loading="lazy"/, img);
  }
  assert.match(html, /<link rel="preload" as="image" href="\/_astro\/[^"]+\.webp"[^>]*imagesrcset=/, 'préchargement de la photo du hero');
});

test('carrousel des réalisations : vraies photos légendées, flèches masquées tant que le script ne tourne pas', () => {
  const work = html.slice(html.indexOf('id="realisations"'), html.indexOf('id="marques"'));
  assert.ok(work.length > 0, 'section réalisations absente');
  const slides = work.match(/<li[^>]*class="work__slide"/g) || [];
  assert.ok(slides.length >= 6 && slides.length <= 12, `6 à 12 chantiers attendus, ${slides.length} trouvés`);
  assert.equal((work.match(/<figcaption/g) || []).length, slides.length, 'une légende par chantier');
  // La piste reste défilable au doigt et au clavier même sans JavaScript ; les flèches, elles, n'apparaissent qu'avec.
  assert.match(work, /data-work-track[^>]*tabindex="0"/, 'piste non focalisable au clavier');
  assert.match(work, /role="region"[^>]*aria-label="[^"]{10,}"/, 'zone défilante sans nom accessible');
  assert.match(work, /data-work-nav[^>]*hidden/, 'les flèches doivent être masquées dans le HTML servi');
  for (const label of work.match(/<button[^>]*aria-label="([^"]*)"/g) || []) assert.ok(label.length > 20, `bouton sans libellé : ${label}`);
});

test('bandeau des marques : piste dupliquée pour la boucle, la copie masquée aux lecteurs d’écran', () => {
  const brands = html.slice(html.indexOf('id="marques"'), html.indexOf('id="zones"'));
  assert.ok(brands.length > 0, 'section marques absente');
  const tracks = brands.match(/<ul[^>]*class="brands__track"/g) || [];
  assert.equal(tracks.length, 2, 'il faut exactement deux pistes : l’originale et sa copie');
  assert.equal((brands.match(/aria-hidden="true"/g) || []).length, 1, 'la copie, et elle seule, doit être masquée aux lecteurs d’écran');
  const items = brands.match(/<li[^>]*class="brands__item"/g) || [];
  assert.ok(items.length >= 6 && items.length % 2 === 0, 'les deux pistes doivent porter le même nombre de marques');
  // Aucune affirmation de partenariat : le bandeau dit seulement ce que nous posons.
  assert.doesNotMatch(brands, /partenaire|certifi|agréé|agree|officiel/i, 'le bandeau ne doit revendiquer ni partenariat ni agrément');
});
