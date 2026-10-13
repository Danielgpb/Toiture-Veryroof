# SDD ledger — plan: Prompt 3 du Core 30 (page d'accueil), source : docs/content/02-contenu-accueil.md + src/data/accueil.json
Setup: Ruling: pas de plan détaillé séparé — le Prompt 3 du client (ordre des sections imposé, exigences techniques) + le JSON de contenu + le design system existant tiennent lieu de plan ; le test tests/built/homepage.test.mjs décrit la page attendue et est écrit AVANT la page — coût si faux : une relecture plus longue à la revue finale.
Setup: Ruling: mots-clés principaux « Couvreur Bruxelles » + « Toiture Bruxelles » (demande client) → H1 69 car., title 60 car., meta description ≤ 155 car. recomptés.
Setup: Ruling: CTA secondaire « Devis gratuit » = ancre vers le formulaire de la même page (#devis), ancre intentionnelle ajoutée à la liste blanche du contrôleur de liens (Prompt 8 : « unless intentional ») — coût si faux : un lien à repointer vers /contact.
Task 1 (test + fondations : lib/phone TDD 2/2, BaseLayout slot head + mobileCta, StickyCtaBar, Icon, CSS, visuel hero SVG, domaine toiture-veryroof.be) : complete
Task 2 (11 sections + page + schema.org) : complete (tests: npm run verify → tests unitaires 10/10, 44 HTML, 1309 liens OK, tests accueil 13/13)
Task 2: Ruling: `<Fragment set:html="<!-- … -->">` en attribut littéral est échappé par Astro → commentaires HTML écrits en clair (Astro les conserve) — coût si faux : aucun.
Task 2: Ruling: deux bugs de test corrigés (le « + » du numéro non échappé dans des RegExp) après avoir vérifié que le HTML construit était correct (12 liens tel:) — coût si faux : test trop permissif ; contre-vérifié par un script node indépendant.
Task 3 (contrôle visuel) : complete — bureau 1280px : 11 sections dans l'ordre, pleine page 7635px, aucun débordement ; mobile 390px : pleine page 12333px, scrollWidth = 390, barre CTA collante affichée, formulaire vide invalide (validation native), 1 bloc JSON-LD.
Final review: reviewer subagent (fable) dispatché sur l'accueil — en attente.
Final review: 1 Critical, 6 Important, ~10 Minor.
Final: fixed formulaire → POST vers « / » redirigée (faux succès) — action="/couvreur-bruxelles", fetch(action), redirection ailleurs = échec, numéro via data-attributes — homepage-review.test RED→GREEN
Final: fixed ancres sous le header collant — html { scroll-padding-top: 6rem } — test CSS RED→GREEN
Final: fixed contraste AA de l'orange — boutons, eyebrows, liens fléchés, badges, barre mobile, bouton flottant, « + » FAQ passent sur --color-accent-dark (#B84F1E, 5,05:1 sur blanc, 4,59:1 sur gris) — tests/contrast.test RED→GREEN
Final: fixed textes ajoutés hors contenu validé — surtitre hero, puces formulaire, badges, placeholder avis, ligne horaires déplacés dans accueil.json + doc de contenu ; budget de placeholders testé ([X], [N° BCE / TVA], [À COMPLÉTER])
Final: fixed zone sûre iPhone — body padding-bottom calc(5rem + env(safe-area-inset-bottom)) — test CSS RED→GREEN
Final: fixed liaison fragile — linkText (lève une erreur de build si l'expression manque) partagé par linkPhone et ServiceArea — tests/phone.test RED→GREEN ; lien du hub vérifié dans le paragraphe
Final: fixed trous de tests — image de fond vérifiée par background-image, image LCP exemptée du lazy (fetchpriority), réponses FAQ schema = affichées, honeypot + form-name, ancres vérifiées par cible sur la même page (plus de liste blanche)
Final: fixed contrôleur de liens — scripts inlinés exclus de l'analyse des href (gabarit ${…} pris pour un lien)
Final: Ruling: test « téléphones cliquables » restreint au texte visible (le numéro dans data-phone-display n'est pas affiché) — coût si faux : aucun, le numéro visible reste contrôlé
Final: Ruling: ligne horaires conservée avec placeholder [À COMPLÉTER] (Prompt 3 : « hours if available ») et ajoutée aux points à confirmer — coût si faux : une ligne à retirer
Final: minor (deferred): téléphone en dur dans le schema (couvreur-bruxelles.astro) ; site.domain dupliqué avec astro.config (Astro.site)
Final: minor (deferred): Service.areaServed limité à Bruxelles vs 43 villes sur l'organisation ; noms de City avec parenthèses (Bruxelles-Ville (Laeken…))
Final: minor (deferred): CSS mort/dupliqué (.eyebrow--light ×2, #F3B48F ×6 → token, .why padding no-op, .grid--2, icônes home/camera)
Final: minor (deferred): « En savoir plus » ×5 identiques (préférer « En savoir plus sur [service] » en texte caché) ; ✓ en pseudo-élément lu par certains lecteurs
Final: minor (deferred): Open Graph (Prompt 8), lien politique de confidentialité près du bouton envoyer, échapper < dans le JSON-LD, espaces insécables avant « : » et dans « 48 h »
Final: minor (deferred): page /merci pour le suivi des conversions (à créer au Prompt 7 avec le formulaire de contact)
Final: minor (deferred): quand la photo du hero arrivera, passer par astro:assets (<img fetchpriority="high">, WebP responsive) plutôt que public/
Final: Ruling: workspace .superpowers conservé (pas de git)
Photos (12/10/2026) : 19 reçues → 17 importées (scripts/import-photos.mjs : noms descriptifs, 1200 px, métadonnées supprimées, hero recadré 16:9), registre src/data/photos.ts + src/lib/photos.ts (glob astro:assets), tests/photos.test.mjs RED→GREEN, hero en <picture> (WebP responsive + préchargement, variante mobile), cartes/services phares/à propos en <Image>, tests de page mis à jour ; npm run verify → 17 unit, 44 HTML, 1310 liens, 20 tests accueil.
Photos: Ruling: 2 photos hors sujet (chauffage au sol, chape) non importées — coût si faux : à importer plus tard si l'entreprise veut montrer d'autres métiers.
Photos: Ruling: pages sans photo exacte (ardoises, zinc, EPDM, végétalisée, urgence, démoussage, amiante, combles, nettoyage, chéneaux, inspection, copropriété, fuite, 4 communes) reçoivent la photo réelle la plus proche avec un alt honnête, et un prompt de génération autonome est fourni dans docs/content/photos-plan.md — coût si faux : un visuel approximatif en attendant mieux.
Photos (12/10 soir) : photos client retirées (chantier partagé) — src/assets/photos, photos-a-trier et vignettes supprimés ; registre étendu à 36 entrées (prompts 1 à 36), pagePhotos réattribués aux visuels dédiés ; scripts/make-placeholders.mjs (visuels neutres, jamais écrasés) + import automatique par nom (npm run photos) ; npm run verify → 17 unit, 44 HTML, 1310 liens, 20 tests accueil.
Photos: Ruling: alts neutralisés (plus de « posée par Toiture Veryroof ») puisque les visuels seront générés — coût si faux : aucun.
Photos (12/10 19h) : 41 images générées déposées à la racine → noms normalisés (préfixes numérotés, virgules, « posev ») → photos-a-trier → import (41, 1600 px) ; registre 41 entrées (5 variantes) ; orientation corrigée pour etancheite-epdm-toit-plat-pose-vertical (paysage en réalité) ; npm run verify → 17 unit, 44 HTML, 1310 liens, 20 tests accueil ; planche-contact contrôlée.
Photos: Ruling: normalisation des noms ajoutée au script d'import (robuste aux préfixes « 19. », « ,paysage », espaces) — coût si faux : aucun.
