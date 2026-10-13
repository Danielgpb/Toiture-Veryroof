// FAQ des pages services (Core 30 ALI-KA §8, docs/core30/regles-veryroof.md) : section visible + schema FAQPage identiques, et /llms.txt présent.
import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { site } from '../../src/data/site.ts';
import { allServicePages } from '../../src/data/services.ts';

const dist = fileURLToPath(new URL('../../dist/', import.meta.url));
const decode = (s) => s.replace(/&#39;|&apos;/g, "'").replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/ /g, ' ');
const pages = new Map();
before(async () => { for (const p of allServicePages()) pages.set(p.slug, await readFile(join(dist, `${p.slug}.html`), 'utf8')); });

const faqNodes = (html) => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].flatMap((m) => { const j = JSON.parse(m[1]); return (j['@graph'] ?? [j]).filter((n) => n['@type'] === 'FAQPage'); });

test('chaque page service : une section #faq de 4 à 5 questions, avec un lien interne, et un schema FAQPage reprenant exactement ces questions', () => {
  for (const [slug, html] of pages) {
    const section = html.match(/<section id="faq"[\s\S]*?<\/section>/)?.[0];
    assert.ok(section, `${slug} : section #faq absente`);
    const questions = [...section.matchAll(/<summary[^>]*>([\s\S]*?)<\/summary>/g)].map((m) => decode(m[1].replace(/<[^>]+>/g, '')).trim());
    assert.ok(questions.length >= 4 && questions.length <= 5, `${slug} : ${questions.length} questions visibles (4–5)`);
    assert.ok(/<a href="\/[a-z0-9-]+"/.test(section), `${slug} : aucun lien interne dans les réponses`);
    const nodes = faqNodes(html);
    assert.equal(nodes.length, 1, `${slug} : un seul nœud FAQPage attendu`);
    const schemaQuestions = nodes[0].mainEntity.map((q) => decode(q.name).trim());
    assert.deepEqual(schemaQuestions, questions, `${slug} : questions du schema ≠ questions visibles`);
    for (const q of nodes[0].mainEntity) assert.ok(q.acceptedAnswer?.text && !/\[\[|<a /.test(q.acceptedAnswer.text), `${slug} : réponse du schema vide ou contenant un lien brut`);
  }
});

test('chaque page service : section Sources avec au moins un lien externe https rel=noopener, et date de mise à jour', () => {
  for (const [slug, html] of pages) {
    const sec = html.match(/<section id="sources"[\s\S]*?<\/section>/)?.[0];
    assert.ok(sec, `${slug} : section sources absente`);
    const ext = [...sec.matchAll(/<a href="(https:\/\/[^"]+)"[^>]*rel="noopener"/g)].map((m) => m[1]);
    assert.ok(ext.length >= 1, `${slug} : aucun lien externe`);
    assert.ok(ext.every((u) => !u.includes('toiture-veryroof.be')), `${slug} : source interne`);
    assert.match(sec, /<time datetime="20\d{2}-\d{2}-\d{2}"/, `${slug} : date de mise à jour`);
  }
});

test('llms.txt : présent, en texte brut, avec le domaine, le numéro et chaque page service', async () => {
  const txt = await readFile(join(dist, 'llms.txt'), 'utf8');
  assert.ok(txt.startsWith(`# ${site.name}`));
  assert.ok(txt.includes(site.phoneDisplay));
  for (const p of allServicePages()) assert.ok(txt.includes(`${site.domain}/${p.slug})`), `llms.txt : ${p.slug} manquant`);
  assert.ok(!/<[a-z]+>/.test(txt), 'llms.txt ne doit pas contenir de HTML');
});
