export const site = {
  name: 'Toiture Veryroof',
  tagline: 'Couvreur à Bruxelles et dans toute la périphérie',
  domain: 'https://toiture-veryroof.be',
  phoneDisplay: '+32 460 22 99 60',
  phoneHref: 'tel:+32460229960',
  // Confirmé par le client le 13/10/2026 : contact@ + nom de domaine
  email: 'contact@toiture-veryroof.be',
  address: {
    street: 'Chaussée de La Hulpe 254',
    postalCode: '1000',
    city: 'Bruxelles',
    region: 'Bruxelles-Capitale',
    country: 'BE',
  },
  /** Numéro d'entreprise (BCE) et de TVA, ex. 'BE 0123.456.789'. Vide tant que le client ne l'a pas communiqué : la ligne n'est alors affichée nulle part. */
  vat: '',
  homeSlug: 'couvreur-bruxelles',
  city: 'Bruxelles',
  nav: [
    { label: 'Accueil', href: '/couvreur-bruxelles' },
    { label: 'Services', href: '/services' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const staticPages = [
  { slug: 'services', name: 'Services' },
  { slug: 'a-propos', name: 'À propos' },
  { slug: 'contact', name: 'Contact' },
  { slug: 'zones-d-intervention', name: "Zones d'intervention" },
  { slug: 'mentions-legales', name: 'Mentions légales' },
  { slug: 'politique-de-confidentialite', name: 'Politique de confidentialité' },
];

/**
 * Informations encore attendues du client (état au 13/10/2026). Tant qu'un champ est vide, l'élément correspondant
 * n'est pas affiché : le site est publiable sans trou. Remplir le champ fait réapparaître l'élément partout où il est prévu.
 */
export const pending = {
  /** Forme juridique, ex. 'SRL' → mentions légales. */
  legalForm: '',
  /** Nom et adresse de l'hébergeur, ex. 'Netlify, Inc., 512 2nd Street, San Francisco, CA 94107, États-Unis' → mentions légales et politique de confidentialité. */
  host: '',
  /** Phrase sur les garanties en cas de transfert hors Union européenne (politique de confidentialité), à rédiger avec l'hébergeur retenu. */
  hostTransferNote: '',
  /** Durée de conservation (en mois) des demandes de devis sans suite ; 0 = formulation par critères. */
  retentionMonths: 0,
  /** Horaires du bureau, ex. 'Lundi–vendredi, 8h–18h' → Contact et accueil. */
  officeHours: '',
  /** Année de création, ex. '2018' → À propos. */
  founded: '',
  /** Certifications et formations, ex. 'Formation amiante simple, VCA' → À propos. */
  certifications: '',
  /** Paragraphes de l'histoire de l'entreprise (150 à 200 mots au total) → À propos. */
  story: [] as string[],
  /** Gérant : la section « équipe » de la page À propos s'affiche dès que le nom est renseigné ; photo = identifiant du registre src/data/photos.ts. */
  manager: { name: '', role: 'Gérant et couvreur', qualifications: '', years: 0, bio: '', photo: '' },
  /** Code d'intégration de la vidéo de présentation → À propos (prévoir la mise à jour de la politique de confidentialité si le lecteur est un service tiers). */
  videoEmbed: '',
  /** Code d'intégration de la fiche Google Business Profile → À propos. */
  gbpEmbed: '',
  /** Code d'intégration des avis Google → section « Avis » de l'accueil. */
  reviewsEmbed: '',
  /** URL des profils réellement tenus à jour → À propos et pied de page. */
  social: { facebook: '', google: '', linkedin: '', instagram: '' },
};

/** Profils externes à déclarer en `sameAs` dans le schema (vide tant qu'aucun profil n'est renseigné dans `pending.social`). */
export const sameAs: string[] = Object.values(pending.social).filter((u) => u.trim() !== '');
