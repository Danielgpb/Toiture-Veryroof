import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanPath } from '../src/lib/paths.ts';

test('cleanPath retire le suffixe .html produit par build.format "file"', () => {
  assert.equal(cleanPath('/services.html'), '/services');
  assert.equal(cleanPath('/couvreur-bruxelles'), '/couvreur-bruxelles');
  assert.equal(cleanPath('/'), '/');
});

test('cleanPath retire un slash final superflu', () => {
  assert.equal(cleanPath('/services/'), '/services');
});
