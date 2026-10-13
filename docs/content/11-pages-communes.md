# 11 — Pages communes rédigées (Uccle, Watermael-Boitsfort, Rhode-Saint-Genèse, Waterloo)

**13/10/2026.** Les 4 pages communes étaient des coquilles indexables (62 mots, « Contenu en cours de rédaction ») : la série Core 30 ne prévoit pas de prompt localité. Méthode ajoutée : `docs/core30/prompt-9-pages-communes.md`.

## SERP relevées (Google BE, fr)

| Requête | Ce qui ranke | Enseignement |
|---|---|---|
| couvreur Uccle (260/mois) | Local pack ×3, puis pages commune de Lievens, Energylux, Hydro Toit ; annuaires Trustup | Vraies pages commune concurrentes, mais génériques → on gagne avec le local vérifiable |
| couvreur Waterloo (170) | Pages d'accueil d'entreprises locales (Delleuse, Expert Toiture, Tichoux), article De Coster, Trustup | Une enseigne domine ; angle « villas quatre façades + règles wallonnes » |
| couvreur Watermael-Boitsfort (< 10) | SERP faible (page de ravalement de façade n° 1, Tafsquare, Bobex Auderghem) | Facile ; page de proximité du siège |
| couvreur Rhode-Saint-Genèse (< 10) | Protec Toiture, Trustup, Fournier, pages commune Johann Toiture / Delleuse / Lievens / Dila Bati | Dila Bati = meilleur modèle de structure (bâti → forêt → zinguerie → règle flamande → quartiers → FAQ) |

PAA récurrentes : prix pour 100 m², comment choisir / reconnaître un bon couvreur, aides et primes, norme d'isolation.

## Ce qui a été construit

- Type `ZoneContent` (`src/lib/pages.ts`), gabarit `src/components/ZonePage.astro` (hero illustré, 6 sections, liste de quartiers, FAQ + schema FAQPage, grille des autres communes, CTA), routage dans `[slug].astro`.
- Validateur `checkZonePage` dans `scripts/check-page-content.mjs` ; test construit `tests/built/zone-pages.test.mjs`.
- **Révision client (13/10 soir) : la version longue (récit, six sections) a été refusée — « trop de blabla ». Version finale courte et factuelle : intro → toits et ce qui lâche → interventions → « Comment ça se passe » en 4 étapes (`src/data/process.ts`) → permis et primes → quartiers → 4 FAQ.**
- Contenus : `src/data/pages/couvreur-*.json`, angle local par page :
  - **Uccle** — le voisin qui connaît chaque rue (maisons de maître 1880–1930, villas du Fort Jaco, règlement communal, inventaire).
  - **Watermael-Boitsfort** — le voisin du bout de la rue (cités-jardins Le Logis/Floréal classées 2001 et 2007, forêt, immeubles des Trois Tilleuls).
  - **Rhode-Saint-Genèse** — le pédagogue de la frontière régionale (facilités, omgevingsvergunning, Mijn VerbouwPremie, ardoise naturelle, forêt de Soignes).
  - **Waterloo** — franc, scénario de tempête (villas quatre façades, tuiles béton des années septante, CoDT, Prime Habitation).

## Faits à ne pas déformer

- Rhode = Région flamande (permis omgevingsvergunning, aides Mijn VerbouwPremie) ; Waterloo = Wallonie (CoDT, Prime Habitation SPW) ; Uccle et Boitsfort = Bruxelles (Renolution suspendue depuis 2025).
- Le Logis et Floréal : classés comme ensemble (arrêtés 2001 et 2007), toitures comprises, tuiles de remplacement identiques ton gris foncé, plan de gestion patrimoniale.
- Uccle : règlement communal d'urbanisme zoné, couverture en harmonie avec les toits voisins.
- Aucun montant de prime ni de prix n'est écrit : conditions « selon revenus et ancienneté, à vérifier ».

## Prochaines communes (par volume)

Wavre (110), La Hulpe (70), Ixelles (70), Auderghem (70), Braine-l'Alleud (40), Nivelles (40) ; page régionale « couvreur Brabant wallon » (50) quand les communes du sud seront publiées.

## Version « problème → solution » (13/10/2026, soir)

