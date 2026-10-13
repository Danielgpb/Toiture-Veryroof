# Squelette du site Toiture Veryroof (Prompt 1 du Core 30) — Plan d'implémentation

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Créer le site statique complet (design system, header/footer, navigation, 40 pages SEO + 2 pages légales + 404) avec uniquement des contenus placeholders, conformément au Prompt 1 du Core 30.

**Architecture:** Site Astro 5 en sortie statique (`output: 'static'`, `build.format: 'file'`, URLs sans slash final). Toute la hiérarchie de services et les zones vivent dans trois fichiers de données TypeScript (`src/data/`), et une route dynamique `[slug].astro` génère toutes les pages services et communes à partir de ces données. Ajouter une commune = ajouter une ligne dans `src/data/zones.ts`. Chaque navigation est un chargement de page complet (MPA), donc le scroll repart toujours en haut sans composant ScrollToTop.

**Tech Stack:** Node 26, Astro ^5.18 (pas de framework UI, CSS vanilla avec design tokens), tests `node:test` (Node strippe les types TS nativement), script de vérification des liens en Node.

**Spec:** `docs/superpowers/specs/2026-10-12-architecture-site-veryroof-design.md`

> Exécuté le 12/10/2026. Après revue : la règle `_redirects` est forcée (`301!`), `src/lib/paths.ts` (`cleanPath`) retire le `.html` de `Astro.url.pathname` pour la canonique et `aria-current`, et `scripts/check-links.mjs` contrôle en plus la canonique de chaque page, la présence d'`aria-current`, l'absence de liens `.html` et la règle `301!`. Le code de référence reste celui des fichiers du projet.

## Global Constraints

- Langue du site : français ; `<html lang="fr">` ; slugs français de la spec, copiés tels quels.
- Aucune abréviation d'État : titres des pages = « [Service] Bruxelles », pages communes = « Couvreur [Commune] ».
- Placeholders obligatoires tant que la fiche Google n'existe pas : téléphone `02 XXX XX XX` / `tel:+322XXXXXXX`, email `info@veryroof.be`, domaine `https://www.veryroof.be`, `[N° BCE / TVA]`.
- Palette : primaire `#1B2A41`, accent `#D9632B`, fond `#FFFFFF`, texte `#1F2937`, fond secondaire `#F3F4F6`.
- Navigation principale sans menu déroulant : Accueil, Services, À propos, Contact + bouton téléphone.
- Liens internes : URL absolues commençant par `/`, sans `#` (sauf le lien d'évitement `#main`), sans slash final.
- Chaque page affiche uniquement : header, H1, « Contenu en cours de rédaction. », footer (exception : `/services` et `/zones-d-intervention` listent les liens vers toutes les pages pour vérification).
- Comptage attendu : 40 pages SEO (1 accueil + 4 principales + 3 catégories + 2 phares + 21 enfants + 5 générales + 4 communes) + 2 légales + 404 + redirection racine = 44 fichiers HTML.
- Pas de dépôt git initialisé par le client : aucune étape de commit (à activer dès que le client demande `git init`).

## Review Focus

1. Un lien généré avec `#` ou un slash final casse la cohérence canonique — `scripts/check-links.mjs` échoue sur tout `href` interne contenant `#` (hors `#main`) ou finissant par `/` (Task 4).
2. Une nouvelle commune dont le slug entre en collision avec l'accueil (`couvreur-bruxelles`) ou un service écraserait une page — le test d'unicité des slugs inclut `site.homeSlug`, les pages statiques, les services et les zones (Task 2).
3. Une page qui n'est liée nulle part (orpheline) n'est pas indexée — `check-links.mjs` exige au moins un lien entrant pour chaque page sauf `index.html` et `404.html` (Task 4).
4. Sur mobile, un menu ouvert qui ne se referme pas ou un débordement horizontal — vérification navigateur à 375 px : `document.documentElement.scrollWidth <= window.innerWidth` et fermeture du menu au clic sur un lien (Task 5).
5. La racine `/` doit renvoyer un vrai 301 sur l'hébergeur et pas seulement un `meta refresh` — `public/_redirects` contient `/  /couvreur-bruxelles  301` et le script de vérification contrôle sa présence dans `dist/` (Task 4).

---

### Task 1: Projet Astro et design system

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.gitignore`
- Create: `src/styles/global.css`
- Create: `public/favicon.svg`, `public/_redirects`

**Interfaces:**
- Produces: les classes CSS globales `.container`, `.btn`, `.btn--accent`, `.btn--primary`, `.btn--outline`, `.page-head`, `.section`, `.section--alt`, `.placeholder`, `.link-grid`, `.skip-link` et les tokens `--color-*`, `--font-*`, `--radius`, `--shadow`, `--container`.

- [ ] **Step 1 : Écrire `package.json`**

```json
{
  "name": "toiture-veryroof",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "node --test tests/",
    "check-links": "node scripts/check-links.mjs",
    "verify": "npm test && astro build && node scripts/check-links.mjs"
  },
  "dependencies": {
    "astro": "^5.18.2"
  }
}
```

- [ ] **Step 2 : Écrire `astro.config.mjs`, `tsconfig.json`, `.gitignore`**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  // [DOMAINE] — remplacer par le domaine définitif
  site: 'https://www.veryroof.be',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: { '/': '/couvreur-bruxelles' },
});
```

