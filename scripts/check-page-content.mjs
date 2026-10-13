// Valide un fichier de contenu de page (src/data/pages/<slug>.json) contre les règles du Core 30 et du site.
// Usage : node scripts/check-page-content.mjs <slug> [<slug>...]   → code de sortie 1 s'il y a des écarts.
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { allServicePages, serviceGroups } from '../src/data/services.ts';
import { site } from '../src/data/site.ts';
import { keywords } from '../src/data/keywords.ts';
import { activeZones, zoneTerm } from '../src/data/zones.ts';

const ANCHORS = ['couvreur à Bruxelles', 'entreprise de toiture à Bruxelles', 'Toiture Veryroof, votre couvreur bruxellois', 'notre entreprise de couverture à Bruxelles'];
const BANNED = ['bienvenue chez', "n'hésitez pas", 'n’hésitez pas', 'ne cherchez plus', 'nous sommes fiers', 'nous comprenons', 'leader', 'incontournable', 'de premier ordre', 'crucial', 'essentiel', 'vital', 'sans couture', 'à la pointe', 'tirer parti', 'robuste', 'révolutionnaire', 'niché', 'témoignage de', 'pour tous vos besoins', 'solution complète', 'clé en main', 'un large éventail', 'state-of-the-art', 'look no further', 'top-notch', 'cutting-edge'];
const ALLOWED_NUMBERS = new Set(['48', '24', '7', '19', '1880', '1930', '1998', '2025', '32', '460', '22', '99', '60', '6', '12', '10', '2024']);
/** Longueur maximale d'une phrase (lisibilité, relecture Prompt 6). */
export const SENTENCE_MAX = 35;
const words = (t) => (t.match(/[\p{L}\p{N}’'-]+/gu) || []).length;
const pagesByName = new Map(allServicePages().map((p) => [p.name, p.slug]));
/** Liens transversaux imposés par l'architecture (page → noms exacts à lier). */
const REQUIRED_LINKS = { 'renovation-toiture-bruxelles': ['Isolation de toiture'], 'toiture-plate-bruxelles': ['Isolation de toiture plate'] };

const fold = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[’']/g, ' ');
/** Mots trop génériques pour distinguer une page d'une autre. */
const STOP = new Set(['toiture', 'toitures', 'toit', 'toits', 'bruxelles', 'bruxellois', 'couvreur', 'couvreurs', 'pour', 'par', 'sur', 'des', 'les', 'une', 'avec', 'sans', 'vos', 'votre', 'nos', 'notre', 'eau', 'apres', 'dans', 'aux', 'est', 'qui', 'que']);
const tokens = (s) => [...new Set(fold(s).split(/[^a-z0-9]+/).filter((w) => w.length >= 3 && !STOP.has(w)))];

/** Anti-cannibalisation générique : le title/H1 d'une page ne contient aucun terme distinctif du nom d'une AUTRE page
 *  (sauf si ce terme fait partie de son propre nom ou de son mot-clé principal). */
export function crossPageErrors(slug, page, titleH1) {
  const own = new Set([...tokens(page.name), ...tokens(keywords[slug]?.primary || '')]);
  const present = new Set(tokens(titleH1));
  const errs = new Set();
  for (const other of allServicePages()) {
    if (other.slug === slug) continue;
    for (const t of tokens(other.name)) if (!own.has(t) && present.has(t)) errs.add(`${slug}: title/H1 contient « ${t} », terme distinctif de la page « ${other.name} » (cannibalisation)`);
  }
  return [...errs];
}

const plain = (t) => t.replace(/\[\[home:([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]]+)\]\]/g, '$1');
export const sentences = (t) => plain(t).split(/(?<=[.!?])\s+(?=[\p{Lu}«"(\d+])/u).map((s) => s.trim()).filter(Boolean);
/** Phrases de plus de SENTENCE_MAX mots (lisibilité). */
export function longSentenceErrors(slug, fields) {
  const errs = [];
  for (const [k, paras] of Object.entries(fields)) for (const p of paras || []) for (const s of sentences(p)) if (words(s) > SENTENCE_MAX) errs.push(`${slug}: ${k} : phrase de ${words(s)} mots (max ${SENTENCE_MAX}) « ${s.slice(0, 70)}… »`);
  return errs;
}


/** FAQ (règles ALI-KA §8 adaptées, docs/core30/regles-veryroof.md) : 4–5 questions réelles, réponses de 2–4 phrases,
 *  au moins un lien interne, aucune question reprise sur une autre page. */
const FAQ_MIN = 4, FAQ_MAX = 5;
let faqIndex;
async function allQuestions() {
  if (faqIndex) return faqIndex;
  const { readdir } = await import('node:fs/promises');
  const dir = fileURLToPath(new URL('../src/data/pages/', import.meta.url));
  faqIndex = new Map(); // question normalisée → slug
  for (const f of (await readdir(dir)).filter((f) => f.endsWith('.json'))) {
    let j; try { j = JSON.parse(await readFile(dir + f, 'utf8')); } catch { continue; }
    for (const q of j.faq || []) if (typeof q?.question === 'string') { const k = fold(q.question).replace(/[^a-z0-9]+/g, ' ').trim(); if (!faqIndex.has(k)) faqIndex.set(k, f.replace(/\.json$/, '')); }
  }
  try { const acc = JSON.parse(await readFile(fileURLToPath(new URL('../src/data/accueil.json', import.meta.url)), 'utf8')); for (const q of acc.faq || []) { const k = fold(q.question).replace(/[^a-z0-9]+/g, ' ').trim(); if (!faqIndex.has(k)) faqIndex.set(k, 'accueil'); } } catch {}
  return faqIndex;
}
export async function faqErrors(slug, c, name) {
  const errs = [];
  const must = (cond, msg) => { if (!cond) errs.push(`${slug}: faq : ${msg}`); };
  must(Array.isArray(c.faq), 'tableau « faq » attendu');
  if (!Array.isArray(c.faq)) return errs;
  must(c.faq.length >= FAQ_MIN && c.faq.length <= FAQ_MAX, `${c.faq.length} question(s) (attendu ${FAQ_MIN}–${FAQ_MAX})`);
  if (c.faqHeading !== undefined) must(typeof c.faqHeading === 'string' && c.faqHeading.length >= 12 && c.faqHeading.length <= 90 && !/\[\[/.test(c.faqHeading), 'faqHeading : 12–90 caractères, sans lien');
  const index = await allQuestions();
  const seen = new Set();
  let links = 0;
  c.faq.forEach((q, i) => {
    const n = i + 1;
    must(typeof q?.question === 'string' && typeof q?.answer === 'string', `Q${n} : { question, answer } attendus`);
    if (typeof q?.question !== 'string' || typeof q?.answer !== 'string') return;
    must(/\?$/.test(q.question.trim()), `Q${n} doit se terminer par « ? »`);
    must(words(q.question) >= 6 && words(q.question) <= 20, `Q${n} : ${words(q.question)} mots (6–20)`);
    must(!/\[\[/.test(q.question), `Q${n} : pas de lien dans la question`);
    const k = fold(q.question).replace(/[^a-z0-9]+/g, ' ').trim();
    must(!seen.has(k), `Q${n} en double dans la page`); seen.add(k);
    const owner = index.get(k);
    must(!owner || owner === slug, `Q${n} déjà posée sur la page « ${owner} »`);
    const sents = sentences(q.answer);
    must(sents.length >= 2 && sents.length <= 4, `R${n} : ${sents.length} phrase(s) (2–4)`);
    must(words(q.answer) >= 25 && words(q.answer) <= 90, `R${n} : ${words(q.answer)} mots (25–90)`);
    for (const m of q.answer.matchAll(/\[\[([^\]]+)\]\]/g)) { links++; if (!m[1].startsWith('home:')) must(m[1] !== name, `R${n} : auto-lien [[${name}]] interdit`); }
  });
  must(links >= 1, 'au moins une réponse doit contenir un lien [[Nom exact]] vers une autre page');
  return errs;
}


/** Sources officielles et date de mise à jour (audit du 13/10/2026). */
function sourcesErrors(slug, c) {
  const errs = [];
  const must = (cond, msg) => { if (!cond) errs.push(`${slug}: ${msg}`); };
  must(Array.isArray(c.sources) && c.sources.length >= 1 && c.sources.length <= 4, 'sources : 1 à 4 liens officiels attendus');
  for (const [i, src] of (Array.isArray(c.sources) ? c.sources : []).entries()) {
    must(typeof src?.label === 'string' && src.label.length >= 10 && src.label.length <= 90, `sources[${i}] : libellé de 10 à 90 caractères`);
    must(typeof src?.url === 'string' && /^https:\/\/[^\s"]+$/.test(src.url), `sources[${i}] : URL https attendue`);
    must(!/toiture-veryroof\.be/.test(src?.url ?? ''), `sources[${i}] : une source doit être externe`);
  }
  must(typeof c.updated === 'string' && /^20\d{2}-\d{2}-\d{2}$/.test(c.updated), 'updated : date AAAA-MM-JJ attendue');
  return errs;
}


/** Page service v2 (13/10/2026) : problème → nous le réglons, matériaux et techniques, étapes, prix sans chiffres, FAQ. */
async function checkServiceV2(slug, c, page) {
  const errors = [];
  const must = (cond, msg) => { if (!cond) errors.push(`${slug}: ${msg}`); };
  const name = page.name;
  const parent = page.parentSlug ? allServicePages().find((p) => p.slug === page.parentSlug) : null;
  for (const k of ['metaTitle', 'metaDescription', 'h1', 'heroSubheadline', 'opening', 'problems', 'tech', 'cost', 'faq', 'finalCta', 'parentLink', 'summary']) must(c[k] !== undefined, `champ manquant : ${k}`);
  if (errors.length) return errors;
  must(c.name === name, `name doit valoir « ${name} » (services.ts)`);
  must(c.metaTitle.length <= 60, `metaTitle ${c.metaTitle.length} caractères (max 60)`);
  must(c.metaTitle.startsWith(name), `metaTitle doit commencer par « ${name} »`);
  must(/Bruxelles/.test(c.metaTitle), 'metaTitle doit contenir « Bruxelles »');
  must(c.metaDescription.length >= 140 && c.metaDescription.length <= 155, `metaDescription ${c.metaDescription.length} caractères (140–155)`);
  must(c.h1.startsWith(`${name} à Bruxelles`), `h1 doit commencer par « ${name} à Bruxelles »`);
  must(c.h1.length >= 45 && c.h1.length <= 110, `h1 ${c.h1.length} caractères (45–110)`);
  must(!/—/.test(c.h1) && (c.h1.match(/ : /g) || []).length <= 1, 'h1 : un seul « : », pas de tiret long');
  must(words(c.heroSubheadline) >= 12 && words(c.heroSubheadline) <= 40, `heroSubheadline : ${words(c.heroSubheadline)} jetons (12–40)`);
  for (const w of fold(keywords[slug].primary).split(' ').filter(Boolean)) must(fold(c.metaTitle + ' ' + c.h1).includes(w), `mot-clé « ${w} » absent du title/H1`);
  for (const term of keywords[slug]?.avoid || []) must(!fold(c.metaTitle + ' ' + c.h1).includes(fold(term)), `title/H1 ne doivent pas cibler « ${term} » (page sœur)`);
  errors.push(...crossPageErrors(slug, page, c.metaTitle + ' ' + c.h1));
  // Problèmes → solutions
  const items = Array.isArray(c.problems?.items) ? c.problems.items : [];
  must(typeof c.problems?.h2 === 'string' && c.problems.h2.length >= 12 && c.problems.h2.length <= 90 && /\?/.test(c.problems.h2), 'problems.h2 : question de 12–90 caractères (« Vous avez … ? Nous … »)');
  must(items.length >= 5 && items.length <= 8, `problems : ${items.length} couple(s) (attendu 5–8)`);
  const links = new Set();
  items.forEach((it, i) => {
    must(typeof it?.problem === 'string' && words(it.problem) >= 6 && words(it.problem) <= 30 && /\?$/.test(it.problem.trim()), `problème ${i + 1} : question de 6–30 mots terminée par « ? »`);
    must(!/\[\[/.test(it?.problem ?? ''), `problème ${i + 1} : pas de lien dans la question`);
    must(typeof it?.solution === 'string' && words(it.solution) >= 10 && words(it.solution) <= 55 && /^Nous /.test(it.solution), `solution ${i + 1} : 10–55 mots, commence par « Nous »`);
    for (const m of (it?.solution ?? '').matchAll(/\[\[([^\]]+)\]\]/g)) if (!m[1].startsWith('home:')) links.add(m[1]);
  });
  // Matériaux et techniques
  const tech = Array.isArray(c.tech?.items) ? c.tech.items : [];
  must(typeof c.tech?.h2 === 'string' && c.tech.h2.length >= 12 && c.tech.h2.length <= 80, 'tech.h2 : 12–80 caractères');
  must(tech.length >= 4 && tech.length <= 6, `tech : ${tech.length} point(s) (attendu 4–6)`);
  tech.forEach((it, i) => {
    must(typeof it?.label === 'string' && words(it.label) >= 1 && words(it.label) <= 6, `tech ${i + 1} : label de 1–6 mots`);
    must(typeof it?.text === 'string' && words(it.text) >= 6 && words(it.text) <= 45, `tech ${i + 1} : texte de 6–45 mots`);
    for (const m of (it?.text ?? '').matchAll(/\[\[([^\]]+)\]\]/g)) if (!m[1].startsWith('home:')) links.add(m[1]);
  });
  // Prix
  const cost = Array.isArray(c.cost?.items) ? c.cost.items : [];
  must(typeof c.cost?.h2 === 'string' && /Bruxelles/.test(c.cost.h2) && c.cost.h2.length <= 90, 'cost.h2 doit mentionner Bruxelles (≤ 90 caractères)');
  must(cost.length >= 3 && cost.length <= 5, `cost : ${cost.length} point(s) (attendu 3–5)`);
  cost.forEach((it, i) => must(typeof it === 'string' && words(it) >= 6 && words(it) <= 45, `cost ${i + 1} : 6–45 mots`));
  const blocks = { opening: c.opening, problems: items.flatMap((it) => [it?.problem ?? '', it?.solution ?? '']), tech: tech.map((it) => `${it?.label ?? ''} ${it?.text ?? ''}`), cost, finalCta: c.finalCta.paragraphs };
  const budget = { opening: [25, 90], problems: [100, 520], tech: [40, 260], cost: [25, 200], finalCta: [15, 70] };
  let total = 0;
  for (const [k, paras] of Object.entries(blocks)) {
    const n = words((paras || []).join(' ')); total += n;
    const [lo, hi] = budget[k];
    must(n >= lo && n <= hi, `${k} : ${n} mots (attendu ${lo}–${hi})`);
  }
  total += words(c.heroSubheadline) + words(c.parentLink) + words(c.summary);
  must(total >= 250 && total <= 800, `total ${total} mots hors FAQ (attendu 250–800)`);
  must(words(c.summary) >= 8 && words(c.summary) <= 30, 'summary : 1 phrase de 8–30 mots');
  const faqTexts = (c.faq || []).flatMap((q) => [q?.question ?? '', q?.answer ?? '']);
  errors.push(...longSentenceErrors(slug, { heroSubheadline: [c.heroSubheadline], ...blocks, parentLink: [c.parentLink], summary: [c.summary], faq: faqTexts }));
  errors.push(...(await faqErrors(slug, c, name)));
  errors.push(...sourcesErrors(slug, c));
  const all = [c.heroSubheadline, ...Object.values(blocks).flat(), c.parentLink, c.summary, c.metaDescription, c.h1, c.problems.h2, c.tech.h2, c.cost.h2, ...faqTexts].join('\n');
  const low = all.toLowerCase();
  for (const b of BANNED) must(!low.includes(b), `formule interdite : « ${b} »`);
  must(!/€|euro/i.test(all), 'aucun prix ni mention d’euros');
  for (const m of all.matchAll(/\d+(?:[.,]\d+)?/g)) must(ALLOWED_NUMBERS.has(m[0]), `chiffre non autorisé : « ${m[0]} » (…${all.slice(Math.max(0, m.index - 30), m.index + 20).replace(/\n/g, ' ')}…)`);
  must(!/%/.test(all.replace(/6 %/g, '')), 'pourcentage non autorisé');
  must(!/prime(s)? renolution/i.test(all) || /suspendu/i.test(all), 'primes Renolution : jamais présentées comme disponibles');
  must(!/peeters-borsus/i.test(all) || /soumis à architecte/.test(all), 'Peeters-Borsus : formule imposée « pour les travaux de logement soumis à architecte »');
  must(c.finalCta.paragraphs.join(' ').includes(site.phoneDisplay), 'finalCta doit contenir le numéro');
  const markers = [...all.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  for (const m of markers) {
    if (m.startsWith('home:')) must(ANCHORS.includes(m.slice(5)), `ancre accueil non autorisée : ${m.slice(5)}`);
    else must(pagesByName.has(m), `lien [[${m}]] : nom de page inconnu`);
  }
  must(!markers.includes(name), `auto-lien [[${name}]] interdit`);
  const parentMarkers = [...c.parentLink.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  if (parent) must(parentMarkers.includes(parent.name), `parentLink doit contenir [[${parent.name}]] (page parente)`);
  else must(parentMarkers.some((m) => m.startsWith('home:')), 'parentLink doit contenir [[home:…]] (service général → accueil)');
  must(parentMarkers.length === 1, 'parentLink : un seul lien');
  must(links.size >= 1, 'problèmes ou techniques : au moins une autre page service liée par [[Nom exact]]');
  const siblings = parent ? serviceGroups.find((g) => g.slug === parent.slug).children.filter((ch) => ch.slug !== slug).map((ch) => ch.name) : [];
  if (siblings.length) must([...links].some((m) => siblings.includes(m)), `au moins une page sœur liée (${siblings.join(' / ')})`);
  for (const [k, v] of [['metaTitle', c.metaTitle], ['metaDescription', c.metaDescription], ['h1', c.h1], ['summary', c.summary]]) must(!/\[\[/.test(v), `${k} : pas de lien [[…]]`);
  return errors;
}


/** Hub v2 : mêmes règles que la page service v2, plus le lien accueil unique et chaque enfant lié dans les réponses. */
async function checkHubV2(slug, c, page, group) {
  const errors = await checkServiceV2(slug, { ...c, parentLink: c.homeLink, summary: c.summary ?? 'Page hub sans résumé propre, les pages enfants fournissent le leur.' }, page);
  const must = (cond, msg) => { if (!cond) errors.push(`${slug}: ${msg}`); };
  must(typeof c.homeLink === 'string' && /\[\[home:/.test(c.homeLink), 'homeLink doit contenir [[home:…]]');
  must(c.metaTitle.startsWith(`${page.name} Bruxelles`), `metaTitle doit commencer par « ${page.name} Bruxelles »`);
  must(c.heroSubheadline.includes(site.phoneDisplay) && /24h\/24/.test(c.heroSubheadline), 'heroSubheadline doit contenir le numéro et 24h/24');
  const text = [...c.opening, ...c.problems.items.flatMap((it) => [it.problem, it.solution]), ...c.tech.items.map((it) => it.text)].join('\n');
  for (const child of group.children) must(text.includes(`[[${child.name}]]`), `service enfant non lié par [[${child.name}]] (problèmes ou techniques)`);
  for (const req of REQUIRED_LINKS[slug] || []) must(text.includes(`[[${req}]]`), `lien transversal imposé manquant : [[${req}]]`);
  must((text + c.homeLink).split('[[home:').length - 1 === 1, 'un seul lien vers l’accueil (homeLink)');
  return errors.filter((e) => !/parentLink|summary/.test(e));
}

/** Pages enfants et services généraux (Prompt 6) : 600–800 mots, 4 H2, lien retour vers le parent (ou l'accueil). */
async function checkChildPage(slug, c, page) {
  const errors = [];
  const must = (cond, msg) => { if (!cond) errors.push(`${slug}: ${msg}`); };
  const name = page.name;
  const parent = page.parentSlug ? allServicePages().find((p) => p.slug === page.parentSlug) : null;
  for (const k of ['metaTitle', 'metaDescription', 'h1', 'heroSubheadline', 'opening', 'when', 'process', 'cost', 'why', 'finalCta', 'parentLink', 'summary', 'faq']) must(c[k] !== undefined, `champ manquant : ${k}`);
  if (errors.length) return errors;
  must(c.name === name, `name doit valoir « ${name} » (services.ts)`);
  must(c.metaTitle.length <= 60, `metaTitle ${c.metaTitle.length} caractères (max 60)`);
  must(c.metaTitle.startsWith(name), `metaTitle doit commencer par « ${name} »`);
  must(/Bruxelles/.test(c.metaTitle), 'metaTitle doit contenir « Bruxelles »');
  must(c.metaDescription.length >= 140 && c.metaDescription.length <= 155, `metaDescription ${c.metaDescription.length} caractères (140–155)`);
  must(c.h1.startsWith(`${name} à Bruxelles`), `h1 doit commencer par « ${name} à Bruxelles »`);
  must(c.h1.length >= 45 && c.h1.length <= 110, `h1 ${c.h1.length} caractères (45–110)`);
  must(!/—/.test(c.h1), 'h1 : utiliser « : » plutôt que le tiret long');
  must((c.h1.match(/ : /g) || []).length <= 1, 'h1 : un seul « : » (le nom de page ne doit pas en contenir)');
  must(words(c.heroSubheadline) >= 12 && words(c.heroSubheadline) <= 40, `heroSubheadline : ${words(c.heroSubheadline)} jetons (12–40)`);
  for (const w of fold(keywords[slug].primary).split(' ').filter(Boolean)) must(fold(c.metaTitle + ' ' + c.h1).includes(w), `mot-clé « ${w} » absent du title/H1`);
  for (const term of keywords[slug]?.avoid || []) must(!fold(c.metaTitle + ' ' + c.h1).includes(fold(term)), `title/H1 ne doivent pas cibler « ${term} » (page sœur)`);
  for (const term of keywords[slug]?.avoidWide || []) {
    must(!fold(c.metaDescription + ' ' + c.heroSubheadline + ' ' + [c.when.h2, c.process.h2, c.cost.h2, c.why.h2].join(' ')).includes(fold(term)), `meta description, sous-titre et H2 ne doivent pas cibler « ${term} » (angle d'une autre page)`);
    must(!fold([c.summary, c.parentLink, ...c.finalCta.paragraphs].join(' ')).includes(fold(term)), `résumé, lien parent et CTA final ne doivent pas cibler « ${term} » (angle d'une autre page)`);
  }
  errors.push(...crossPageErrors(slug, page, c.metaTitle + ' ' + c.h1));
  const blocks = { opening: c.opening, when: c.when.paragraphs, process: c.process.paragraphs, cost: c.cost.paragraphs, why: c.why.paragraphs, finalCta: c.finalCta.paragraphs };
  const budget = { opening: [40, 100], when: [100, 170], process: [100, 170], cost: [70, 130], why: [70, 130], finalCta: [35, 90] };
  let total = 0;
  for (const [k, paras] of Object.entries(blocks)) {
    must(Array.isArray(paras) && paras.length >= 1, `${k} : tableau de paragraphes attendu`);
    const n = words((paras || []).join(' ')); total += n;
    const [lo, hi] = budget[k];
    must(n >= lo && n <= hi, `${k} : ${n} mots (attendu ${lo}–${hi})`);
    for (const p of paras || []) must(words(p) <= 110, `${k} : paragraphe de ${words(p)} mots (max 110)`);
  }
  total += words(c.heroSubheadline) + words(c.parentLink) + words(c.summary);
  must(total >= 600 && total <= 950, `total ${total} mots (attendu 600–950)`);
  for (const [k, h2] of [['when', c.when.h2], ['process', c.process.h2], ['cost', c.cost.h2], ['why', c.why.h2]]) must(typeof h2 === 'string' && h2.length >= 12 && h2.length <= 90, `${k}.h2 : longueur 12–90`);
  must(/Bruxelles/.test(c.cost.h2), 'cost.h2 doit mentionner Bruxelles (« … à Bruxelles »)');
  must(words(c.summary) >= 8 && words(c.summary) <= 30, 'summary : 1 phrase de 8–30 mots (carte de la page Services)');
  const faqTexts = (c.faq || []).flatMap((q) => [q?.question ?? '', q?.answer ?? '']);
  errors.push(...longSentenceErrors(slug, { heroSubheadline: [c.heroSubheadline], ...blocks, parentLink: [c.parentLink], summary: [c.summary], faq: faqTexts }));
  errors.push(...(await faqErrors(slug, c, name)));
  errors.push(...sourcesErrors(slug, c));
  const all = [c.heroSubheadline, ...Object.values(blocks).flat(), c.parentLink, c.summary, c.metaDescription, c.h1, ...faqTexts].join('\n');
  const low = all.toLowerCase();
  for (const b of BANNED) must(!low.includes(b), `formule interdite : « ${b} »`);
  must(!/€|euro/i.test(all), 'aucun prix ni mention d’euros (section coût sans chiffres)');
  for (const m of all.matchAll(/\d+(?:[.,]\d+)?/g)) must(ALLOWED_NUMBERS.has(m[0]) || /\[X\]/.test(all.slice(Math.max(0, m.index - 2), m.index + 4)), `chiffre non autorisé : « ${m[0]} » (…${all.slice(Math.max(0, m.index - 30), m.index + 20).replace(/\n/g, ' ')}…)`);
  must(!/%/.test(all.replace(/6 %/g, '')), 'pourcentage non autorisé');
  must(!/prime(s)? renolution/i.test(all) || /suspendu/i.test(all), 'primes Renolution : jamais présentées comme disponibles');
  must(c.finalCta.paragraphs.join(' ').includes(site.phoneDisplay), 'finalCta doit contenir le numéro');
  must(!/peeters-borsus/i.test(all) || /soumis à architecte/.test(all), 'Peeters-Borsus : formule imposée « pour les travaux de logement soumis à architecte »');
  const markers = [...all.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  for (const m of markers) {
    if (m.startsWith('home:')) must(ANCHORS.includes(m.slice(5)), `ancre accueil non autorisée : ${m.slice(5)}`);
    else must(pagesByName.has(m), `lien [[${m}]] : nom de page inconnu`);
  }
  must(!markers.includes(name), `auto-lien [[${name}]] interdit`);
  const parentMarkers = [...c.parentLink.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  if (parent) must(parentMarkers.includes(parent.name), `parentLink doit contenir [[${parent.name}]] (page parente)`);
  else must(parentMarkers.some((m) => m.startsWith('home:')), 'parentLink doit contenir [[home:…]] (service général → accueil)');
  must(parentMarkers.length === 1, 'parentLink : un seul lien');
  // Maillage : le corps lie au moins une autre page service, et une page sœur quand la famille en a.
  const bodyMarkers = [...[...c.opening, ...c.when.paragraphs, ...c.process.paragraphs, ...c.cost.paragraphs, ...c.why.paragraphs].join('\n').matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]).filter((m) => !m.startsWith('home:') && m !== name);
  must(bodyMarkers.length >= 1, 'le corps (ouverture + 4 sections) doit lier au moins une autre page service par [[Nom exact]]');
  const siblings = parent ? serviceGroups.find((g) => g.slug === parent.slug).children.filter((ch) => ch.slug !== slug).map((ch) => ch.name) : [];
  if (siblings.length) must(bodyMarkers.some((m) => siblings.includes(m)), `le corps doit lier au moins une page sœur (${siblings.join(' / ')})`);
  for (const [k, v] of [['metaTitle', c.metaTitle], ['metaDescription', c.metaDescription], ['h1', c.h1], ['summary', c.summary]]) must(!/\[\[/.test(v), `${k} : pas de lien [[…]]`);
  return errors;
}


/** Pages communes (Prompt 9, version « problème → solution » du 13/10/2026) : symptômes ancrés dans des lieux connus, réponse avec lien service, règles régionales, quartiers et repères, FAQ. */
const ZONE_NUMBERS = new Set([...ALLOWED_NUMBERS, '2001', '2007', '1180', '1170', '1640', '1410']);
async function checkZonePage(slug, c, zone) {
  const errors = [];
  const must = (cond, msg) => { if (!cond) errors.push(`${slug}: ${msg}`); };
  for (const k of ['name', 'metaTitle', 'metaDescription', 'h1', 'heroSubheadline', 'opening', 'problems', 'rules', 'quartiers', 'landmarks', 'faq', 'finalCta', 'homeLink', 'summary']) must(c[k] !== undefined, `champ manquant : ${k}`);
  if (errors.length) return errors;
  must(c.name === zone.name, `name doit valoir « ${zone.name} » (zones.ts)`);
  must(c.metaTitle.length <= 60, `metaTitle ${c.metaTitle.length} caractères (max 60)`);
  const term = zoneTerm(zone);
  must(c.metaTitle.startsWith(`${term} ${zone.name}`), `metaTitle doit commencer par « ${term} ${zone.name} »`);
  must(c.metaDescription.length >= 140 && c.metaDescription.length <= 155, `metaDescription ${c.metaDescription.length} caractères (140–155)`);
  must(term === 'Couvreur' ? c.h1.startsWith(`Couvreur à ${zone.name}`) : c.h1.startsWith(`Toiture ${zone.name}`), term === 'Couvreur' ? `h1 doit commencer par « Couvreur à ${zone.name} »` : `h1 doit commencer par « Toiture ${zone.name} »`);
  must(c.h1.length >= 35 && c.h1.length <= 90, `h1 ${c.h1.length} caractères (35–90)`);
  must(!/—/.test(c.h1) && (c.h1.match(/ : /g) || []).length <= 1, 'h1 : un seul « : », pas de tiret long');
  must(/toitur(e|ier)/i.test(c.h1), 'h1 doit contenir « toiture » ou « toiturier »');
  must(/couvreur/i.test(c.h1), 'h1 doit contenir « couvreur »');
  must(/toitur(e|ier)/i.test(c.metaTitle), 'metaTitle doit contenir « toiture » ou « toiturier »');
  must(words(c.heroSubheadline) >= 10 && words(c.heroSubheadline) <= 35, `heroSubheadline : ${words(c.heroSubheadline)} jetons (10–35)`);
  for (const w of fold(keywords[slug].primary).split(' ').filter(Boolean)) must(fold(c.metaTitle + ' ' + c.h1).includes(w), `mot-clé « ${w} » absent du title/H1`);
  // Problème → solution
  const items = Array.isArray(c.problems?.items) ? c.problems.items : [];
  must(typeof c.problems?.h2 === 'string' && c.problems.h2.length >= 12 && c.problems.h2.length <= 80, 'problems.h2 : longueur 12–80');
  must(items.length >= 5 && items.length <= 8, `problems : ${items.length} couple(s) (attendu 5–8)`);
  const places = [...(c.quartiers || []), ...(c.landmarks || [])].map((x) => fold(x));
  let anchored = 0; const links = new Set();
  items.forEach((it, i) => {
    must(typeof it?.problem === 'string' && words(it.problem) >= 8 && words(it.problem) <= 40, `problème ${i + 1} : ${words(it?.problem ?? '')} mots (8–40)`);
    must(typeof it?.solution === 'string' && words(it.solution) >= 10 && words(it.solution) <= 50, `solution ${i + 1} : ${words(it?.solution ?? '')} mots (10–50)`);
    must(!/\[\[/.test(it?.problem ?? ''), `problème ${i + 1} : pas de lien dans le problème`);
    must(/\?$/.test((it?.problem ?? '').trim()), `problème ${i + 1} : formulé en question, se termine par « ? »`);
    must(/^Nous /.test(it?.solution ?? ''), `solution ${i + 1} : doit commencer par « Nous »`);
    for (const m of (it?.solution ?? '').matchAll(/\[\[([^\]]+)\]\]/g)) if (!m[1].startsWith('home:')) links.add(m[1]);
    if (places.some((pl) => fold(it?.problem ?? '').includes(pl))) anchored++;
  });
  for (const m of (c.opening || []).join(' ').matchAll(/\[\[([^\]]+)\]\]/g)) if (!m[1].startsWith('home:')) links.add(m[1]);
  must(links.size >= 4, `problems + ouverture : au moins 4 pages services distinctes liées (${links.size})`);
  must(anchored >= 3, `problems : au moins 3 problèmes doivent citer un quartier ou un repère de la commune (${anchored})`);
  const blocks = { opening: c.opening, rules: c.rules.paragraphs, finalCta: c.finalCta.paragraphs, problems: items.flatMap((it) => [it?.problem ?? '', it?.solution ?? '']), ...(c.areaIntro ? { areaIntro: [c.areaIntro] } : {}) };
  const budget = { opening: [40, 160], rules: [50, 140], finalCta: [15, 60], problems: [100, 500], areaIntro: [10, 60] };
  let total = 0;
  for (const [k, paras] of Object.entries(blocks)) {
    const n = words((paras || []).join(' ')); total += n;
    const [lo, hi] = budget[k];
    must(n >= lo && n <= hi, `${k} : ${n} mots (attendu ${lo}–${hi})`);
    for (const p of paras || []) must(words(p) <= 110, `${k} : paragraphe de ${words(p)} mots (max 110)`);
  }
  total += words(c.heroSubheadline) + words(c.homeLink) + words(c.summary);
  must(total >= 250 && total <= 800, `total ${total} mots hors FAQ (attendu 250–800)`);
  if (c.areaHeading !== undefined) must(typeof c.areaHeading === 'string' && c.areaHeading.length >= 12 && c.areaHeading.length <= 90, 'areaHeading : 12–90 caractères');
  if (c.areaIntro !== undefined) must(typeof c.areaIntro === 'string' && words(c.areaIntro) >= 10 && words(c.areaIntro) <= 60, 'areaIntro : 10–60 mots');
  must(typeof c.rules.h2 === 'string' && c.rules.h2.length >= 12 && c.rules.h2.length <= 80, 'rules.h2 : longueur 12–80');
  must(Array.isArray(c.quartiers) && c.quartiers.length >= 5 && c.quartiers.length <= 12, 'quartiers : 5 à 12 noms');
  must(Array.isArray(c.landmarks) && c.landmarks.length >= 4 && c.landmarks.length <= 10, 'landmarks : 4 à 10 repères');
  must(/permis/i.test(c.rules.paragraphs.join(' ')), 'rules : parler du permis');
  must(words(c.summary) >= 8 && words(c.summary) <= 30, 'summary : 1 phrase de 8–30 mots');
  const faqTexts = (c.faq || []).flatMap((q) => [q?.question ?? '', q?.answer ?? '']);
  errors.push(...longSentenceErrors(slug, { heroSubheadline: [c.heroSubheadline], ...blocks, homeLink: [c.homeLink], summary: [c.summary], faq: faqTexts }));
  errors.push(...(await faqErrors(slug, c, `${term} ${zone.name}`)));
  errors.push(...sourcesErrors(slug, c));
  const all = [c.heroSubheadline, ...Object.values(blocks).flat(), c.homeLink, c.summary, c.metaDescription, c.h1, c.problems.h2, ...faqTexts].join('\n');
  const low = all.toLowerCase();
  for (const b of BANNED) must(!low.includes(b), `formule interdite : « ${b} »`);
  for (const b of ['nous venons de bruxelles', 'chaussée de la hulpe', 'notre siège est', 'minutes de camionnette']) must(!low.includes(b), `formule à éviter sur une page commune : « ${b} »`);
  must(!/€|euro/i.test(all), 'aucun prix ni mention d’euros');
  for (const m of all.matchAll(/\d+(?:[.,]\d+)?/g)) must(ZONE_NUMBERS.has(m[0]), `chiffre non autorisé : « ${m[0]} » (…${all.slice(Math.max(0, m.index - 30), m.index + 20).replace(/\n/g, ' ')}…)`);
  must(!/%/.test(all.replace(/6 %/g, '')), 'pourcentage non autorisé');
  must(!/prime(s)? renolution/i.test(all) || /suspendu/i.test(all), 'primes Renolution : jamais présentées comme disponibles');
  must(!/peeters-borsus/i.test(all) || /soumis à architecte/.test(all), 'Peeters-Borsus : formule imposée « pour les travaux de logement soumis à architecte »');
  const markers = [...all.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  for (const m of markers) {
    if (m.startsWith('home:')) must(ANCHORS.includes(m.slice(5)), `ancre accueil non autorisée : ${m.slice(5)}`);
    else must(pagesByName.has(m), `lien [[${m}]] : nom de page inconnu`);
  }
  must(/\[\[home:/.test(c.homeLink), 'homeLink doit contenir [[home:…]]');
  must((all.match(/\[\[home:/g) || []).length === 1, 'un seul lien vers l’accueil');
  for (const [k, v] of [['metaTitle', c.metaTitle], ['metaDescription', c.metaDescription], ['h1', c.h1], ['summary', c.summary]]) must(!/\[\[/.test(v), `${k} : pas de lien [[…]]`);
  return errors;
}

export async function checkPage(slug) {
  const errors = [];
  const file = fileURLToPath(new URL(`../src/data/pages/${slug}.json`, import.meta.url));
  let c;
  try { c = JSON.parse(await readFile(file, 'utf8')); } catch (e) { return [`${slug}: JSON illisible (${e.message})`]; }
  const zone = activeZones.find((z) => z.slug === slug);
  if (zone) return checkZonePage(slug, c, zone);
  const group = serviceGroups.find((g) => g.slug === slug);
  const page = allServicePages().find((p) => p.slug === slug);
  if (!page) return [`${slug}: page inconnue`];
  const name = page.name;
  const must = (cond, msg) => { if (!cond) errors.push(`${slug}: ${msg}`); };
  if (page.kind === 'child' || page.kind === 'general') return c.problems && !c.when ? checkServiceV2(slug, c, page) : checkChildPage(slug, c, page);
  if (c.tech && !c.services) return checkHubV2(slug, c, page, group);

  for (const k of ['metaTitle', 'metaDescription', 'h1', 'heroSubheadline', 'opening', 'problems', 'services', 'local', 'why', 'finalCta', 'homeLink', 'gridIntro', 'childDescriptions', 'faq']) must(c[k] !== undefined, `champ manquant : ${k}`);
  if (errors.length) return errors;

  must(c.name === name, `name doit valoir « ${name} » (services.ts)`);
  must(c.metaTitle.length <= 60, `metaTitle ${c.metaTitle.length} caractères (max 60)`);
  must(c.metaTitle.startsWith(`${name} Bruxelles`), `metaTitle doit commencer par « ${name} Bruxelles »`);
  must(c.metaDescription.length >= 140 && c.metaDescription.length <= 155, `metaDescription ${c.metaDescription.length} caractères (140–155)`);
  must(c.h1.length >= 50 && c.h1.length <= 85, `h1 ${c.h1.length} caractères (50–85)`);
  must(c.h1.startsWith(`${name} à Bruxelles`), `h1 doit commencer par « ${name} à Bruxelles »`);
  must(!/—/.test(c.h1), 'h1 : utiliser « : » plutôt que le tiret long');
  must((c.h1.match(/ : /g) || []).length <= 1, 'h1 : un seul « : »');
  must(c.heroSubheadline.includes('+32 460 22 99 60'), 'heroSubheadline doit contenir le numéro');
  must(/24h\/24/.test(c.heroSubheadline), 'heroSubheadline doit mentionner 24h/24');
  must(words(c.heroSubheadline) <= 40, `heroSubheadline : ${words(c.heroSubheadline)} jetons (max 40, soit ~30 mots + le numéro)`);
  for (const [k, v] of [['metaTitle', c.metaTitle], ['metaDescription', c.metaDescription], ['h1', c.h1], ['gridIntro', c.gridIntro], ['gridHeading', c.gridHeading ?? ''], ...Object.entries(c.childDescriptions || {}).map(([s, d]) => [`childDescriptions.${s}`, d])]) must(!/\[\[/.test(v), `${k} : pas de lien [[…]] hors paragraphes`);

  const isCore = group?.kind === 'core';
  if (isCore) must(c.expect && typeof c.expect.h2 === 'string' && Array.isArray(c.expect.paragraphs), 'service phare : section « expect » (À quoi vous attendre) obligatoire');
  const blocks = { opening: c.opening, problems: c.problems.paragraphs, services: c.services.paragraphs, local: c.local.paragraphs, ...(c.expect ? { expect: c.expect.paragraphs } : {}), why: c.why.paragraphs, finalCta: c.finalCta.paragraphs };
  const budget = { opening: [50, 110], problems: [150, 220], services: [200, 320], local: [150, 220], expect: [100, 170], why: [100, 170], finalCta: [35, 90] };
  let total = 0;
  for (const [k, paras] of Object.entries(blocks)) {
    must(Array.isArray(paras) && paras.length >= 1, `${k} : tableau de paragraphes attendu`);
    const n = words((paras || []).join(' ')); total += n;
    const [lo, hi] = budget[k];
    must(n >= lo && n <= hi, `${k} : ${n} mots (attendu ${lo}–${hi})`);
    for (const p of paras || []) must(words(p) <= 110, `${k} : paragraphe de ${words(p)} mots (max 110, aérer)`);
  }
  total += words(c.heroSubheadline) + words(c.homeLink) + words(c.gridIntro) + words(Object.values(c.childDescriptions).join(' '));
  must(total >= 1000 && total <= 1300, `total ${total} mots (attendu 1000–1300)`);
  for (const [k, h2] of [['problems', c.problems.h2], ['services', c.services.h2], ['local', c.local.h2], ['why', c.why.h2]]) must(typeof h2 === 'string' && h2.length >= 15 && h2.length <= 90, `${k}.h2 : longueur 15–90`);
  must(/Bruxelles|bruxellois/i.test(c.local.h2), 'local.h2 doit mentionner Bruxelles');
  const faqTexts = (c.faq || []).flatMap((q) => [q?.question ?? '', q?.answer ?? '']);
  errors.push(...longSentenceErrors(slug, { heroSubheadline: [c.heroSubheadline], ...blocks, homeLink: [c.homeLink], gridIntro: [c.gridIntro], childDescriptions: Object.values(c.childDescriptions), faq: faqTexts }));
  errors.push(...(await faqErrors(slug, c, name)));
  errors.push(...sourcesErrors(slug, c));

  const all = [c.heroSubheadline, ...Object.values(blocks).flat(), c.homeLink, c.gridIntro, ...Object.values(c.childDescriptions), c.metaDescription, c.h1, ...faqTexts].join('\n');
  for (const req of REQUIRED_LINKS[slug] || []) must(all.includes(`[[${req}]]`), `lien transversal imposé manquant : [[${req}]]`);
  const low = all.toLowerCase();
  for (const b of BANNED) must(!low.includes(b), `formule interdite : « ${b} »`);
  for (const m of all.matchAll(/\d+(?:[.,]\d+)?/g)) must(ALLOWED_NUMBERS.has(m[0]) || /\[X\]/.test(all.slice(Math.max(0, m.index - 2), m.index + 4)), `chiffre non autorisé : « ${m[0]} » (contexte : …${all.slice(Math.max(0, m.index - 30), m.index + 20).replace(/\n/g, ' ')}…)`);
  must(!/%/.test(all.replace(/6 %/g, '')), 'pourcentage non autorisé');
  must(!/prime(s)? renolution/i.test(all) || /suspendu/i.test(all), 'primes Renolution : ne jamais les présenter comme disponibles (suspendues depuis 2025)');

  // Liens : [[Nom exact]] et [[home:ancre]]
  const markers = [...all.matchAll(/\[\[([^\]]+)\]\]/g)].map((m) => m[1]);
  const children = group ? group.children : [];
  for (const child of children) must(markers.includes(child.name), `service enfant non lié par [[${child.name}]]`);
  for (const m of markers) {
    if (m.startsWith('home:')) must(ANCHORS.includes(m.slice(5)), `ancre accueil non autorisée : ${m.slice(5)}`);
    else must(pagesByName.has(m), `lien [[${m}]] : nom de page inconnu (doit être un nom exact de service)`);
  }
  must(!markers.includes(name), `auto-lien [[${name}]] interdit`);
  must(/\[\[home:/.test(c.homeLink), 'homeLink doit contenir [[home:…]]');
  must((all.match(/\[\[home:/g) || []).length === 1, 'un seul lien vers l’accueil dans le contenu');
  for (const child of children) must(typeof c.childDescriptions[child.slug] === 'string' && words(c.childDescriptions[child.slug]) >= 8 && words(c.childDescriptions[child.slug]) <= 30, `childDescriptions.${child.slug} : 1 phrase de 8–30 mots`);
  // Anti-cannibalisation : title/H1 ne ciblent pas les termes à éviter, ni les termes distinctifs des autres pages
  const h2s = [c.problems.h2, c.services.h2, c.local.h2, c.expect?.h2 ?? '', c.why.h2].join(' ');
  for (const term of keywords[slug]?.avoid || []) must(!fold(c.metaTitle + ' ' + c.h1).includes(fold(term)), `title/H1 ne doivent pas cibler « ${term} » (page sœur)`);
  for (const term of keywords[slug]?.avoidWide || []) must(!fold(c.metaDescription + ' ' + c.heroSubheadline + ' ' + h2s).includes(fold(term)), `meta description, sous-titre et H2 ne doivent pas cibler « ${term} » (angle d'une autre page)`);
  errors.push(...crossPageErrors(slug, page, c.metaTitle + ' ' + c.h1));
  must(!/peeters-borsus/i.test(all) || /soumis à architecte/.test(all), 'Peeters-Borsus : formule imposée « pour les travaux de logement soumis à architecte »');
  // Chaque service enfant cité dans la section services
  for (const child of children) must(c.services.paragraphs.join(' ').includes(`[[${child.name}]]`), `[[${child.name}]] doit apparaître dans la section « services »`);
  return errors;
}

const slugs = process.argv.slice(2);
if (slugs.length) {
  let all = [];
  for (const s of slugs) all = all.concat(await checkPage(s));
  if (all.length) { console.error(all.join('\n')); process.exit(1); }
  console.log(`OK : ${slugs.join(', ')}`);
}
