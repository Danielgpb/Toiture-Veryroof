// Relais Netlify /.netlify/functions/lead → app Suivi Leads : comportement sans réseau (fetch simulé).
import { test, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert/strict';
import relais from '../netlify/functions/lead.mjs';

const ENV = { LEADAPP_URL: 'https://projet.supabase.co/functions/v1/formulaire-site', LEADAPP_SITE: 's-toiture', LEADAPP_TYPE: 't-toiture', LEADAPP_SECRET: 'se cret/é' };
const fetchOriginal = globalThis.fetch;
let appels = [];
beforeEach(() => { Object.assign(process.env, ENV); appels = []; });
afterEach(() => { globalThis.fetch = fetchOriginal; for (const k of Object.keys(ENV)) delete process.env[k]; });
const simuler = (status, corps) => { globalThis.fetch = async (url, init) => { appels.push({ url, init }); return new Response(status === 204 ? null : corps, { status }); }; };
const post = (corps) => new Request('https://toiture-veryroof.be/.netlify/functions/lead', { method: 'POST', body: corps, headers: { 'Content-Type': 'application/json' } });

test('refuse tout sauf POST', async () => {
  const r = await relais(new Request('https://toiture-veryroof.be/.netlify/functions/lead', { method: 'GET' }));
  assert.equal(r.status, 405);
});

test('sans variables LEADAPP_* : 503 explicite en JSON, aucun appel sortant', async () => {
  delete process.env.LEADAPP_SECRET; simuler(200, '{"ok":true}');
  const r = await relais(post('{}'));
  assert.equal(r.status, 503); assert.deepEqual(await r.json(), { erreur: 'lead app non configuree' }); assert.equal(appels.length, 0);
});

test('relaie le corps tel quel vers formulaire-site avec site, type et secret encodés, et renvoie la réponse de l’app', async () => {
  simuler(200, '{"cree":"abc"}');
  const corps = JSON.stringify({ nom: 'Test', telephone: '0470000000', champs: { Service: 'Toiture plate' }, _piege: '' });
  const r = await relais(post(corps));
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { cree: 'abc' });
  assert.equal(appels[0].url, `${ENV.LEADAPP_URL}?site=s-toiture&type=t-toiture&secret=${encodeURIComponent(ENV.LEADAPP_SECRET)}`);
  assert.equal(appels[0].init.method, 'POST'); assert.equal(appels[0].init.body, corps);
});

test('réponse vide de l’app (204) → {"ok":true} pour que la page n’affiche pas d’erreur', async () => {
  simuler(204, '');
  const r = await relais(post('{}'));
  assert.equal(r.status, 200); assert.deepEqual(await r.json(), { ok: true });
});

test('app en erreur ou injoignable → 502 JSON (la page bascule sur Netlify Forms)', async () => {
  simuler(401, '{"erreur":"non autorisé"}');
  const r1 = await relais(post('{}')); assert.equal(r1.status, 502); assert.deepEqual(await r1.json(), { erreur: 'non autorisé' });
  globalThis.fetch = async () => { throw new Error('réseau'); };
  const r2 = await relais(post('{}')); assert.equal(r2.status, 502); assert.deepEqual(await r2.json(), { erreur: 'relais' });
});
