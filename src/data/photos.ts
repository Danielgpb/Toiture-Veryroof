/**
 * Registre des visuels du site. Chaque entrée : fichier dans src/assets/photos/, texte alternatif descriptif
 * (ce que l'on voit + le service, sans affirmer une commune ni « notre chantier » pour une image générée), orientation, mots-clés.
 *
 * État au 12/10/2026 : les photos fournies par le client ont été retirées (chantier partagé). Chaque fichier est un
 * visuel neutre temporaire (scripts/make-placeholders.mjs) en attendant l'image générée ou la vraie photo portant LE MÊME NOM :
 * déposer le fichier dans photos-a-trier/ puis lancer `npm run photos` (import + normalisation), rien d'autre à changer.
 * Les prompts de génération, un par fichier, sont dans docs/content/photos-plan.md.
 */
export interface Photo {
  file: string;
  alt: string;
  /** Légende courte pour la galerie « Sur le chantier » (sinon : alt). */
  caption?: string;
  orientation: 'portrait' | 'landscape';
  tags: string[];
}

export const photos: Record<string, Photo> = {
  // --- Visuels de l'accueil et des pages tuiles / zinguerie / toit plat (prompts 18 à 36) ---
  'hero-toiture-tuiles-bruxelles': { file: 'hero-toiture-tuiles-bruxelles.jpg', orientation: 'landscape', tags: ['tuiles', 'velux', 'renovation', 'hero'], alt: 'Toiture neuve en tuiles terre cuite avec fenêtre de toit sur une maison bruxelloise, vue depuis l’échafaudage' },
  'toiture-tuiles-neuve-velux-bruxelles': { file: 'toiture-tuiles-neuve-velux-bruxelles.jpg', orientation: 'portrait', tags: ['tuiles', 'velux', 'renovation', 'hero-mobile'], alt: 'Rénovation de toiture en tuiles terre cuite avec fenêtre de toit Velux, vue en hauteur depuis l’échafaudage' },
  'toiture-tuiles-anthracite-cheminee': { file: 'toiture-tuiles-anthracite-cheminee.jpg', orientation: 'landscape', tags: ['tuiles', 'cheminee', 'velux', 'renovation'], alt: 'Toiture rénovée en tuiles anthracite avec cheminée en briques, fenêtre de toit et rive en zinc' },
  'lucarne-solins-zinc-tuiles': { file: 'lucarne-solins-zinc-tuiles.jpg', orientation: 'landscape', tags: ['lucarne', 'solins', 'zinc', 'tuiles', 'reparation'], alt: 'Lucarne rénovée avec solins et habillage en zinc sur une toiture en tuiles terre cuite' },
  'toiture-tuiles-lucarne-gouttiere-zinc': { file: 'toiture-tuiles-lucarne-gouttiere-zinc.jpg', orientation: 'landscape', tags: ['tuiles', 'lucarne', 'gouttiere', 'zinc', 'descente'], alt: 'Toiture en tuiles avec lucarne, chéneau et descente d’eau pluviale en zinc, typique des maisons bruxelloises' },
  'souche-cheminee-solins-zinc': { file: 'souche-cheminee-solins-zinc.jpg', orientation: 'landscape', tags: ['cheminee', 'solins', 'zinc', 'tuiles', 'reparation'], alt: 'Réparation de souche de cheminée : nouveaux solins en zinc posés sur une toiture en tuiles' },
  'pose-tuiles-faitage-sous-toiture': { file: 'pose-tuiles-faitage-sous-toiture.jpg', orientation: 'landscape', tags: ['tuiles', 'faitage', 'solins', 'sous-toiture', 'lattes', 'renovation'], alt: 'Pose de tuiles sur lattes et sous-toiture avec raccord de faîtage et solin en zinc contre un mur' },
  'isolation-sarking-panneaux-contre-lattes': { file: 'isolation-sarking-panneaux-contre-lattes.jpg', orientation: 'landscape', tags: ['isolation', 'sarking', 'renovation'], alt: 'Isolation de toiture par l’extérieur (sarking) : panneaux isolants et contre-lattes avant la pose des tuiles' },
  'pose-velux-sous-toiture-lattes': { file: 'pose-velux-sous-toiture-lattes.jpg', orientation: 'landscape', tags: ['velux', 'sous-toiture', 'lattes', 'tuiles'], alt: 'Pose d’une fenêtre de toit Velux sur sous-toiture et lattes, avant la couverture en tuiles' },
  'fenetre-de-toit-velux-interieur': { file: 'fenetre-de-toit-velux-interieur.jpg', orientation: 'portrait', tags: ['velux', 'interieur'], alt: 'Fenêtre de toit Velux vue de l’intérieur après la pose, avec son embrasure plafonnée' },
  'bandeau-corniche-gouttiere-echafaudage': { file: 'bandeau-corniche-gouttiere-echafaudage.jpg', orientation: 'landscape', tags: ['corniche', 'gouttiere', 'zinguerie', 'echafaudage'], alt: 'Bandeau de corniche anthracite et gouttière neufs posés depuis un échafaudage sur une maison en briques' },
  'corniche-zinc-anthracite-toit-plat': { file: 'corniche-zinc-anthracite-toit-plat.jpg', orientation: 'landscape', tags: ['corniche', 'zinguerie', 'toit-plat', 'immeuble'], alt: 'Corniche métallique anthracite posée en rive d’une toiture plate d’immeuble, échafaudage en place' },
  'corniche-osb-bandeau-metal': { file: 'corniche-osb-bandeau-metal.jpg', orientation: 'landscape', tags: ['corniche', 'zinguerie', 'renovation'], alt: 'Corniche en cours de rénovation : panneaux OSB et bandeau métallique noir sur une façade en briques' },
  'toiture-plate-etancheite-neuve': { file: 'toiture-plate-etancheite-neuve.jpg', orientation: 'landscape', tags: ['toit-plat', 'etancheite', 'roofing'], alt: 'Toiture plate d’annexe avec étanchéité neuve, vue sur les jardins voisins' },
  'roofing-bitumineux-pose-toit-plat': { file: 'roofing-bitumineux-pose-toit-plat.jpg', orientation: 'landscape', tags: ['toit-plat', 'roofing', 'bitume', 'etancheite'], alt: 'Pose de roofing bitumineux sur une toiture plate : rouleau de membrane et chalumeau près de la cheminée' },
  'etancheite-cheminee-toit-plat': { file: 'etancheite-cheminee-toit-plat.jpg', orientation: 'landscape', tags: ['toit-plat', 'cheminee', 'etancheite', 'reparation'], alt: 'Réparation de toiture plate : étanchéité refaite autour d’une souche de cheminée avec profil en aluminium' },
  'charpente-pannes-bois-traite': { file: 'charpente-pannes-bois-traite.jpg', orientation: 'landscape', tags: ['charpente', 'bois', 'renovation'], alt: 'Pièces de charpente en bois traité posées en rive de toiture, à côté des tuiles existantes' },
  'chevrons-neufs-echafaudage-tuiles': { file: 'chevrons-neufs-echafaudage-tuiles.jpg', orientation: 'landscape', tags: ['charpente', 'chevrons', 'tuiles', 'echafaudage', 'chantier'], alt: 'Chantier de toiture : chevrons neufs en bout de toit en tuiles, vus depuis l’échafaudage' },
  'isolation-toiture-plate-panneaux': { file: 'isolation-toiture-plate-panneaux.jpg', orientation: 'landscape', tags: ['toit-plat', 'isolation'], alt: 'Isolation d’une toiture plate : panneaux isolants rigides posés avant l’étanchéité' },
  // --- Visuels des services sans équivalent photo (prompts 1 à 17) ---
  'toiture-ardoises-naturelles-maison-bruxelloise': { file: 'toiture-ardoises-naturelles-maison-bruxelloise.jpg', orientation: 'landscape', tags: ['ardoises', 'renovation'], alt: 'Toiture en ardoises naturelles d’une maison bruxelloise, avec lucarne et cheminée en briques' },
  'toiture-zinc-joint-debout-annexe': { file: 'toiture-zinc-joint-debout-annexe.jpg', orientation: 'landscape', tags: ['zinc', 'joint-debout'], alt: 'Toiture en zinc à joint debout sur l’annexe d’une maison bruxelloise' },
  'etancheite-epdm-toit-plat-pose': { file: 'etancheite-epdm-toit-plat-pose.jpg', orientation: 'landscape', tags: ['toit-plat', 'epdm', 'etancheite'], alt: 'Pose d’une membrane d’étanchéité EPDM sur une toiture plate' },
  'toiture-vegetalisee-sedum-toit-plat': { file: 'toiture-vegetalisee-sedum-toit-plat.jpg', orientation: 'landscape', tags: ['toit-plat', 'vegetalisee'], alt: 'Toiture plate végétalisée en sedum sur l’annexe d’une maison bruxelloise' },
  'bachage-urgence-toiture-tempete': { file: 'bachage-urgence-toiture-tempete.jpg', orientation: 'landscape', tags: ['urgence', 'tempete', 'bachage'], alt: 'Bâchage d’urgence d’une toiture endommagée par la tempête, en attendant la réparation' },
  'demoussage-toiture-avant-apres': { file: 'demoussage-toiture-avant-apres.jpg', orientation: 'landscape', tags: ['demoussage', 'hydrofuge', 'tuiles'], alt: 'Démoussage de toiture : versant couvert de mousse à gauche, tuiles nettoyées et hydrofugées à droite' },
  'enlevement-ardoises-amiante-ciment': { file: 'enlevement-ardoises-amiante-ciment.jpg', orientation: 'landscape', tags: ['amiante', 'ardoises', 'desamiantage'], alt: 'Retrait d’ardoises en amiante-ciment par des ouvriers en tenue de protection' },
  'isolation-combles-interieur-laine': { file: 'isolation-combles-interieur-laine.jpg', orientation: 'landscape', tags: ['isolation', 'combles', 'interieur'], alt: 'Isolation des combles par l’intérieur : laine minérale posée entre les chevrons' },
  'nettoyage-gouttieres-feuilles': { file: 'nettoyage-gouttieres-feuilles.jpg', orientation: 'landscape', tags: ['gouttiere', 'nettoyage', 'zinc'], alt: 'Nettoyage d’une gouttière en zinc remplie de feuilles mortes' },
  'cheneau-noue-zinc-gros-plan': { file: 'cheneau-noue-zinc-gros-plan.jpg', orientation: 'landscape', tags: ['cheneau', 'noue', 'zinc', 'zinguerie'], alt: 'Noue et chéneau en zinc neufs entre deux versants d’une toiture en tuiles' },
  'inspection-toiture-couvreur': { file: 'inspection-toiture-couvreur.jpg', orientation: 'landscape', tags: ['inspection', 'expertise', 'tuiles'], alt: 'Couvreur inspectant une toiture en tuiles et notant ses observations' },
  'toiture-immeuble-copropriete-echafaudage': { file: 'toiture-immeuble-copropriete-echafaudage.jpg', orientation: 'landscape', tags: ['copropriete', 'immeuble', 'echafaudage'], alt: 'Rénovation de la toiture d’un immeuble en copropriété à Bruxelles, échafaudage en façade' },
  'reparation-fuite-tuile-cassee': { file: 'reparation-fuite-tuile-cassee.jpg', orientation: 'landscape', tags: ['fuite', 'tuiles', 'reparation'], alt: 'Réparation d’une fuite de toiture : remplacement d’une tuile cassée' },
  'couvreur-uccle-maisons-toits': { file: 'couvreur-uccle-maisons-toits.jpg', orientation: 'landscape', tags: ['zone', 'uccle'], alt: 'Toits en ardoises et tuiles des maisons de maître d’Uccle, vus en hauteur' },
  'couvreur-watermael-boitsfort-cite-jardin': { file: 'couvreur-watermael-boitsfort-cite-jardin.jpg', orientation: 'landscape', tags: ['zone', 'watermael-boitsfort'], alt: 'Toits de tuiles rouges des maisons de la cité-jardin de Watermael-Boitsfort' },
  'couvreur-rhode-saint-genese-villa-foret': { file: 'couvreur-rhode-saint-genese-villa-foret.jpg', orientation: 'landscape', tags: ['zone', 'rhode-saint-genese'], alt: 'Toiture en tuiles d’une villa de Rhode-Saint-Genèse en lisière de la forêt de Soignes' },
  'couvreur-waterloo-villa-quatre-facades': { file: 'couvreur-waterloo-villa-quatre-facades.jpg', orientation: 'landscape', tags: ['zone', 'waterloo'], alt: 'Villa quatre façades de Waterloo avec toiture en tuiles et lucarnes' },
  // --- Variantes reçues le 12/10/2026 (cadrages verticaux pour les heros mobiles, seconde version) ---
  'demoussage-toiture-avant-apres-vertical': { file: 'demoussage-toiture-avant-apres-vertical.jpg', orientation: 'portrait', tags: ['variante'], alt: 'Démoussage de toiture : versant couvert de mousse à gauche, tuiles nettoyées et hydrofugées à droite, cadrage vertical pour mobile' },
  'enlevement-ardoises-amiante-ciment-vertical': { file: 'enlevement-ardoises-amiante-ciment-vertical.jpg', orientation: 'portrait', tags: ['variante'], alt: 'Retrait d’ardoises en amiante-ciment par des ouvriers en tenue de protection, cadrage vertical pour mobile' },
  'etancheite-epdm-toit-plat-pose-vertical': { file: 'etancheite-epdm-toit-plat-pose-vertical.jpg', orientation: 'landscape', tags: ['variante'], alt: 'Pose d’une membrane d’étanchéité EPDM sur une toiture plate (seconde variante, format paysage)' },
  'inspection-toiture-couvreur-2': { file: 'inspection-toiture-couvreur-2.jpg', orientation: 'landscape', tags: ['variante'], alt: 'Couvreur inspectant une toiture en tuiles et notant ses observations (seconde variante)' },
  'toiture-ardoises-naturelles-maison-bruxelloise-vertical': { file: 'toiture-ardoises-naturelles-maison-bruxelloise-vertical.jpg', orientation: 'portrait', tags: ['variante'], alt: 'Toiture en ardoises naturelles d’une maison bruxelloise, avec lucarne et cheminée en briques, cadrage vertical pour mobile' },
  // --- Vraies photos des chantiers de l'entreprise, lot 1 reçu le 12/10/2026 (WhatsApp, 9 images, toits plats). Provenance confirmée par le client le 13/10/2026 : on peut écrire « nos chantiers ».
  'epdm-releves-profile-alu-briques': { file: 'epdm-releves-profile-alu-briques.jpg', orientation: 'landscape', tags: ['epdm', 'toit-plat', 'releves', 'chantier-reel'], alt: 'Toiture plate en EPDM : relevés de la membrane contre les murs en briques, fixés par un profilé en aluminium' },
  'roofing-toit-plat-sorties-ventilation': { file: 'roofing-toit-plat-sorties-ventilation.jpg', orientation: 'landscape', tags: ['roofing', 'toit-plat', 'ventilation', 'chantier-reel'], alt: 'Toiture plate en roofing bitumineux fraîchement posée, avec deux sorties de ventilation, à l’arrière d’une maison de ville' },
  'epdm-sortie-ventilation-rive-alu': { file: 'epdm-sortie-ventilation-rive-alu.jpg', orientation: 'landscape', tags: ['epdm', 'toit-plat', 'ventilation', 'rive', 'chantier-reel'], alt: 'Membrane EPDM d’un toit plat avec une sortie de ventilation étanchée et une rive en aluminium' },
  'toit-plat-immeuble-roofing-cheminees': { file: 'toit-plat-immeuble-roofing-cheminees.jpg', orientation: 'landscape', tags: ['roofing', 'toit-plat', 'immeuble', 'cheminee', 'chantier-reel'], alt: 'Grande toiture plate d’immeuble en roofing bitumineux, souches de cheminée et bord en tuiles, vue sur la ville' },
  'roofing-releve-acrotere-vertical': { file: 'roofing-releve-acrotere-vertical.jpg', orientation: 'portrait', tags: ['roofing', 'toit-plat', 'acrotere', 'chantier-reel'], alt: 'Relevé d’étanchéité en roofing sur l’acrotère d’une toiture plate, toits et jardins en contrebas', caption: 'Relevé d’étanchéité sur l’acrotère' },
  'toit-plat-immeuble-souches-cheminees-ville': { file: 'toit-plat-immeuble-souches-cheminees-ville.jpg', orientation: 'landscape', tags: ['roofing', 'toit-plat', 'immeuble', 'copropriete', 'chantier-reel'], alt: 'Toiture plate d’un immeuble en roofing, plusieurs souches de cheminée en briques et en béton, horizon urbain' },
  'toit-plat-roofing-vue-clocher': { file: 'toit-plat-roofing-vue-clocher.jpg', orientation: 'landscape', tags: ['roofing', 'toit-plat', 'immeuble', 'chantier-reel'], alt: 'Toiture plate en roofing d’un immeuble, souches de cheminée et clocher à l’horizon' },
  'roofing-acrotere-cote-rue': { file: 'roofing-acrotere-cote-rue.jpg', orientation: 'landscape', tags: ['roofing', 'toit-plat', 'acrotere', 'chantier-reel'], alt: 'Toiture plate en roofing bitumineux avec son acrotère relevé côté rue, immeubles d’en face', caption: 'Roofing et acrotère relevé côté rue' },
  'epdm-sortie-ventilation-vertical': { file: 'epdm-sortie-ventilation-vertical.jpg', orientation: 'portrait', tags: ['epdm', 'toit-plat', 'ventilation', 'chantier-reel'], alt: 'Sortie de ventilation étanchée sur une toiture plate en EPDM, verdure et campagne à l’horizon', caption: 'sortie de ventilation étanchée sur un toit plat en EPDM' },
  // --- Vraies photos des chantiers de l'entreprise, lot 2 reçu le 13/10/2026 (rénovation de toiture avec isolation sarking, maison en briques). Provenance confirmée.
  'sarking-panneaux-fibre-bois-contre-lattes': { file: 'sarking-panneaux-fibre-bois-contre-lattes.jpg', orientation: 'landscape', tags: ['sarking', 'isolation', 'fibre-de-bois', 'chantier-reel'], alt: 'Isolation sarking en cours : panneaux de fibre de bois posés sur les chevrons, sous-toiture noire et contre-lattes vertes', caption: 'Panneaux de fibre de bois, sous-toiture et contre-lattes' },
  'sarking-versant-isole-sous-toiture': { file: 'sarking-versant-isole-sous-toiture.jpg', orientation: 'landscape', tags: ['sarking', 'isolation', 'sous-toiture', 'chantier-reel'], alt: 'Versant isolé par l’extérieur : panneaux isolants en haut, sous-toiture et lattage prêts à recevoir les tuiles', caption: 'Versant isolé par l’extérieur, prêt pour les tuiles' },
  'isolant-fibre-bois-joints-etanches': { file: 'isolant-fibre-bois-joints-etanches.jpg', orientation: 'portrait', tags: ['isolation', 'fibre-de-bois', 'detail', 'chantier-reel'], alt: 'Panneaux de fibre de bois entre les chevrons, joints fermés par des bandes adhésives noires', caption: 'Joints des panneaux fermés au ruban adhésif' },
  'faitage-tuiles-terre-cuite-mur-pignon': { file: 'faitage-tuiles-terre-cuite-mur-pignon.jpg', orientation: 'portrait', tags: ['faitage', 'tuiles', 'terre-cuite', 'chantier-reel'], alt: 'Faîtage neuf en tuiles de terre cuite posé le long d’un mur pignon en briques', caption: 'Faîtage neuf en terre cuite contre le mur pignon' },
  'solin-zinc-versant-tuiles-sombres': { file: 'solin-zinc-versant-tuiles-sombres.jpg', orientation: 'portrait', tags: ['solin', 'zinc', 'tuiles', 'chantier-reel'], alt: 'Raccord en zinc entre un mur et un versant de tuiles sombres', caption: 'Raccord en zinc entre le mur et les tuiles' },
  'renovation-toiture-en-cours-sous-toiture-tuiles': { file: 'renovation-toiture-en-cours-sous-toiture-tuiles.jpg', orientation: 'landscape', tags: ['renovation', 'sous-toiture', 'tuiles', 'chantier-reel'], alt: 'Rénovation de toiture en cours : sous-toiture et lattage neufs sur le haut du versant, anciennes tuiles encore en place en bas', caption: 'Sous-toiture et lattage neufs, anciennes tuiles en bas' },
  'lucarne-sous-toiture-contre-lattes': { file: 'lucarne-sous-toiture-contre-lattes.jpg', orientation: 'portrait', tags: ['lucarne', 'sous-toiture', 'renovation', 'chantier-reel'], alt: 'Lucarne habillée, sous-toiture et contre-lattes posées autour de la fenêtre', caption: 'Lucarne habillée avant la pose des tuiles' },
  'maison-briques-echafaudage-jardin': { file: 'maison-briques-echafaudage-jardin.jpg', orientation: 'landscape', tags: ['echafaudage', 'maison', 'briques', 'chantier-reel'], alt: 'Maison en briques avec échafaudage côté jardin pendant la rénovation de la toiture', caption: 'échafaudage côté jardin pendant une rénovation de toiture' },
  'toiture-tuiles-beton-mousse-lucarne': { file: 'toiture-tuiles-beton-mousse-lucarne.jpg', orientation: 'landscape', tags: ['tuiles', 'mousse', 'lucarne', 'avant', 'chantier-reel'], alt: 'Toiture en tuiles béton couverte de mousse, avec lucarne, avant intervention', caption: 'Tuiles béton envahies par la mousse, avant intervention' },
  // --- Étapes « Comment ça se passe » (pages communes, 13/10/2026) : prompts 39 à 42 de docs/content/photos-plan.md ---
  'etape-appel-couvreur-telephone': { file: 'etape-appel-couvreur-telephone.jpg', orientation: 'landscape', tags: ['etape'], alt: 'Couvreur au téléphone devant sa camionnette, carnet à la main, prenant un rendez-vous de visite' },
  'etape-visite-toit-grenier-photos': { file: 'etape-visite-toit-grenier-photos.jpg', orientation: 'landscape', tags: ['etape'], alt: 'Couvreur sur une échelle inspectant une toiture en ardoises et photographiant un défaut avec son téléphone' },
  'etape-devis-detaille-table': { file: 'etape-devis-detaille-table.jpg', orientation: 'landscape', tags: ['etape'], alt: 'Devis de toiture détaillé poste par poste posé sur une table, avec un échantillon d’ardoise et un mètre' },
  'etape-travaux-garantie-reception': { file: 'etape-travaux-garantie-reception.jpg', orientation: 'landscape', tags: ['etape'], alt: 'Toiture rénovée vue depuis l’échafaudage, couvreur remettant un document de garantie à la réception du chantier' },
  // --- Visuels 37 et 38 du plan photos, reçus le 13/10/2026 : heros dédiés Isolation (hub) et Tempête ---
  'isolation-toiture-grenier-vue-ensemble': { file: 'isolation-toiture-grenier-vue-ensemble.jpg', orientation: 'landscape', tags: ['isolation', 'combles'], alt: 'Isolation de toiture vue depuis le grenier : laine minérale entre les chevrons et pare-vapeur en cours de pose' },
  'degats-tempete-tuiles-arrachees': { file: 'degats-tempete-tuiles-arrachees.jpg', orientation: 'landscape', tags: ['tempete', 'reparation'], alt: 'Toiture en tuiles après une tempête : tuiles arrachées sur un versant et faîtage déplacé, ciel qui se dégage' },
  // --- Lot 3 : vraies photos de chantier reçues le 13/10/2026 à 15 h (zip WhatsApp, 54 images, 26 retenues) ---
  'amiante-depose-ardoises-combinaisons-chantier': { file: 'amiante-depose-ardoises-combinaisons-chantier.jpg', orientation: 'landscape', tags: ['amiante', 'chantier'], alt: 'Dépose d’une ancienne couverture en ardoises amiante-ciment par deux couvreurs en combinaison et masque, façade bâchée, échafaudage', caption: 'Dépose d’ardoises amiante-ciment, en combinaison, façade protégée' },
  'renovation-toiture-echafaudage-sous-toiture-verte': { file: 'renovation-toiture-echafaudage-sous-toiture-verte.jpg', orientation: 'landscape', tags: ['renovation', 'chantier'], alt: 'Rénovation complète d’une toiture : maison sous échafaudage, sous-toiture verte et contre-lattes posées, couvreurs sur le versant', caption: 'Sous-toiture et contre-lattes posées, la couverture suit' },
  'renovation-toiture-pose-tuiles-anthracite-echafaudage': { file: 'renovation-toiture-pose-tuiles-anthracite-echafaudage.jpg', orientation: 'landscape', tags: ['renovation', 'tuiles', 'chantier'], alt: 'Pose de tuiles plates anthracite sur une maison rénovée, échafaudage, couvreur sur le versant, ciel bleu', caption: 'Pose des tuiles anthracite sur le versant arrière' },
  'sarking-contre-lattes-panneaux-vue-drone': { file: 'sarking-contre-lattes-panneaux-vue-drone.jpg', orientation: 'landscape', tags: ['sarking', 'isolation', 'chantier'], alt: 'Isolation par l’extérieur en cours vue du drone : panneaux de sarking couverts d’un écran noir et contre-lattes sur toute la toiture', caption: 'Sarking posé, contre-lattes en place, prêt pour les tuiles' },
  'equipe-couvreurs-sur-chantier-sarking': { file: 'equipe-couvreurs-sur-chantier-sarking.jpg', orientation: 'landscape', tags: ['equipe', 'chantier'], alt: 'Deux couvreurs sur le toit d’une maison en rénovation, sous-toiture verte et isolant visibles, échafaudage sur trois côtés', caption: 'Notre équipe sur un chantier de rénovation' },
  'camionnettes-toiture-veryroof-devant-chantier': { file: 'camionnettes-toiture-veryroof-devant-chantier.jpg', orientation: 'landscape', tags: ['equipe', 'camionnette'], alt: 'Trois camionnettes blanches de l’entreprise garées devant une maison en rénovation sous échafaudage', caption: 'Nos camionnettes devant un chantier' },
  'maison-renovee-tuiles-anthracite-panneaux-solaires': { file: 'maison-renovee-tuiles-anthracite-panneaux-solaires.jpg', orientation: 'landscape', tags: ['renovation', 'tuiles', 'apres'], alt: 'Maison rénovée vue du jardin : toiture neuve en tuiles plates anthracite avec panneaux solaires, lucarne et corniches en zinc', caption: 'Après rénovation : tuiles anthracite et panneaux' },
  'villa-renovee-tuiles-grises-garage': { file: 'villa-renovee-tuiles-grises-garage.jpg', orientation: 'landscape', tags: ['renovation', 'tuiles', 'villa'], alt: 'Villa quatre façades blanche après rénovation de la toiture en tuiles grises, cheminée neuve et fenêtre de toit', caption: 'Villa quatre façades, toiture refaite' },
  'gouttiere-zinc-neuve-descente-detail-rive': { file: 'gouttiere-zinc-neuve-descente-detail-rive.jpg', orientation: 'landscape', tags: ['zinguerie', 'gouttiere'], alt: 'Gros plan sur une gouttière en zinc neuve et sa descente, bandeau de rive gris anthracite sur façade blanche', caption: 'Gouttière et descente en zinc neuves' },
  'corniche-zinc-neuve-descente-bardage-lucarne': { file: 'corniche-zinc-neuve-descente-bardage-lucarne.jpg', orientation: 'landscape', tags: ['zinguerie', 'gouttiere'], alt: 'Corniche en zinc neuve avec descente, sous une lucarne habillée de bardage gris, maison rénovée', caption: 'Corniche zinc et descente sous la lucarne' },
  'gouttiere-zinc-descente-angle-rive': { file: 'gouttiere-zinc-descente-angle-rive.jpg', orientation: 'landscape', tags: ['zinguerie', 'gouttiere'], alt: 'Angle de toiture avec gouttière en zinc, descente et bandeau de rive, vue en contre-plongée', caption: 'Descente en zinc à l’angle de la rive' },
  'toiture-tuiles-rouges-neuve-velux-vue-drone': { file: 'toiture-tuiles-rouges-neuve-velux-vue-drone.jpg', orientation: 'landscape', tags: ['tuiles', 'velux', 'drone'], alt: 'Toiture neuve en tuiles rouges avec fenêtre de toit vue du drone, maison de rangée en briques, couvreur au faîtage', caption: 'Tuiles rouges neuves et fenêtre de toit, vue du drone' },
  'toiture-tuiles-velux-panneaux-solaires-vue-drone': { file: 'toiture-tuiles-velux-panneaux-solaires-vue-drone.jpg', orientation: 'landscape', tags: ['tuiles', 'velux', 'solaire'], alt: 'Toiture en tuiles rouges avec fenêtre de toit et panneaux solaires, vue du drone au-dessus d’une rangée de maisons', caption: 'Fenêtre de toit entre les panneaux, toiture neuve' },
  'charpente-lattage-neuf-ancienne-maison-drone': { file: 'charpente-lattage-neuf-ancienne-maison-drone.jpg', orientation: 'landscape', tags: ['charpente', 'renovation'], alt: 'Charpente mise à nu d’une ancienne maison avec lattage neuf en bois clair, pignon en briques, vue du drone', caption: 'Lattage neuf sur la charpente avant la couverture' },
  'sous-toiture-contre-lattes-raccord-zinc-lucarne': { file: 'sous-toiture-contre-lattes-raccord-zinc-lucarne.jpg', orientation: 'landscape', tags: ['zinguerie', 'sous-toiture'], alt: 'Sous-toiture noire et contre-lattes, raccord en zinc contre le mur d’une lucarne en briques, chantier en cours', caption: 'Raccord zinc entre la sous-toiture et la lucarne' },
  'faitage-a-sec-tuiles-noires-solin-pignon': { file: 'faitage-a-sec-tuiles-noires-solin-pignon.jpg', orientation: 'landscape', tags: ['faitage', 'solin', 'tuiles'], alt: 'Faîtage posé à sec sur des tuiles noires et solin en zinc le long d’un mur pignon en briques, vue du toit', caption: 'Faîtage à sec et solin contre le pignon' },
  'souche-cheminee-rejointoyee-solin-zinc-tuiles': { file: 'souche-cheminee-rejointoyee-solin-zinc-tuiles.jpg', orientation: 'landscape', tags: ['cheminee', 'solin'], alt: 'Souche de cheminée en briques avec chapeau neuf, solin en zinc et tuiles noires neuves autour, vue du drone', caption: 'Souche de cheminée reprise, solin et tuiles neuves' },
  'toiture-tuiles-anthracite-apres-renovation-drone': { file: 'toiture-tuiles-anthracite-apres-renovation-drone.jpg', orientation: 'landscape', tags: ['renovation', 'apres', 'drone'], alt: 'Après rénovation : toiture en tuiles anthracite avec fenêtres de toit et panneaux solaires, souche de cheminée reprise, vue du drone', caption: 'Après : tuiles anthracite, fenêtres de toit et panneaux' },
  'ancienne-toiture-ardoises-artificielles-avant-renovation-drone': { file: 'ancienne-toiture-ardoises-artificielles-avant-renovation-drone.jpg', orientation: 'landscape', tags: ['avant', 'ardoises', 'drone'], alt: 'Avant rénovation : ancienne toiture en ardoises artificielles grises, usées et dépareillées, vue du drone', caption: 'Avant : ardoises artificielles usées' },
  'ancien-toit-ardoises-mousse-rapieces-drone': { file: 'ancien-toit-ardoises-mousse-rapieces-drone.jpg', orientation: 'landscape', tags: ['avant', 'mousse', 'inspection'], alt: 'Ancien toit en ardoises artificielles couvert de mousse et rapiécé, annexe plate à côté, vue du drone', caption: 'Ce que révèle une vue du drone : mousse et rapiéçages' },
  'maison-toit-tuiles-noires-panneaux-apres-drone': { file: 'maison-toit-tuiles-noires-panneaux-apres-drone.jpg', orientation: 'landscape', tags: ['apres', 'tuiles', 'solaire'], alt: 'Maison après rénovation : toit en tuiles noires avec fenêtres de toit et panneaux solaires intégrés, vue du drone', caption: 'Après : toiture neuve, fenêtres de toit et panneaux' },
  'toit-plat-panneaux-solaires-vue-drone': { file: 'toit-plat-panneaux-solaires-vue-drone.jpg', orientation: 'landscape', tags: ['toit-plat', 'solaire'], alt: 'Toit plat avec panneaux solaires alignés et rive en aluminium, jardin en contrebas, vue du drone', caption: 'Toit plat équipé de panneaux, rive alu' },
  'toitures-tuiles-rouges-panneaux-mitoyennes-drone': { file: 'toitures-tuiles-rouges-panneaux-mitoyennes-drone.jpg', orientation: 'landscape', tags: ['tuiles', 'solaire', 'drone'], alt: 'Toitures en tuiles rouges neuves avec panneaux solaires sur des maisons mitoyennes, vue du drone', caption: 'Deux versants neufs sur des maisons mitoyennes' },
  'velux-tuiles-noires-rive-cheminee-drone': { file: 'velux-tuiles-noires-rive-cheminee-drone.jpg', orientation: 'landscape', tags: ['velux', 'tuiles'], alt: 'Fenêtre de toit posée dans des tuiles noires neuves, rive en zinc et cheminée en briques, vue du drone', caption: 'Fenêtre de toit dans la couverture neuve' },
  'noue-zinc-soudure-detail-chantier': { file: 'noue-zinc-soudure-detail-chantier.jpg', orientation: 'landscape', tags: ['zinguerie', 'noue'], alt: 'Détail d’une noue en zinc en cours de pose avec soudure, sous-toiture noire et liteaux, chantier', caption: 'Noue en zinc soudée, avant la couverture' },
  'descente-zinc-cheminee-brique-toit-plat': { file: 'descente-zinc-cheminee-brique-toit-plat.jpg', orientation: 'landscape', tags: ['zinguerie', 'gouttiere'], alt: 'Descente d’eau en zinc le long d’une cheminée en briques, raccord sur toit plat et rive de tuiles', caption: 'Descente en zinc le long de la cheminée' },
};

