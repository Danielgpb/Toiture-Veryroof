export interface ServiceLeaf {
  slug: string;
  name: string;
}

export interface ServiceGroup extends ServiceLeaf {
  kind: 'category' | 'core';
  children: ServiceLeaf[];
}

export type PageKind = 'category' | 'core' | 'child' | 'general';

export interface ServicePage {
  slug: string;
  name: string;
  kind: PageKind;
  parentSlug: string | null;
}

export const serviceGroups: ServiceGroup[] = [
  {
    kind: 'category',
    slug: 'reparation-toiture-bruxelles',
    name: 'Réparation de toiture',
    children: [
      { slug: 'reparation-fuite-toiture-bruxelles', name: 'Réparation de fuite de toiture' },
      { slug: 'remplacement-tuiles-ardoises-bruxelles', name: 'Remplacement de tuiles et ardoises cassées' },
      { slug: 'reparation-toiture-tempete-bruxelles', name: 'Réparation de toiture après tempête' },
      { slug: 'reparation-faitage-solins-bruxelles', name: 'Réparation de faîtage et de solins' },
      { slug: 'reparation-cheminee-bruxelles', name: 'Réparation de souche de cheminée' },
    ],
  },
  {
    kind: 'category',
    slug: 'isolation-toiture-bruxelles',
    name: 'Isolation de toiture',
    children: [
      { slug: 'isolation-combles-bruxelles', name: "Isolation des combles par l'intérieur" },
      { slug: 'isolation-sarking-bruxelles', name: "Isolation par l'extérieur (sarking)" },
      { slug: 'isolation-toiture-plate-bruxelles', name: 'Isolation de toiture plate' },
    ],
  },
  {
    kind: 'category',
    slug: 'zinguerie-gouttieres-bruxelles',
    name: 'Zinguerie et gouttières',
    children: [
      { slug: 'pose-gouttieres-bruxelles', name: 'Pose et remplacement de gouttières' },
      { slug: 'reparation-gouttieres-bruxelles', name: 'Réparation de gouttières' },
      { slug: 'nettoyage-gouttieres-bruxelles', name: 'Nettoyage de gouttières' },
      { slug: 'cheneaux-descentes-eau-bruxelles', name: "Chéneaux, noues et descentes d'eau pluviale" },
    ],
  },
  {
    kind: 'core',
    slug: 'renovation-toiture-bruxelles',
    name: 'Rénovation de toiture',
    children: [
      { slug: 'toiture-tuiles-bruxelles', name: 'Toiture en tuiles' },
      { slug: 'toiture-ardoises-bruxelles', name: 'Toiture en ardoises' },
      { slug: 'toiture-zinc-bruxelles', name: 'Toiture en zinc' },
      { slug: 'charpente-bruxelles', name: 'Réparation et traitement de charpente' },
      { slug: 'enlevement-ardoises-amiante-bruxelles', name: "Enlèvement d'ardoises amiante-ciment" },
    ],
  },
  {
    kind: 'core',
    slug: 'toiture-plate-bruxelles',
    name: 'Toiture plate',
    children: [
      { slug: 'etancheite-epdm-bruxelles', name: 'Toiture EPDM' },
      { slug: 'roofing-bitumineux-bruxelles', name: 'Roofing bitumineux' },
      { slug: 'reparation-toiture-plate-bruxelles', name: 'Réparation de toiture plate' },
      { slug: 'toiture-vegetalisee-bruxelles', name: 'Toiture végétalisée' },
    ],
  },
];

export const generalServices: ServiceLeaf[] = [
  { slug: 'depannage-toiture-urgence-bruxelles', name: "Dépannage toiture d'urgence 24h/24" },
  { slug: 'pose-velux-bruxelles', name: 'Pose de fenêtres de toit Velux' },
  { slug: 'demoussage-toiture-bruxelles', name: 'Démoussage et traitement hydrofuge' },
  { slug: 'inspection-toiture-bruxelles', name: 'Inspection et expertise de toiture' },
  { slug: 'toiture-copropriete-bruxelles', name: 'Toiture pour copropriétés et syndics' },
];

export function allServicePages(): ServicePage[] {
  const pages: ServicePage[] = [];
  for (const group of serviceGroups) {
    pages.push({ slug: group.slug, name: group.name, kind: group.kind, parentSlug: null });
    for (const child of group.children) {
      pages.push({ slug: child.slug, name: child.name, kind: 'child', parentSlug: group.slug });
    }
  }
  for (const service of generalServices) {
    pages.push({ slug: service.slug, name: service.name, kind: 'general', parentSlug: null });
  }
  return pages;
}

export function serviceH1(name: string): string {
  return `${name} Bruxelles`;
}