```json
{ "extends": "astro/tsconfigs/base" }
```

```
node_modules/
dist/
.astro/
.DS_Store
```

- [ ] **Step 3 : Écrire `src/styles/global.css`** (tokens + base + utilitaires)

```css
:root {
  --color-primary: #1B2A41;
  --color-primary-dark: #121D2E;
  --color-accent: #D9632B;
  --color-accent-dark: #B84F1E;
  --color-bg: #FFFFFF;
  --color-bg-alt: #F3F4F6;
  --color-text: #1F2937;
  --color-muted: #4B5563;
  --color-line: #E5E7EB;
  --font-heading: "Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-body: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  --container: 1200px;
  --radius: 10px;
  --shadow: 0 10px 30px rgba(17, 24, 39, 0.08);
}
*, *::before, *::after { box-sizing: border-box; }
html { -webkit-text-size-adjust: 100%; }
body { margin: 0; font-family: var(--font-body); color: var(--color-text); background: var(--color-bg); line-height: 1.6; }
img, svg { max-width: 100%; display: block; }
a { color: var(--color-primary); }
h1, h2, h3 { font-family: var(--font-heading); line-height: 1.15; margin: 0 0 0.5em; color: var(--color-primary); letter-spacing: -0.01em; }
h1 { font-size: clamp(1.9rem, 4vw, 2.9rem); }
h2 { font-size: clamp(1.4rem, 2.5vw, 1.9rem); }
h3 { font-size: 1.15rem; }
p { margin: 0 0 1em; }
.container { width: min(100% - 2rem, var(--container)); margin-inline: auto; }
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem; min-height: 48px; padding: 0.75rem 1.4rem; border-radius: var(--radius); font-family: var(--font-heading); font-weight: 700; text-decoration: none; border: 2px solid transparent; transition: background 0.2s, transform 0.1s; }
.btn:active { transform: translateY(1px); }
.btn--accent { background: var(--color-accent); color: #fff; }
.btn--accent:hover { background: var(--color-accent-dark); }
.btn--primary { background: var(--color-primary); color: #fff; }
.btn--primary:hover { background: var(--color-primary-dark); }
.btn--outline { border-color: #fff; color: #fff; }
.btn--outline:hover { background: rgba(255, 255, 255, 0.12); }
.page-head { background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark)); color: #fff; padding: clamp(3rem, 7vw, 5rem) 0; }
.page-head h1 { color: #fff; margin: 0 0 0.5rem; }
.page-head p { margin: 0; opacity: 0.85; font-size: 1.1rem; }
.section { padding: clamp(2.5rem, 6vw, 4.5rem) 0; }
.section--alt { background: var(--color-bg-alt); }
.placeholder { font-style: italic; color: var(--color-muted); }
.link-grid { list-style: none; padding: 0; margin: 0 0 2rem; display: grid; gap: 0.75rem; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); }
.link-grid a { display: block; padding: 0.9rem 1rem; border: 1px solid var(--color-line); border-radius: var(--radius); background: #fff; text-decoration: none; font-weight: 600; transition: border-color 0.2s, box-shadow 0.2s; }
.link-grid a:hover { border-color: var(--color-accent); box-shadow: var(--shadow); }
.skip-link { position: absolute; left: -999px; top: 0; background: #fff; padding: 0.5rem 1rem; z-index: 1000; }
.skip-link:focus { left: 1rem; top: 1rem; }
:focus-visible { outline: 3px solid var(--color-accent); outline-offset: 2px; }
@media (max-width: 900px) { body { padding-bottom: 5rem; } }
```

