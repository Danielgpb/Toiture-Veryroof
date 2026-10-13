// Le validateur de contenu fait partie de la suite : chaque page rédigée (src/data/pages/*.json) doit passer sans écart.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import { checkPage } from '../scripts/check-page-content.mjs';

const files = (await readdir(new URL('../src/data/pages/', import.meta.url))).filter((f) => f.endsWith('.json'));

test('au moins une page rédigée existe', () => { assert.ok(files.length >= 1); });

for (const file of files) {
  const slug = file.replace(/\.json$/, '');
  test(`contenu validé : ${slug}`, async () => {
    const errors = await checkPage(slug);
    assert.deepEqual(errors, []);
  });
}
