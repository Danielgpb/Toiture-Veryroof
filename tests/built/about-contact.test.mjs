// Pages À propos et Contact construites (Prompt 7) : structure E-E-A-T, placeholders documentés, formulaire, schema.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { site, pending } from '../../src/data/site.ts';
import { activeZones, serviceAreas } from '../../src/data/zones.ts';
import { serviceGroups, generalServices } from '../../src/data/services.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const root = fileURLToPath(new URL('../../', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const text = (s) => decode(s.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<!--[\s\S]*?-->/g, '').replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
const ld = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { const b = JSON.parse(m[1]); return b['@graph'] ?? [b]; });
let about = '';
let contact = '';
before(async () => { about = await readFile(join(dist, 'a-propos.html'), 'utf8'); contact = await readFile(join(dist, 'contact.html'), 'utf8'); });

test('À propos : title, H1, sections E-E-A-T dans l’ordre (les sections sans information fournie sont masquées), emplacements commentés', () => {
  assert.equal(text(about.match(/<title>([^<]*)<\/title>/)[1]), 'À propos de Toiture Veryroof | Couvreur à Bruxelles');
  const h1s = [...about.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1]));
  assert.deepEqual(h1s, ['À propos de Toiture Veryroof : votre couvreur à Bruxelles']);
  const optional = { equipe: !!pending.manager.name, video: !!pending.videoEmbed, google: !!pending.gbpEmbed, reseaux: Object.values(pending.social).some(Boolean) };
  const ids = ['hero', 'histoire', 'equipe', 'video', 'zones', 'confiance', 'google', 'reseaux'].filter((id) => !(id in optional) || optional[id]);
  const pos = ids.map((id) => about.indexOf(`id="${id}"`));
  pos.forEach((p, i) => assert.ok(p > -1, `section manquante : ${ids[i]}`));
  for (let i = 1; i < pos.length; i++) assert.ok(pos[i] > pos[i - 1], `${ids[i]} doit suivre ${ids[i - 1]}`);
  for (const [id, shown] of Object.entries(optional)) if (!shown) assert.ok(!about.includes(`id="${id}"`), `section ${id} affichée sans information fournie`);
  for (const c of ['Remplacer par l’histoire authentique', 'Remplacer par les informations réelles du gérant', 'Intégrer ici une vidéo de présentation', 'Ajouter le numéro d’entreprise', 'Ajouter les détails de l’assurance', 'COLLER ICI LE CODE D’INTÉGRATION DE LA FICHE GOOGLE', 'Ajouter l’URL de la page Facebook']) assert.ok(about.includes(c), `commentaire placeholder manquant : ${c}`);
  if (pending.manager.name) assert.match(about, /<img[^>]*alt="[^"]*gérant[^"]*"[^>]*>/i, 'portrait du gérant avec alt');
  for (const z of activeZones) assert.ok(about.includes(`href="/${z.slug}"`), `zone ${z.slug} liée`);
  assert.ok(about.includes('href="/zones-d-intervention"'));
  for (const name of Object.values(serviceAreas).flat().slice(0, 5)) assert.ok(text(about).includes(name.split(' (')[0]), `commune ${name}`);
  assert.ok(text(about).includes('Assurance') && text(about).includes('décennale'));
  assert.ok(about.split(`href="${site.phoneHref}"`).length - 1 >= 3, 'au moins 3 liens tel: sur À propos');
  assert.ok(!/href="[^"]*#(?!main)/.test(about), 'aucune ancre # hors lien d’évitement');
});

test('À propos : schema organisation complet (NAP, zones, email) sans nom de gérant inventé', () => {
  const org = ld(about).find((n) => n['@type'] === 'RoofingContractor');
  assert.equal(org['@id'], `${site.domain}/#organisation`);
  assert.equal(org.telephone, site.phoneHref.replace('tel:', ''));
  assert.equal(org.email, site.email);
  assert.equal(org.address.streetAddress, site.address.street);
  assert.ok(org.areaServed.length >= 40);
  assert.ok(!/\[(?:À|X\]|N°)/.test(JSON.stringify(org)), 'pas de placeholder dans le schema');
});

