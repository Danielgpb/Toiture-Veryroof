# 12 — Audit de qualité du contenu (13/10/2026)

Périmètre : 44 pages construites (`dist/`), sources `src/data/pages/*.json` et `src/data/accueil.json`. Méthode : métriques calculées sur le HTML (mots, longueur des phrases et paragraphes, titres, liens, images, FAQ, schema, n-grammes répétés) + lecture de l'accueil, de la page À propos, de la page Services et d'une page service (Démoussage).

## Score global : 72 / 100

| Facteur E-E-A-T | Score | Signaux |
|---|---|---|
| Expérience | 14 / 25 | Détails de terrain crédibles (clous rouillés, vent d'ouest, noue qui se dilate, toiture froide…), 6 pages avec de vraies photos « Sur nos chantiers ». Manque : avant/après, cas concrets, gérant, dates. |
| Expertise | 18 / 25 | Profondeur technique réelle et belge (closoir ventilé, RRU, omgevingsvergunning, Mijn VerbouwPremie, Peeters-Borsus). Manque : auteur, qualifications, certifications (`pending` vides). |
| Autorité | 8 / 25 | **0 lien externe sur tout le site**, aucun `sameAs`, aucun avis, pas de fiche Google. |
| Confiance | 17 / 25 | NAP complet, téléphone partout, mentions légales et confidentialité, assurance et garantie écrite. Manque : n° BCE/TVA, hébergeur, avis, dates de mise à jour ; « la référence » / « numéro un » invérifiables. |

**Citabilité IA : 70 / 100** — FAQPage sur 36 pages (171 Q/R, réponse en première phrase), `llms.txt`, H2 sous forme de questions, schema organisation cohérent. Manque : sources citées, données chiffrées sourcées, dates.

## Métriques

- Volume : 52 000 mots, moyenne 1 135 mots/page. Hubs 1 500–1 700, services 1 200–1 350, communes 790–840, accueil 1 526.
- Phrases : 19–21 mots en moyenne sur les services (cible 15–20), 16–17 sur les communes. **Trop long** : page Services (28 mots, 13 phrases > 30) et À propos (31 mots).
- Paragraphes : jusqu'à 110–129 mots sur les hubs (5–6 phrases) ; à aérer.
- Liens internes : 11–19 par page, ancres descriptives, aucune page orpheline. Liens externes : **0**.
- Images : 100 % avec alt descriptif. Schema : RoofingContractor + Service + BreadcrumbList + FAQPage sur toutes les pages services et communes.
- Pages minces : mentions légales (157 mots, normal), **zones-d-intervention (191)**, **À propos (279)**.
- Répétition inter-pages : hors interface, la formule d'assurance Peeters-Borsus (35 pages) et « installés chaussée de La Hulpe, nous allons dans les 19 communes… » (sections « pourquoi ») se lisent comme un gabarit.

## Problèmes trouvés, par priorité

**P1 — Autorité et confiance**
1. Aucune source externe. Ajouter 1 à 2 liens sortants par page là où un fait est affirmé : Bruxelles Environnement (amiante, Renolution), urbanisme.brussels (permis), patrimoine.brussels (Logis/Floréal), Homegrade, SPW Prime Habitation, Vlaanderen Mijn VerbouwPremie, IRM (tempête). C'est le premier signal d'autorité pour Google et pour les IA.
2. Page À propos : 279 mots, sans gérant, sans histoire, sans certifications, sans année de création. C'est la page E-E-A-T par excellence ; viser 500–700 mots avec les champs `pending` (dépend du client).
3. Avis : aucune section rendue (`pending.reviewsEmbed` vide), aucun `aggregateRating`. À brancher dès la fiche Google.
4. N° BCE/TVA et hébergeur absents des mentions légales (obligation légale, dépend du client).

**P2 — Rédaction**
5. Formule d'assurance répétée mot pour mot sur 35 pages dans le corps : la sortir du texte vers un bloc « Confiance » partagé (composant), garder une phrase variée dans le corps. Même chose pour « chaussée de La Hulpe / 19 communes » dans les sections « pourquoi ».
6. Page Services : phrases de 28 mots en moyenne ; couper. À propos : 31 mots en moyenne ; couper.
7. Hub zones-d-intervention : 191 mots ; ajouter un court paragraphe par région (bâti dominant, Région = règles) pour atteindre 350–450 mots.
8. Aucune date : ajouter « mis à jour le … » sur les pages à contenu réglementaire (primes, permis, amiante) et `dateModified` dans le schema.

**P3 — Citabilité et prudence**
9. Pas de donnée chiffrée sourcée (politique « pas de chiffres »). Autoriser une liste courte de faits sourcés : délai de déclaration tempête, seuil de vent des contrats, durée de vie des matériaux — chacun avec sa source en lien.
10. « La référence », « numéro un » : remplacer par des preuves vérifiables dès que les avis existent (note, nombre d'avis, année de création).
11. Doublons iCloud (`page 2.html`) réapparaissent dans `dist/` entre deux builds : sortir le projet du dossier synchronisé.

## Ce qui est bon et à garder
Angle local et belge (vocabulaire, règles par Région), FAQ issues de vraies questions, réponses directes, maillage dense et cohérent, structure H1→H2→H3 propre, alt complets, schema complet, pages communes courtes et factuelles, accordéons ouverts par défaut (13/10).

## Suite donnée le 13/10/2026 (même jour)

- **1 — Sources externes** : champ `sources` (1 à 4 liens officiels) + `updated` sur les 35 pages services/communes et l'accueil ; composant `Sources.astro` (section « Sources et références » + « Page mise à jour le … ») ; nœud `WebPage` avec `datePublished`/`dateModified` dans le schema ; règles dans le validateur (`sourcesErrors`) et test construit. URLs vérifiées (réponse HTTP) : Homegrade, Renolution, urbanisme.brussels, Bruxelles Environnement (amiante), SPF Finances (TVA), Assuralia, IRM, Fonds du Logement, Notaire.be, OVAM, patrimoine.brussels (Logis/Floréal), communes d'Uccle, Watermael-Boitsfort, Rhode-Saint-Genèse, Waterloo, Vlaanderen (Mijn VerbouwPremie), Omgevingsloket, SPW Logement.
- **5 — Formule d'assurance** : non modifiée. Elle est imposée par le Core 30 (test anti-duplication : « formule d'assurance imposée ») ; la retirer du corps reviendrait sur une règle du client. Les autres répétitions (« chaussée de La Hulpe ») ne concernent que 8 pages avec des formulations différentes.
- **6 — Phrases longues** : fausse alerte en grande partie (les listes de communes étaient comptées comme des phrases). Une vraie phrase de 35 mots coupée sur la page Services ; À propos : 10,8 mots de moyenne en prose réelle.
- **7 — Hub zones** : un paragraphe par Région (bâti dominant, permis, aides, langue) ajouté.
- **8 — Dates** : « Page mise à jour le 13 octobre 2026 » + `dateModified` sur toutes les pages à contenu.
