/**
 * Carte des mots-clés : UN mot-clé principal par page, unique sur tout le site (anti-cannibalisation).
 * Règles : le parent vise le terme générique, chaque enfant vise son modificateur propre ; une page ne cible jamais
 * le mot-clé principal d'une autre page dans son title ou son H1 (elle peut le citer en texte, avec un lien vers cette page).
 * `avoid` liste les termes d'autres pages que la page ne doit PAS cibler (title/H1), pour mémoire des rédacteurs.
 * Volumes et intentions vérifiés avec DataForSEO (Belgique, fr) le 12/10/2026 : voir docs/content/etude-mots-cles.md.
 * Alignement fiche Google (libellés de catégories vérifiés sur ~100 fiches Google Maps fr-BE le 13/10/2026) :
 *   « Entreprise de toiture » (principale) → accueil (variante « entreprise de toiture Bruxelles ») ; « Entreprise d'étanchéité » → Toiture plate ;
 *   « Entrepreneur spécialisé dans l'isolation » → Isolation de toiture ; « Charpentier » → Réparation et traitement de charpente ;
 *   « Installation et entretien de gouttières » / « Service d'entretien des gouttières » → Zinguerie et gouttières (pose, réparation, nettoyage).
 *   Les services prédéfinis de la fiche seront relevés à sa création et chaque service portera le nom exact de sa page.
 */
export interface PageKeywords {
  primary: string;
  /** Variantes à employer naturellement dans le texte (volumes réels, voir l'étude). */
  secondary: string[];
  avoid?: string[];
  /** Termes qui marquent l'angle d'une AUTRE page : interdits aussi dans la meta description, le sous-titre du hero, les H2 (et, pour les enfants, le résumé, le CTA final et le lien parent). */
  avoidWide?: string[];
}

