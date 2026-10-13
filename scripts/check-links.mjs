import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allServicePages } from '../src/data/services.ts';
import { activeZones } from '../src/data/zones.ts';
import { site, staticPages } from '../src/data/site.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

async function exists(path) {
  try { await access(path); return true; } catch { return false; }
}

async function resolves(href) {
  const path = href === '/' ? '/index' : href;
  for (const candidate of [join(dist, `${path}.html`), join(dist, path, 'index.html'), join(dist, path)]) {
    if (await exists(candidate)) return true;
  }
  return false;
}

if (!(await exists(dist))) {
  console.error('dist/ introuvable : lancez `npm run build` avant `npm run check-links`');
  process.exit(1);
}

const files = await walk(dist);
const errors = [];
// Copies de synchronisation (iCloud/Finder) du type « page 2.html » créées pendant le build : elles ne doivent jamais être déployées.
for (const f of await readdir(dist)) if (/ \d+\.[a-z0-9]+$/i.test(f)) errors.push(`fichier parasite dans dist : ${f} (copie de synchronisation iCloud ; supprimer, ou sortir le projet du dossier Bureau synchronisé)`);
const inbound = new Map();
let checked = 0;

for (const file of files) {
  const page = '/' + relative(dist, file);
  const html = await readFile(file, 'utf8');
  if (page !== '/index.html' && page !== '/404.html') {
    const expectedCanonical = `${site.domain}/${basename(file, '.html')}`;
    const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
    if (canonical !== expectedCanonical) errors.push(`${page}: canonical "${canonical}" ≠ "${expectedCanonical}"`);
  }
  const markup = html.replace(/<script[\s\S]*?<\/script>/g, ''); // les scripts inlinés ne contiennent pas de liens navigables
  for (const match of markup.matchAll(/href="([^"]*)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (href.startsWith('#')) {
      // Ancre interne intentionnelle (#main : lien d'évitement ; #devis : formulaire de l'accueil) : sa cible doit exister sur la même page.
      if (!html.includes(`id="${href.slice(1)}"`)) errors.push(`${page}: ancre "${href}" sans cible sur cette page`);
      continue;
    }
    if (href.includes('#')) { errors.push(`${page}: ancre interdite "${href}"`); continue; }
    if (!href.startsWith('/')) { errors.push(`${page}: lien non absolu "${href}"`); continue; }
    if (href.length > 1 && href.endsWith('/')) { errors.push(`${page}: slash final interdit "${href}"`); continue; }
    if (href.endsWith('.html')) { errors.push(`${page}: lien vers un fichier .html interdit "${href}" (URL propre attendue)`); continue; }
    checked++;
    if (!(await resolves(href))) { errors.push(`${page}: lien cassé "${href}"`); continue; }
    const target = href === '/' ? '/index.html' : `${href}.html`;
    if (target !== page) inbound.set(target, (inbound.get(target) ?? 0) + 1);
  }
}

for (const item of site.nav) {
  const navPage = join(dist, `${item.href}.html`);
  if ((await exists(navPage)) && !(await readFile(navPage, 'utf8')).includes('aria-current="page"')) {
    errors.push(`${item.href}.html : aucun lien de navigation marqué aria-current="page"`);
  }
}

const expected = 1 + staticPages.length + allServicePages().length + activeZones.length + 2; // accueil + statiques + services + zones + (404 + redirection racine)
if (files.length !== expected) errors.push(`Nombre de pages HTML : ${files.length}, attendu ${expected}`);

for (const file of files) {
  const page = '/' + relative(dist, file);
  if (page === '/index.html' || page === '/404.html') continue;
  if (!inbound.get(page)) errors.push(`page orpheline : ${page}`);
}

const redirects = join(dist, '_redirects');
if (!(await exists(redirects)) || !/^\/\s+\/couvreur-bruxelles\s+301!\s*$/m.test(await readFile(redirects, 'utf8'))) {
  errors.push('_redirects : règle forcée "/  /couvreur-bruxelles  301!" manquante (sans "!", Netlify sert index.html en 200)');
}

console.log(`${files.length} pages HTML, ${checked} liens internes vérifiés`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('OK : aucun lien cassé, aucune ancre, aucun slash final, aucune page orpheline');
