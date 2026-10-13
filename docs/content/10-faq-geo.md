# 10 — FAQ par page service et visibilité IA (GEO)

**13/10/2026.** Demande du client : rendre le site citable par les assistants IA (ChatGPT, Perplexity, Claude, AI Overviews). Constat de départ : robots.txt ouvert, schema LocalBusiness solide, NAP cohérent, mais une seule FAQ (accueil), aucun `sameAs`, aucun `llms.txt`.

## Ce qui a été fait

1. **FAQ sur les 31 pages services** (5 hubs/phares + 26 enfants et généraux) : champ `faq` dans `src/data/pages/<slug>.json`, 5 questions par page, soit 155 Q/R.
   - Questions issues de **vrais fils de forums** (BricoZone, Pim.be, forumconstruire, RTBF, Bruxelles Environnement) — liste des fils dans `docs/core30/regles-veryroof.md` §3.
   - **Un ton par page** (tableau dans `docs/core30/regles-veryroof.md` §4).
   - Rendu : composant `src/components/service/ServiceFaq.astro` (section `#faq`, accordéon `<details>`), inséré avant la grille des pages liées dans `ChildPage.astro` et `HubPage.astro`.
   - Schema : nœud `FAQPage` ajouté au `@graph` JSON-LD de chaque page, texte des réponses sans balises.
   - Titre H2 par défaut « <Nom de page> : vos questions », surcharge possible par `faqHeading`.
2. **Validateur** (`scripts/check-page-content.mjs`, fonction `faqErrors`) : 4–5 questions, 6–20 mots, « ? » final ; réponses 2–4 phrases, 25–90 mots, phrases ≤ 35 mots ; au moins un lien `[[Nom exact]]` par FAQ, jamais d'auto-lien ; aucune question reprise sur une autre page ni sur l'accueil ; mêmes interdits que le corps (prix, chiffres, pourcentages, formules bannies, Renolution).
3. **Test anti-duplication** : les réponses de FAQ entrent dans la détection des suites de 8 mots (clé `answer` non exclue).
4. **Test construit** `tests/built/faq.test.mjs` : section visible et schema identiques, lien interne présent, `llms.txt` complet.
5. **`/llms.txt`** généré à la construction (`src/pages/llms.txt.ts`) depuis `services.ts`, `site.ts` et `zones.ts`.
6. **`sameAs`** : `site.ts` exporte `sameAs` (profils non vides de `pending.social`), ajouté au nœud organisation de l'accueil dès qu'une URL est renseignée.

## Ce qu'il reste au client

- Renseigner `pending.social` (fiche Google Business, Facebook…) → `sameAs` apparaît automatiquement.
- Avis Google : aucun `aggregateRating` tant qu'il n'y a pas de vrais avis avec note et nombre exacts.
- Preferred Sources (bouton Google) : écarté, sans effet pour un site de service local (voir conversation du 13/10/2026).