- [ ] **Step 4 : Écrire `public/favicon.svg` et `public/_redirects`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36"><rect width="36" height="36" rx="8" fill="#1B2A41"/><path d="M6 20 18 8l12 12" fill="none" stroke="#D9632B" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M11 18v10h14V18" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/></svg>
```

```
/  /couvreur-bruxelles  301!
```

- [ ] **Step 5 : Installer et vérifier qu'Astro démarre**

Run: `npm install && npx astro --version`
Expected: `astro  v5.x.x` (aucune erreur d'installation).

### Task 2: Données du site (NAP, hiérarchie des services, zones) en TDD

**Files:**
- Create: `tests/data.test.mjs`
- Create: `src/data/site.ts`, `src/data/services.ts`, `src/data/zones.ts`

**Interfaces:**
- Produces: `site` (`name`, `tagline`, `domain`, `phoneDisplay`, `phoneHref`, `email`, `address{street,postalCode,city,region,country}`, `vat`, `homeSlug`, `nav[]{label,href}`), `staticPages[]{slug,name}`, `serviceGroups[]{kind,slug,name,children[]{slug,name}}`, `generalServices[]`, `allServicePages(): {slug,name,kind,parentSlug}[]`, `serviceH1(name)`, `activeZones[]{slug,name,region}`, `serviceAreas{bxl,brabant-wallon,brabant-flamand: string[]}`, `regionLabels`, `zoneH1(zone)`.

- [ ] **Step 1 : Écrire le test qui échoue `tests/data.test.mjs`**

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { serviceGroups, generalServices, allServicePages, serviceH1 } from '../src/data/services.ts';
import { activeZones, serviceAreas, zoneH1 } from '../src/data/zones.ts';
import { site, staticPages } from '../src/data/site.ts';

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

test('la hiérarchie des services respecte les comptages de la spec', () => {
  assert.equal(serviceGroups.filter((g) => g.kind === 'category').length, 3);
  assert.equal(serviceGroups.filter((g) => g.kind === 'core').length, 2);
  assert.equal(serviceGroups.flatMap((g) => g.children).length, 21);
  assert.equal(generalServices.length, 5);
  assert.equal(allServicePages().length, 31);
  for (const g of serviceGroups) assert.ok(g.children.length >= 3, `${g.slug} doit avoir des enfants`);
});

test('chaque page enfant connaît son parent, les autres n’en ont pas', () => {
  for (const p of allServicePages()) {
    if (p.kind === 'child') assert.ok(serviceGroups.some((g) => g.slug === p.parentSlug), `${p.slug} sans parent`);
    else assert.equal(p.parentSlug, null);
  }
});

test('tous les slugs sont uniques et propres', () => {
  const slugs = [
    site.homeSlug,
    ...staticPages.map((p) => p.slug),
    ...allServicePages().map((p) => p.slug),
    ...activeZones.map((z) => z.slug),
  ];
  assert.equal(new Set(slugs).size, slugs.length, 'slug en double');
  for (const s of slugs) assert.match(s, SLUG, `slug invalide : ${s}`);
});

test('les pages communes sont des zones desservies et 4 au lancement', () => {
  assert.equal(activeZones.length, 4);
  const names = Object.values(serviceAreas).flat();
  for (const z of activeZones) {
    assert.ok(names.some((n) => n.startsWith(z.name)), `${z.name} absente des zones desservies`);
    assert.ok(z.slug.startsWith('couvreur-'), `${z.slug} doit suivre le motif couvreur-[commune]`);
  }
  assert.equal(zoneH1(activeZones[0]), 'Couvreur Uccle');
});

test('les titres H1 suivent « [Service] Bruxelles »', () => {
  assert.equal(serviceH1('Toiture plate'), 'Toiture plate Bruxelles');
});

test('les données NAP sont présentes', () => {
  assert.equal(site.name, 'Toiture Veryroof');
  assert.equal(site.address.street, 'Chaussée de La Hulpe 254');
  assert.equal(site.address.postalCode, '1000');
  assert.ok(site.phoneHref.startsWith('tel:'));
  assert.equal(site.nav.length, 4);
  assert.equal(staticPages.length, 6);
});
```

- [ ] **Step 2 : Lancer le test pour vérifier qu'il échoue**

Run: `npm test`
Expected: échec `Cannot find module '.../src/data/services.ts'`.

- [ ] **Step 3 : Écrire `src/data/site.ts`**

```ts
export const site = {
  name: 'Toiture Veryroof',
  tagline: 'Couvreur à Bruxelles et dans toute la périphérie',
  // [DOMAINE] — placeholder
  domain: 'https://www.veryroof.be',
  // [TÉLÉPHONE] — placeholders à remplacer par le numéro réel
  phoneDisplay: '02 XXX XX XX',
  phoneHref: 'tel:+322XXXXXXX',
  // [EMAIL] — placeholder
  email: 'info@veryroof.be',
  address: {
    street: 'Chaussée de La Hulpe 254',
    postalCode: '1000',
    city: 'Bruxelles',
    region: 'Bruxelles-Capitale',
    country: 'BE',
  },
  vat: '[N° BCE / TVA]',
  homeSlug: 'couvreur-bruxelles',
  city: 'Bruxelles',
  nav: [
    { label: 'Accueil', href: '/couvreur-bruxelles' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const staticPages = [
  { slug: 'services', name: 'Services' },
  { slug: 'a-propos', name: 'À propos' },
  { slug: 'contact', name: 'Contact' },
  { slug: 'zones-d-intervention', name: "Zones d'intervention" },
  { slug: 'mentions-legales', name: 'Mentions légales' },
  { slug: 'politique-de-confidentialite', name: 'Politique de confidentialité' },
];
```

- [ ] **Step 4 : Écrire `src/data/services.ts`**

