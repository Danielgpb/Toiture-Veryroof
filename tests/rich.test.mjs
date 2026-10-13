import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderRich } from '../src/lib/rich.ts';

const ctx = { pages: { 'Réparation de fuite de toiture': '/reparation-fuite-toiture-bruxelles' }, homeHref: '/couvreur-bruxelles', phoneDisplay: '+32 460 22 99 60', phoneHref: 'tel:+32460229960' };

test('renderRich transforme [[Nom]] en lien vers la page et [[home:ancre]] en lien vers l’accueil', () => {
  assert.equal(renderRich('Voir [[Réparation de fuite de toiture]] par [[home:couvreur à Bruxelles]].', ctx),
    'Voir <a href="/reparation-fuite-toiture-bruxelles">Réparation de fuite de toiture</a> par <a href="/couvreur-bruxelles">couvreur à Bruxelles</a>.');
});

test('renderRich rend le numéro cliquable et échappe le HTML', () => {
  assert.equal(renderRich('Appelez le +32 460 22 99 60 <vite>', ctx), 'Appelez le <a href="tel:+32460229960">+32 460 22 99 60</a> &lt;vite&gt;');
});

test('renderRich refuse un nom de page inconnu (erreur de build, pas de lien perdu)', () => {
  assert.throws(() => renderRich('[[Page inconnue]]', ctx), /inconnu/);
});

test('renderRich applique la typographie française (espaces insécables avant : ? ! et dans 48 h, 6 %)', () => {
  assert.equal(renderRich('Devis sous 48 h : TVA à 6 % ?', ctx), 'Devis sous 48\u00a0h\u00a0: TVA à 6\u00a0%\u00a0?');
});
