/**
 * Marques de matériaux posées par Toiture Veryroof, affichées dans le bandeau défilant de l'accueil.
 *
 * RÈGLE : n'inscrire ici QUE des marques réellement posées. Le bandeau est une information factuelle
 * (« les marques que nous posons »), jamais une affirmation de partenariat, d'agrément ou de certification.
 *
 * LOGO : déposer le fichier dans src/assets/logos/ et indiquer son nom dans `logo`.
 * Formats acceptés : .svg (préféré, net à toutes les tailles) ou .png à fond transparent.
 * Tant que `logo` est absent, le nom s'affiche en toutes lettres — c'est volontaire et propre,
 * mieux qu'un logo basse définition récupéré n'importe où. Les logos de marque restent la propriété
 * de leurs titulaires : utiliser les fichiers officiels fournis par le fabricant ou son espace presse.
 */
export interface Brand {
  /** Nom exact de la marque, tel qu'elle s'écrit. */
  name: string;
  /** Ce que la marque fabrique, en deux ou trois mots. Sert de texte alternatif et d'infobulle. */
  category: string;
  /** Nom du fichier dans src/assets/logos/ (ex. 'velux.svg'). Absent = nom affiché en toutes lettres. */
  logo?: string;
}

/**
 * Liste À CONFIRMER PAR LE CLIENT (14/10/2026). Seule la pose de fenêtres de toit Velux est aujourd'hui
 * établie par le contenu du site. Les autres sont les marques courantes du métier en Belgique,
 * proposées pour relecture : retirer celles qui ne sont pas posées, ajouter les manquantes.
 */
export const brands: Brand[] = [
  { name: 'Velux', category: 'fenêtres de toit' },
  { name: 'Wienerberger', category: 'tuiles en terre cuite' },
  { name: 'Eternit', category: 'ardoises en fibres-ciment' },
  { name: 'VMZINC', category: 'zinc de couverture' },
  { name: 'Rheinzink', category: 'zinc de couverture' },
  { name: 'Derbigum', category: 'étanchéité bitumineuse' },
  { name: 'Firestone', category: 'membranes EPDM' },
  { name: 'Recticel', category: 'panneaux isolants' },
  { name: 'Rockwool', category: 'laine de roche' },
  { name: 'Isover', category: 'laine minérale' },
];