```ts
export interface ServiceLeaf {
  slug: string;
  name: string;
}

export interface ServiceGroup extends ServiceLeaf {
  kind: 'category' | 'core';
  children: ServiceLeaf[];
}

export type PageKind = 'category' | 'core' | 'child' | 'general';

export interface ServicePage {
  slug: string;
  name: string;
  kind: PageKind;
  parentSlug: string | null;
}

export const serviceGroups: ServiceGroup[] = [
  {
    kind: 'category',
    slug: 'reparation-toiture-bruxelles',
    name: 'Réparation de toiture',
    children: [
      { slug: 'reparation-fuite-toiture-bruxelles', name: 'Réparation de fuite de toiture' },
      { slug: 'remplacement-tuiles-ardoises-bruxelles', name: 'Remplacement de tuiles et ardoises cassées' },
      { slug: 'reparation-toiture-tempete-bruxelles', name: 'Réparation de toiture après tempête' },
      { slug: 'reparation-faitage-solins-bruxelles', name: 'Réparation de faîtage et de solins' },
      { slug: 'reparation-cheminee-bruxelles', name: 'Réparation de souche de cheminée' },
    ],
  },
  {
    kind: 'category',
    slug: 'isolation-toiture-bruxelles',
    name: 'Isolation de toiture',
    children: [
      { slug: 'isolation-combles-bruxelles', name: "Isolation des combles par l'intérieur" },
      { slug: 'isolation-sarking-bruxelles', name: "Isolation par l'extérieur (sarking)" },
      { slug: 'isolation-toiture-plate-bruxelles', name: 'Isolation de toiture plate' },
    ],
  },
  {
    kind: 'category',
    slug: 'zinguerie-gouttieres-bruxelles',
    name: 'Zinguerie et gouttières',
    children: [
      { slug: 'pose-gouttieres-bruxelles', name: 'Pose et remplacement de gouttières' },
      { slug: 'reparation-gouttieres-bruxelles', name: 'Réparation de gouttières' },
      { slug: 'nettoyage-gouttieres-bruxelles', name: 'Nettoyage de gouttières' },
      { slug: 'cheneaux-descentes-eau-bruxelles', name: "Chéneaux, noues et descentes d'eau pluviale" },
    ],
  },
  {
    kind: 'core',
    slug: 'renovation-toiture-bruxelles',
    name: 'Rénovation de toiture',
    children: [
      { slug: 'toiture-tuiles-bruxelles', name: 'Toiture en tuiles' },
      { slug: 'toiture-ardoises-bruxelles', name: 'Toiture en ardoises' },
      { slug: 'toiture-zinc-bruxelles', name: 'Toiture en zinc' },
      { slug: 'charpente-bruxelles', name: 'Réparation et traitement de charpente' },
      { slug: 'enlevement-ardoises-amiante-bruxelles', name: "Enlèvement d'ardoises amiante-ciment" },
    ],
  },
  {
    kind: 'core',
    slug: 'toiture-plate-bruxelles',
    name: 'Toiture plate',
    children: [
      { slug: 'etancheite-epdm-bruxelles', name: 'Toiture EPDM' },
      { slug: 'roofing-bitumineux-bruxelles', name: 'Roofing bitumineux' },
      { slug: 'reparation-toiture-plate-bruxelles', name: 'Réparation de toiture plate' },
      { slug: 'toiture-vegetalisee-bruxelles', name: 'Toiture végétalisée' },
    ],
  },
];

export const generalServices: ServiceLeaf[] = [
  { slug: 'depannage-toiture-urgence-bruxelles', name: "Dépannage toiture d'urgence 24h/24" },
  { slug: 'pose-velux-bruxelles', name: 'Pose de fenêtres de toit Velux' },
  { slug: 'demoussage-toiture-bruxelles', name: 'Démoussage et traitement hydrofuge' },
  { slug: 'inspection-toiture-bruxelles', name: 'Inspection et expertise de toiture' },
  { slug: 'toiture-copropriete-bruxelles', name: 'Toiture pour copropriétés et syndics' },
];

export function allServicePages(): ServicePage[] {
  const pages: ServicePage[] = [];
  for (const group of serviceGroups) {
    pages.push({ slug: group.slug, name: group.name, kind: group.kind, parentSlug: null });
    for (const child of group.children) {
      pages.push({ slug: child.slug, name: child.name, kind: 'child', parentSlug: group.slug });
    }
  }
  for (const service of generalServices) {
    pages.push({ slug: service.slug, name: service.name, kind: 'general', parentSlug: null });
  }
  return pages;
}

export function serviceH1(name: string): string {
  return `${name} Bruxelles`;
}
```

- [ ] **Step 5 : Écrire `src/data/zones.ts`**

```ts
export type Region = 'bxl' | 'brabant-wallon' | 'brabant-flamand';

export interface Zone {
  slug: string;
  name: string;
  region: Region;
}

// Pages communes publiées. Pour ajouter une commune : une ligne ici, motif couvreur-[commune].
export const activeZones: Zone[] = [
  { slug: 'couvreur-uccle', name: 'Uccle', region: 'bxl' },
  { slug: 'couvreur-watermael-boitsfort', name: 'Watermael-Boitsfort', region: 'bxl' },
  { slug: 'couvreur-rhode-saint-genese', name: 'Rhode-Saint-Genèse', region: 'brabant-flamand' },
  { slug: 'couvreur-waterloo', name: 'Waterloo', region: 'brabant-wallon' },
];

export const regionLabels: Record<Region, string> = {
  bxl: 'Région de Bruxelles-Capitale',
  'brabant-wallon': 'Périphérie sud (Brabant wallon)',
  'brabant-flamand': 'Périphérie (Brabant flamand)',
};

export const serviceAreas: Record<Region, string[]> = {
  bxl: [
    'Bruxelles-Ville (Laeken, Neder-Over-Heembeek, Haren)', 'Uccle', 'Ixelles', 'Watermael-Boitsfort', 'Auderghem',
    'Woluwe-Saint-Pierre', 'Woluwe-Saint-Lambert', 'Etterbeek', 'Schaerbeek', 'Evere', 'Saint-Josse-ten-Noode',
    'Saint-Gilles', 'Forest', 'Anderlecht', 'Molenbeek-Saint-Jean', 'Koekelberg', 'Berchem-Sainte-Agathe', 'Ganshoren', 'Jette',
  ],
  'brabant-wallon': [
    'Waterloo', "Braine-l'Alleud", 'La Hulpe', 'Rixensart', 'Genval', 'Lasne', 'Wavre', 'Ottignies-Louvain-la-Neuve', 'Nivelles',
  ],
  'brabant-flamand': [
    'Rhode-Saint-Genèse', 'Linkebeek', 'Drogenbos', 'Beersel', 'Sint-Pieters-Leeuw', 'Dilbeek', 'Wemmel', 'Grimbergen',
    'Vilvorde', 'Zaventem', 'Kraainem', 'Wezembeek-Oppem', 'Tervuren', 'Overijse', 'Hoeilaart',
  ],
};

export function zoneH1(zone: Zone): string {
  return `Couvreur ${zone.name}`;
}
```

