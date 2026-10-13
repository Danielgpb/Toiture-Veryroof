# Liaison du formulaire de devis avec l'app Suivi Leads (13 octobre 2026)

## Montage (identique aux sites Avocat et Peintre)
1. Le visiteur envoie le formulaire « devis » (accueil ou page Contact).
2. Le script de la page fait deux envois en parallèle :
   - **Netlify Forms** (copie de secours, notification e-mail à configurer dans Netlify) ;
   - **`/.netlify/functions/lead`** : fonction serveur Netlify (`netlify/functions/lead.mjs`) qui relaie en JSON vers l'edge function `formulaire-site` de l'app, avec le secret et les identifiants lus dans les variables d'environnement Netlify.
3. La demande est affichée comme envoyée dès qu'un des deux canaux répond ; l'erreur ne s'affiche que si les deux échouent (le visiteur voit alors le numéro de téléphone).
4. Piège anti-robot : le champ invisible `bot-field` est transmis à l'app sous le nom `_piege` ; rempli, l'app répond OK sans rien créer (c'est aussi le mécanisme du contrôle quotidien).

Corps JSON envoyé à l'app : `nom`, `telephone`, `email`, `message`, `page` (URL de la page), `source` = « formulaire toiture-veryroof.be », `champs` = `{ "Service": <service choisi> }`, `_piege`.

## Côté app (à faire par Daniel, ou par moi avec son accord : données de production)
Créer l'activité et son type de lead, soit dans l'app (Réglages → « + Ajouter un site », puis renommer et régler la commission ; l'identifiant est alors généré automatiquement et doit être reporté dans les variables Netlify), soit en SQL pour fixer les identifiants :

```sql
insert into public.sites (id, nom, couleur, partner_ids, fields, ordre) values
  ('s-toiture', 'Toiture Veryroof', '#B84F1E', '{}',
   '[{"libelle": "Service"}, {"libelle": "Commune"}]', 5)
on conflict (id) do nothing;
-- commission à décider : ci-dessous « montant libre convenu par affaire » (comme Rachat voiture)
insert into public.lead_types (id, site_id, libelle, circuit, mode, forfait, items) values
  ('t-toiture', 's-toiture', 'Devis toiture', 'devis', 'libre', null, '[]')
on conflict (id) do nothing;
```
Puis rattacher le partenaire (Toiture Veryroof) au site dans Réglages.

## Côté Netlify (à la création du site, avec accord de Daniel)
```bash
netlify env:set LEADAPP_URL "https://zawhjurtnoosnfuicxfe.supabase.co/functions/v1/formulaire-site"
netlify env:set LEADAPP_SITE "s-toiture"
netlify env:set LEADAPP_TYPE "t-toiture"
netlify env:set LEADAPP_SECRET "<FORMULAIRE_SECRET de l'app, le même que sur les autres sites>"
```
Après tout changement de variables : test neutralisé `curl -s -X POST https://toiture-veryroof.be/.netlify/functions/lead -H 'Content-Type: application/json' -d '{"nom":"Test","telephone":"0400000000","_piege":"x"}'` → attendu `{"ok":true}`.

## Contrôle quotidien (fonction `verifier-formulaires` de l'app, à ajouter au moment de la mise en ligne)
Astro inline le script du formulaire dans la page : le contrôle peut chercher le relais directement dans le HTML, comme pour les autres sites.

```ts
  // ---- Toiture Veryroof : Astro (script externe) + relais Netlify → app ----
  await controle('Toiture — page contact', async () => {
    const r = await requete('https://toiture-veryroof.be/contact')
    const h = await r.text()
    const ok = r.ok && /<form[^>]*name="devis"/.test(h) && h.includes('/.netlify/functions/lead')
    return { ok, detail: ok ? 'formulaire présent' : `HTTP ${r.status}, formulaire « devis » ou relais absent` }
  })
  await controle('Toiture — envoi → app', async () => {
    const r = await requete('https://toiture-veryroof.be/.netlify/functions/lead', { method: 'POST', headers: JSON_H, body: PIEGE })
    const t = await r.text()
    const ok = r.status === 200 && /"ok"\s*:\s*true/.test(t)
    return { ok, detail: `HTTP ${r.status} ${t.slice(0, 80).replace(/\s+/g, ' ')}` }
  })
  await controle('Toiture — formulaire Netlify', async () => {
    const r = await requete('https://toiture-veryroof.be/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ 'form-name': 'devis', 'bot-field': 'x', nom: 'Test automatique', telephone: '0400000000' }),
    })
    const ok = r.status >= 200 && r.status < 400
    return { ok, detail: `HTTP ${r.status}${ok ? '' : ' — formulaire non enregistré chez Netlify (détection coupée ?)'}` }
  })
```

## Tests dans ce projet
- `tests/lead-relay.test.mjs` : relais sans réseau (405 hors POST, 503 sans variables, relais du corps et des paramètres, 204 → `{"ok":true}`, 502 si l'app échoue).
- `tests/built/about-contact.test.mjs` : le script du formulaire construit contient le relais, le piège `_piege`, la source et le champ Service ; `netlify.toml` et `lead.mjs` présents.
- Politique de confidentialité : mention de l'outil de suivi des demandes (Supabase, Union européenne).

## Prompt prêt à coller dans une session Claude ouverte sur le projet de l'app (commission 10 %)
(décision Daniel du 13/10/2026 : 10 % de commission)

```text
Crée l'activité « Toiture Veryroof » dans l'app Suivi Leads, avec une commission de 10 % sur le montant du devis. Tu as mon accord pour l'appliquer en production tout de suite, dans cette même consigne.

Contexte
- Dépôt : /Users/macbook/Desktop/Projets code/App suivi lead (projet Supabase lié : zawhjurtnoosnfuicxfe).
- Le site toiture-veryroof.be enverra ses demandes via l'edge function formulaire-site avec site=s-toiture et type=t-toiture (relais Netlify déjà prêt côté site). Les identifiants s-toiture / t-toiture sont imposés : ne pas en générer d'autres.
- Champs libres envoyés par le site dans « champs » : « Service » (nom du service choisi dans le formulaire). Ajoute aussi un champ « Commune » (texte libre) pour la saisie manuelle.

À faire
1. Écrire la migration supabase/migrations/0087_toiture_veryroof.sql, idempotente (on conflict do nothing / update si besoin) :
   insert into public.sites (id, nom, couleur, partner_ids, fields, ordre)
   values ('s-toiture', 'Toiture Veryroof', '#B84F1E', '{}', '[{"libelle": "Service"}, {"libelle": "Commune"}]', (select coalesce(max(ordre), 0) + 1 from public.sites))
   on conflict (id) do nothing;
   insert into public.lead_types (id, site_id, libelle, circuit, mode, forfait, items)
   values ('t-toiture', 's-toiture', 'Devis toiture', 'devis', 'simple', null, '[{"libelle": "Montant du devis", "pourcentage": 10}]')
   on conflict (id) do nothing;
   Si une colonne ajoutée par une migration plus récente est obligatoire sur sites ou lead_types, complète-la avec la même valeur que pour s-pac.
2. Vérifier avec npx vitest run que rien ne casse, puis appliquer en production : supabase db query --linked -f supabase/migrations/0087_toiture_veryroof.sql --workdir "$PWD".
3. Contrôler : select id, nom, ordre, fields from public.sites where id = 's-toiture'; et select id, libelle, circuit, mode, items from public.lead_types where site_id = 's-toiture'.
4. Test neutralisé, sans créer de dossier : POST sur https://zawhjurtnoosnfuicxfe.supabase.co/functions/v1/formulaire-site?site=s-toiture&type=t-toiture&secret=<FORMULAIRE_SECRET> avec le corps {"nom":"Test automatique","telephone":"0400000000","message":"contrôle — neutralisé","champs":{"Service":"Toiture plate"},"_piege":"x"} → attendu {"ok":true}. Lis le secret depuis les secrets Supabase ou les variables Netlify d'un site existant ; ne l'affiche pas dans la réponse.
5. Ajouter au contrôle quotidien (supabase/functions/verifier-formulaires/index.ts) trois contrôles « Toiture » sur le modèle « Peintre » : page https://toiture-veryroof.be/contact (formulaire name="devis" présent et texte /.netlify/functions/lead dans la page), envoi neutralisé sur https://toiture-veryroof.be/.netlify/functions/lead (attendu 200 et "ok":true), formulaire Netlify (POST form-data avec bot-field=x sur /contact, attendu 2xx/3xx). Le site n'est pas encore en ligne : écris le code et commit, mais ne déploie la fonction verifier-formulaires que lorsque je te dirai que le site est en ligne (sinon l'alerte quotidienne partira pour rien).
6. Commit avec un message clair. Ne touche à rien d'autre (pas de vercel --prod, pas d'autre fonction déployée).

Ensuite, dis-moi ce qu'il reste à faire à la main : rattacher le partenaire Toiture Veryroof au site dans Réglages (créer d'abord le partenaire si son profil n'existe pas, il me faudra son e-mail), puis les quatre variables Netlify LEADAPP_URL, LEADAPP_SITE=s-toiture, LEADAPP_TYPE=t-toiture, LEADAPP_SECRET lors de la création du site Netlify.
```
