// Anti-duplication entre pages rédigées : aucune suite de N mots identique entre deux pages (hors formule d'assurance imposée).
// Filtre pour un rédacteur : PAGES=slug1,slug2 node --test tests/pages-duplication.test.mjs  (n'affiche que les paires qui le concernent).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

export const N = 8;
const dir = fileURLToPath(new URL('../src/data/pages/', import.meta.url));
const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/\+32 460 22 99 60/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim();
/** Seules formules communes tolérées : assurance imposée par le Core 30 et fait TVA. */
const ALLOWED = ['en responsabilite civile professionnelle et en responsabilite decennale l assurance prevue par la loi peeters borsus pour les travaux de logement soumis a architecte', 'la tva a 6 pour un logement de plus de dix ans', 'la tva est de 6 pour un logement de plus de dix ans', 'la tva reduite a 6 pour un logement de plus de dix ans'];
const SKIP_KEYS = new Set(['slug', 'name', 'metaTitle', 'metaDescription', 'h1', 'h2', 'question', 'targetKeywords', 'eyebrow', 'label', 'href', 'url', 'updated', 'icon', 'image', 'alt']);
const strings = (o, key = '') => typeof o === 'string' ? (SKIP_KEYS.has(key) ? [] : [o]) : Array.isArray(o) ? o.flatMap((v) => strings(v, key)) : o && typeof o === 'object' ? Object.entries(o).flatMap(([k, v]) => strings(v, k)) : [];
const plain = (t) => t.replace(/\[\[home:([^\]]+)\]\]/g, '$1').replace(/\[\[([^\]]+)\]\]/g, '$1');
/** Une formule tolérée compte pour un seul mot : seuls 7 autres mots identiques autour d'elle constituent un doublon. */
const collapse = (text) => ALLOWED.reduce((acc, a, i) => acc.split(a).join(` formule${i} `), ` ${text} `).replace(/\s+/g, ' ').trim();
const grams = (text) => { const w = collapse(norm(plain(text))).split(' ').filter(Boolean); const out = []; for (let i = 0; i + N <= w.length; i++) out.push(w.slice(i, i + N).join(' ')); return out; };
const allowed = (g) => ALLOWED.some((a) => a.includes(g));

export async function sharedSequences() {
  const pages = new Map();
  for (const f of (await readdir(dir)).filter((f) => f.endsWith('.json'))) pages.set(f.replace(/\.json$/, ''), JSON.parse(await readFile(join(dir, f), 'utf8')));
  pages.set('accueil', JSON.parse(await readFile(fileURLToPath(new URL('../src/data/accueil.json', import.meta.url)), 'utf8')));
  const index = new Map(); // gram → Set(slug)
  for (const [slug, data] of pages) for (const s of strings(data)) for (const g of new Set(grams(s))) { if (allowed(g)) continue; if (!index.has(g)) index.set(g, new Set()); index.get(g).add(slug); }
  const pairs = new Map(); // "a|b" → [grams]
  for (const [g, slugs] of index) {
    if (slugs.size < 2) continue;
    const list = [...slugs].sort();
    for (let i = 0; i < list.length; i++) for (let j = i + 1; j < list.length; j++) { const k = `${list[i]}|${list[j]}`; if (!pairs.has(k)) pairs.set(k, []); pairs.get(k).push(g); }
  }
  return pairs;
}

test(`aucune suite de ${N} mots partagée entre deux pages rédigées (hors formule d'assurance imposée)`, async () => {
  const pairs = await sharedSequences();
  const only = process.env.PAGES ? process.env.PAGES.split(',') : null;
  const lines = [];
  for (const [k, gs] of [...pairs].sort((a, b) => b[1].length - a[1].length)) {
    const [a, b] = k.split('|');
    if (only && !only.includes(a) && !only.includes(b)) continue;
    lines.push(`${a} ↔ ${b} : ${gs.length} suite(s), p. ex. « ${gs[0]} »`);
  }
  assert.equal(lines.length, 0, `${lines.length} paire(s) de pages partagent des suites de ${N} mots :\n${lines.slice(0, 80).join('\n')}${lines.length > 80 ? `\n… (${lines.length - 80} de plus)` : ''}`);
});