- [ ] **Step 6 : Lancer les tests**

Run: `npm test`
Expected: 6 tests `pass`, 0 `fail`.

### Task 3: Layout, header, footer, bouton d'appel flottant

**Files:**
- Create: `src/layouts/BaseLayout.astro`
- Create: `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/FloatingCall.astro`, `src/components/PlaceholderPage.astro`

**Interfaces:**
- Consumes: `site`, `staticPages`, `serviceGroups`, `generalServices`, `activeZones` (Task 2) ; classes CSS globales (Task 1).
- Produces: `<BaseLayout title description?>` (slot = contenu de `<main id="main">`), `<PlaceholderPage h1 title?>` (slot optionnel sous le texte placeholder).

- [ ] **Step 1 : Écrire `src/layouts/BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FloatingCall from '../components/FloatingCall.astro';
import { site } from '../data/site';

interface Props {
  title: string;
  description?: string;
}

const { title, description = `${site.name} — ${site.tagline}.` } = Astro.props;
const canonical = new URL(Astro.url.pathname, site.domain).href;
---
<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={canonical} />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <meta name="theme-color" content="#1B2A41" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet" />
  </head>
  <body>
    <a class="skip-link" href="#main">Aller au contenu</a>
    <Header />
    <main id="main"><slot /></main>
    <Footer />
    <FloatingCall />
  </body>
</html>
```

- [ ] **Step 2 : Écrire `src/components/Header.astro`**

```astro
---
import { site } from '../data/site';
const current = Astro.url.pathname;
---
<div class="topbar">
  <div class="container topbar__inner">
    <p class="topbar__text">{site.tagline}</p>
    <a class="topbar__phone" href={site.phoneHref}>{site.phoneDisplay}</a>
  </div>
</div>
<header class="header" id="site-header">
  <div class="container header__inner">
    <a class="logo" href={`/${site.homeSlug}`} aria-label={`${site.name} — accueil`}>
      <svg class="logo__icon" width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
        <path d="M4 19 18 6l14 13" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M9 17v12h18V17" fill="none" stroke="#1B2A41" stroke-width="3" stroke-linejoin="round" />
        <path d="M23 9h4v6" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round" />
      </svg>
      <span class="logo__text">Toiture <strong>Veryroof</strong></span>
    </a>
    <nav class="nav" id="site-nav" aria-label="Navigation principale">
      <ul class="nav__list">
        {site.nav.map((item) => (
          <li><a href={item.href} aria-current={current === item.href ? 'page' : undefined}>{item.label}</a></li>
        ))}
        <li class="nav__mobile-cta"><a class="btn btn--accent" href={site.phoneHref}>Appeler le {site.phoneDisplay}</a></li>
      </ul>
    </nav>
    <a class="btn btn--accent header__cta" href={site.phoneHref}>
      <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"/></svg>
      <span>{site.phoneDisplay}</span>
    </a>
    <button class="burger" type="button" aria-controls="site-nav" aria-expanded="false" aria-label="Ouvrir le menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<style>
  .topbar { background: var(--color-primary-dark); color: #fff; font-size: 0.9rem; }
  .topbar__inner { display: flex; justify-content: space-between; align-items: center; gap: 1rem; min-height: 38px; }
  .topbar__text { margin: 0; }
  .topbar__phone { color: #fff; font-weight: 700; text-decoration: none; white-space: nowrap; }
  .header { position: sticky; top: 0; z-index: 50; background: #fff; border-bottom: 1px solid var(--color-line); transition: box-shadow 0.2s; }
  .header.is-scrolled { box-shadow: var(--shadow); }
  .header__inner { position: relative; display: flex; align-items: center; justify-content: space-between; gap: 1.5rem; min-height: 76px; }
  .logo { display: flex; align-items: center; gap: 0.6rem; text-decoration: none; color: var(--color-primary); font-family: var(--font-heading); font-size: 1.3rem; }
  .logo__icon { color: var(--color-accent); }
  .logo__text strong { font-weight: 800; }
  .nav__list { list-style: none; margin: 0; padding: 0; display: flex; gap: 1.75rem; }
  .nav__list a { text-decoration: none; font-weight: 600; color: var(--color-text); padding: 0.5rem 0; border-bottom: 2px solid transparent; }
  .nav__list a:hover, .nav__list a[aria-current="page"] { color: var(--color-primary); border-bottom-color: var(--color-accent); }
  .nav__mobile-cta { display: none; }
  .burger { display: none; flex-direction: column; justify-content: center; gap: 5px; width: 48px; height: 48px; padding: 0; background: none; border: 0; cursor: pointer; }
  .burger span { display: block; width: 26px; height: 3px; margin-inline: auto; background: var(--color-primary); border-radius: 2px; }
  @media (max-width: 900px) {
    .topbar__text { display: none; }
    .topbar__inner { justify-content: center; }
    .header__cta { display: none; }
    .burger { display: flex; }
    .nav { position: absolute; top: 100%; left: 0; right: 0; display: none; background: #fff; border-bottom: 1px solid var(--color-line); box-shadow: var(--shadow); }
    .nav.is-open { display: block; }
    .nav__list { flex-direction: column; gap: 0; padding: 0.5rem 1rem 1.25rem; }
    .nav__list a { display: block; padding: 0.9rem 0.25rem; border-bottom: 1px solid var(--color-line); }
    .nav__mobile-cta { display: block; padding-top: 1rem; }
    .nav__mobile-cta a { border-bottom: 0; width: 100%; }
  }
</style>

<script>
  const header = document.getElementById('site-header');
  const nav = document.getElementById('site-nav');
  const burger = document.querySelector<HTMLButtonElement>('.burger');

  const onScroll = () => header?.classList.toggle('is-scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  if (nav && burger) {
    const setOpen = (open: boolean) => {
      nav.classList.toggle('is-open', open);
      burger.setAttribute('aria-expanded', String(open));
      burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    };
    burger.addEventListener('click', () => setOpen(!nav.classList.contains('is-open')));
    nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  }
</script>
```

