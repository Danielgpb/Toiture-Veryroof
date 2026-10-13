# Plan photos — Toiture Veryroof

**12 octobre 2026, 19 h — images générées reçues** : 41 fichiers déposés à la racine du projet (36 visuels + 5 variantes : 4 cadrages verticaux et une seconde version de l'inspection), tous importés dans `src/assets/photos/` (1600 px max, métadonnées supprimées). Plus aucun visuel temporaire. Contrôle visuel sur planche-contact : chaque image correspond à son sujet, sans texte ni logo parasite. Les variantes verticales (`…-vertical.jpg`) sont enregistrées dans le registre pour servir de hero mobile sur les pages correspondantes (Prompts 4 à 6).

Historique : les 19 photos de chantier fournies le même jour ont été retirées (chantier partagé, non utilisables). Chaque emplacement a son prompt de génération ci-dessous (1 à 36).

Pipeline : générer l'image → l'enregistrer exactement sous le nom indiqué → la déposer dans `photos-a-trier/` → `npm run photos` (remplacement du visuel temporaire du même nom, 1600 px max, métadonnées supprimées) → `npm run verify`. Pour une vraie photo brute (IMG-xxxx.jpg), ajouter une correspondance dans `ITEMS` de `scripts/import-photos.mjs`.
Astro génère les WebP responsives au build ; le hero de l'accueil est préchargé (image LCP), les autres images sont en lazy loading.

## Règles pour les textes alternatifs et les noms de fichiers

- Nom de fichier = ce qu'on voit + le service, en minuscules sans accents (`souche-cheminee-solins-zinc.jpg`) : Astro le conserve dans l'URL finale, utile pour Google Images.
- Alt = description honnête de la photo + le service, 60 à 125 caractères, sans bourrage de mots-clés et sans affirmer une commune que l'on ne connaît pas.
- Pas de photo de banque d'images ni d'image générée présentée comme un chantier : les photos générées servent d'illustration d'ambiance ou de visuel de service en attendant une vraie photo, et leur alt le dit implicitement (description de l'image, pas « notre chantier »).

## Accueil

| Emplacement | Fichier | Alt |
|---|---|---|
| Hero bureau (16:9) | `hero-toiture-tuiles-bruxelles.jpg` | Toiture neuve en tuiles terre cuite avec fenêtre de toit sur une maison bruxelloise, vue depuis l’échafaudage |
| Hero mobile (portrait) | `toiture-tuiles-neuve-velux-bruxelles.jpg` | Rénovation de toiture en tuiles terre cuite avec fenêtre de toit Velux, vue en hauteur depuis l’échafaudage |
| Carte Réparation de toiture | `souche-cheminee-solins-zinc.jpg` | Réparation de souche de cheminée : nouveaux solins en zinc posés sur une toiture en tuiles |
| Carte Isolation de toiture | `isolation-sarking-panneaux-contre-lattes.jpg` | Isolation de toiture par l’extérieur (sarking) : panneaux isolants et contre-lattes avant la pose des tuiles |
| Carte Zinguerie et gouttières | `bandeau-corniche-gouttiere-echafaudage.jpg` | Bandeau de corniche anthracite et gouttière neufs posés depuis un échafaudage sur une maison en briques |
| Service phare Rénovation | `toiture-tuiles-anthracite-cheminee.jpg` | Toiture rénovée en tuiles anthracite avec cheminée en briques, fenêtre de toit et rive en zinc |
| Service phare Toiture plate | `toiture-plate-etancheite-neuve.jpg` | Toiture plate d’annexe avec étanchéité neuve, vue sur les jardins voisins |
| À propos (en attendant la photo d'équipe) | `chevrons-neufs-echafaudage-tuiles.jpg` | Chantier de toiture : chevrons neufs en bout de toit en tuiles, vus depuis l’échafaudage |

## Visuel de hero de chaque page (Prompts 4 à 6 et pages communes)

| Page | Fichier | Alt |
|---|---|---|
| /reparation-toiture-bruxelles | `lucarne-solins-zinc-tuiles.jpg` | Lucarne rénovée avec solins et habillage en zinc sur une toiture en tuiles terre cuite |
| /reparation-fuite-toiture-bruxelles | `reparation-fuite-tuile-cassee.jpg` | Réparation d’une fuite de toiture : remplacement d’une tuile cassée |
| /remplacement-tuiles-ardoises-bruxelles | `toiture-ardoises-naturelles-maison-bruxelloise.jpg` | Toiture en ardoises naturelles d’une maison bruxelloise, avec lucarne et cheminée en briques |
| /reparation-toiture-tempete-bruxelles | `bachage-urgence-toiture-tempete.jpg` | Bâchage d’urgence d’une toiture endommagée par la tempête, en attendant la réparation |
| /reparation-faitage-solins-bruxelles | `pose-tuiles-faitage-sous-toiture.jpg` | Pose de tuiles sur lattes et sous-toiture avec raccord de faîtage et solin en zinc contre un mur |
| /reparation-cheminee-bruxelles | `souche-cheminee-solins-zinc.jpg` | Réparation de souche de cheminée : nouveaux solins en zinc posés sur une toiture en tuiles |
| /isolation-toiture-bruxelles | `isolation-sarking-panneaux-contre-lattes.jpg` | Isolation de toiture par l’extérieur (sarking) : panneaux isolants et contre-lattes avant la pose des tuiles |
| /isolation-combles-bruxelles | `isolation-combles-interieur-laine.jpg` | Isolation des combles par l’intérieur : laine minérale posée entre les chevrons |
| /isolation-sarking-bruxelles | `isolation-sarking-panneaux-contre-lattes.jpg` | Isolation de toiture par l’extérieur (sarking) : panneaux isolants et contre-lattes avant la pose des tuiles |
| /isolation-toiture-plate-bruxelles | `isolation-toiture-plate-panneaux.jpg` | Isolation d’une toiture plate : panneaux isolants rigides posés avant l’étanchéité |
| /zinguerie-gouttieres-bruxelles | `bandeau-corniche-gouttiere-echafaudage.jpg` | Bandeau de corniche anthracite et gouttière neufs posés depuis un échafaudage sur une maison en briques |
| /pose-gouttieres-bruxelles | `bandeau-corniche-gouttiere-echafaudage.jpg` | Bandeau de corniche anthracite et gouttière neufs posés depuis un échafaudage sur une maison en briques |
| /reparation-gouttieres-bruxelles | `corniche-zinc-anthracite-toit-plat.jpg` | Corniche métallique anthracite posée en rive d’une toiture plate d’immeuble, échafaudage en place |
| /nettoyage-gouttieres-bruxelles | `nettoyage-gouttieres-feuilles.jpg` | Nettoyage d’une gouttière en zinc remplie de feuilles mortes |
| /cheneaux-descentes-eau-bruxelles | `cheneau-noue-zinc-gros-plan.jpg` | Noue et chéneau en zinc neufs entre deux versants d’une toiture en tuiles |
| /renovation-toiture-bruxelles | `toiture-tuiles-neuve-velux-bruxelles.jpg` | Rénovation de toiture en tuiles terre cuite avec fenêtre de toit Velux, vue en hauteur depuis l’échafaudage |
| /toiture-tuiles-bruxelles | `toiture-tuiles-anthracite-cheminee.jpg` | Toiture rénovée en tuiles anthracite avec cheminée en briques, fenêtre de toit et rive en zinc |
| /toiture-ardoises-bruxelles | `toiture-ardoises-naturelles-maison-bruxelloise.jpg` | Toiture en ardoises naturelles d’une maison bruxelloise, avec lucarne et cheminée en briques |
| /toiture-zinc-bruxelles | `toiture-zinc-joint-debout-annexe.jpg` | Toiture en zinc à joint debout sur l’annexe d’une maison bruxelloise |
| /charpente-bruxelles | `charpente-pannes-bois-traite.jpg` | Pièces de charpente en bois traité posées en rive de toiture, à côté des tuiles existantes |
| /enlevement-ardoises-amiante-bruxelles | `enlevement-ardoises-amiante-ciment.jpg` | Retrait d’ardoises en amiante-ciment par des ouvriers en tenue de protection |
| /toiture-plate-bruxelles | `toiture-plate-etancheite-neuve.jpg` | Toiture plate d’annexe avec étanchéité neuve, vue sur les jardins voisins |
| /etancheite-epdm-bruxelles | `etancheite-epdm-toit-plat-pose.jpg` | Pose d’une membrane d’étanchéité EPDM sur une toiture plate |
| /roofing-bitumineux-bruxelles | `roofing-bitumineux-pose-toit-plat.jpg` | Pose de roofing bitumineux sur une toiture plate : rouleau de membrane et chalumeau près de la cheminée |
| /reparation-toiture-plate-bruxelles | `etancheite-cheminee-toit-plat.jpg` | Réparation de toiture plate : étanchéité refaite autour d’une souche de cheminée avec profil en aluminium |
| /toiture-vegetalisee-bruxelles | `toiture-vegetalisee-sedum-toit-plat.jpg` | Toiture plate végétalisée en sedum sur l’annexe d’une maison bruxelloise |
| /depannage-toiture-urgence-bruxelles | `bachage-urgence-toiture-tempete.jpg` | Bâchage d’urgence d’une toiture endommagée par la tempête, en attendant la réparation |
| /pose-velux-bruxelles | `pose-velux-sous-toiture-lattes.jpg` | Pose d’une fenêtre de toit Velux sur sous-toiture et lattes, avant la couverture en tuiles |
| /demoussage-toiture-bruxelles | `demoussage-toiture-avant-apres.jpg` | Démoussage de toiture : versant couvert de mousse à gauche, tuiles nettoyées et hydrofugées à droite |
| /inspection-toiture-bruxelles | `inspection-toiture-couvreur.jpg` | Couvreur inspectant une toiture en tuiles et notant ses observations |
| /toiture-copropriete-bruxelles | `toiture-immeuble-copropriete-echafaudage.jpg` | Rénovation de la toiture d’un immeuble en copropriété à Bruxelles, échafaudage en façade |
| /couvreur-uccle | `couvreur-uccle-maisons-toits.jpg` | Toits en ardoises et tuiles des maisons de maître d’Uccle, vus en hauteur |
| /couvreur-watermael-boitsfort | `couvreur-watermael-boitsfort-cite-jardin.jpg` | Toits de tuiles rouges des maisons de la cité-jardin de Watermael-Boitsfort |
| /couvreur-rhode-saint-genese | `couvreur-rhode-saint-genese-villa-foret.jpg` | Toiture en tuiles d’une villa de Rhode-Saint-Genèse en lisière de la forêt de Soignes |
| /couvreur-waterloo | `couvreur-waterloo-villa-quatre-facades.jpg` | Villa quatre façades de Waterloo avec toiture en tuiles et lucarnes |

## Photos à faire en vrai (ne pas générer)

1. `equipe-toiture-veryroof.jpg` — l'équipe ou le gérant devant un chantier ou la camionnette, lumière du jour, visages nets, format 3:2 (1200 × 800 px minimum). Remplace la photo de chantier de la section « à propos » (clé `homePhotos.about`) et servira à la page À propos (Prompt 7).
2. `camionnette-toiture-veryroof.jpg` — le véhicule avec le logo, devant une maison bruxelloise, format 16:9. Utile pour la page Contact et la fiche Google.
3. Photos avant / après d'un même chantier (`…-avant.jpg` / `…-apres.jpg`), cadrées pareil : les plus convaincantes pour les pages Rénovation, Démoussage, Réparation.
4. Une toiture en ardoises naturelles et une toiture en zinc à joint debout dès qu'un chantier s'y prête : ce sont les deux manques les plus visibles.

## Prompts de génération (1 à 17 : visuels des services sans équivalent ; 18 à 36 : visuels de l'accueil et des pages tuiles, zinguerie, toit plat)

Chaque prompt est autonome : copiez le bloc tel quel dans votre générateur d'images (Midjourney, Flux, Ideogram, DALL·E…), enregistrez le résultat sous le nom de fichier indiqué, au format indiqué, puis déposez-le dans `photos-a-trier/`. Les prompts sont en anglais, langue mieux comprise par ces outils.

### 1. `toiture-ardoises-naturelles-maison-bruxelloise.jpg`
Usage : page « Toiture en ardoises » (hero) et « Remplacement de tuiles et ardoises cassées »
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture en ardoises naturelles d’une maison bruxelloise, avec lucarne et cheminée en briques »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a freshly re-roofed Brussels townhouse roof covered in natural dark grey slate (Ardennes slate), neat slate courses, a brick chimney with new zinc flashings, a small dormer, zinc gutter, view from a neighbouring rooftop over the slate roofs of a Brussels street
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 2. `toiture-zinc-joint-debout-annexe.jpg`
Usage : page « Toiture en zinc » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture en zinc à joint debout sur l’annexe d’une maison bruxelloise »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a standing-seam zinc roof (pre-weathered grey zinc, vertical seams) on the rear extension of a Brussels brick townhouse, soft reflections of the sky on the metal, neat zinc edge profiles and a zinc gutter, garden walls in the background
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 3. `etancheite-epdm-toit-plat-pose.jpg`
Usage : page « Toiture EPDM » (hero) et carte du service
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Pose d’une membrane d’étanchéité EPDM sur une toiture plate »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: close view of a black EPDM rubber membrane being unrolled and bonded onto the flat roof of a Brussels townhouse extension, roofer's gloved hands pressing the membrane with a roller, visible matte rubber texture and a seam, aluminium edge trim, no faces
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 4. `toiture-vegetalisee-sedum-toit-plat.jpg`
Usage : page « Toiture végétalisée » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture plate végétalisée en sedum sur l’annexe d’une maison bruxelloise »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: an extensive green roof planted with sedum (red, green and yellow succulent carpet) on the flat roof of a Brussels townhouse extension, gravel border, zinc edge, brick façades and rear gardens around, late spring light
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 5. `bachage-urgence-toiture-tempete.jpg`
Usage : page « Dépannage toiture d’urgence 24h/24 » (hero) et « Réparation de toiture après tempête »
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Bâchage d’urgence d’une toiture endommagée par la tempête, en attendant la réparation »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a roofer in work clothes and harness securing a large blue tarpaulin over a storm-damaged pitched tile roof of a Brussels house, a few displaced tiles, battens visible, dark grey stormy sky, wet surfaces, ladder against the gutter, seen from a neighbouring roof, no faces
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 6. `demoussage-toiture-avant-apres.jpg`
Usage : page « Démoussage et traitement hydrofuge » (hero, avant / après)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Démoussage de toiture : versant couvert de mousse à gauche, tuiles nettoyées et hydrofugées à droite »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: one pitched clay-tile roof split in half: left half covered with thick green moss and lichen, right half freshly cleaned, clean terracotta tiles glistening after a water-repellent treatment, clear dividing line, Brussels brick houses in the background
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 7. `enlevement-ardoises-amiante-ciment.jpg`
Usage : page « Enlèvement d’ardoises amiante-ciment » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Retrait d’ardoises en amiante-ciment par des ouvriers en tenue de protection »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: two workers in white disposable protective coveralls, FFP3 masks and gloves carefully removing grey corrugated fibre-cement slates from an old Brussels roof, slates lowered into a labelled white big bag, scaffolding with safety netting, no visible faces
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 8. `isolation-combles-interieur-laine.jpg`
Usage : page « Isolation des combles par l’intérieur » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Isolation des combles par l’intérieur : laine minérale posée entre les chevrons »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: inside the attic of a Brussels townhouse, thick mineral wool insulation panels fitted neatly between wooden rafters, a vapour barrier being stapled on part of the slope, work light, roofer's hands and tools, no faces
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 9. `nettoyage-gouttieres-feuilles.jpg`
Usage : page « Nettoyage de gouttières » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Nettoyage d’une gouttière en zinc remplie de feuilles mortes »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: close-up of gloved hands removing wet autumn leaves and moss from a zinc gutter of a brick house, clay tiles above, a bucket hooked on the ladder, overcast daylight
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 10. `cheneau-noue-zinc-gros-plan.jpg`
Usage : page « Chéneaux, noues et descentes d’eau pluviale » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Noue et chéneau en zinc neufs entre deux versants d’une toiture en tuiles »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: detail of a newly installed zinc valley (noue) and a zinc box gutter between two clay-tile roof slopes of a Brussels townhouse, soldered seams, zinc downpipe, clean metalwork catching soft light
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 11. `inspection-toiture-couvreur.jpg`
Usage : page « Inspection et expertise de toiture » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Couvreur inspectant une toiture en tuiles et notant ses observations »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a roofer in work clothes crouching on a pitched clay-tile roof, examining the flashing of a chimney and taking notes on a tablet, Brussels rooftops and a church spire in the background, overcast light, seen from behind, no face visible
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 12. `toiture-immeuble-copropriete-echafaudage.jpg`
Usage : page « Toiture pour copropriétés et syndics » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Rénovation de la toiture d’un immeuble en copropriété à Bruxelles, échafaudage en façade »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a 1930s Brussels apartment building (five storeys, brick and stone façade, bay windows) with full-height scaffolding, roofers renovating the mansard roof with new slate and zinc dormers, street view with trees
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 13. `reparation-fuite-tuile-cassee.jpg`
Usage : page « Réparation de fuite de toiture » (hero)
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Réparation d’une fuite de toiture : remplacement d’une tuile cassée »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a roofer's gloved hands lifting a cracked clay roof tile and sliding a new matching tile into place on a pitched roof, a water stain on the underlay visible, Brussels rooftops in soft focus behind
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 14. `couvreur-uccle-maisons-toits.jpg`
Usage : page « Couvreur Uccle » (hero, ambiance) — photo d’illustration, pas un chantier
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toits en ardoises et tuiles des maisons de maître d’Uccle, vus en hauteur »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: elevated view over the rooftops of Uccle, Brussels: elegant early-20th-century mansions and villas, natural slate mansard roofs, red clay tile roofs, brick chimneys, mature trees along a quiet avenue, soft morning light
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 15. `couvreur-watermael-boitsfort-cite-jardin.jpg`
Usage : page « Couvreur Watermael-Boitsfort » (hero, ambiance) — photo d’illustration
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toits de tuiles rouges des maisons de la cité-jardin de Watermael-Boitsfort »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: rooftops of a 1920s garden-city neighbourhood in Watermael-Boitsfort, Brussels: small terraced houses with steep red clay tile roofs, white-rendered walls with coloured wooden window frames, hedges and gardens, overcast sky
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 16. `couvreur-rhode-saint-genese-villa-foret.jpg`
Usage : page « Couvreur Rhode-Saint-Genèse » (hero, ambiance) — photo d’illustration
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture en tuiles d’une villa de Rhode-Saint-Genèse en lisière de la forêt de Soignes »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a detached brick villa with a large clay-tile roof and dormers at the edge of a beech forest (Sonian Forest) near Rhode-Saint-Genèse, Belgium, lawn and tall trees, autumn light
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 17. `couvreur-waterloo-villa-quatre-facades.jpg`
Usage : page « Couvreur Waterloo » (hero, ambiance) — photo d’illustration
Format : paysage 16:9, 1920 × 1080 px minimum. Produire aussi une variante portrait 4:5 (1200 × 1500 px) pour les écrans mobiles. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Villa quatre façades de Waterloo avec toiture en tuiles et lucarnes »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a typical Walloon Brabant detached villa in Waterloo, Belgium: brick walls, large hipped clay-tile roof with two dormers, zinc gutters, driveway and hedge, bright overcast daylight
Composition: wide 16:9 landscape frame, eye-level or slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 18. `hero-toiture-tuiles-bruxelles.jpg`
Usage : accueil, image de fond du hero sur ordinateur (image principale du site).
Format : paysage 16:9, 2048 × 1152 px recommandé (1920 × 1080 minimum). JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture neuve en tuiles terre cuite avec fenêtre de toit sur une maison bruxelloise, vue depuis l’échafaudage »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a freshly renovated roof of a Brussels brick townhouse covered in new terracotta clay tiles, a Velux roof window set in the slope, neat ridge, seen from the scaffolding at eave level, grey-blue sky with soft clouds, rooftops and chimneys of the Brussels street in the background
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 19. `toiture-tuiles-neuve-velux-bruxelles.jpg`
Usage : accueil, image de fond du hero sur mobile ; page « Rénovation de toiture » (hero) ; page « Couvreur Waterloo » en attendant son visuel.
Format : portrait 4:5, 1200 × 1500 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Rénovation de toiture en tuiles terre cuite avec fenêtre de toit Velux, vue en hauteur depuis l’échafaudage »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: the same scene as the desktop hero in vertical format: a freshly renovated terracotta clay-tile roof of a Brussels brick townhouse with a Velux roof window, seen from the scaffolding, grey-blue sky with soft clouds above, neighbouring rooftops below
Composition: vertical 4:5 portrait frame, slightly elevated roofer's viewpoint, roof filling the middle of the frame, sky in the upper third, space at the top for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 20. `toiture-tuiles-anthracite-cheminee.jpg`
Usage : accueil, visuel du service phare « Rénovation de toiture » ; pages « Toiture en tuiles » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture rénovée en tuiles anthracite avec cheminée en briques, fenêtre de toit et rive en zinc »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a renovated pitched roof covered in flat anthracite clay tiles, a red brick chimney with new zinc flashings, a roof window, zinc verge trim, viewed from above the gutter line, Brussels houses in the background
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 21. `lucarne-solins-zinc-tuiles.jpg`
Usage : page « Réparation de toiture » (hero) ; page « Couvreur Uccle » en attendant son visuel.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Lucarne rénovée avec solins et habillage en zinc sur une toiture en tuiles terre cuite »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a renovated dormer with fresh white rendered cheeks and brand-new zinc flashings and apron, set in a terracotta clay-tile roof of a Brussels townhouse, bright blue sky with a few clouds, old chimney stacks nearby
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 22. `toiture-tuiles-lucarne-gouttiere-zinc.jpg`
Usage : page « Nettoyage de gouttières » et « Réparation de fuite » en attendant leurs visuels ; page « Couvreur Watermael-Boitsfort » en attendant le sien.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture en tuiles avec lucarne, chéneau et descente d’eau pluviale en zinc, typique des maisons bruxelloises »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a terracotta clay-tile roof of a Brussels townhouse with a dormer, a zinc box gutter and a zinc downpipe running down the slope, lead and zinc flashings, neighbouring tiled roofs and a chimney
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 23. `souche-cheminee-solins-zinc.jpg`
Usage : accueil, visuel de la carte « Réparation de toiture » ; page « Réparation de souche de cheminée » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Réparation de souche de cheminée : nouveaux solins en zinc posés sur une toiture en tuiles »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: an old rendered chimney stack on a terracotta clay-tile roof with freshly fitted bright zinc flashings (solins) around its base, lead soakers, clear sky, close enough to see the metalwork detail
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 24. `pose-tuiles-faitage-sous-toiture.jpg`
Usage : page « Réparation de faîtage et de solins » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Pose de tuiles sur lattes et sous-toiture avec raccord de faîtage et solin en zinc contre un mur »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: clay tiles being laid on wooden battens over a grey breathable underlay, the abutment and ridge against a brick wall finished with a new zinc flashing, roofer's gloved hands placing a tile, no faces
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 25. `isolation-sarking-panneaux-contre-lattes.jpg`
Usage : accueil, visuel de la carte « Isolation de toiture » ; pages « Isolation de toiture » et « Isolation par l'extérieur (sarking) » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Isolation de toiture par l’extérieur (sarking) : panneaux isolants et contre-lattes avant la pose des tuiles »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: sarking insulation in progress: rigid insulation boards laid over the rafters of a pitched roof with fresh green-treated counter-battens, the roof fully stripped of tiles, a Brussels brick gable wall beside it, overcast light
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 26. `pose-velux-sous-toiture-lattes.jpg`
Usage : page « Pose de fenêtres de toit Velux » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Pose d’une fenêtre de toit Velux sur sous-toiture et lattes, avant la couverture en tuiles »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a Velux roof window frame freshly installed on a pitched roof covered in black underlay and wooden battens, flashing kit in place, first rows of dark clay tiles below, bright sky
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 27. `fenetre-de-toit-velux-interieur.jpg`
Usage : page « Pose de fenêtres de toit Velux » (galerie, vue intérieure).
Format : portrait 4:5, 1200 × 1500 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Fenêtre de toit Velux vue de l’intérieur après la pose, avec son embrasure plafonnée »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: the inside of a renovated attic room: a new Velux roof window in the sloping ceiling with a neatly plastered splayed reveal, soft daylight coming in, white walls, no furniture clutter
Composition: vertical 4:5 portrait frame, eye-level viewpoint from inside the room, window centred in the upper half.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 28. `bandeau-corniche-gouttiere-echafaudage.jpg`
Usage : accueil, visuel de la carte « Zinguerie et gouttières » ; pages « Zinguerie et gouttières » et « Pose et remplacement de gouttières » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Bandeau de corniche anthracite et gouttière neufs posés depuis un échafaudage sur une maison en briques »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a brand-new anthracite aluminium fascia board and gutter along the eave of a clay-tile roof, seen along its length from a scaffold deck, brick house below, soft overcast light
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 29. `corniche-zinc-anthracite-toit-plat.jpg`
Usage : page « Réparation de gouttières » (hero) ; page « Toiture en zinc » en attendant son visuel.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Corniche métallique anthracite posée en rive d’une toiture plate d’immeuble, échafaudage en place »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: an anthracite metal cornice and edge trim freshly installed along the flat roof of a Brussels apartment building, scaffolding tubes in the foreground, church spire and rooftops in the background, grey sky
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 30. `corniche-osb-bandeau-metal.jpg`
Usage : page « Chéneaux, noues et descentes » en attendant son visuel.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Corniche en cours de rénovation : panneaux OSB et bandeau métallique noir sur une façade en briques »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a cornice under reconstruction on a brick façade: OSB panels forming the new overhang with a black metal fascia profile, scaffolding, overcast daylight
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 31. `toiture-plate-etancheite-neuve.jpg`
Usage : accueil, visuel du service phare « Toiture plate » ; page « Toiture plate » (hero) ; page « Couvreur Rhode-Saint-Genèse » en attendant son visuel.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture plate d’annexe avec étanchéité neuve, vue sur les jardins voisins »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: the flat roof of a Brussels townhouse extension with a brand-new black waterproofing membrane, clean seams, aluminium edge trim, rear gardens and neighbouring houses beyond, soft light
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 32. `roofing-bitumineux-pose-toit-plat.jpg`
Usage : page « Roofing bitumineux » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Pose de roofing bitumineux sur une toiture plate : rouleau de membrane et chalumeau près de la cheminée »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a roofer torch-welding a roll of bitumen roofing membrane on a flat roof, small blue flame, roll partly unrolled, a chimney on the roof, brick houses and trees in the background, no face visible
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 33. `etancheite-cheminee-toit-plat.jpg`
Usage : page « Réparation de toiture plate » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Réparation de toiture plate : étanchéité refaite autour d’une souche de cheminée avec profil en aluminium »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: waterproofing freshly redone around the base of a chimney on a flat roof: new black membrane dressed up the chimney with an aluminium counter-flashing, neat corners, overcast sky
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 34. `charpente-pannes-bois-traite.jpg`
Usage : page « Réparation et traitement de charpente » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Pièces de charpente en bois traité posées en rive de toiture, à côté des tuiles existantes »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: new green-tinted treated timber purlins and rafters installed along the edge of a pitched roof next to existing clay tiles, carpenter's tools on the scaffold deck, no faces
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 35. `chevrons-neufs-echafaudage-tuiles.jpg`
Usage : accueil, section « à propos » en attendant la vraie photo de l'équipe ; page « Enlèvement d'ardoises amiante-ciment » en attendant son visuel.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Chantier de toiture : chevrons neufs en bout de toit en tuiles, vus depuis l’échafaudage »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: new rafter tails and eaves timber fitted on a clay-tile roof, seen from the scaffolding, a Brussels street with brick houses below, cloudy sky
Composition: wide 16:9 landscape frame, slightly elevated roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 36. `isolation-toiture-plate-panneaux.jpg`
Usage : page « Isolation de toiture plate » (hero).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Isolation d’une toiture plate : panneaux isolants rigides posés avant l’étanchéité »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: foil-faced rigid PIR insulation boards laid in staggered rows on a flat roof before the waterproofing membrane, a roofer measuring a board with a tape, brick parapet, overcast daylight, no faces
Composition: wide 16:9 landscape frame, eye-level roofer's viewpoint, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, extra limbs, blurry.
```

### 37. `isolation-toiture-grenier-vue-ensemble.jpg` — **reçu et importé le 13/10/2026**, attribué au hero Isolation de toiture + carte Isolation de l'accueil
Usage : page « Isolation de toiture » (hero du hub, aujourd'hui partagé avec la page Sarking) et carte « Isolation » de l'accueil.
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Isolation de toiture vue depuis le grenier : laine minérale entre les chevrons et pare-vapeur en cours de pose »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: attic of a Brussels terraced house seen from inside, mineral wool insulation fitted between old timber rafters, a vapour barrier membrane partly stapled, a roofer's gloved hands pressing the membrane, daylight from a small roof window, no faces
Composition: wide 16:9 landscape frame, eye-level viewpoint from the attic floor, main subject filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, extra limbs, blurry.
```

### 38. `degats-tempete-tuiles-arrachees.jpg` — **reçu et importé le 13/10/2026**, attribué au hero Réparation de toiture après tempête
Usage : page « Réparation de toiture après tempête » (hero, aujourd'hui partagé avec la page Dépannage).
Format : paysage 16:9, 1920 × 1080 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture en tuiles après une tempête : tuiles arrachées sur un versant et faîtage déplacé, ciel qui se dégage »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, clearing sky after a storm with dark clouds receding, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style for a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: pitched clay-tile roof of a Brussels terraced house after a storm, a patch of tiles torn away exposing the battens and underlay, a few broken tiles lying in the zinc gutter, ridge tiles shifted, wet surfaces, no people
Composition: wide 16:9 landscape frame, slightly elevated viewpoint from a neighbouring roof, damaged area filling two thirds of the frame, clean uncluttered background, space on the left third for a text overlay.
Negative prompt: text, letters, watermark, logo, signage, people, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, duplicated chimneys, blurry.
```

## Étapes « Comment ça se passe » (pages communes, ajout du 13/10/2026)

**13/10/2026, 10 h 20 — les 4 images générées ont été reçues à la racine du projet et importées (`npm run photos`) : les visuels temporaires sont remplacés. Contrôle sur planche-contact : même couvreur, même camionnette, lignes du devis illisibles, aucun texte parasite.**

Quatre vignettes pour les cartes d'étapes des pages communes (`src/data/process.ts`, composant `ZonePage.astro`). Elles s'affichent en 480 × 270 px : sujet simple, lisible en petit. **Même série** : même lumière, même couvreur (tenue de travail gris anthracite, jamais le visage), même camionnette blanche, pour que les quatre cartes se lisent comme une seule histoire. Mêmes consignes que ci-dessus : déposer dans `photos-a-trier/` sous le nom exact, puis `npm run photos`.

### 39. `etape-appel-couvreur-telephone.jpg`
Usage : étape 1 « Vous appelez »
Format : paysage 16:9, 1600 × 900 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Couvreur au téléphone devant sa camionnette, carnet à la main, prenant un rendez-vous de visite »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a roofer in dark grey workwear, seen from behind or in three-quarter view with the face not visible, standing beside a plain white work van parked in a Brussels street of brick terraced houses, holding a smartphone to his ear with one hand and a small notebook with the other, writing down an appointment, ladder on the van roof rack
Composition: landscape 16:9 frame, subject centred and filling the frame, clean uncluttered background, consistent colour grading with the three other step images (same light, same roofer's dark grey workwear, same white van).
Negative prompt: text, letters, numbers, watermark, logo, signage, brand names, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, extra fingers, extra limbs, blurry.
```

### 40. `etape-visite-toit-grenier-photos.jpg`
Usage : étape 2 « Visite sur place à <commune> »
Format : paysage 16:9, 1600 × 900 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Couvreur sur une échelle inspectant une toiture en ardoises et photographiant un défaut avec son téléphone »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: the same roofer in dark grey workwear, face not visible, at the top of a ladder against a natural slate roof of a Brussels townhouse, one hand on a loose slate near a zinc valley, the other hand photographing the defect with a smartphone, brick chimney with zinc flashing nearby, harness visible
Composition: landscape 16:9 frame, subject centred and filling the frame, clean uncluttered background, consistent colour grading with the three other step images (same light, same roofer's dark grey workwear, same white van).
Negative prompt: text, letters, numbers, watermark, logo, signage, brand names, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, extra fingers, extra limbs, blurry.
```

### 41. `etape-devis-detaille-table.jpg`
Usage : étape 3 « Devis gratuit sous 48 h »
Format : paysage 16:9, 1600 × 900 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Devis de toiture détaillé poste par poste posé sur une table, avec un échantillon d’ardoise et un mètre »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: top-down still life on a light wooden kitchen table: a printed roofing quotation with several itemised lines (the lines must be illegible, no readable text or numbers), a natural slate sample, a folding wooden ruler, a pen, a cup of coffee, the roofer's hand in dark grey sleeve pointing at one line of the document
Composition: landscape 16:9 frame, subject centred and filling the frame, clean uncluttered background, consistent colour grading with the three other step images (same light, same roofer's dark grey workwear, same white van).
Negative prompt: text, letters, numbers, watermark, logo, signage, brand names, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, extra fingers, extra limbs, blurry.
```

### 42. `etape-travaux-garantie-reception.jpg`
Usage : étape 4 « Travaux et garantie écrite »
Format : paysage 16:9, 1600 × 900 px minimum. JPG qualité 85, sRGB, sans métadonnées.
Alt prévu : « Toiture rénovée vue depuis l’échafaudage, couvreur remettant un document de garantie à la réception du chantier »

```
Photorealistic photograph, shot on a full-frame DSLR with a 35 mm lens, natural daylight, soft overcast Belgian sky, true-to-life colours, no HDR look, sharp focus, realistic materials and textures, editorial documentary style of a roofing company website in Brussels, Belgium. Belgian architecture cues: brick façades, bay windows, zinc gutters, red clay tiles or natural slate, terraced townhouses.
Subject: a freshly renovated natural slate roof with new zinc gutter seen from a scaffold platform at roof level, in the foreground the roofer in dark grey workwear (face not visible) handing a single folded document to a homeowner's hand, handshake-like gesture, Brussels brick houses and zinc gutters in the background
Composition: landscape 16:9 frame, subject centred and filling the frame, clean uncluttered background, consistent colour grading with the three other step images (same light, same roofer's dark grey workwear, same white van).
Negative prompt: text, letters, numbers, watermark, logo, signage, brand names, recognizable faces, cartoon, illustration, 3D render, oversaturated, HDR halo, warped roof lines, impossible geometry, extra fingers, extra limbs, blurry.
```

## Attributions modifiées le 12/10/2026 (relecture)
- `pose-gouttieres-bruxelles` → `corniche-osb-bandeau-metal` (ne partage plus le hero du hub Zinguerie).
- `remplacement-tuiles-ardoises-bruxelles` → `toiture-tuiles-lucarne-gouttiere-zinc` (ne partage plus le hero de la page Toiture en ardoises).
- Restent partagés faute d'image distincte : Isolation de toiture / Isolation sarking (→ visuel 37) et Dépannage / Réparation après tempête (→ visuel 38). Dès que ces deux images sont déposées à la racine du projet, `npm run photos` puis attribution dans `src/data/photos.ts`.

## Vraies photos de chantier reçues le 12/10/2026 (WhatsApp, 9 images)
Importées via `photos-a-trier/` → `src/assets/photos/` (1600 px, métadonnées retirées). Provenance confirmée par le client le 13/10/2026 : ce sont les chantiers de l'entreprise, les galeries sont intitulées « Sur nos chantiers ». Les textes alternatifs décrivent ce que l'on voit.

| Fichier | Attribution |
|---|---|
| `toit-plat-immeuble-roofing-cheminees.jpg` | hero du hub Toiture plate |
| `roofing-toit-plat-sorties-ventilation.jpg` | hero Roofing bitumineux |
| `epdm-releves-profile-alu-briques.jpg` | hero Toiture EPDM |
| `epdm-sortie-ventilation-rive-alu.jpg` | hero Réparation de toiture plate |
| `toit-plat-immeuble-souches-cheminees-ville.jpg` | hero Toiture pour copropriétés et syndics |
| `toit-plat-roofing-vue-clocher.jpg` | carte « Toiture plate » de l'accueil |
| `roofing-acrotere-cote-rue.jpg` + `epdm-sortie-ventilation-vertical.jpg` | les deux photos de la page À propos |
| `roofing-releve-acrotere-vertical.jpg` | en réserve (variante verticale) |

Les visuels générés qu'elles remplacent restent dans le registre (réutilisables ailleurs). Pour les prochains envois : déposer les fichiers dans `photos-a-trier/` sous un nom descriptif, ajouter l'entrée dans `src/data/photos.ts`, lancer `npm run photos`, puis attribuer la photo dans `pagePhotos` ou `homePhotos`.

## Vraies photos de chantier, 2e lot reçu le 13/10/2026 (WhatsApp, 35 images, 9 retenues)
Chantier de rénovation de toiture avec isolation sarking sur une maison en briques. Règle demandée par le client : ne garder que ce qui vaut le coup (d'autres envois suivront) ; les visuels générés restent en hero, les vraies photos vont dans la galerie « Sur le chantier » (`pageGalleries` dans `src/data/photos.ts`, composant `ChantierGallery.astro`).

| Fichier | Emplacement |
|---|---|
| `sarking-panneaux-fibre-bois-contre-lattes.jpg` | hero Isolation par l'extérieur (sarking) |
| `sarking-versant-isole-sous-toiture.jpg` | hero du hub Isolation de toiture (plus de hero partagé avec Sarking) |
| `isolant-fibre-bois-joints-etanches.jpg` | galerie Sarking |
| `renovation-toiture-en-cours-sous-toiture-tuiles.jpg`, `lucarne-sous-toiture-contre-lattes.jpg` | galerie du hub Rénovation de toiture |
| `faitage-tuiles-terre-cuite-mur-pignon.jpg`, `solin-zinc-versant-tuiles-sombres.jpg` | galerie Réparation de faîtage et de solins |
| `toiture-tuiles-beton-mousse-lucarne.jpg` | galerie Démoussage (état « avant ») |
| `maison-briques-echafaudage-jardin.jpg` | page À propos (1re photo) |
| Lot 1 : `roofing-acrotere-cote-rue.jpg`, `roofing-releve-acrotere-vertical.jpg` | galerie du hub Toiture plate |

Écartées (doublons de la même scène, cadrage faible, marques lisibles) : 26 images du lot 2. Le visuel 38 (dégâts de tempête) reste à générer ; le visuel 37 (isolation vue du grenier) n'est plus nécessaire.

## Vraies photos de chantier, 3e lot reçu le 13/10/2026 à 15 h (zip WhatsApp à la racine, 54 images + 3 vidéos, 26 retenues)

Trois chantiers complets, reconnaissables : (A) maison blanche rénovée en sarking + tuiles plates anthracite + panneaux, avec zinguerie neuve et désamiantage de l'ancienne couverture ; (B) maison de rangée en tuiles rouges neuves avec Velux et panneaux ; (C) ancienne toiture en ardoises artificielles grises et moussues → tuiles anthracite avec Velux et panneaux (avant/après). Plus la flotte de camionnettes et l'équipe sur le toit.

Règle appliquée : vraies photos dans les galeries « Sur nos chantiers » (1 à 3 par page, jamais la photo du hero) ; **quatre heros remplacés** là où la vraie photo est nettement meilleure et exactement sur le sujet : Rénovation (pose des tuiles anthracite), Enlèvement amiante (dépose en combinaisons), Toiture en tuiles (tuiles rouges + Velux vue drone), Pose de Velux (Velux entre les panneaux). À propos : camionnettes + équipe ; carte À propos de l'accueil : camionnettes.

| Fichier importé | Image | Placement |
|---|---|---|
| amiante-depose-ardoises-combinaisons-chantier | 3 | hero Enlèvement amiante |
| renovation-toiture-echafaudage-sous-toiture-verte | 8 | galerie Rénovation |
| renovation-toiture-pose-tuiles-anthracite-echafaudage | 20 | hero Rénovation |
| sarking-contre-lattes-panneaux-vue-drone | 25 | galeries Isolation (hub) + Sarking |
| equipe-couvreurs-sur-chantier-sarking | 15 | À propos |
| camionnettes-toiture-veryroof-devant-chantier | 14 | À propos + carte À propos accueil |
| maison-renovee-tuiles-anthracite-panneaux-solaires | 16 | galerie Toiture en tuiles |
| villa-renovee-tuiles-grises-garage | 19 | registre (disponible, non attribuée) |
| gouttiere-zinc-neuve-descente-detail-rive | 5 | galeries Zinguerie (hub) + Pose de gouttières |
| corniche-zinc-neuve-descente-bardage-lucarne | 13 | galerie Zinguerie (hub) |
| gouttiere-zinc-descente-angle-rive | 9 | galerie Pose de gouttières |
| toiture-tuiles-rouges-neuve-velux-vue-drone | 26 | hero Toiture en tuiles + galerie Velux |
| toiture-tuiles-velux-panneaux-solaires-vue-drone | 28 | hero Pose de Velux |
| charpente-lattage-neuf-ancienne-maison-drone | 29 | galerie Charpente |
| sous-toiture-contre-lattes-raccord-zinc-lucarne | 31 | galerie Chéneaux, noues et descentes |
| faitage-a-sec-tuiles-noires-solin-pignon | 34 | galerie Faîtage et solins |
| souche-cheminee-rejointoyee-solin-zinc-tuiles | 41 | galerie Souche de cheminée |
| toiture-tuiles-anthracite-apres-renovation-drone | 44 | galeries Rénovation (après), Tuiles, Remplacement tuiles/ardoises |
| ancienne-toiture-ardoises-artificielles-avant-renovation-drone | 45 | galeries Rénovation (avant) + Amiante |
| ancien-toit-ardoises-mousse-rapieces-drone | 53 | galeries Démoussage + Inspection |
| maison-toit-tuiles-noires-panneaux-apres-drone | 38 | galerie Inspection (après) |
| toit-plat-panneaux-solaires-vue-drone | 35 | galerie Toiture plate |
| toitures-tuiles-rouges-panneaux-mitoyennes-drone | 33 | galeries Tuiles + Copropriétés |
| velux-tuiles-noires-rive-cheminee-drone | 50 | galerie Pose de Velux |
| noue-zinc-soudure-detail-chantier | 23 | galerie Chéneaux, noues et descentes |
| descente-zinc-cheminee-brique-toit-plat | 36 | galerie Réparation de gouttières |

Écartées (28) : doublons de cadrage (1, 2, 10, 24, 18, 21, 22, 11), détails sans lecture pour un visiteur (12 tablette de fenêtre, 17 et 23 bis zinc, 6-7 angles répétés), vues drone redondantes (27, 30, 32, 37, 39, 40, 42, 43, 46, 47, 48, 49, 51, 52, 54), 4 (personne au premier plan), vidéos (non utilisées). Réserve : 19 (villa) pour une page commune du Brabant wallon le jour où une photo de villa y sera utile, sans affirmer la commune.
