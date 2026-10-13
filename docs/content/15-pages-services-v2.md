# 15 — Pages services v2 : « problème → nous le réglons » (13/10/2026)

## Pourquoi

Le client a jugé les 31 pages services v1 « trop de blabla » et a demandé le format des pages communes (« vous avez ce problème ? nous le réglons »), **plus technique et matériel**, avec les étapes du devis et peu de texte. Page témoin validée : Réparation de fuite de toiture (« oui j'ai bien construit »), puis déploiement sur les 30 autres (5 hubs + 25 enfants + 5 pages générales) le 13/10/2026.

## Structure d'une page (type `ServiceContentV2`, `src/lib/pages.ts`)

1. **Hero** inchangé (h1, sous-titre, CTA, badges).
2. **`opening`** : 1 paragraphe, 25–90 mots. Pour un hub, phrase d'autorité (« la référence de… »), jamais de chiffre.
3. **`problems`** : H2 avec « ? » (« Vous avez un problème de X ? Nous le réglons »), 5–8 couples question (6–30 mots, terminée par « ? », sans lien) → réponse (10–55 mots, commence par « Nous », avec le lien `[[Page]]` vers l'enfant/sœur concerné). Une photo (hero de la page liée) par couple.
4. **`tech`** : H2 « Matériaux et techniques… » / « Ce que nous posons », 4–6 items `label` (1–6 mots) + `text` (6–45 mots). C'est la partie « technique et matériel » demandée.
5. **Étapes** : `<ProcessSteps />` (4 étapes partagées `src/data/process.ts`).
6. **`cost`** : H2 contenant « Bruxelles » (« Ce qui fait varier le prix d'un X à Bruxelles »), 3–5 puces de 6–45 mots, aucun montant, aucun %. La TVA à 6 % est le seul chiffre toléré (liste `ALLOWED_NUMBERS`).
7. Sources officielles + date de mise à jour, galerie « Sur nos chantiers », FAQ (inchangée, 4–5 vraies questions de forums), grille des pages liées, CTA final (`finalCta`, 15–70 mots, numéro de téléphone obligatoire).

Budget total 250–800 mots hors FAQ (hub 400–1 200 construit, enfant 350–1 100).

## Règles de rédaction tenues

- Pas de marque en tête de réponse (refusé par le client) : réponses « Nous… ».
- Pas de récit, pas de « nous venons de Bruxelles », pas d'adresse de rue.
- Chaque hub lie **tous** ses enfants dans `problems` ou `tech` + les liens imposés (`REQUIRED_LINKS` : Rénovation → Isolation de toiture, Toiture plate → Isolation de toiture plate).
- Chaque enfant lie au moins une page sœur de sa famille et un autre service.
- Aucune suite de 8 mots commune à deux pages (`tests/pages-duplication.test.mjs`) : varier les formules de devis/TVA/CTA d'une page à l'autre.
- Honnêteté technique : dire quand une réparation ne tiendra pas, quand le sarking n'a pas de sens, quand la haute pression abîme.

## Contrôles

- `node scripts/check-page-content.mjs <slugs>` → `checkServiceV2` / `checkHubV2`.
- `node --test tests/pages-duplication.test.mjs`.
- `npm run verify` (13/10 soir : 69 tests unitaires, 45 pages, 2 700 liens, 55 tests construits, Lighthouse 100/100/100/100 sur hub Rénovation et enfant Zinc).

## Sauvegarde v1

Les 31 JSON v1 sont conservés hors projet dans le scratchpad de session (`pages-v1-backup/`) ; les champs `faq`, `sources`, `updated`, meta et h1 ont été repris tels quels en v2.