- [ ] **Step 3 : Écrire `src/components/Footer.astro`**

```astro
---
import { site } from '../data/site';
import { serviceGroups, generalServices } from '../data/services';
import { activeZones } from '../data/zones';

const year = new Date().getFullYear();
const quickLinks = [
  ...site.nav,
  { label: "Zones d'intervention", href: '/zones-d-intervention' },
];
---
<footer class="footer">
  <div class="container footer__grid">
    <div class="footer__brand">
      <p class="footer__logo">Toiture <strong>Veryroof</strong></p>
      <p>{site.tagline}.</p>
      <a class="footer__phone" href={site.phoneHref}>{site.phoneDisplay}</a>
      <address class="footer__address">
        {site.address.street}<br />
        {site.address.postalCode} {site.address.city}<br />
        <a href={`mailto:${site.email}`}>{site.email}</a><br />
        <span>{site.vat}</span>
      </address>
      <div class="social" aria-label="Réseaux sociaux">
        <!-- Ajouter l'URL de la page Facebook -->
        <span class="social__item" title="Facebook — lien à ajouter" aria-label="Facebook">f</span>
        <!-- Ajouter l'URL de la fiche Google Business Profile -->
        <span class="social__item" title="Google — lien à ajouter" aria-label="Google">G</span>
      </div>
    </div>
    <div>
      <p class="footer__title">Liens rapides</p>
      <ul class="footer__list">
        {quickLinks.map((l) => <li><a href={l.href}>{l.label}</a></li>)}
      </ul>
    </div>
    <div>
      <p class="footer__title">Nos services</p>
      <ul class="footer__list">
        {serviceGroups.map((g) => <li><a href={`/${g.slug}`}>{g.name}</a></li>)}
        {generalServices.map((s) => <li><a href={`/${s.slug}`}>{s.name}</a></li>)}
      </ul>
    </div>
    <div>
      <p class="footer__title">Zones d'intervention</p>
      <ul class="footer__list">
        {activeZones.map((z) => <li><a href={`/${z.slug}`}>Couvreur {z.name}</a></li>)}
        <li><a href="/zones-d-intervention">Toutes nos zones d'intervention</a></li>
      </ul>
    </div>
  </div>
  <div class="footer__bottom">
    <div class="container footer__bottom-inner">
      <p>© {year} {site.name}. Tous droits réservés.</p>
      <p><a href="/mentions-legales">Mentions légales</a> · <a href="/politique-de-confidentialite">Politique de confidentialité</a></p>
    </div>
  </div>
</footer>

<style>
  .footer { background: var(--color-primary); color: rgba(255, 255, 255, 0.85); margin-top: 3rem; }
  .footer a { color: #fff; text-decoration: none; }
  .footer a:hover { text-decoration: underline; }
  .footer__grid { display: grid; gap: 2rem; padding: 3.5rem 0 2.5rem; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  .footer__logo { font-family: var(--font-heading); font-size: 1.4rem; color: #fff; margin: 0 0 0.5rem; }
  .footer__logo strong { font-weight: 800; }
  .footer__phone { display: inline-block; font-family: var(--font-heading); font-size: 1.5rem; font-weight: 800; color: #fff; margin: 0.25rem 0 1rem; }
  .footer__address { font-style: normal; line-height: 1.7; }
  .footer__title { font-family: var(--font-heading); font-weight: 700; color: #fff; text-transform: uppercase; letter-spacing: 0.06em; font-size: 0.85rem; margin: 0 0 1rem; }
  .footer__list { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.5rem; }
  .social { display: flex; gap: 0.6rem; margin-top: 1rem; }
  .social__item { display: inline-flex; align-items: center; justify-content: center; width: 40px; height: 40px; border-radius: 50%; border: 1px solid rgba(255, 255, 255, 0.35); font-weight: 700; color: #fff; }
  .footer__bottom { border-top: 1px solid rgba(255, 255, 255, 0.15); font-size: 0.9rem; }
  .footer__bottom-inner { display: flex; flex-wrap: wrap; justify-content: space-between; gap: 0.5rem 1.5rem; padding: 1.25rem 0; }
  .footer__bottom p { margin: 0; }
</style>
```

