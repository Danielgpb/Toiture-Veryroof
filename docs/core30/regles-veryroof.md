# Core 30 adapté à Toiture Veryroof — FAQ, recherche forums et ton par page

Rédigé le 13/10/2026. Complète `core30-prompts.md` (série de prompts vierge du client, orientée US/Lovable) et `core30-regles.md` (règles complètes, version ALI-KA). Ce fichier est la version appliquée au site de couvreur : il prime en cas de doute.

## 1. Ce que disent les sources

| Source | Ce qu'elle impose pour la FAQ | Ce qu'elle impose pour le ton |
|---|---|---|
| Prompts Core 30 (Prompt 2, accueil) | 5-6 questions : coût, délai, confiance, process. Formulées comme le client les pose. Réponse d'abord, explication ensuite. 2-4 phrases. Jamais « pourquoi nous choisir » ni « quels services proposez-vous ». | « Parler comme un expert local », langage naturel et conversationnel, niveau de lecture simple, phrases courtes, ton confiant et rassurant, aucune affirmation générique. |
| Prompts 5 et 6 (pages services) | **Aucune FAQ prévue.** L'ajout d'une FAQ par page service est une extension décidée par le client (règles ALI-KA). | Idem Prompt 2. |
| Règles ALI-KA §8 | 4-5 questions par page, tirées de **vrais forums**, jamais inventées. Réponses de 2-4 phrases. Au moins un lien interne par FAQ. Dans le HTML visible **et** dans le schema FAQPage. | — |
| Règles ALI-KA §9 | — | **Un ton distinct par page.** Varier les ouvertures, les longueurs de phrases et de paragraphes. Références locales concrètes. Vocabulaire IA interdit. |
| Règles ALI-KA §13 | Questions récurrentes → FAQ. Plaintes → réassurance. Prix cités → transparence. Sources → liens externes. | — |
| Règles du projet Veryroof (validateur) | Pas de prix, pas de chiffre hors liste autorisée, pas de pourcentage hors « 6 % », phrases ≤ 35 mots, formules interdites, aucune suite de 8 mots partagée entre pages, liens par `[[Nom exact de page]]`. | Français de Belgique (corniche, toiturier, commune, syndic). |

**Arbitrage prix** : le Core 30 ALI-KA veut de la transparence tarifaire ; le validateur Veryroof interdit les montants (décision client du 12/10/2026, section coût sans chiffres). On garde la décision Veryroof : les prix relevés sur les forums servent à expliquer *ce qui fait varier le prix* et à répondre « ça dépend de quoi ? », jamais à afficher un montant.

## 2. Règles FAQ appliquées (contrôlées par `scripts/check-page-content.mjs`)

- Champ `faq` dans chaque `src/data/pages/<slug>.json` : tableau de 4 à 5 objets `{ question, answer }`.
- `question` : se termine par « ? », 6 à 20 mots, formulée à la première personne du client ou en « vous ». Ne reprend pas le H2 « Combien coûte… à Bruxelles ? » de la section coût (déjà traité), sauf angle différent.
- `answer` : 2 à 4 phrases, 25 à 90 mots, réponse directe dans la première phrase. Phrases ≤ 35 mots.
- Au moins une réponse de la FAQ contient un lien `[[Nom exact]]` vers une autre page service (jamais vers la page elle-même).
- Aucune question identique sur deux pages (comparaison insensible à la casse et aux accents).
- Mêmes interdits que le corps : prix, chiffres non autorisés, pourcentages, formules bannies, primes Renolution présentées comme acquises.
- Rendu : section `#faq` « Questions fréquentes » avant la grille des pages liées ; schema `FAQPage` ajouté au graphe JSON-LD de la page.

## 3. Sources forums relevées (13/10/2026)

Fils réels lus pour nourrir les questions. Les prix qui y figurent ne sont **pas** repris sur le site.

**BricoZone.be (forum rénovation belge, source principale)**
- Avis sur devis toiture / Conseil devis toiture / Devis remplacement toiture — écarts de 15 000 € entre devis identiques, que comparer, acompte normal ou pas.
- Prix/pose EPDM ou bitume — quel choix pour un toit plat, durée de vie, soudures.
- Démoussage toiture, utilité ? — « 2 500 € pour 140 m², est-ce utile ? », démarchage à domicile, haute pression interdite sur béton.
- Réparation corniche : quelles questions poser ? / Fuite soudure corniche / Corniche bouchée ⇒ fuite d'eau ? / Gouttière à la place de vieille corniche — soudure zinc, dilatation, vocabulaire bruxellois.
- Fuite solin de cheminée / Fuite solin jonction toit-mur — plomb ou bande bitumineuse, fissure du mortier.
- Pose de Velux : estimation budgétaire — permis, taille, lumière.
- Traitement ancienne charpente / Poutre principale fissurée et bois pourri — vermoulure, infiltration à régler d'abord, renforcer ou remplacer.
- Ardoises naturelles / Choix ardoises artificielles / Durée de vie ardoises naturelles / Remplacement toiture ardoise vers tuile — naturelle ou artificielle, quelle durée, changer de matériau = permis.
- Enlèvement eternit (amiante) / Renouvellement toiture : coût du démontage — obligation, qui peut le faire, évacuation.
- Toit plat végétal : portée des solives / Structure toiture plate végétalisée — poids, structure, anti-racines.
- Humidité dans nouveau toit plat / Infiltrations toiture isolée, condensation ? / Sous-toiture, isolant et vide d'air — toiture chaude vs froide, condensation.
- Tuiles de plus de 50 ans / Choix tuile : terre cuite ou béton ? / Étanchéité des tuiles — porosité, remplacement à l'identique sans permis.
- Futur achat maison : comment voir si un toit est encore bon ? / Question sous-toiture — ce qu'un expert regarde.
- Filtre de descente d'eau pluviale — fréquence de nettoyage des corniches.
- Finitions de remplacement de toiture bâclées, que faire ? — réception du chantier, garantie.

