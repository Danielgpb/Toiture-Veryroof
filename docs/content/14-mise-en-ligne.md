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
