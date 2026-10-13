# SDD ledger — plan: Prompt 4 du Core 30 (3 pages catégories), source : spec + src/data/keywords.ts + src/data/pages/*.json
Setup: Ruling: pas de plan détaillé séparé (Prompt 4 du client + validateur de contenu + tests de page construite tiennent lieu de plan) — coût si faux : relecture plus longue.
Task 1 (carte des mots-clés + tests anti-cannibalisation) : complete (tests/keywords.test.mjs 3/3 ; tests/built/seo-uniqueness.test.mjs : titles/H1/descriptions uniques sur 42 pages, mot-clé principal dans title+H1 des pages rédigées)
Task 1: Ruling: descriptions uniques générées pour toutes les pages placeholder et pages statiques (doublon détecté par le nouveau test) — coût si faux : aucun.
Task 1: Ruling: contrôle du mot-clé limité aux pages rédigées (le placeholder Démoussage n'a pas « toiture » dans son H1 ; à respecter au Prompt 6) — coût si faux : un H1 à corriger plus tard.
Task 2 (validateur scripts/check-page-content.mjs + 3 rédacteurs parallèles) : complete — 3 JSON validés (1 123 / 1 158 / 1 159 mots), retouches éditoriales : nuance Peeters-Borsus (3 pages), title Réparation différencié.
Task 3 (gabarit : lib/rich.ts TDD 3/3, lib/pages.ts, ServiceHero/ContentSection/ChildGrid/PageCta/CategoryPage, route [slug] conditionnelle, schema Service+OfferCatalog+BreadcrumbList) : complete
Task 3: Ruling: CTA secondaire « Demander un devis » → /contact (le formulaire de l'accueil est une ancre #devis, interdite entre pages) ; page Contact rédigée au Prompt 7 — coût si faux : un lien à repointer.
Task 3: Ruling: test de comptage par identifiants (#hero/#contenu/#services-enfants/#cta-final) car le CSS inliné par Astro contient les noms de classes — coût si faux : aucun.
Task 4 (vérification) : npm run verify → 23 unit, 44 HTML, 1373 liens, 27 tests construits ; contrôle navigateur bureau 1280 et mobile 375 OK.
Final review: reviewer subagent (fable) dispatché — en attente.
Final review: 1 Critical, 7 Important, ~12 Minor.
Final: fixed H2 de grille « de isolation » — gridHeading dans chaque JSON + défaut neutre « Nos interventions en détail »
Final: fixed titles qui empiètent — Réparation « | Diagnostic gratuit 48 h », Zinguerie « | Couvreur-zingueur » ; listes avoid étendues (dépannage, urgence, 24h/24, intervention rapide, fuite, tempête, cheminée, faîtage / pose, nettoyage, réparation, chéneaux)
Final: fixed provider non résoluble — nœud RoofingContractor minimal (@id, nom, url, téléphone, adresse) dans le @graph des hubs ; test
Final: fixed faits — PEB liée au permis d'urbanisme, « pas encore décidé de nouvelle aide », Peeters-Borsus « soumis à architecte » (3 pages), lien Réparation de toiture plate
Final: fixed validateur hors pipeline — tests/pages-content.test.mjs exécute checkPage() sur chaque JSON dans npm test
Final: fixed sous-titres de hero trop longs — ≤ 40 jetons (validateur) et 3 réécritures ; « Avant les pluies d'automne » ; « voisin mitoyen » → « voisin »
Final: fixed typographie — espaces insécables (frenchSpaces dans renderRich), test ; tests hubs : pas de [[ résiduel, une seule image LCP, ordre des H2, URL du catalogue
Final: Ruling: « Vous êtes au bon endroit » conservé en ouverture (exigé par le Prompt 4) — coût si faux : une tournure répétée sur 3 pages
Final: minor (deferred): même photo pour un parent et un enfant (isolation ↔ sarking, zinguerie ↔ pose de gouttières) → 2 visuels d'ensemble à générer (prompts à ajouter)
Final: minor (deferred): phrases de 43–44 mots à scinder (réparation) ; antithèses « …, pas … » répétées ; apostrophes droites (contenu) vs typographiques (alts)
Final: minor (deferred): ChildGrid deux liens identiques par carte (aria-label) ; areaServed limité à Bruxelles dans le schema Service
Final: à confirmer client : demande d'autorisation de voirie faite par l'entreprise ; attestation d'assurance remise avant chantier ; gouttières zinc/cuivre/aluminium, soudure à l'étain, nacelle, zinguerie non sous-traitée ; devis transmis à l'assurance après tempête ; remplacement d'ardoises amiante-ciment.
GBP (12/10) : libellés vérifiés : Couvreur, Entrepreneur spécialisé dans l'isolation, Entreprise de construction, Entreprise de rénovation, Charpentier ; gouttières et fenêtres de toit à vérifier dans l'autocomplétion de la fiche (spec mise à jour).

# Prompt 5 (2 services phares) — même pipeline
Task 1 (gabarit généralisé HubPage : section « expect », gridHeading, route core ; validateur : expect obligatoire + liens transversaux imposés + hero ≤ 40 jetons ; mots-clés avoid ; tests hub-pages généralisés) : complete
Task 2 (2 rédacteurs parallèles) : complete — renovation 1 277 mots, toiture-plate 1 240 mots, validateur OK ; retouches : Peeters-Borsus « soumis à architecte » (2 pages), H1 toiture plate « stoppée » → « arrêtée »
Task 2: Ruling: borne haute du test de page construite 1 420 mots (interface comprise : boutons, titres de grille, noms de cartes) alors que le contenu validé reste ≤ 1 300 — coût si faux : aucun
Task 3 (vérification) : npm run verify → 30 unit, 44 HTML, 1418 liens, 27 tests construits ; navigateur bureau/mobile OK
Final review: reviewer subagent (fable) dispatché sur les 2 pages — en attente.
Final review (Prompt 5): 1 Critical, 5 Important, ~12 Minor.
Final: fixed Toiture plate écrite comme une page fuite/urgence (cannibalisait Réparation de toiture plate et Dépannage) — H1, meta, hero, ouverture, « à quoi vous attendre » et CTA recentrés sur la réfection d'un toit plat ; frontière réparation dite une seule fois ; sondage de l'isolant une seule fois
Final: fixed Rénovation — amiante en double supprimé (local), « ardoises artificielles » (fait), attestation d'assurance remise avant chantier (contradiction), TVA 6 % « sous conditions »
Final: fixed nuances — RRU « impose, dans certains cas », toit « en général » partie commune, « la plupart des maisons », registre (« si un problème apparaît ») ; H2 « à quoi vous attendre » différencié
Final: fixed validateur — listes avoidWide (angle d'une autre page) contrôlées dans meta description, sous-titre et H2 ; formule Peeters-Borsus « soumis à architecte » imposée quand la loi est citée
Final: Ruling: termes `avoid` restent limités au title/H1 (un hub énumère légitimement ses enfants dans sa meta, et le hero doit citer 24h/24) ; seuls les termes `avoidWide` sont interdits partout — coût si faux : une meta trop proche d'une page enfant, visible à la relecture
Final: minor (deferred): phrases > 35 mots (4), cartes recopiées du texte, liens « En savoir plus » identiques (WCAG 2.4.4), Service.description = meta avec appel à l'action, numéro sécable dans le hero, alt du hero Rénovation sans le mot rénovation, détection de passages répétés et de phrases longues dans le validateur
Final: à confirmer client : enlèvement d'amiante en interne avec personnel formé ; prix fixé avant, suppléments après accord ; date de début annoncée ; voirie demandée par l'entreprise ; EPDM « premier choix » annexes ; recouvrement de l'ancienne étanchéité quand le support le permet ; même équipe pour étanchéité, isolation et zinguerie ; vérification RRU toiture verte ; durée de la garantie étanchéité.

# Prompt 7 (À propos + Contact) — en parallèle du Prompt 6
Task 1 (tests/built/about-contact.test.mjs RED → pages GREEN 5/5) : complete — QuoteForm.astro extrait de LeadForm (action = page courante, jamais « / »), a-propos.astro (histoire, gérant, vidéo, zones, confiance, Google, réseaux, schema RoofingContractor complet sans founder), contact.astro (gros téléphone, coordonnées + formulaire vers /contact, zones, carte = lien itinéraire sans iframe (RGPD), confiance, schema ContactPage + contactPoint)
Task 1: Ruling: carte Google non intégrée (iframe = cookies Google sans consentement) → lien « Itinéraire sur Google Maps » + commentaire pour intégrer plus tard avec consentement — coût si faux : pas de carte visuelle
Task 1: Ruling: tests — comptage des liens tel: sans RegExp (le « + » du numéro), blocs <style> inlinés par Astro ignorés par tous les extracteurs de texte (sélecteurs [data-astro-cid] pris pour des placeholders)
Final review (Prompt 7): reviewer subagent dispatché — en attente.
Final review (Prompt 7): 1 Critical, 6 Important, 7 Minor.
Final: fixed RGPD — lien politique de confidentialité + légende champs obligatoires dans QuoteForm ; pages Mentions légales et Politique de confidentialité rédigées (responsable, données, finalité/base légale, sous-traitants [À COMPLÉTER], durée [X] mois, droits + APD, cookies, Google Fonts signalé) ; tests
Final: fixed contrastes — bordures de champs #7C8798 (3,6:1), bloc formulaire Contact en blanc ; test contraste étendu
Final: fixed affirmations — « formée au métier » → « assurée », zinguerie sans « nous-mêmes », « tout de suite » → « rapidement » ; décennale nuancée « soumis à architecte » sur À propos ; metas raccourcies
Final: fixed conversion/Netlify — CTA #devis dans le hero de Contact, champ caché source (page d'origine) ; À propos lie les 5 hubs + /services ; pastilles sociales aria-hidden
Final: minor (deferred): helper organizationSchema() partagé ; areaServed « Bruxelles-Ville (Laeken…) » à scinder ; bandeau confiance deux fois sur Contact ; optgroups « Catégories / Services phares » (jargon) ; email obligatoire (frein possible) ; liste des communes répétée sur 4 pages
Final: à confirmer client : BCE/TVA, forme juridique, hébergeur, année de création, horaires, délai email, avis, réseaux, gérant (nom, fonction, photo, formations), assurances (compagnie, polices), affiliations (Embuild, VCA, attestation amiante, agréments EPDM/Velux), code postal (1000 vs 1170/1180), zinguerie en interne, destinataire des formulaires.
Prompt 6 : 26/26 pages enfants livrées (6 rédacteurs) — relecture en cours.

## 12/10/2026 (nuit) — Étude de mots-clés DataForSEO + relecture des 26 pages enfants

### Étude de mots-clés (demande client : vérifier volume et intention de chaque page)
- Livrables : `docs/content/etude-mots-cles.md` (synthèse, tableau page par page, prochaines communes, opportunités) + `docs/content/etude-mots-cles-donnees.csv` (238 requêtes, Belgique fr, Labs + Google Ads + intention).
- Décisions appliquées : title accueil « Couvreur Bruxelles, toiturier 24h/24 | Toiture Veryroof » + 7e FAQ (couvreur / toiturier / roofing) ; « Étanchéité EPDM » → **Toiture EPDM** ; « Charpente : réparation et traitement » → **Réparation et traitement de charpente** ; mot-clé principal Inspection = « expertise toiture Bruxelles » ; « corniche » dans la famille Zinguerie (title/H1 Réparation de gouttières, H1 Pose) ; H1 Amiante (« toiture amiante »), H1 Roofing (« toiture en roofing », title sans « pose ») ; Réparation de toiture plate recentrée (« Cloque, fissure », plus de « fuite / 24h/24 ») ; hub Réparation : « Devis gratuit » au lieu de « Diagnostic gratuit » ; `keywords.ts` enrichi (variantes réelles, avoid/avoidWide étendus).
- SERP vérifiée : « roofing bruxelles » (3 600/mois) = couvreurs généralistes → visé depuis l'accueil, pas depuis la page Roofing bitumineux.

### Relecture indépendante des 26 pages (2 relecteurs) → règles ajoutées
- Validateur : anti-cannibalisation générique (terme distinctif du nom d'une autre page interdit dans title/H1), phrases ≤ 35 mots, un seul « : » par H1, lien vers une page sœur dans le corps, pas d'auto-lien, `avoidWide` étendu au résumé / lien parent / CTA final, `name` = services.ts.
- Nouveau test `tests/pages-duplication.test.mjs` : aucune suite de 8 mots partagée entre deux pages (accueil compris), la formule d'assurance et le fait TVA comptant pour un seul mot. Filtre `PAGES=…` pour un rédacteur.
- Tests construits : `addressRegion` sur hubs et enfants. Composants : cartes « même famille » avec descriptions (résumé de la sœur, première phrase du hub), page Services utilisant le `summary` de chaque enfant, code mort retiré.
- Réécriture par 6 agents (une famille chacun, hub compris) : dé-clonage pourquoi/coût/CTA, phrases coupées, amiante (démoussage) corrigé, Velux (règle régionale de permis), inspection (visite de devis gratuite ≠ expertise payante), dépannage recentré, frontière pose/réparation gouttières tranchée, isolation toiture plate recentrée sur l'isolant, « sans sous-traitance » retiré partout.
- Photos : `pose-gouttieres` → `corniche-osb-bandeau-metal`, `remplacement-tuiles` → `toiture-tuiles-lucarne-gouttiere-zinc` ; visuels 37 et 38 ajoutés au plan pour dédoubler Isolation/Sarking et Dépannage/Tempête.
- Documents de relecture régénérés par `scripts/export-content-docs.mjs` : 04 (3 hubs), 05 (2 hubs), **06 (26 pages)**.

### Vérification
`npm run verify` : 58 tests unitaires (31 pages validées + duplication), build 44 pages HTML, 1 989 liens internes, 39 tests sur le HTML construit — tout vert.

### À confirmer par le client (consolidé)
- Entreprise : n° BCE/TVA, forme juridique, hébergeur, gérant, année de création, assurances (RC pro + décennale, attestation remise avant chantier), horaires de bureau, code postal du siège (1000 vs 1170/1180), fiche Google et réseaux.
- Pratiques affirmées à valider : visite de devis gratuite sous 48 h ; expertise complète payante avec rapport, prix annoncé avant ; dépannage : prix de la mise hors d'eau annoncé par téléphone/sur place, jours fériés ; nettoyage de gouttières : prix fixé dès le premier passage ou sur photos ; demande d'autorisation de voirie par l'entreprise ; nacelle/échafaudage selon accès ; photos avant/après.
- Métiers et matériaux : amiante (vérification sur place, personnel formé, déclaration/permis d'environnement, analyse labo, sacs étiquetés, bordereau d'évacuation) ; maçonnerie de souche de cheminée ; charpente et couverture par une seule équipe ; gouttières en cuivre ou aluminium laqué ; faîtage à sec sur bande ventilée (tuiles), faîtage coiffé de zinc (ardoises) ; zinc façonné sans soudure, finition prépatinée ; EPDM lesté au gravier, report par temps humide ; roofing en deux couches, extincteur ; toiture végétalisée (avis d'ingénieur selon structure, entretien annuel, obligation RRU) ; Velux (motorisation, volets, fenêtres pour toit plat retirés par prudence) ; copropriété (réponse aux questions du conseil avant l'AG, moyens de levage) ; durées des garanties écrites.
- Aides : TVA 6 % « sous conditions », crédit ECORENO et primes communales à revérifier avant mise en ligne ; primes Renolution suspendues (fait vérifié).

## 13/10/2026 — Vérification des libellés de la fiche Google + Prompt 8 (SEO technique)
- Libellés de catégories vérifiés sur ~100 fiches Google Maps (fr-BE, DataForSEO) : principale « Entreprise de toiture » (et non « Couvreur ») ; secondaires vérifiées : Entreprise d'étanchéité, Entrepreneur spécialisé dans l'isolation, Charpentier, Installation et entretien de gouttières, Service d'entretien des gouttières, Entreprise de construction. Architecture, étude (§ 7) et `keywords.ts` mis à jour. Services prédéfinis : non lisibles sans fiche en catégorie toiture (compte du client : 18 fiches, aucune en toiture) → à relever à la création de la fiche Veryroof.
- Prompt 8 : `sitemap.xml` (42 URL, priorités par type), `robots.txt`, Open Graph/Twitter + icônes PNG + manifest dans `BaseLayout`, `areaServed` ville + région sur les services, 404 enrichie, métas raccourcies (À propos, Contact, Services, Zones, Politique), police non bloquante, cibles tactiles ≥ 44 px, `scripts/clean-dist.mjs` (copies iCloud « page 2.html » créées pendant le build) + garde-fou dans `check-links`. Nouveau test `tests/built/technical-seo.test.mjs` (9 contrôles). Lighthouse mobile local : 100/100/100/100 sur accueil, hub et enfant. Documentation : `docs/content/08-seo-technique.md`.

## 13/10/2026 (suite) — Version publiable sans encadrés, e-mail, vraies photos
- Client : « enlève la case pour commencer, je te donnerai le n° TVA par après » ; e-mail = contact@toiture-veryroof.be ; site à mettre sur serveur local ; nouvelles photos reçues.
- `src/data/site.ts` : `email` confirmé, `vat: ''` (ligne masquée partout tant que vide), nouvel objet `pending` (forme juridique, hébergeur, conservation, horaires, histoire, gérant, vidéo, fiche Google, avis, réseaux, année, certifications). Gabarits conditionnels : À propos (équipe/vidéo/google/réseaux masqués, histoire = présentation factuelle), accueil (section Avis masquée sans code d'intégration, bandeau final sans horaires), Contact (horaires bureau masqués, délai de réponse sans chiffre), pied de page (TVA et réseaux masqués), mentions légales et politique (BCE/forme juridique masqués, hébergeur « sur demande », conservation par critères). `accueil.json` : plus de [X] (délai de réponse, ancienneté/équipe, horaires), clés reviewsPlaceholder/reviewsNote retirées.
- Piège Astro noté : un commentaire HTML placé juste avant une expression `{cond && (…)}` à la racine du gabarit est supprimé à la compilation → loger les commentaires-emplacements dans une section voisine.
- Photos : 9 vraies photos de chantier (toits plats EPDM/roofing) reçues par WhatsApp le 12/10 (Downloads/toiture, zip), importées et attribuées : hubs Toiture plate, Roofing bitumineux, Toiture EPDM, Réparation de toiture plate, Copropriétés, carte Toiture plate de l'accueil, 2 photos de la page À propos ; 1 en réserve. Provenance (chantiers de l'entreprise ?) à confirmer avant de parler de « réalisations ».
- Tests : about-contact (sections optionnelles, zéro crochet), homepage (section avis conditionnelle, zéro crochet), technical-seo (porte de publication : aucun placeholder visible, e-mail unique). `npm run verify` : 58 unitaires, 44 pages, 2 124 liens, 49 tests construits, tout vert.

## 13/10/2026 (suite) — 2e lot de vraies photos, galerie « Sur le chantier »
- Dossier `/Users/macbook/Downloads/toiture/WhatsApp Unknown 2026-10-13 at 07.05.24` : 44 images (35 nouvelles + les 9 de la veille). Consigne client : « les photos générées sont vraiment bien, on pourrait intégrer les deux » puis « prends pas pour prendre, seulement celles qui valent le coup ». Sélection : 9 retenues sur 35 (chantier sarking, faîtage terre cuite, solin zinc, rénovation en cours, lucarne, maison sous échafaudage, toit moussu « avant »), 26 écartées (doublons, cadrage, marques lisibles).
- Intégration des deux : visuels générés conservés en hero sauf Isolation (hub) et Sarking qui passent en vraies photos distinctes ; nouveau composant `ChantierGallery.astro` (section `id="chantier"`, 1 à 3 figures avec légende) alimenté par `pageGalleries` dans `src/data/photos.ts` ; galeries sur Toiture plate, Rénovation, Sarking, Faîtage et solins, Démoussage ; À propos : maison sous échafaudage + sortie EPDM. Légendes (`caption`) ajoutées au registre.
- Tests : galeries validées (pages connues, 1 à 3 photos, jamais le hero, légende 15–80 car.) ; tests hub/enfant découpent l'article avant la galerie. `npm run verify` vert (59 unitaires, 44 pages, 2 124 liens, 49 construits). Serveur local en route sur http://localhost:4321.

- 13/10 : le client confirme que les vraies photos sont ses chantiers → galerie « Sur nos chantiers » (lead « Photos prises sur nos chantiers, à Bruxelles et en périphérie »), figures légendées sur À propos, vraie photo dans le bloc À propos de l'accueil.
- 13/10 : question du client sur les ancres « En savoir plus ». Vérifié dans les prompts : liens contextuels dans le texte exigés pour l'accueil et le parent (en place), ET liens « Learn More » demandés sur les cartes (Prompts 3, 4, 6). Décision du client : on garde les cartes telles quelles, pas de réécriture des ancres.

## 13/10/2026 — Liaison formulaire → app Suivi Leads
- Montage identique aux sites Avocat/Peintre : `netlify/functions/lead.mjs` (relais, variables LEADAPP_*), `netlify.toml`, script du formulaire en double envoi (Netlify Forms + relais) avec `_piege`, politique de confidentialité mise à jour. Tests unitaires (relais simulé) + test construit (script bundlé contient le relais). Doc : `docs/content/09-liaison-suivi-leads.md` (SQL site/type, variables Netlify, contrôle quotidien à ajouter à la mise en ligne).
- Reste côté app (données de production, accord Daniel) : créer `s-toiture` / `t-toiture` (commission à décider), rattacher le partenaire ; côté Netlify à la création du site : 4 variables + test `_piege`.
- 13/10 : commission décidée par le client = 10 % sur le montant du devis ; prompt de création de l'activité (migration 0087, test neutralisé, contrôle quotidien) ajouté à docs/content/09-liaison-suivi-leads.md.
