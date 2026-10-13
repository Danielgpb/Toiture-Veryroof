// Génère les documents de relecture docs/content/04-, 05- et 06- à partir de la source de vérité src/data/pages/*.json.
// Usage : node scripts/export-content-docs.mjs
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { allServicePages, serviceGroups, generalServices } from '../src/data/services.ts';

const root = fileURLToPath(new URL('../', import.meta.url));
const load = async (slug) => JSON.parse(await readFile(`${root}src/data/pages/${slug}.json`, 'utf8'));
const paras = (arr) => arr.map((p) => p.trim()).join('\n\n');
const section = (s) => `\n\n### ${s.h2}\n\n${paras(s.paragraphs)}`;
const head = (c) => `## /${c.slug} — ${c.name}\n\n**Title** (${c.metaTitle.length} car.) : ${c.metaTitle}  \n**Meta description** (${c.metaDescription.length} car.) : ${c.metaDescription}  \n**H1** : ${c.h1}  \n**Sous-titre du hero** : ${c.heroSubheadline}\n\n${paras(c.opening)}`;

function renderHub(c, group) {
  let out = head(c);
  for (const k of ['problems', 'services', 'local', 'expect', 'why']) if (c[k]) out += section(c[k]);
  out += `\n\n### ${c.gridHeading ?? `Nos services de ${group.name.toLowerCase()}`}\n\n${c.gridIntro}\n\n` + group.children.map((ch) => `- **${ch.name}** — ${c.childDescriptions[ch.slug]}`).join('\n');
  out += `\n\n### Parlons de votre toiture (CTA final)\n\n${paras(c.finalCta.paragraphs)}\n\n*Lien accueil* : ${c.homeLink}`;
  return out;
}
function renderChild(c) {
  let out = head(c);
  for (const k of ['when', 'process', 'cost', 'why']) out += section(c[k]);
  out += `\n\n### Parlons de votre toiture (CTA final)\n\n${paras(c.finalCta.paragraphs)}\n\n*Lien parent* : ${c.parentLink}  \n*Résumé (carte Services)* : ${c.summary}`;
  return out;
}
const intro = (title, note) => `# ${title}\n\n12 octobre 2026 · Source de vérité : \`src/data/pages/<slug>.json\` (document généré par \`scripts/export-content-docs.mjs\` ; \`[[Nom]]\` = lien vers la page du même nom, \`[[home:…]]\` = lien vers l'accueil). ${note}\n\n`;

const docs = [
  { file: '04-pages-categories.md', title: 'Pages catégories — Toiture Veryroof (Prompt 4)', note: 'Version après relecture indépendante et étude de mots-clés (12/10/2026).', pages: serviceGroups.filter((g) => g.kind === 'category').map((g) => ({ slug: g.slug, group: g })) },
  { file: '05-pages-services-phares.md', title: 'Pages services phares — Toiture Veryroof (Prompt 5)', note: 'Version après relecture indépendante et étude de mots-clés (12/10/2026).', pages: serviceGroups.filter((g) => g.kind === 'core').map((g) => ({ slug: g.slug, group: g })) },
  { file: '06-pages-services-enfants.md', title: 'Pages services enfants et généraux — Toiture Veryroof (Prompt 6)', note: 'Les 26 pages (21 enfants + 5 services généraux), version après relecture indépendante (dé-clonage des sections « pourquoi / coût / CTA », phrases ≤ 35 mots, maillage entre pages sœurs) et étude de mots-clés.', pages: [...serviceGroups.flatMap((g) => g.children.map((ch) => ({ slug: ch.slug, group: null }))), ...generalServices.map((s) => ({ slug: s.slug, group: null }))] },
];
for (const d of docs) {
  const parts = [];
  for (const { slug, group } of d.pages) { const c = await load(slug); parts.push(group ? renderHub(c, group) : renderChild(c)); }
  await writeFile(`${root}docs/content/${d.file}`, intro(d.title, d.note) + '\n---\n\n' + parts.join('\n\n\n---\n\n') + '\n', 'utf8');
  console.log(`${d.file} : ${d.pages.length} pages`);
}