export const homePhotos = {
  hero: 'hero-toiture-tuiles-bruxelles',
  heroMobile: 'toiture-tuiles-neuve-velux-bruxelles',
  about: 'camionnettes-toiture-veryroof-devant-chantier', // vraie photo : nos camionnettes devant un chantier (lot 3, 13/10/2026)
  categories: {
    'reparation-toiture-bruxelles': 'souche-cheminee-solins-zinc',
    'isolation-toiture-bruxelles': 'isolation-toiture-grenier-vue-ensemble',
    'zinguerie-gouttieres-bruxelles': 'bandeau-corniche-gouttiere-echafaudage',
  } as Record<string, string>,
  core: {
    'renovation-toiture-bruxelles': 'toiture-tuiles-anthracite-cheminee',
    'toiture-plate-bruxelles': 'toit-plat-roofing-vue-clocher',
  } as Record<string, string>,
};

/** Visuel de hero de chaque page (catégories, services phares, services enfants, services généraux, communes). */
export const pagePhotos: Record<string, string> = {
  'reparation-toiture-bruxelles': 'lucarne-solins-zinc-tuiles',
  'reparation-fuite-toiture-bruxelles': 'reparation-fuite-tuile-cassee',
  'remplacement-tuiles-ardoises-bruxelles': 'toiture-tuiles-lucarne-gouttiere-zinc',
  'reparation-toiture-tempete-bruxelles': 'degats-tempete-tuiles-arrachees',
  'reparation-faitage-solins-bruxelles': 'pose-tuiles-faitage-sous-toiture',
  'reparation-cheminee-bruxelles': 'souche-cheminee-solins-zinc',
  'isolation-toiture-bruxelles': 'isolation-toiture-grenier-vue-ensemble',
  'isolation-combles-bruxelles': 'isolation-combles-interieur-laine',
  'isolation-sarking-bruxelles': 'sarking-panneaux-fibre-bois-contre-lattes',
  'isolation-toiture-plate-bruxelles': 'isolation-toiture-plate-panneaux',
  'zinguerie-gouttieres-bruxelles': 'bandeau-corniche-gouttiere-echafaudage',
  'pose-gouttieres-bruxelles': 'corniche-osb-bandeau-metal',
  'reparation-gouttieres-bruxelles': 'corniche-zinc-anthracite-toit-plat',
  'nettoyage-gouttieres-bruxelles': 'nettoyage-gouttieres-feuilles',
  'cheneaux-descentes-eau-bruxelles': 'cheneau-noue-zinc-gros-plan',
  'renovation-toiture-bruxelles': 'renovation-toiture-pose-tuiles-anthracite-echafaudage',
  'toiture-tuiles-bruxelles': 'toiture-tuiles-rouges-neuve-velux-vue-drone',
  'toiture-ardoises-bruxelles': 'toiture-ardoises-naturelles-maison-bruxelloise',
  'toiture-zinc-bruxelles': 'toiture-zinc-joint-debout-annexe',
  'charpente-bruxelles': 'charpente-pannes-bois-traite',
  'enlevement-ardoises-amiante-bruxelles': 'amiante-depose-ardoises-combinaisons-chantier',
  'toiture-plate-bruxelles': 'toit-plat-immeuble-roofing-cheminees',
  'etancheite-epdm-bruxelles': 'epdm-releves-profile-alu-briques',
  'roofing-bitumineux-bruxelles': 'roofing-toit-plat-sorties-ventilation',
  'reparation-toiture-plate-bruxelles': 'epdm-sortie-ventilation-rive-alu',
  'toiture-vegetalisee-bruxelles': 'toiture-vegetalisee-sedum-toit-plat',
  'depannage-toiture-urgence-bruxelles': 'bachage-urgence-toiture-tempete',
  'pose-velux-bruxelles': 'toiture-tuiles-velux-panneaux-solaires-vue-drone',
  'demoussage-toiture-bruxelles': 'demoussage-toiture-avant-apres',
  'inspection-toiture-bruxelles': 'inspection-toiture-couvreur',
  'toiture-copropriete-bruxelles': 'toit-plat-immeuble-souches-cheminees-ville',
  'couvreur-uccle': 'couvreur-uccle-maisons-toits',
  'couvreur-watermael-boitsfort': 'couvreur-watermael-boitsfort-cite-jardin',
  'couvreur-rhode-saint-genese': 'couvreur-rhode-saint-genese-villa-foret',
  'couvreur-waterloo': 'couvreur-waterloo-villa-quatre-facades',
  'toiture-braine-l-alleud': 'villa-renovee-tuiles-grises-garage',
};

