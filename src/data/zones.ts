export type Region = 'bxl' | 'brabant-wallon' | 'brabant-flamand';

export interface Zone {
  slug: string;
  name: string;
  region: Region;
}

// Pages communes publiées. Pour ajouter une commune : une ligne ici, motif couvreur-[commune].
export const activeZones: Zone[] = [
  { slug: 'couvreur-uccle', name: 'Uccle', region: 'bxl' },
  { slug: 'couvreur-watermael-boitsfort', name: 'Watermael-Boitsfort', region: 'bxl' },
  { slug: 'couvreur-rhode-saint-genese', name: 'Rhode-Saint-Genèse', region: 'brabant-flamand' },
  { slug: 'couvreur-waterloo', name: 'Waterloo', region: 'brabant-wallon' },
  // Motif « toiture-<commune> » quand « toiture X » domine nettement « couvreur X » (étude du 13/10/2026, docs/content/13-etude-slugs-communes.md).
  { slug: 'toiture-braine-l-alleud', name: "Braine-l'Alleud", region: 'brabant-wallon' },
];

export const regionLabels: Record<Region, string> = {
  bxl: 'Région de Bruxelles-Capitale',
  'brabant-wallon': 'Périphérie sud (Brabant wallon)',
  'brabant-flamand': 'Périphérie (Brabant flamand)',
};

export const serviceAreas: Record<Region, string[]> = {
  bxl: [
    'Bruxelles-Ville (Laeken, Neder-Over-Heembeek, Haren)', 'Uccle', 'Ixelles', 'Watermael-Boitsfort', 'Auderghem',
    'Woluwe-Saint-Pierre', 'Woluwe-Saint-Lambert', 'Etterbeek', 'Schaerbeek', 'Evere', 'Saint-Josse-ten-Noode',
    'Saint-Gilles', 'Forest', 'Anderlecht', 'Molenbeek-Saint-Jean', 'Koekelberg', 'Berchem-Sainte-Agathe', 'Ganshoren', 'Jette',
  ],
  'brabant-wallon': [
    'Waterloo', "Braine-l'Alleud", 'La Hulpe', 'Rixensart', 'Genval', 'Lasne', 'Wavre', 'Ottignies-Louvain-la-Neuve', 'Nivelles',
  ],
  'brabant-flamand': [
    'Rhode-Saint-Genèse', 'Linkebeek', 'Drogenbos', 'Beersel', 'Sint-Pieters-Leeuw', 'Dilbeek', 'Wemmel', 'Grimbergen',
    'Vilvorde', 'Zaventem', 'Kraainem', 'Wezembeek-Oppem', 'Tervuren', 'Overijse', 'Hoeilaart',
  ],
};

/** Terme de tête d'une page commune selon son slug : « Couvreur » ou « Toiture ». */
export function zoneTerm(zone: Zone): 'Couvreur' | 'Toiture' {
  return zone.slug.startsWith('toiture-') ? 'Toiture' : 'Couvreur';
}
export function zoneH1(zone: Zone): string {
  return `${zoneTerm(zone)} ${zone.name}`;
}
