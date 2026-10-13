import { test } from 'node:test';
import assert from 'node:assert/strict';
import { access } from 'node:fs/promises';
import { photos, homePhotos, pagePhotos, pageGalleries } from '../src/data/photos.ts';
import { allServicePages } from '../src/data/services.ts';
import { activeZones } from '../src/data/zones.ts';

const exists = async (url) => { try { await access(url); return true; } catch { return false; } };

test('chaque photo du registre existe dans src/assets/photos et a un texte alternatif descriptif', async () => {
  const ids = Object.keys(photos);
  assert.ok(ids.length >= 15, 'au moins 15 photos de chantier');
  for (const id of ids) {
    const p = photos[id];
    assert.ok(await exists(new URL(`../src/assets/photos/${p.file}`, import.meta.url)), `fichier manquant : ${p.file}`);
    assert.match(p.file, /^[a-z0-9-]+\.jpg$/, `nom de fichier non descriptif : ${p.file}`);
    assert.ok(p.alt.length >= 25 && !/IMG-|\.jpg/i.test(p.alt), `texte alternatif faible : ${id}`);
    assert.ok(['portrait', 'landscape'].includes(p.orientation));
  }
});

test('les attributions de photos pointent vers des photos et des pages connues, et chaque page service a une photo', () => {
  const ids = new Set(Object.keys(photos));
  const homeIds = [homePhotos.hero, homePhotos.heroMobile, homePhotos.about, ...Object.values(homePhotos.categories), ...Object.values(homePhotos.core)];
  for (const id of homeIds) assert.ok(ids.has(id), `photo inconnue : ${id}`);
  assert.equal(photos[homePhotos.hero].orientation, 'landscape', 'le hero bureau doit être une photo paysage');
  const slugs = new Set([...allServicePages().map((p) => p.slug), ...activeZones.map((z) => z.slug)]);
  for (const [slug, id] of Object.entries(pagePhotos)) {
    assert.ok(slugs.has(slug), `page inconnue : ${slug}`);
    assert.ok(ids.has(id), `photo inconnue : ${id}`);
  }
  for (const p of allServicePages()) assert.ok(pagePhotos[p.slug], `page sans photo attribuée : ${p.slug}`);
  for (const z of activeZones) assert.ok(pagePhotos[z.slug], `commune sans photo attribuée : ${z.slug}`);
});

test('galeries « Sur le chantier » : pages connues, 1 à 3 photos existantes, jamais la photo du hero, légende courte', () => {
  for (const [slug, ids] of Object.entries(pageGalleries)) {
    assert.ok(pagePhotos[slug], `galerie sur une page sans hero : ${slug}`);
    assert.ok(ids.length >= 1 && ids.length <= 3, `${slug} : 1 à 3 photos`);
    assert.equal(new Set(ids).size, ids.length, `${slug} : doublon`);
    for (const id of ids) {
      assert.ok(photos[id], `${slug} : photo inconnue ${id}`);
      assert.notEqual(id, pagePhotos[slug], `${slug} : ${id} est déjà la photo du hero`);
      assert.ok(!photos[id].caption || (photos[id].caption.length >= 15 && photos[id].caption.length <= 80), `${slug} : légende de ${id}`);
    }
  }
});