export const keywords: Record<string, PageKeywords> = {
  // Accueil : seule page à viser les deux têtes de requête, « couvreur » et « toiture ».
  index: { primary: 'couvreur Bruxelles', secondary: ['toiture Bruxelles', 'toiturier Bruxelles', 'entreprise de toiture Bruxelles', 'roofing Bruxelles'] },
  'services': { primary: 'services de toiture Bruxelles', secondary: ['couvreur services'] },
  'a-propos': { primary: 'Toiture Veryroof couvreur', secondary: ['à propos'] },
  'contact': { primary: 'contact Toiture Veryroof', secondary: ['devis toiture Bruxelles', 'toiture Bruxelles devis gratuit'] },
  'zones-d-intervention': { primary: "zones d'intervention couvreur Bruxelles", secondary: ['couvreur périphérie Bruxelles', 'couvreur Brabant wallon'] },
  // Catégories et enfants
  'reparation-toiture-bruxelles': { primary: 'réparation toiture Bruxelles', secondary: ['réparer toiture Bruxelles', 'couvreur réparation'], avoid: ['dépannage', 'urgence', '24h/24', 'intervention rapide', 'toiture plate', 'fuite', 'tempête', 'cheminée', 'faîtage', 'tuiles cassées'], avoidWide: ['dépannage', 'urgence', 'toiture plate'] },
  'reparation-fuite-toiture-bruxelles': { primary: 'réparation fuite toiture Bruxelles', secondary: ['fuite toiture Bruxelles', 'infiltration toiture', 'fuite de toit'], avoid: ['tempête', 'cheminée', 'faîtage', 'toiture plate', 'urgence'] },
  'remplacement-tuiles-ardoises-bruxelles': { primary: 'remplacement tuiles cassées Bruxelles', secondary: ['tuile cassée', 'ardoises cassées'] },
  'reparation-toiture-tempete-bruxelles': { primary: 'réparation toiture après tempête Bruxelles', secondary: ['dégâts tempête toiture'], avoid: ['dépannage 24h/24', 'fuite', 'cheminée'] },
  'reparation-faitage-solins-bruxelles': { primary: 'réparation faîtage solins Bruxelles', secondary: ['faîtage toiture', 'solin zinc'] },
  'reparation-cheminee-bruxelles': { primary: 'réparation souche de cheminée Bruxelles', secondary: ['souche de cheminée', 'solin cheminée', 'cheminée toiture'] },
  'isolation-toiture-bruxelles': { primary: 'isolation toiture Bruxelles', secondary: ['isoler sa toiture', 'isolation toit', 'prime isolation toiture Bruxelles'], avoid: ['isolation combles', 'sarking', 'isolation toiture plate'], avoidWide: ['sarking'] },
  'isolation-combles-bruxelles': { primary: 'isolation des combles Bruxelles', secondary: ['isolation combles', 'isolation par l’intérieur', 'isolation grenier'], avoid: ['sarking', 'extérieur', 'toiture plate'] },
  'isolation-sarking-bruxelles': { primary: 'isolation sarking Bruxelles', secondary: ['isolation toiture par l’extérieur'], avoid: ['combles', 'intérieur', 'toiture plate', 'rénovation'] },
  'isolation-toiture-plate-bruxelles': { primary: 'isolation toiture plate Bruxelles', secondary: ['isolation toit plat'], avoid: ['combles', 'sarking', 'EPDM', 'roofing'] },
  'zinguerie-gouttieres-bruxelles': { primary: 'zinguerie Bruxelles', secondary: ['couvreur zingueur Bruxelles', 'gouttières Bruxelles', 'corniche Bruxelles'], avoid: ['toiture en zinc', 'pose', 'nettoyage', 'réparation', 'chéneaux', 'solins'], avoidWide: ['toiture en zinc'] },
  'pose-gouttieres-bruxelles': { primary: 'pose de gouttières Bruxelles', secondary: ['remplacement gouttières', 'gouttière zinc', 'corniche zinc', 'rénovation corniche'], avoid: ['réparation', 'nettoyage', 'chéneau'] },
  'reparation-gouttieres-bruxelles': { primary: 'réparation gouttières Bruxelles', secondary: ['réparation corniche Bruxelles', 'gouttière qui fuit', 'gouttière percée'], avoid: ['pose', 'remplacement', 'nettoyage'] },
  'nettoyage-gouttieres-bruxelles': { primary: 'nettoyage gouttières Bruxelles', secondary: ['gouttière bouchée', 'entretien gouttières'], avoid: ['pose', 'réparation', 'démoussage'] },
  'cheneaux-descentes-eau-bruxelles': { primary: 'chéneaux et descentes d’eau Bruxelles', secondary: ['chéneau zinc', 'noue zinc', 'descente d’eau pluviale'] },
  // Services phares et enfants
  'renovation-toiture-bruxelles': { primary: 'rénovation toiture Bruxelles', secondary: ['refaire sa toiture', 'refaire toiture prix', 'toiture neuve Bruxelles'], avoid: ['toiture en tuiles', 'toiture en ardoises', 'toiture en zinc', 'charpente', 'amiante', 'réparation de toiture', 'isolation'], avoidWide: ['réparation de toiture', 'amiante'] },
  'toiture-tuiles-bruxelles': { primary: 'toiture en tuiles Bruxelles', secondary: ['couverture tuiles', 'tuiles terre cuite'], avoid: ['ardoises', 'zinc', 'réparation'] },
  'toiture-ardoises-bruxelles': { primary: 'toiture en ardoises Bruxelles', secondary: ['toiture en ardoise', 'ardoise naturelle toiture', 'couverture ardoise'], avoid: ['tuiles', 'zinc', 'amiante'], avoidWide: ['amiante'] },
  'toiture-zinc-bruxelles': { primary: 'toiture en zinc Bruxelles', secondary: ['zinc joint debout', 'couverture zinc'], avoid: ['gouttières', 'zinguerie', 'tuiles', 'ardoises'] },
  'charpente-bruxelles': { primary: 'réparation charpente Bruxelles', secondary: ['charpente toiture', 'traitement charpente', 'charpentier Bruxelles'] },
  'enlevement-ardoises-amiante-bruxelles': { primary: 'enlèvement ardoises amiante Bruxelles', secondary: ['amiante toiture', 'ardoise amiante', 'désamiantage toiture'] },
  'toiture-plate-bruxelles': { primary: 'toiture plate Bruxelles', secondary: ['toit plat Bruxelles', 'étanchéité toiture plate', 'étanchéité toit plat'], avoid: ['EPDM', 'roofing', 'réparation de toiture plate', 'végétalisée', 'isolation'], avoidWide: ['fuite', 'urgence', 'EPDM', 'végétalisée'] },
  'etancheite-epdm-bruxelles': { primary: 'toiture EPDM Bruxelles', secondary: ['étanchéité EPDM', 'membrane EPDM', 'toit plat EPDM'], avoid: ['roofing', 'bitum', 'végétalisée', 'réparation'] },
  'roofing-bitumineux-bruxelles': { primary: 'roofing bitumineux Bruxelles', secondary: ['toiture roofing', 'roofing toit plat', 'prix roofing m2'], avoid: ['EPDM', 'végétalisée', 'réparation'] },
  'reparation-toiture-plate-bruxelles': { primary: 'réparation toiture plate Bruxelles', secondary: ['réparation roofing', 'fuite toit plat'], avoid: ['EPDM', 'végétalisée', 'isolation', 'neuve', 'fuite', 'urgence', '24h/24', 'dépannage'], avoidWide: ['24h/24', 'urgence', 'dépannage'] },
  'toiture-vegetalisee-bruxelles': { primary: 'toiture végétalisée Bruxelles', secondary: ['toiture végétale Bruxelles', 'toit vert', 'toiture verte sedum'] },
  // Services généraux
  'depannage-toiture-urgence-bruxelles': { primary: 'dépannage toiture urgence Bruxelles', secondary: ['dépannage toiture', 'urgence toiture', 'bâchage toiture', 'couvreur urgence 24h/24'], avoid: ['après tempête', 'réparation de toiture', 'fuite de toiture'] },
  'pose-velux-bruxelles': { primary: 'pose Velux Bruxelles', secondary: ['installation Velux', 'placement Velux', 'fenêtre de toit'] },
  'demoussage-toiture-bruxelles': { primary: 'démoussage toiture Bruxelles', secondary: ['nettoyage toiture', 'hydrofuge toiture', 'traitement hydrofuge toiture'], avoid: ['gouttières', 'inspection'] },
  'inspection-toiture-bruxelles': { primary: 'expertise toiture Bruxelles', secondary: ['inspection toiture', 'contrôle toiture'], avoid: ['démoussage', 'réparation'] },
  'toiture-copropriete-bruxelles': { primary: 'toiture copropriété Bruxelles', secondary: ['couvreur syndic', 'toiture immeuble'] },
  // Communes
  'couvreur-uccle': { primary: 'couvreur Uccle', secondary: ['toiture Uccle', 'toiturier Uccle'] },
  'couvreur-watermael-boitsfort': { primary: 'couvreur Watermael-Boitsfort', secondary: ['toiture Watermael-Boitsfort'] },
  'couvreur-rhode-saint-genese': { primary: 'couvreur Rhode-Saint-Genèse', secondary: ['toiture Rhode-Saint-Genèse'] },
  'couvreur-waterloo': { primary: 'couvreur Waterloo', secondary: ['toiture Waterloo'] },
  'toiture-braine-l-alleud': { primary: "toiture Braine-l'Alleud", secondary: ["couvreur Braine-l'Alleud", "toiturier Braine-l'Alleud"] },
};
