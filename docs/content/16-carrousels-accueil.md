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
- Les logos s'affichent **en couleur en permanence** (demande du client du 14/10/2026) : pas de passage en gris ni d'atténuation au repos. Les noms écrits prennent donc le bleu foncé de la marque, pour tenir le même poids visuel que les logos colorés.
- Sous `prefers-reduced-motion: reduce`, l'animation disparaît : la copie est masquée et la liste devient une grille centrée, lisible d'un coup d'œil.

### Logos (relevé du 14/10/2026)

Six logos sur dix sont en place. Les fichiers viennent **uniquement du site officiel du fabricant** — jamais d'un agrégateur type seeklogo ou worldvectorlogo, dont les licences ne sont pas fiables. Chacun a été détourné de son cadre transparent et ramené à 88 px de haut (deux fois la hauteur d'affichage).

| Marque | Logo | Source | Droit d'usage par un poseur tiers |
|---|---|---|---|
| Velux | ✅ | salle de presse officielle | **Autorisé par écrit**, sous conditions (voir ci-dessous) |
| Recticel | ✅ | médiathèque officielle | **Autorisé** : fichiers « for marketing purposes on behalf of our trade partners » |
| Wienerberger | ✅ | page media service | Usage éditorial seulement → accord à demander (communications@wienerberger.com) |
| VMZINC | ✅ | habillage du site | **Interdit sans autorisation écrite** (informations légales) → info@vmbuildingsolutions.com |
| Derbigum | ✅ | médiathèque WordPress | Aucune condition publiée, donc ni autorisé ni interdit → +32 2 334 87 00 |
| Elevate | ✅ | habillage du site | Aucune condition publiée → holcimelevate.com/benelux-fr/contactez-nous |
| Eternit | ❌ | — | Etex ne publie qu'un logo **blanc**, invisible sur fond clair |
| Rheinzink | ❌ | — | Idem, version blanche seulement ; accord écrit préalable exigé |
| Rockwool | ❌ | — | Logo diffusé en EPS d'impression uniquement, pas de fichier web |
| Isover | ❌ | — | Rien de public, et le logo a changé en 2023 : tout fichier trouvé ailleurs risque d'être périmé |

**Décision du client (14/10/2026)** : afficher les logos sans attendre les accords écrits, au motif qu'il pose ces marques quotidiennement. Le risque a été exposé et assumé. Les demandes d'autorisation restent à envoyer, idéalement couplées à une adhésion aux réseaux de poseurs (VMZINC at Work, applicateur agréé Derbigum), qui transforme la tolérance en droit explicite.

**Condition Velux à ne jamais retirer** : sa charte pour installateurs impose la mention « VELUX and the VELUX logo are registered trademarks of VKR Holding A/S. ». Elle est portée par le champ `notice` dans `brands.ts` et s'affiche sous le bandeau. Supprimer le logo Velux supprime la mention automatiquement.

### Corrections de marques appliquées

- **Firestone → Elevate.** Firestone Building Products a été racheté par Holcim et rebaptisé **Elevate** en juin 2022 ; la gamme EPDM reste RubberGard. Afficher un logo Firestone reviendrait à montrer une marque que le fabricant n'utilise plus.
- **Eternit / Cedral à vérifier.** Chez Etex, `eternit.be` ne couvre plus que les plaques ondulées fibres-ciment ; l'ardoise de toiture belge francophone est vendue sous la marque **Cedral**. En Belgique « ardoises Eternit » reste l'usage courant dans le métier, le nom est donc gardé, mais à confirmer avec le client.
- **Koramic** n'a pas de logo propre : Wienerberger a réuni ses marques sous l'ombrelle wienerberger en octobre 2024. Attention, `koramic.be` est un family office courtraisien sans lien avec Wienerberger.

### Deux pièges techniques résolus

1. **Chargement différé impossible dans un bandeau animé.** Le `loading="lazy"` ne se redéclenche pas quand une marque entre par la droite sous l'effet d'une translation CSS : les logos restaient blancs. Ils sont donc en `loading="eager"` avec `fetchpriority="low"`, seule exception du site à la règle du chargement différé, inscrite comme telle dans `technical-seo.test.mjs` et `homepage.test.mjs`.
2. **Équilibre optique.** À hauteur égale, un logo empilé comme Recticel paraît deux fois plus petit qu'un logotype large comme Wienerberger. La hauteur d'affichage est donc calculée par logo à partir de la racine du rapport largeur/hauteur (32 px minimum, 56 px maximum), ce qui égalise les surfaces occupées.

### Piège d'accessibilité à ne pas réintroduire

Les noms de marque écrits sont colorés avec `--color-primary`, **jamais** avec une opacité réduite. Une opacité sur du texte éclaircit sa couleur effective : la première version, à `opacity: 0.65`, tombait à un contraste de 3,18 pour 4,5 requis, et faisait chuter le score d'accessibilité à 97.


## Ordre des sections de l'accueil (modifié le 14/10/2026)

Le Prompt 3 de la méthode Core 30 plaçait le formulaire juste après les étapes, soit à environ 22 % de la hauteur de page. Le client l'a trouvé trop haut : le visiteur était sollicité avant d'avoir vu ce que l'entreprise fait.

Nouvel ordre, le formulaire descendant après les services **et** les preuves :

`hero → intro → pourquoi-nous → etapes → categories → services-phares → realisations → marques → devis → zones → a-propos → faq → sources → zones-liste → cta-final`

Le formulaire est désormais à **50 %** de la page, juste après le carrousel des chantiers et le bandeau des marques. L'ancre `#devis` (quatre liens, dont le bouton du hero) continue de fonctionner et atterrit sous l'en-tête collant.

C'est un écart assumé par rapport à l'ordre du Prompt 3 : le test `homepage.test.mjs` a été mis à jour en conséquence, ainsi que les bornes de découpe des tests qui s'appuyaient sur `#devis` et `#marques`.

## Appels à l'action de l'en-tête (14/10/2026)

L'en-tête collant ne portait que le numéro de téléphone. Les visiteurs qui n'appellent pas — ceux qui regardent le soir, ou qui préfèrent écrire — n'avaient rien à cliquer avant d'arriver au formulaire, désormais à mi-page.

Un second bouton **« Devis gratuit »** a été ajouté à côté du numéro, en contour et non en plein, pour que l'appel reste l'action principale. Il pointe sur `#devis` quand la page porte le formulaire (accueil et Contact) et sur `/contact` partout ailleurs : aucune ancre morte, ce que vérifie déjà `technical-seo.test.mjs`.

Seuils : les deux boutons disparaissent sous 900 px, où la barre collante du bas porte déjà les mêmes actions ; entre 900 et 1100 px, seul le numéro reste, pour que l'en-tête ne se tasse pas.

**Pourquoi pas une bulle flottante en bureau**, comme envisagé : le numéro est déjà visible en permanence dans l'en-tête collant, une bulle ferait doublon ; et une pastille ronde en bas à droite est lue comme un chat, donc soit ignorée par réflexe, soit cliquée par des visiteurs qui s'attendent à écrire et tombent sur un appel.
