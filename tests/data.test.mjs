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

test('les pages communes sont des zones desservies, au moins 4 au lancement', () => {
  assert.ok(activeZones.length >= 4, 'au moins 4 communes au lancement');
  const names = Object.values(serviceAreas).flat();
  for (const z of activeZones) {
    assert.ok(names.some((n) => n.startsWith(z.name)), `${z.name} absente des zones desservies`);
    assert.ok(z.slug.startsWith('couvreur-') || z.slug.startsWith('toiture-'), `${z.slug} doit suivre le motif couvreur-[commune] ou toiture-[commune]`);
  }
  assert.equal(zoneH1(activeZones[0]), 'Couvreur Uccle');
});

test('les titres H1 suivent « [Service] Bruxelles »', () => {
  assert.equal(serviceH1('Toiture plate'), 'Toiture plate Bruxelles');
});

test('les données NAP sont présentes', () => {
  assert.equal(site.name, 'Toiture Veryroof');
  assert.equal(site.address.street, 'Chaussée de La Hulpe 264');
  assert.equal(site.address.postalCode, '1000');
  assert.equal(site.phoneHref, 'tel:+32460229960');
  assert.equal(site.phoneDisplay, '+32 460 22 99 60');
  assert.equal(site.nav.length, 4);
  assert.equal(staticPages.length, 6);
});
