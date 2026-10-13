import type { ImageMetadata } from 'astro';
import { photos, type Photo } from '../data/photos';

const modules = import.meta.glob<{ default: ImageMetadata }>('../assets/photos/*.jpg', { eager: true });

export interface SitePhoto {
  id: string;
  image: ImageMetadata;
  alt: string;
  caption?: string;
}

/** Retourne la photo (métadonnées Astro + alt) à partir de son identifiant du registre. Erreur de build si inconnue. */
export function getPhoto(id: string): SitePhoto {
  const photo: Photo | undefined = photos[id];
  if (!photo) throw new Error(`Photo inconnue dans src/data/photos.ts : ${id}`);
  const mod = modules[`../assets/photos/${photo.file}`];
  if (!mod) throw new Error(`Fichier photo manquant : src/assets/photos/${photo.file} (lancer node scripts/import-photos.mjs)`);
  return { id, image: mod.default, alt: photo.alt, caption: photo.caption };
}
