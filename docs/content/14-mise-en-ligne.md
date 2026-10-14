# 14 — Check final et mise en ligne (13/10/2026)

## Check final du contenu (build du 13/10/2026, soir)

- `npm run verify` : 69 tests unitaires, 45 pages, 2 611 liens internes, 55 tests construits — tout au vert.
- Aucun texte provisoire visible (« Contenu en cours », « à compléter », crochets, lorem, undefined) sur les 45 pages.
- Titres et descriptions uniques sur toutes les pages, dans les limites (les 3 titres mesurés à 62–64 caractères ne dépassent qu'à cause de l'apostrophe encodée `&#39;` ; leur longueur réelle est de 58 à 60).
- `index.html` = redirection `noindex` vers `/couvreur-bruxelles` (voulu).
- La rue du siège n'apparaît plus que sur Contact, mentions légales, pied de page, schema et `llms.txt`.
- robots.txt, sitemap.xml (43 URL, Braine-l'Alleud comprise), llms.txt, 404, manifest, _redirects : présents.
- Formulaire : Netlify Forms (`data-netlify`, honeypot `bot-field`) + relais `netlify/functions/lead.mjs` vers l'app Suivi Leads.
- Photos : 91 entrées au registre, toutes réelles ou générées, aucun visuel temporaire ; 18 galeries de vrais chantiers.

## Complément du 13/10 (soir) — pages services v2

Les 31 pages services ont été réécrites au format « problème → nous le réglons » (`docs/content/15-pages-services-v2.md`). `npm run verify` vert (69 + 55 tests, 45 pages, 2 700 liens), Lighthouse 100 sur les pages contrôlées. Rien de nouveau à faire côté client pour ce point.

## Avant de publier — à faire par le client

1. **Numéro d'entreprise (BCE / TVA)** → `site.vat` dans `src/data/site.ts` (obligation légale : mentions légales, À propos, pied de page s'affichent dès qu'il est rempli).
2. **Forme juridique** (`pending.legalForm`, ex. SRL) et **hébergeur** (`pending.host`, ex. « Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, États-Unis ») → mentions légales et politique de confidentialité.
3. **Netlify** : créer le site depuis le dossier (build `npm run build`, publish `dist`), raccorder le domaine `toiture-veryroof.be` (canonique sans www, HTTPS), définir les variables `LEADAPP_URL`, `LEADAPP_SITE` (s-toiture), `LEADAPP_TYPE` (t-toiture), `LEADAPP_SECRET`, activer la notification e-mail de Netlify Forms vers contact@toiture-veryroof.be, puis tester un envoi réel du formulaire (le test `_piege` contre l'app a été fait le 13/10).
4. **Sortir le projet du dossier iCloud** (Bureau synchronisé) : il crée des copies « page 2.html » dans `dist/` entre deux builds.

## Juste après la mise en ligne

5. **Google Search Console** : vérifier la propriété, soumettre `https://toiture-veryroof.be/sitemap.xml`, demander l'indexation de l'accueil.
6. **Fiche Google Business Profile** : catégorie principale « Entreprise de toiture » (libellé vérifié), secondaires vérifiées (Entreprise d'étanchéité, Entrepreneur spécialisé dans l'isolation, Charpentier, Installation et entretien de gouttières, Service d'entretien des gouttières, Entreprise de construction), site web vers `/couvreur-bruxelles`, puis relever les services prédéfinis et les aligner sur les noms des pages. Renseigner `pending.gbpEmbed`, `pending.reviewsEmbed` et `pending.social` → les sections Avis et Fiche Google et le `sameAs` s'activent seuls.
7. **Annuaires** (NAP identique partout, rue comprise) : Pages d'Or, Infobel, Trustup, Bopro, Facebook.
8. **Pages communes suivantes** dans l'ordre de l'étude : Wavre, Nivelles, Ixelles, Auderghem, page régionale Brabant wallon.
9. **Contenu à compléter quand disponible** : horaires, année de création, certifications, histoire, gérant avec photo (`pending`), puis remplacer « la référence / numéro un » par des preuves (note et nombre d'avis).

## Non bloquant, à surveiller

- Lighthouse mobile du 13/10/2026 (aperçu local) : accueil, Rénovation, Uccle, Braine-l'Alleud = 100 / 100 / 100 / 100 (performance, accessibilité, bonnes pratiques, SEO), LCP ≈ 0,9–1,1 s, CLS 0. Un défaut d'accessibilité (liste `<dl>` mal structurée sur les pages communes) a été corrigé le jour même.
- Lighthouse mobile : garder le hero en WebP préchargé, images en chargement différé.
- Après quelques semaines : Search Console → requêtes « couvreur / toiturier / toiture + commune », ajuster titres si une variante domine.

## Mise en ligne effectuée le 13/10/2026 (soir)

- Dépôt GitHub : https://github.com/Danielgpb/Toiture-Veryroof (branche `main`). `.gitignore` exclut `node_modules`, `dist`, `.astro`, `photos-a-trier/*` et les `*.zip` WhatsApp.
- Site Netlify : projet `toiture-veryroof` (ID `2a3cbd30-0c00-4357-8004-1ea0e22b1db5`), équipe bcdd. URL de production provisoire : https://toiture-veryroof.netlify.app
- Déploiement par le CLI (`netlify deploy --prod --build`). Le dépôt GitHub n'est PAS encore raccordé en déploiement continu (l'autorisation OAuth GitHub doit être donnée par le client dans l'interface Netlify : Project configuration → Build & deploy → Link repository).
- `pending.host` et `pending.hostTransferNote` renseignés (Netlify, Inc. + clauses contractuelles types).
- Variables d'environnement posées : `LEADAPP_URL`, `LEADAPP_SITE` (`s-toiture`), `LEADAPP_TYPE` (`t-toiture`). **`LEADAPP_SECRET` reste à poser par le client** (même valeur que sur les autres sites, à copier depuis Netlify → Environment variables d'un site existant). Tant qu'elle manque, le relais vers l'app Suivi Leads ne part pas, mais Netlify Forms enregistre quand même les demandes.
- Détection de formulaires activée, formulaire `devis` reconnu après redéploiement. Notification par e-mail créée le 13/10/2026 : toute nouvelle soumission part vers borenxdaniel@gmail.com, objet « Nouvelle demande de devis — Toiture Veryroof ». À rebasculer vers contact@toiture-veryroof.be dès que la boîte existe.

### Domaine (réglé le 13/10/2026 au soir)

`toiture-veryroof.be` figurait dans le portefeuille Hostinger avec le statut « Not registered » : l'enregistrement n'avait jamais été finalisé (le registre DNS Belgium le donnait encore libre). Le client a complété le formulaire d'enregistrement chez Hostinger après correction des données de titulaire.

État : domaine **actif**, enregistré le 13/10/2026 via Realtime Register B.V. (registrar de Hostinger), expiration 31/10/2027, renouvellement automatique activé.

Montage DNS retenu — identique aux autres sites du client : **Netlify DNS**.
- Zone DNS créée dans Netlify (équipe bcdd) avec deux enregistrements NETLIFY, l'apex et le `www`, pointant sur `toiture-veryroof.netlify.app`.
- Domaine ajouté au projet Netlify comme domaine principal, `www.toiture-veryroof.be` redirige automatiquement vers lui.
- Serveurs de noms posés chez Hostinger (Domaines → toiture-veryroof.be → DNS / Nameservers → Change nameservers) :
  `dns1.p04.nsone.net`, `dns2.p04.nsone.net`, `dns3.p04.nsone.net`, `dns4.p04.nsone.net`.

**Blocage constaté le 13/10/2026 au soir** : quarante minutes après le changement, aucune délégation visible. Le whois du registre en donne la raison :

> « We only activate this domain name once the contact details of the domain name holder have been validated. For more information, contact verification@dnsbelgium.be. »

DNS Belgium exige la validation des coordonnées du titulaire avant de publier les serveurs de noms. Un e-mail de validation part vers l'adresse du titulaire (`borenxdaniel@gmail.com`), envoyé par DNS Belgium ou relayé par Realtime Register / Hostinger. Tant que le lien n'est pas cliqué, le domaine ne résout pas, quel que soit le réglage DNS — et passé le délai (quinze jours environ), le domaine est suspendu. Le panneau Hostinger affiche « Active », mais c'est son statut de facturation à lui, pas l'activation au registre : ne pas s'y fier.

Une fois le lien cliqué, la délégation apparaît en quelques minutes à quelques heures, puis la propagation prend de quinze minutes à vingt-quatre heures. Le certificat HTTPS Let's Encrypt est émis automatiquement par Netlify dès que la délégation est visible ; si après vingt-quatre heures il manque toujours, cliquer « Verify DNS configuration » puis « Renew certificate » dans Domain management → HTTPS.

### Reste à faire côté client

1. `LEADAPP_SECRET` dans les variables d'environnement Netlify (valeur identique aux autres sites).
2. Numéro BCE/TVA (`site.vat`) et forme juridique (`pending.legalForm`) — obligation légale.
3. Une fois le domaine résolu : créer la boîte `contact@toiture-veryroof.be` et rebasculer la notification de formulaire dessus.
4. Search Console + sitemap, fiche Google Business Profile, annuaires.
5. Facultatif : raccorder le dépôt GitHub en déploiement continu (Project configuration → Build & deploy → Link repository), ce qui évite de déployer depuis le dossier iCloud.

## Search Console (14/10/2026)

Propriété **Domaine** `toiture-veryroof.be` créée dans le compte Google **borenxdaniel@gmail.com**, celui qui porte déjà les autres sites (abd-depannage, ali-ka, avocat-penaliste-bruxelles, bruxelles-car-depannage, dmt-autogroup…).

Validation par enregistrement DNS TXT, ajouté dans la zone Netlify :

```
toiture-veryroof.be  3600  IN  TXT  google-site-verification=BCI4yeZpjb3F-KeJsIjun1QrpxcBdTIkfeHzhwZThQA
```

**Ne jamais supprimer cet enregistrement** : Google revalide périodiquement, et sa disparition fait perdre la propriété. Pour sécuriser, ajouter une seconde méthode de validation depuis Paramètres → Validation de la propriété.

Sitemap `https://toiture-veryroof.be/sitemap.xml` soumis le 14/10/2026 : état « Opération effectuée », **43 pages découvertes**.

Pourquoi une propriété **Domaine** et non « Préfixe d'URL » : elle couvre d'un coup le `www`, le non-`www`, le `http` et le `https`. Une propriété de préfixe aurait demandé quatre déclarations séparées.

Note : le CLI Netlify refuse la création d'enregistrement DNS (`createDnsRecord` → 422 Unprocessable Entity, quelle que soit la forme du corps). Passer par l'interface : Team → DNS → la zone → Add new record.

## Messagerie contact@toiture-veryroof.be (14/10/2026)

La boîte est un plan **Starter Business Email** Hostinger. Elle était marquée « Email is not working » : les enregistrements mail que Hostinger pose automatiquement n'existaient pas, puisque la zone DNS a été déplacée chez **Netlify** lors du raccordement du domaine. Ils ont été ajoutés à la main dans la zone Netlify :

| Type | Nom | Valeur | Priorité | TTL |
|---|---|---|---|---|
| MX | @ | mx1.hostinger.com | 5 | 14400 |
| MX | @ | mx2.hostinger.com | 10 | 14400 |
| TXT | @ | `v=spf1 include:_spf.mail.hostinger.com ~all` | — | 3600 |
| TXT | _dmarc | `v=DMARC1; p=none` | — | 3600 |
| CNAME | hostingermail-a._domainkey | hostingermail-a.dkim.mail.hostinger.com | — | 300 |
| CNAME | hostingermail-b._domainkey | hostingermail-b.dkim.mail.hostinger.com | — | 300 |
| CNAME | hostingermail-c._domainkey | hostingermail-c.dkim.mail.hostinger.com | — | 300 |

Le TXT de validation Google et les deux enregistrements NETLIFY du site sont intacts : dix enregistrements au total, le site répond toujours en 200.

**Réception vérifiée par un vrai échange SMTP** (sans envoyer de message, en coupant avant les données) : `mx1.hostinger.com` répond `250 Ok` pour `contact@toiture-veryroof.be` et `550` pour une adresse inventée du même domaine — la boîte existe et n'est pas un attrape-tout.

Redirection créée vers `borenxdaniel@gmail.com`, **copies conservées** dans la boîte Hostinger. Elle demande une confirmation par e-mail envoyée à l'adresse de destination.

Réglages serveur, pour « Send mail as » dans Gmail ou tout client :

| | |
|---|---|
| SMTP sortant | `smtp.hostinger.com`, port **465**, SSL |
| IMAP entrant | `imap.hostinger.com`, port 993 |
| POP3 | `pop.hostinger.com`, port 995 (déconseillé) |
| Identifiant | l'adresse complète `contact@toiture-veryroof.be` |

**Piège à retenir** : `dig` renvoie par moments « Message parser reports malformed message packet » sur cette zone, et les MX semblent alors absents alors qu'ils répondent. Vérifier sur plusieurs résolveurs avant de conclure à une panne — ou mieux, faire le test SMTP ci-dessus, qui est la seule preuve qui compte.