/**
 * Galerie « Sur le chantier » (1 à 3 vraies photos par page, jamais celle du hero) : les visuels générés gardent le hero,
 * les photos de chantier apportent la preuve. Ajouter une page = une ligne.
 */
export const pageGalleries: Record<string, string[]> = {
  'toiture-plate-bruxelles': ['roofing-acrotere-cote-rue', 'roofing-releve-acrotere-vertical', 'toit-plat-panneaux-solaires-vue-drone'],
  'renovation-toiture-bruxelles': ['ancienne-toiture-ardoises-artificielles-avant-renovation-drone', 'renovation-toiture-echafaudage-sous-toiture-verte', 'toiture-tuiles-anthracite-apres-renovation-drone'],
  'isolation-toiture-bruxelles': ['sarking-contre-lattes-panneaux-vue-drone'],
  'isolation-sarking-bruxelles': ['isolant-fibre-bois-joints-etanches', 'sarking-contre-lattes-panneaux-vue-drone'],
  'reparation-faitage-solins-bruxelles': ['faitage-tuiles-terre-cuite-mur-pignon', 'solin-zinc-versant-tuiles-sombres', 'faitage-a-sec-tuiles-noires-solin-pignon'],
  'demoussage-toiture-bruxelles': ['toiture-tuiles-beton-mousse-lucarne', 'ancien-toit-ardoises-mousse-rapieces-drone'],
  'enlevement-ardoises-amiante-bruxelles': ['ancienne-toiture-ardoises-artificielles-avant-renovation-drone'],
  'toiture-tuiles-bruxelles': ['maison-renovee-tuiles-anthracite-panneaux-solaires', 'toitures-tuiles-rouges-panneaux-mitoyennes-drone', 'toiture-tuiles-anthracite-apres-renovation-drone'],
  'pose-velux-bruxelles': ['velux-tuiles-noires-rive-cheminee-drone', 'toiture-tuiles-rouges-neuve-velux-vue-drone'],
  'charpente-bruxelles': ['charpente-lattage-neuf-ancienne-maison-drone'],
  'zinguerie-gouttieres-bruxelles': ['corniche-zinc-neuve-descente-bardage-lucarne', 'gouttiere-zinc-neuve-descente-detail-rive'],
  'pose-gouttieres-bruxelles': ['gouttiere-zinc-neuve-descente-detail-rive', 'gouttiere-zinc-descente-angle-rive'],
  'reparation-gouttieres-bruxelles': ['descente-zinc-cheminee-brique-toit-plat'],
  'cheneaux-descentes-eau-bruxelles': ['noue-zinc-soudure-detail-chantier', 'sous-toiture-contre-lattes-raccord-zinc-lucarne'],
  'reparation-cheminee-bruxelles': ['souche-cheminee-rejointoyee-solin-zinc-tuiles'],
  'inspection-toiture-bruxelles': ['ancien-toit-ardoises-mousse-rapieces-drone', 'maison-toit-tuiles-noires-panneaux-apres-drone'],
  'remplacement-tuiles-ardoises-bruxelles': ['toiture-tuiles-anthracite-apres-renovation-drone'],
  'toiture-copropriete-bruxelles': ['toitures-tuiles-rouges-panneaux-mitoyennes-drone'],
};