Le client a refusé la version descriptive (« au lieu de dire comment sont les toits de la commune, je préfère : vous avez tel problème, nous le réglons… pas de blabla inutile sur la commune »). Chaque page = intro avec phrase d'autorité → 6 couples **Vous avez ce problème** (symptôme ancré dans un lieu connu) → **Nous le réglons** (réponse + lien service) → 4 étapes → permis et primes → quartiers + repères → 4 FAQ → sources.

Repères utilisés (collectés par un agent avec sources Wikipédia FR/EN, sites communaux, patrimoine.brussels, inventaris.onroerenderfgoed.be ; seuls les lieux confirmés ont été retenus) :
- **Uccle** : parc de Wolvendael, Observatoire royal, cimetière du Dieweg, musée Van Buuren, place de Saint-Job, Kauwberg, bois de Verrewinkel, avenue Brugmann. Écartés (non confirmés) : place Vanderkindere, Globe, Bascule, Ferme Rose.
- **Watermael-Boitsfort** : forêt de Soignes, hippodrome de Boitsfort, place Eugène Keym, place Léopold Wiener, église Saint-Hubert, parc Tournay-Solvay, boulevard du Souverain, gare de Boitsfort.
- **Rhode-Saint-Genèse** : chaussée de Waterloo, forêt de Soignes, avenue de la Forêt de Soignes, golf de Sept Fontaines, gare, église Saint-Genèse, Boesdaalhoeve, domaine de Revelingen. Écartés : Petite Espinette (côté Uccle), Termeulen/Terheide, piscine Wauterbos.
- **Waterloo** : chaussée de Bruxelles, église Saint-Joseph, musée Wellington, gare, ferme de Mont-Saint-Jean, domaine d'Argenteuil, drève Richelle, parc Jules Descampe. Écartés : Butte du Lion et Hougoumont (Braine-l'Alleud), monument Gordon (Lasne), Route du Lion.

Règles ajoutées au validateur : 5–8 couples, problème 8–40 mots sans lien, solution 10–50 mots, ≥ 4 services liés, ≥ 3 problèmes ancrés dans un quartier ou un repère, 4–10 repères, « chaussée de La Hulpe » interdite.

## Braine-l'Alleud (13/10/2026, soir) — première page au motif `toiture-<commune>`

Décision issue de l'étude des slugs (`13-etude-slugs-communes.md`) : « toiture Braine-l'Alleud » 170/mois contre 40 pour « couvreur » → slug `toiture-braine-l-alleud`, title et H1 commencent par « Toiture Braine-l'Alleud » et contiennent « couvreur » et « toiturier ». Mécanique : `zoneTerm()` dans `zones.ts` (Couvreur / Toiture selon le slug), validateur et test construit adaptés, test unitaire qui accepte les deux motifs.

SERP « toiture braine-l'alleud » : local pack (Dubois Toiture, Top Alliance, Mon couvreur pro), puis Trustup (Braine-le-Comte !), Facebook, Casius, Pages d'Or — aucune vraie page commune concurrente : opportunité confirmée.

Repères (agent, sources Wikipédia FR, braine-lalleud.be, connaitrelawallonie.be, destinationbw.be) : Butte du Lion, ferme d'Hougoumont, Grand-Place, gare, église Saint-Étienne, parc du Paradis, chaussée d'Alsemberg, parc de l'Alliance ; quartiers : centre, Merbraine, Mont-Saint-Pont, L'Ermite, Ophain-Bois-Seigneur-Isaac, Lillois-Witterzée, Sart-Moulin. **Pièges** : la Butte du Lion, le Mémorial et Hougoumont sont à Braine-l'Alleud (pas Waterloo) ; La Haie Sainte, Papelotte, monument prussien → Lasne ; musée Wellington et Mont-Saint-Jean → Waterloo ; Mont-Saint-Pont ≠ Mont-Saint-Jean ; aucun centre commercial fermé ; pas de règlement communal d'urbanisme propre trouvé (SDC de 2012 seulement) — non affirmé sur la page.

Photo de hero : `villa-renovee-tuiles-grises-garage` (vraie photo du lot 3, alt sans commune). Sources : commune (site en 403 pour les robots, accessible en navigateur), SPW Logement, Agence wallonne du patrimoine.