**Pim.be (forum copropriétés forcées, Belgique)**
- Clé de répartition pour réfection de la toiture / Rénovation toiture partage frais / Infiltrations toiture — qui paie, majorité des deux tiers en AG, devis pour l'assemblée.

**forumconstruire.com**
- Démarchage à domicile : nettoyage de la toiture = arnaque ? (49 messages) / Toiture poreuse, faut-il vraiment la remplacer ?

**Médias et institutions belges (pour les faits)**
- RTBF : faux couvreurs et démarchage (arnaques après tempête).
- Bruxelles Environnement : amiante (pas d'obligation d'enlever si intact ; obligatoire dès travaux), primes Renolution suspendues depuis 2025.
- Urbanisme.brussels : fenêtre de toit dispensée de permis sous conditions ; changement d'aspect = permis.
- Assureurs belges : déclaration de sinistre tempête sous huit jours ouvrables, photos avant réparation, bâchage conservatoire couvert.

## 4. Ton par page (un seul ton par page, à tenir dans la FAQ)

| Page | Ton | Ouverture type |
|---|---|---|
| Réparation de toiture (catégorie) | Diagnostic, méthodique : « on cherche avant de réparer » | constat |
| Réparation de fuite de toiture | Enquêteur : suivre l'eau, déduction | scénario (la tache au plafond) |
| Remplacement de tuiles et ardoises cassées | Court, pratique, sans bavardage | question |
| Réparation de toiture après tempête | Urgence calme, checklist assurance | chronologie |
| Réparation de faîtage et de solins | Précis, détail du métier (plomb, zinc, mortier) | anatomie du toit |
| Réparation de souche de cheminée | Cause → effet, explicatif | constat |
| Dépannage toiture d'urgence 24h/24 | Direct, phrases courtes, « ce qui se passe dans l'heure » | ordre chronologique |
| Isolation de toiture (catégorie) | Didactique, confort d'abord, patient | question |
| Isolation des combles par l'intérieur | Pédagogue : expliquer les couches, le pare-vapeur | analogie (le pull et le coupe-vent) |
| Isolation par l'extérieur (sarking) | Comparatif honnête : quand ça vaut le coup, quand non | si / alors |
| Isolation de toiture plate | Myth-busting : toiture froide, condensation | idée reçue démontée |
| Zinguerie et gouttières (catégorie) | Terrain, vocabulaire bruxellois (corniche), artisan | anecdote de rue |
| Pose et remplacement de gouttières | Conseil de choix : zinc, alu, PVC, corniche | comparaison |
| Réparation de gouttières | Pragmatique : réparer ou remplacer ? | question |
| Nettoyage de gouttières | Calendrier, préventif, saisons | constat d'automne |
| Chéneaux, noues et descentes d'eau | Technique, précis, « là où l'eau se concentre » | anatomie |
| Rénovation de toiture (phare) | Posé, long terme, patrimoine bruxellois 1880-1930 | constat historique |
| Toiture en tuiles | Franc, comparatif terre cuite / béton | question |
| Toiture en ardoises | Patrimoine : naturelle ou artificielle, durée | constat |
| Toiture en zinc | Artisanal : joint debout, patine, longévité | geste du zingueur |
| Réparation et traitement de charpente | Logique diagnostique : si… alors… | observation (sciure, trous) |
| Enlèvement d'ardoises amiante-ciment | Réglementaire, calme, sécurité sans alarmisme | fait réglementaire |
| Toiture plate (phare) | Technique, direct, comparaison franche des membranes | constat |
| Toiture EPDM | Franc : avantages et limites | idée reçue |
| Roofing bitumineux | Honnête : réparer ou remplacer, durée restante | scénario (cloques, fissures) |
| Démoussage et traitement hydrofuge | Myth-busting : « utile ou arnaque ? », démarchage | question du forum |
| Inspection et expertise de toiture | Acheteur de maison : checklist d'expert | scénario (visite de bien) |
| Pose de fenêtres de toit Velux | Pratique : permis, lumière, taille | question |
| Toiture végétalisée | Enthousiaste mais réaliste : poids, structure, entretien | constat |
| Toiture pour copropriétés et syndics | Posé, vocabulaire juridique belge : AG, quotités, deux tiers | situation d'AG |

Vocabulaire IA interdit (liste `BANNED` du validateur + Core 30) : « n'hésitez pas », « il est important de noter », « dans un monde où », « nous comprenons », « solution complète », « clé en main », « large éventail », « essentiel », « crucial », « robuste »…


## 5. Format v2 des pages services (13/10/2026)

Décidé par le client après relecture : les pages services suivent le même format que les pages communes — « Vous avez ce problème ? Nous le réglons » — en plus technique (section « Matériaux et techniques ») et avec les 4 étapes du devis. Le ton par page du tableau ci-dessus reste valable pour la FAQ ; le corps, lui, est court et factuel. Détail et règles du validateur : `docs/content/15-pages-services-v2.md`.
