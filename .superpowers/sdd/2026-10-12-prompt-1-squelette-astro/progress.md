# SDD ledger — plan: docs/superpowers/plans/2026-10-12-prompt-1-squelette-astro.md
Spec: docs/superpowers/specs/2026-10-12-architecture-site-veryroof-design.md (lue)
Pre-flight: Task 3/4 consomment site/staticPages/serviceGroups/generalServices/allServicePages/serviceH1/activeZones/zoneH1/serviceAreas/regionLabels produits par Task 2 — noms identiques, OK. Task 4 consomme PlaceholderPage(h1,title?) et BaseLayout(title,description?) de Task 3 — OK.
Setup: Ruling: pas de dépôt git (le client ne l'a pas demandé, règle « commit seulement sur demande ») — pas de worktree, pas de commits, ledger manuel — coût si faux : historique non versionné, récupérable par `git init` plus tard.
Task 1: Ruling: script `node --test tests/` échoue sous Node 26 (dossier nu refusé) → `node --test tests/*.test.mjs` — coût si faux : aucun (même suite).
Task 1: complete (fichiers projet + design system ; npx astro --version → v5.18.2)
Task 2: complete (tests: npm test → 6/6 pass)
Task 3: complete (layout + Header/Footer/FloatingCall/PlaceholderPage ; compilés par le build de Task 4)
Task 4: complete (tests: npm run verify → 6/6 pass, 43 pages Astro + index redirection = 44 HTML, 1285 liens OK, 0 orphelin)
Task 5: Ruling: panneau menu mobile ancré sur .header__inner (marges latérales visibles) → `position: relative` retiré, le header sticky sert de bloc conteneur — coût si faux : panneau décalé sur mobile, visible immédiatement.
Task 5: Ruling: `.nav__list a` (0,1,1) écrasait la couleur blanche de `.btn--accent` dans le CTA mobile → règle `.nav__mobile-cta a { color:#fff }` — coût si faux : texte illisible sur le bouton orange.
Task 5: complete (navigateur : redirection / → /couvreur-bruxelles, 375px sans débordement, burger ouvre/ferme, CTA flottant visible, nav → /services scrollY 0, header sticky + ombre ; npm run verify → 6/6, 44 HTML, 1285 liens OK)
Final review: reviewer subagent (fable) — 1 Critical, 3 Important, 7 Minor.
Final: fixed canonical en .html (build.format 'file') — tests/paths.test.mjs RED→GREEN + contrôle canonical/aria-current dans check-links RED→GREEN, suite 8/8, 44 HTML OK
Final: fixed _redirects non forcé (Netlify sert index.html en 200) — règle `301!` + contrôle dans check-links RED→GREEN
Final: fixed test figé activeZones === 4 — assert >= 4 (ajout de communes sans casser la suite)
Final: fixed check-links acceptait href en .html et plantait sans dist/ — refus des liens .html + message clair
Final: Ruling: comptage services (31) laissé figé dans les tests — la spec est l'autorité ; retirer un service « à confirmer » passe par une mise à jour spec + test — coût si faux : un test à ajuster
Final: Ruling: workspace .superpowers conservé — pas de dépôt git, le ledger est le seul historique — coût si faux : un dossier caché de plus
Final: Ruling: finishing-a-development-branch sans objet (pas de branche git)
Final: minor (deferred): Google Fonts (requête tierce bloquante, RGPD UE) → self-host ou polices système à décider avant mise en ligne
Final: minor (deferred): garde-fou placeholders (tel:+322XXXXXXX, [N° BCE]) avant déploiement → ajouter un contrôle « release » dans check-links
Final: minor (deferred): domaine dupliqué astro.config/site.ts, serviceH1 ignore site.city, hrefs footer en dur, Astro.props non typé dans [slug].astro
Final: minor (deferred): PlaceholderPage sans prop description (meta description partagée) — sera remplacé au Prompt 2
Final: minor (deferred): menu mobile sans fermeture Échap/clic extérieur ; aria-label sur div/span ignoré ; canonical sur la 404
Final: minor (deferred): pas de champ engines/.nvmrc (Node >= 23.6 requis pour le type stripping)
Final: minor (deferred): titre « À propos de Toiture Veryroof | Toiture Veryroof » (marque en double) — réglé au Prompt 7
