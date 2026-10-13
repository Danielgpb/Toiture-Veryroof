/* Relais serveur vers l'app Suivi Leads (edge function Supabase « formulaire-site »).
   Même montage que les sites Avocat et Peintre : le secret et les identifiants restent dans les
   variables d'environnement Netlify (LEADAPP_URL, LEADAPP_SITE, LEADAPP_TYPE, LEADAPP_SECRET),
   jamais dans le HTML public. Le formulaire du site poste ici en JSON :
   { nom, telephone, email, message, page, source, champs: { Service }, _piege }.
   Réponse relayée telle quelle ({ cree } / { rappel } / { ok }) ; un corps vide devient {"ok":true}
   pour que la page n'affiche jamais une erreur alors que la demande est bien arrivée. */
export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }
  const { LEADAPP_URL, LEADAPP_SITE, LEADAPP_TYPE, LEADAPP_SECRET } = process.env;
  if (!LEADAPP_URL || !LEADAPP_SITE || !LEADAPP_TYPE || !LEADAPP_SECRET) {
    return new Response('{"erreur":"lead app non configuree"}', { status: 503, headers: { 'Content-Type': 'application/json' } });
  }
  const target = LEADAPP_URL +
    '?site=' + encodeURIComponent(LEADAPP_SITE) +
    '&type=' + encodeURIComponent(LEADAPP_TYPE) +
    '&secret=' + encodeURIComponent(LEADAPP_SECRET);
  try {
    const res = await fetch(target, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: await req.text(),
    });
    const corps = await res.text();
    return new Response(corps || (res.ok ? '{"ok":true}' : '{"erreur":"relais"}'), {
      status: res.ok ? 200 : 502,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch {
    return new Response('{"erreur":"relais"}', { status: 502, headers: { 'Content-Type': 'application/json' } });
  }
};
