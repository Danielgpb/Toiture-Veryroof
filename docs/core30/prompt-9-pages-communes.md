# Prompt 9 — Pages communes (ajout Veryroof au Core 30)

Rédigé le 13/10/2026. La série Core 30 (`core30-prompts.md`) ne prévoit aucun prompt pour les pages localité : elle ne cite les « service areas » que comme liste à afficher. Ce prompt comble le trou, pour tout site de service qui couvre plusieurs communes. Réutilisable pour les prochaines communes (Wavre, La Hulpe, Ixelles, Auderghem… voir `docs/content/etude-mots-cles.md` § 4).

## Quand créer une page commune

- Volume mesurable sur « couvreur <commune> » ou « toiture <commune> » (DataForSEO, Belgique, fr) → page complète.
- Volume nul mais commune limitrophe du siège → page de proximité, même structure, un peu plus courte.
- Jamais de page « satellite » : si on n'a rien de local à dire, on ne crée pas la page.

## Étape 1 — SERP réelle (avant d'écrire)

`serp_organic_live_advanced` sur la requête, Belgique, fr. Noter : qui ranke (pages commune de concurrents, pages d'accueil, annuaires), les PAA, la structure des 2–3 meilleures pages (`on_page_content_parsing`). On prend la **structure et les sujets**, jamais le texte.

## Étape 2 — Fiche locale (faits vérifiés uniquement)

- **Région** : Bruxelles / Wallonie / Flandre → change le permis (RRU + règlement communal / CoDT / omgevingsvergunning), les aides (Renolution suspendue / Prime Habitation / Mijn VerbouwPremie), la langue des procédures (communes à facilités).
- **Bâti** : époques, matériaux dominants, types (maison de maître, rangée, villa quatre façades, cité-jardin, immeuble), éléments classés ou à l'inventaire.
- **Environnement** : forêt, arbres, exposition au vent, mitoyenneté.
- **Quartiers et axes** : 5 à 12 noms réels.
- **Distance depuis le siège** : en mots (dix minutes, un quart d'heure), jamais de chiffre.

## Étape 3 — Structure de la page (`ZoneContent`, `src/lib/pages.ts`) — version « problème → solution », décidée par le client le 13/10/2026

Le client a d'abord refusé la version récit (« trop de blabla »), puis la version descriptive (« au lieu de dire comment sont les toits de la commune, je préfère : vous avez tel problème, nous le réglons »). Structure finale :

1. `opening` — deux ou trois phrases avec la phrase d'autorité (« la référence », « numéro un » en lettres).
2. `problems` — H2 + **5 à 8 couples problème → solution**. Le problème est un symptôme vécu (« la corniche déborde sur la façade… »), **ancré dans un lieu connu** (quartier, parc, avenue, place : au moins 3 couples sur les 5–8). La solution répond en une ou deux phrases avec le lien `[[Nom exact]]` du service (≥ 4 services distincts).
3. **Étapes** partagées « Comment ça se passe » (`src/data/process.ts`).
4. `rules` — permis, patrimoine, aides **de la bonne Région**.
5. `quartiers` (5–12) + `landmarks` (4–10 repères emblématiques vérifiés : parcs, places, avenues, monuments). Les repères sont collectés par un agent de recherche (Wikipédia FR, sites communaux, Google Maps) avec source, en écartant les confusions (ex. Butte du Lion = Braine-l'Alleud).
6. `faq` — 4 questions réelles propres à la commune.
7. `finalCta`, `homeLink`, `summary`, `sources`, `updated`.

Budgets (validateur `checkZonePage`) : 250–700 mots hors FAQ, problème 8–40 mots, solution 10–50 mots, phrases ≤ 35 mots, pas de prix, pas de rue du siège (« chaussée de La Hulpe » interdite).

### Rythme « Helpcar » (modèle donné par le client le 13/10/2026 : helpcar.be, pages /zones/)
- Ouverture : « Besoin d'un couvreur à <commune> ? Toiture Veryroof, c'est la référence… » puis **une phrase qui aligne trois situations avec un lieu connu** (« une fuite avenue Brugmann, une ardoise envolée au Fort Jaco, une corniche qui déborde à Calevoet ? ») et le numéro. Deuxième paragraphe : les services liés en ligne, « quel que soit le problème, nous réglons ça ».
- Problèmes : **questions courtes** avec un lieu (« Des ardoises dans le jardin après la tempête, sur une villa du Fort Jaco ? »), réponse qui commence par « Nous… » et finit par le lien.
- Quartiers et repères : H2 « De <repère A> à <repère B> : nos quartiers à <commune> », une phrase « <commune>, nous connaissons : … », puis les lieux par paires « ✓ A & B ».
- Le nom de l'entreprise : dans l'ouverture (phrase d'autorité) et dans le H2 « Pourquoi appeler Toiture Veryroof ? » (bloc partagé de 4 points), **pas en tête de chaque réponse** (refusé : « t'exagères »).

## Étape 4 — Ton

- Vouvoiement, direct, factuel. Pas de récit, pas de scénario, pas de justification géographique.
- Des phrases courtes, des énumérations, des faits locaux vérifiables (classement, règlement communal, Région).
- Aucune suite de 8 mots partagée entre pages (test anti-duplication) : chaque commune a ses faits, donc ses phrases.
- Vocabulaire belge (corniche, toiturier, commune, syndic).

## Étape 5 — Vérification

`node scripts/check-page-content.mjs <slug>` → `npm run verify` (dont `tests/built/zone-pages.test.mjs`) → contrôle visuel.