test('Contact : title, H1, téléphone très visible, deux colonnes (coordonnées + formulaire), zones, carte, confiance', () => {
  assert.equal(text(contact.match(/<title>([^<]*)<\/title>/)[1]), 'Contact Toiture Veryroof | Couvreur à Bruxelles');
  assert.deepEqual([...contact.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/g)].map((m) => text(m[1])), ['Contactez Toiture Veryroof']);
  const ids = ['hero', 'coordonnees', 'devis', 'zones', 'carte', 'confiance'];
  const pos = ids.map((id) => contact.indexOf(`id="${id}"`));
  pos.forEach((p, i) => assert.ok(p > -1, `section manquante : ${ids[i]}`));
  for (let i = 1; i < pos.length; i++) assert.ok(pos[i] > pos[i - 1], `${ids[i]} doit suivre ${ids[i - 1]}`);
  assert.ok(contact.split(`href="${site.phoneHref}"`).length - 1 >= 4, 'au moins 4 liens tel: sur Contact');
  assert.ok(contact.includes(`href="mailto:${site.email}"`));
  assert.ok(text(contact).includes(site.address.street) && text(contact).includes(`${site.address.postalCode} ${site.address.city}`));
  assert.ok(contact.includes('Ajouter les horaires'), 'placeholder horaires commenté');
  assert.ok(contact.includes('COLLER ICI LE CODE D’INTÉGRATION GOOGLE MAPS'), 'placeholder carte commenté');
  assert.match(contact, /href="https:\/\/www\.google\.com\/maps\/search\/\?api=1&(?:amp;)?query=/, 'lien itinéraire Google Maps');
  for (const z of activeZones) assert.ok(contact.includes(`href="/${z.slug}"`), `zone ${z.slug} liée`);
  assert.ok(text(contact).includes('Appelez-nous'));
});

test('Contact : formulaire complet qui poste vers /contact, liste des services, validation native, succès/erreur', () => {
  const form = contact.match(/<form[^>]*name="devis"[^>]*>/)[0];
  assert.match(form, /action="\/contact"/); assert.match(form, /data-netlify="true"/);
  for (const name of ['nom', 'telephone', 'email']) assert.match(contact, new RegExp(`<input[^>]*name="${name}"[^>]*required`));
  assert.match(contact, /<select[^>]*name="service"[^>]*required/);
  const options = [...contact.matchAll(/<option[^>]*>([^<]*)<\/option>/g)].map((m) => text(m[1]));
  for (const g of serviceGroups) assert.ok(options.includes(g.name), `option ${g.name}`);
  for (const s of generalServices) assert.ok(options.includes(s.name), `option ${s.name}`);
  assert.ok(options.includes('Autre / je ne sais pas'));
  assert.match(contact, /<button[^>]*type="submit"/);
  assert.ok(contact.includes('<!-- BRANCHER LE FORMULAIRE'));
  assert.ok(contact.includes('role="status"'));
});

test('Contact : schema ContactPage lié à l’organisation avec point de contact', () => {
  const nodes = ld(contact);
  const page = nodes.find((n) => n['@type'] === 'ContactPage');
  assert.equal(page.mainEntity['@id'], `${site.domain}/#organisation`);
  const org = nodes.find((n) => n['@type'] === 'RoofingContractor');
  assert.equal(org.contactPoint.telephone, site.phoneHref.replace('tel:', ''));
  assert.equal(org.contactPoint.availableLanguage, 'fr');
});

test('RGPD et conversion : lien vers la politique de confidentialité près de chaque formulaire, champ source, CTA #devis sur Contact', async () => {
  const home = await readFile(join(dist, 'index.html'), 'utf8');
  for (const [name, html] of [['accueil', home], ['contact', contact]]) {
    const form = html.slice(html.indexOf('<form'), html.indexOf('</form>'));
    assert.ok(form.includes('href="/politique-de-confidentialite"'), `${name} : lien politique de confidentialité dans le formulaire`);
    assert.match(form, /<input[^>]*type="hidden"[^>]*name="source"/, `${name} : champ caché source`);
    assert.match(form, /method="POST"/i); assert.match(form, /name="bot-field"/); assert.match(form, /name="form-name"/);
  }
  const hero = contact.slice(contact.indexOf('id="hero"'), contact.indexOf('id="coordonnees"'));
  assert.ok(hero.includes('href="#devis"'), 'contact : CTA vers le formulaire dans le hero');
});

