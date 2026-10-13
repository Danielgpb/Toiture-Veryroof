import { site } from './site.ts';

/** Les 4 étapes d'une intervention, affichées sur les pages communes (section « Comment ça se passe »). {commune} est remplacé par le nom de la commune. */
export interface ProcessStep { title: string; text: string; /** Identifiant du registre photos (src/data/photos.ts). */ photo: string }
export const processSteps: ProcessStep[] = [
  { photo: 'etape-appel-couvreur-telephone', title: 'Vous appelez', text: `Au ${site.phoneDisplay} ou par le formulaire. Décrivez ce que vous voyez. En cas d'urgence, nous partons tout de suite.` },
  { photo: 'etape-visite-toit-grenier-photos', title: 'Visite sur place à {commune}', text: 'Nous montons sur le toit et dans le grenier, photos à l’appui. Vous savez ce qui est en cause avant tout chiffrage.' },
  { photo: 'etape-devis-detaille-table', title: 'Devis gratuit sous 48 h', text: 'Détaillé poste par poste, montant arrêté avant les travaux, sans engagement.' },
  { photo: 'etape-travaux-garantie-reception', title: 'Travaux et garantie écrite', text: 'Chantier planifié avec vous, autorisation de voirie demandée par nous, garantie écrite remise à la réception.' },
];
export const processHeading = 'Comment ça se passe';