- [ ] **Step 4 : Écrire `src/components/FloatingCall.astro`**

```astro
---
import { site } from '../data/site';
---
<a class="floating-call" href={site.phoneHref} aria-label={`Appeler ${site.name} au ${site.phoneDisplay}`}>
  <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1L6.6 10.8Z"/></svg>
  <span>Appeler</span>
</a>

<style>
  .floating-call { position: fixed; right: 1rem; bottom: 1rem; z-index: 60; display: none; align-items: center; gap: 0.5rem; min-height: 52px; padding: 0.9rem 1.3rem; border-radius: 999px; background: var(--color-accent); color: #fff; font-family: var(--font-heading); font-weight: 700; text-decoration: none; box-shadow: 0 10px 25px rgba(217, 99, 43, 0.4); }
  @media (max-width: 900px) { .floating-call { display: inline-flex; } }
</style>
```

- [ ] **Step 5 : Écrire `src/components/PlaceholderPage.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';

interface Props {
  h1: string;
  title?: string;
}

const { h1, title = `${h1} | ${site.name}` } = Astro.props;
---
<BaseLayout title={title}>
  <section class="page-head">
    <div class="container"><h1>{h1}</h1></div>
  </section>
  <section class="section">
    <div class="container">
      <p class="placeholder">Contenu en cours de rédaction.</p>
      <slot />
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 6 : Vérifier que le layout compile** (page d'accueil temporaire créée en Task 4, Step 1 ; ici on vérifie seulement la syntaxe)

Run: `npx astro check 2>&1 | tail -5` (facultatif, nécessite `@astrojs/check`) ou passer directement à la Task 4.

### Task 4: Toutes les routes + script de vérification des liens

**Files:**
- Create: `src/pages/couvreur-bruxelles.astro`, `src/pages/[slug].astro`, `src/pages/services.astro`, `src/pages/zones-d-intervention.astro`, `src/pages/a-propos.astro`, `src/pages/contact.astro`, `src/pages/mentions-legales.astro`, `src/pages/politique-de-confidentialite.astro`, `src/pages/404.astro`
- Create: `scripts/check-links.mjs`

**Interfaces:**
- Consumes: `PlaceholderPage`, `BaseLayout` (Task 3) ; données (Task 2).
- Produces: `dist/` avec 44 fichiers HTML ; `npm run check-links` qui échoue sur lien cassé, ancre, slash final, page orpheline, mauvais comptage, `_redirects` manquant.

- [ ] **Step 1 : Écrire le script de vérification (le test de cette tâche) `scripts/check-links.mjs`**

```js
import { readdir, readFile, access } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { allServicePages } from '../src/data/services.ts';
import { activeZones } from '../src/data/zones.ts';
import { staticPages } from '../src/data/site.ts';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
const ALLOWED_HASH = new Set(['#main']); // lien d'évitement (accessibilité), intentionnel

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

const files = await walk(dist);
const errors = [];
const inbound = new Map();
let checked = 0;

