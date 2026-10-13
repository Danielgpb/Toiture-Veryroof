import { test } from 'node:test';
import assert from 'node:assert/strict';
import { linkPhone, linkText } from '../src/lib/phone.ts';

test('linkPhone enveloppe chaque occurrence du numéro dans un lien tel:', () => {
  const out = linkPhone('Appelez le +32 460 22 99 60 ou le +32 460 22 99 60.', '+32 460 22 99 60', 'tel:+32460229960');
  assert.equal(out, 'Appelez le <a href="tel:+32460229960">+32 460 22 99 60</a> ou le <a href="tel:+32460229960">+32 460 22 99 60</a>.');
});

test('linkPhone échappe le HTML du texte source', () => {
  assert.equal(linkPhone('a < b & c', '+32 460 22 99 60', 'tel:+32460229960'), 'a &lt; b &amp; c');
});

test('linkText enveloppe une expression dans un lien', () => {
  assert.equal(
    linkText("Consultez toutes nos zones d'intervention.", "toutes nos zones d'intervention", '/zones-d-intervention'),
    'Consultez <a href="/zones-d-intervention">toutes nos zones d\'intervention</a>.',
  );
});

test('linkText refuse une expression absente du texte (erreur de build plutôt qu’un lien perdu)', () => {
  assert.throws(() => linkText('Bonjour', 'absent', '/x'), /introuvable/);
});

test('linkPhone reste silencieux quand le numéro est absent', () => {
  assert.equal(linkPhone('Pas de numéro ici', '+32 460 22 99 60', 'tel:+32460229960'), 'Pas de numéro ici');
});
