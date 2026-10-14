/**
 * Marques de matériaux posées par Toiture Veryroof, affichées dans le bandeau défilant de l'accueil.
 *
 * RÈGLE : n'inscrire ici QUE des marques réellement posées. Le bandeau est une information factuelle
 * (« les marques que nous posons »), jamais une affirmation de partenariat, d'agrément ou de certification.
 *
 * LOGO : fichier dans src/assets/logos/, nom indiqué dans `logo`. Tous les fichiers présents viennent
 * du site officiel du fabricant (jamais d'un agrégateur de logos), détourés et ramenés à 88 px de haut.
 * Tant que `logo` est absent, le nom s'affiche en toutes lettres — c'est le cas des marques dont le
 * fabricant ne publie qu'une version blanche (invisible sur fond clair) ou aucun fichier exploitable.
 *
 * DROITS : relevé des conditions au 14/10/2026, détail dans docs/content/16-carrousels-accueil.md.
 * Velux et Recticel autorisent explicitement l'usage par un poseur ; les autres exigent un accord écrit
 * qui n'a pas encore été demandé. Le client a choisi d'afficher les logos en attendant ces accords.
 */
export interface Brand {
  /** Nom exact de la marque, tel qu'elle s'écrit. */
  name: string;
  /** Ce que la marque fabrique, en deux ou trois mots. Sert de texte alternatif et d'infobulle. */
  category: string;
  /** Nom du fichier dans src/assets/logos/ (ex. 'velux.png'). Absent = nom affiché en toutes lettres. */
  logo?: string;
  /** Mention de marque imposée par le fabricant, reprise sous le bandeau. */
  notice?: string;
}

export const brands: Brand[] = [
  // Seule marque à publier une charte pour les poseurs : usage autorisé, mention ci-dessous obligatoire.
  {
    name: 'Velux',
    category: 'fenêtres de toit',
    logo: 'velux.png',
    notice: 'VELUX and the VELUX logo are registered trademarks of VKR Holding A/S.',
  },
  { name: 'Wienerberger', category: 'tuiles en terre cuite', logo: 'wienerberger.png' },
  // Etex ne publie qu'un logo blanc, illisible sur fond clair : nom en toutes lettres.
  { name: 'Eternit', category: 'ardoises en fibres-ciment' },
  { name: 'VMZINC', category: 'zinc de couverture', logo: 'vmzinc.png' },
  // Idem : seule une version blanche du logo circule sur le site du fabricant.
  { name: 'Rheinzink', category: 'zinc de couverture' },
  { name: 'Derbigum', category: 'étanchéité bitumineuse', logo: 'derbigum.png' },
  // Firestone Building Products est devenu Elevate (Holcim) en juin 2022 ; la gamme EPDM reste RubberGard.
  { name: 'Elevate', category: 'membranes EPDM, ex-Firestone', logo: 'elevate.png' },
  // Médiathèque Recticel : fichiers téléchargeables « for marketing purposes on behalf of our trade partners ».
  { name: 'Recticel', category: 'panneaux isolants', logo: 'recticel.png' },
  // ROCKWOOL ne diffuse son logo qu'en EPS d'impression, Isover ne publie rien : noms en toutes lettres.
  { name: 'Rockwool', category: 'laine de roche' },
  { name: 'Isover', category: 'laine minérale' },
];
