import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const css = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const token = (name) => css.match(new RegExp(`${name}:\\s*(#[0-9a-fA-F]{6})`))[1];
const luminance = (hex) => {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => { const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x); return (hi + 0.05) / (lo + 0.05); };
const rule = (selector) => css.match(new RegExp(`${selector.replace(/[.]/g, '\\.')}\\s*\\{[^}]*\\}`))?.[0] ?? '';

test('la teinte accent foncée (texte, boutons) atteint AA 4,5:1 sur blanc et sur fond gris', () => {
  const dark = token('--color-accent-dark');
  assert.ok(ratio(dark, token('--color-bg')) >= 4.5, `accent-dark/blanc = ${ratio(dark, token('--color-bg')).toFixed(2)}`);
  assert.ok(ratio(dark, token('--color-bg-alt')) >= 4.5, `accent-dark/gris = ${ratio(dark, token('--color-bg-alt')).toFixed(2)}`);
});

test('boutons accent, eyebrows, liens fléchés et badges utilisent la teinte accent foncée', () => {
  for (const selector of ['.btn--accent', '.eyebrow', '.link-arrow', '.icon-badge']) {
    assert.ok(rule(selector).includes('var(--color-accent-dark)'), `${selector} doit utiliser --color-accent-dark`);
  }
});

test('les bordures de champs de formulaire atteignent 3:1 sur blanc (WCAG 1.4.11) et l’accent foncé reste lisible sur le fond primaire doux', async () => {
  const form = await readFile(new URL('../src/components/QuoteForm.astro', import.meta.url), 'utf8');
  const border = form.match(/border: 1px solid (#[0-9a-fA-F]{6})/)[1];
  assert.ok(ratio(border, token('--color-bg')) >= 3, `bordure ${border} : ${ratio(border, token('--color-bg')).toFixed(2)}:1`);
  assert.ok(ratio(token('--color-accent-darker'), token('--color-primary-soft')) >= 4.5, 'accent-darker sur primary-soft');
});
