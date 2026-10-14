# 16 — Carrousels de l'accueil (14/10/2026)

Deux bandeaux ajoutés sur l'accueil, entre « Services phares » et « Zones desservies ».

## 1. « Des toits que nous avons refaits » — `#realisations`

Composant `src/components/home/WorkCarousel.astro`. Dix vraies photos de chantier, listées dans `homePhotos.carousel` (`src/data/photos.ts`) et choisies pour couvrir tous les métiers : tuiles, sarking, zinguerie, toit plat, charpente, équipe. Aucune n'est déjà employée ailleurs sur l'accueil.

Fonctionnement :
- La piste est une zone défilante native avec accrochage (`scroll-snap`). Elle se fait glisser au doigt sur mobile, à la molette ou au clavier sur ordinateur, **sans JavaScript**.
- Les flèches sont masquées dans le HTML servi (`hidden`) et ne sont révélées que par le script : jamais de bouton inerte. Elles disparaissent aussi sous 640 px, où le glissement au doigt suffit.
- Le déplacement se fait par `scrollLeft +=`, l'adoucissement par `scroll-behavior: smooth` en CSS. La forme `scrollBy({ behavior })` est ignorée en silence par les navigateurs anciens ; cette écriture-ci fonctionne partout, et au pire le déplacement est instantané.
- La zone défilante est un `<div role="region">` **distinct** du `<ul>`. Poser le rôle sur la liste lui ferait perdre son rôle de liste et ses `<li>` ne seraient plus annoncés comme tels (c'est ce qui a fait tomber le score d'accessibilité à 97 au premier essai).
- Toutes les images sont en `loading="lazy"` : la section est très au-dessous de la ligne de flottaison et ne doit pas concurrencer l'image LCP du hero.

Pour changer les photos : modifier la liste `homePhotos.carousel`. Six à douze entrées (contrôlé par les tests).

## 2. « Les marques que nous posons » — `#marques`

Composant `src/components/home/BrandCarousel.astro`, liste dans `src/data/brands.ts`.

- Défilement infini en CSS pur, sans JavaScript : deux pistes identiques, la seconde masquée aux lecteurs d'écran (`aria-hidden`), translation d'exactement une largeur de piste. Chaque piste porte son écart **à gauche uniquement**, sinon la jonction entre les deux montrerait un trou deux fois plus large.
- Le défilement s'arrête au survol et au focus clavier.
- Sous `prefers-reduced-motion: reduce`, l'animation disparaît : la copie est masquée et la liste devient une grille centrée, lisible d'un coup d'œil.

### Logos

Tant qu'aucun fichier n'est fourni, le nom de la marque s'affiche en toutes lettres avec sa spécialité en dessous. C'est volontaire : mieux vaut un nom propre qu'un logo basse définition récupéré n'importe où. Pour poser un vrai logo : déposer le fichier dans `src/assets/logos/` (SVG de préférence, sinon PNG à fond transparent) et renseigner `logo` dans `brands.ts`. Le build échoue si le fichier est absent. N'utiliser que les fichiers officiels du fabricant ou de son espace presse : les logos restent la propriété de leurs titulaires.

### Règle de contenu

Le bandeau est une information factuelle — « les marques que nous posons » — et **jamais** une affirmation de partenariat, d'agrément ou de certification. Un test construit refuse les mots « partenaire », « certifié », « agréé » et « officiel » dans cette section.

**À CONFIRMER PAR LE CLIENT** : seule la pose de fenêtres de toit Velux est établie par le contenu du site. Les neuf autres marques de `brands.ts` sont les marques courantes du métier en Belgique, proposées pour relecture. Retirer celles qui ne sont pas posées avant la mise en ligne.