test('liaison Suivi Leads : le script du formulaire (accueil et contact) poste vers le relais /.netlify/functions/lead avec le piège _piege et le service', async () => {
  const home = await readFile(join(dist, 'index.html'), 'utf8');
  for (const [name, html] of [['accueil', home], ['contact', contact]]) {
    // Astro inline les petits scripts dans la page ; on lit aussi les éventuels fichiers externes
    const inline = [...html.matchAll(/<script type="module">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    const externes = [...html.matchAll(/<script type="module" src="(\/_astro\/[^"]+\.js)"/g)].map((m) => m[1]);
    const js = [...inline, ...(await Promise.all(externes.map((src) => readFile(join(dist, src), 'utf8'))))].join('\n');
    assert.ok(js.length > 0, `${name} : script du formulaire`);
    for (const needle of ['/.netlify/functions/lead', '_piege', 'formulaire toiture-veryroof.be', 'Service:']) assert.ok(js.includes(needle), `${name} : « ${needle} » absent du script`);
  }
  const relais = await readFile(join(root, 'netlify/functions/lead.mjs'), 'utf8');
  for (const v of ['LEADAPP_URL', 'LEADAPP_SITE', 'LEADAPP_TYPE', 'LEADAPP_SECRET']) assert.ok(relais.includes(v), `relais : ${v}`);
  const toml = await readFile(join(root, 'netlify.toml'), 'utf8');
  assert.match(toml, /directory = "netlify\/functions"/); assert.match(toml, /publish = "dist"/);
});

test('À propos et Contact : aucun placeholder visible, aucun iframe, schema sans gérant inventé, canonique', () => {
  for (const [name, html] of [['a-propos', about], ['contact', contact]]) {
    assert.deepEqual([...text(html).matchAll(/\[[^\]]+\]/g)].map((m) => m[0]), [], `${name} : placeholder visible`);
    assert.ok(!/<iframe/i.test(html), `${name} : aucun iframe (RGPD)`);
    assert.match(html, new RegExp(`<link rel="canonical" href="${site.domain}/${name}"\\s*/?>`));
    const nodes = ld(html);
    const org = nodes.find((n) => n['@type'] === 'RoofingContractor');
    if (!pending.manager.name) assert.ok(!org.founder && !org.employee, `${name} : pas de founder/employee tant que le nom est inconnu`);
    assert.ok(nodes.some((n) => n['@type'] === 'BreadcrumbList'), `${name} : fil d'Ariane schema`);
  }
  assert.ok(!/formée au métier|tout de suite|nous-mêmes la zinguerie/.test(text(about) + text(contact)), 'affirmations non validées retirées');
  assert.ok(text(about).includes('soumis à architecte'), 'À propos : nuance décennale');
  for (const g of serviceGroups.filter((x) => x.kind === 'category')) assert.ok(about.includes(`href="/${g.slug}"`), `À propos : lien vers ${g.slug}`);
});

test('Pages légales : mentions légales et politique de confidentialité rédigées (RGPD art. 13)', async () => {
  const mentions = await readFile(join(dist, 'mentions-legales.html'), 'utf8');
  const politique = await readFile(join(dist, 'politique-de-confidentialite.html'), 'utf8');
  for (const k of ['Éditeur', site.name, site.address.street, 'Hébergeur', 'Propriété intellectuelle']) assert.ok(text(mentions).includes(k), `mentions : ${k}`);
  for (const k of ['responsable du traitement', 'données collectées', 'finalité', 'base légale', 'durée de conservation', 'vos droits', 'autorité de protection des données', 'cookies']) assert.ok(text(politique).toLowerCase().includes(k), `politique : ${k}`);
  assert.ok(!text(politique).includes('Contenu en cours de rédaction') && !text(mentions).includes('Contenu en cours de rédaction'));
  for (const [name, html] of [['mentions', mentions], ['politique', politique]]) assert.deepEqual([...text(html).matchAll(/\[[^\]]+\]/g)].map((m) => m[0]), [], `${name} : placeholder visible`);
  if (site.vat) { assert.ok(text(mentions).includes(site.vat) && text(politique).includes(site.vat), 'numéro d’entreprise affiché'); } else { assert.ok(!text(mentions).includes('Numéro d\'entreprise (BCE)'), 'ligne BCE masquée tant que le numéro est inconnu'); }
});