for (const file of files) {
  const page = '/' + relative(dist, file);
  const html = await readFile(file, 'utf8');
  for (const match of html.matchAll(/href="([^"]*)"/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|tel:)/.test(href)) continue;
    if (ALLOWED_HASH.has(href)) continue;
    if (href.includes('#')) { errors.push(`${page}: ancre interdite "${href}"`); continue; }
    if (!href.startsWith('/')) { errors.push(`${page}: lien non absolu "${href}"`); continue; }
    if (href.length > 1 && href.endsWith('/')) { errors.push(`${page}: slash final interdit "${href}"`); continue; }
    checked++;
    if (!(await resolves(href))) { errors.push(`${page}: lien cassé "${href}"`); continue; }
    const target = href === '/' ? '/index.html' : `${href}.html`;
    if (target !== page) inbound.set(target, (inbound.get(target) ?? 0) + 1);
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
if (!(await exists(redirects)) || !(await readFile(redirects, 'utf8')).includes('/couvreur-bruxelles')) {
  errors.push('_redirects : redirection 301 de / vers /couvreur-bruxelles manquante');
}

console.log(`${files.length} pages HTML, ${checked} liens internes vérifiés`);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log('OK : aucun lien cassé, aucune ancre, aucun slash final, aucune page orpheline');
```

- [ ] **Step 2 : Lancer le script avant les pages pour vérifier qu'il échoue**

Run: `npx astro build && node scripts/check-links.mjs`
Expected: `Nombre de pages HTML : 2, attendu 44` et code de sortie 1 (seuls `index.html` de redirection et éventuellement `404.html` existent).

- [ ] **Step 3 : Écrire les pages**

```astro
---
// src/pages/couvreur-bruxelles.astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
---
<PlaceholderPage h1="Couvreur Bruxelles" title="Couvreur Bruxelles | Toiture Veryroof" />
```

```astro
---
// src/pages/[slug].astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
import { allServicePages, serviceH1 } from '../data/services';
import { activeZones, zoneH1 } from '../data/zones';

export function getStaticPaths() {
  return [
    ...allServicePages().map((page) => ({ params: { slug: page.slug }, props: { h1: serviceH1(page.name) } })),
    ...activeZones.map((zone) => ({ params: { slug: zone.slug }, props: { h1: zoneH1(zone) } })),
  ];
}

const { h1 } = Astro.props;
---
<PlaceholderPage h1={h1} />
```

```astro
---
// src/pages/services.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';
import { serviceGroups, generalServices } from '../data/services';
---
<BaseLayout title={`Services de toiture Bruxelles | ${site.name}`}>
  <section class="page-head">
    <div class="container">
      <h1>Services de toiture Bruxelles</h1>
      <p>Contenu en cours de rédaction.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      {serviceGroups.map((group) => (
        <div>
          <h2><a href={`/${group.slug}`}>{group.name}</a></h2>
          <ul class="link-grid">
            {group.children.map((child) => <li><a href={`/${child.slug}`}>{child.name}</a></li>)}
          </ul>
        </div>
      ))}
      <h2>Autres services de toiture</h2>
      <ul class="link-grid">
        {generalServices.map((service) => <li><a href={`/${service.slug}`}>{service.name}</a></li>)}
      </ul>
    </div>
  </section>
</BaseLayout>
```

```astro
---
// src/pages/zones-d-intervention.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';
import { activeZones, serviceAreas, regionLabels } from '../data/zones';
const regions = Object.keys(serviceAreas) as (keyof typeof serviceAreas)[];
---
<BaseLayout title={`Zones d'intervention | ${site.name}`}>
  <section class="page-head">
    <div class="container">
      <h1>Zones d'intervention</h1>
      <p>Contenu en cours de rédaction.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <h2>Nos pages par commune</h2>
      <ul class="link-grid">
        {activeZones.map((zone) => <li><a href={`/${zone.slug}`}>Couvreur {zone.name}</a></li>)}
      </ul>
      {regions.map((region) => (
        <div>
          <h2>{regionLabels[region]}</h2>
          <p>{serviceAreas[region].join(' · ')}</p>
        </div>
      ))}
    </div>
  </section>
</BaseLayout>
```

```astro
---
// src/pages/a-propos.astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
---
<PlaceholderPage h1="À propos de Toiture Veryroof" />
```

```astro
---
// src/pages/contact.astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
---
<PlaceholderPage h1="Contact" />
```

```astro
---
// src/pages/mentions-legales.astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
---
<PlaceholderPage h1="Mentions légales" />
```

```astro
---
// src/pages/politique-de-confidentialite.astro
import PlaceholderPage from '../components/PlaceholderPage.astro';
---
<PlaceholderPage h1="Politique de confidentialité" />
```

```astro
---
// src/pages/404.astro
import BaseLayout from '../layouts/BaseLayout.astro';
import { site } from '../data/site';
---
<BaseLayout title={`Page introuvable | ${site.name}`}>
  <section class="page-head">
    <div class="container">
      <h1>Page introuvable</h1>
      <p>La page que vous cherchez a peut-être été déplacée ou n'existe plus.</p>
    </div>
  </section>
  <section class="section">
    <div class="container">
      <p><a class="btn btn--primary" href={`/${site.homeSlug}`}>Retour à l'accueil</a> <a class="btn btn--accent" href="/services">Voir nos services</a></p>
      <p>Ou appelez-nous directement au <a href={site.phoneHref}>{site.phoneDisplay}</a>.</p>
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4 : Construire et vérifier**

Run: `npm run verify`
Expected: 6 tests pass ; build Astro sans erreur ; `44 pages HTML, N liens internes vérifiés` puis `OK : aucun lien cassé…`.

### Task 5: Vérification visuelle et mobile

**Files:**
- Aucun fichier créé (vérification uniquement) ; corrections éventuelles dans `src/components/Header.astro`.

- [ ] **Step 1 : Lancer la prévisualisation**

Run: `npx astro preview --port 4321` (ou via le navigateur intégré).
Expected: serveur sur `http://localhost:4321`, `/` redirige vers `/couvreur-bruxelles`.

- [ ] **Step 2 : Contrôles navigateur à 375 px de large**

Vérifier dans la console : `document.documentElement.scrollWidth <= window.innerWidth` → `true` ; le bouton « Appeler » flottant est visible ; le menu hamburger s'ouvre et se referme après un clic sur un lien ; tous les `tel:` sont cliquables.

- [ ] **Step 3 : Contrôles navigateur bureau (≥ 1200 px)**

Header collant visible après défilement avec ombre ; navigation sans menu déroulant ; `/services` liste bien 31 liens de services ; `/zones-d-intervention` liste 4 communes.

- [ ] **Step 4 : Rapport**

Confirmer : 44 fichiers HTML (40 pages SEO + 2 légales + 404 + redirection), navigation fonctionnelle, scroll en haut à chaque page (MPA), aucun lien cassé.
