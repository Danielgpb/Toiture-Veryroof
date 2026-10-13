// Importe les images déposées dans photos-a-trier/ vers src/assets/photos/ :
// rotation EXIF appliquée, 1600 px max, JPEG optimisé, métadonnées (dont GPS) supprimées.
// Correspondance AUTOMATIQUE : un fichier dont le nom (sans extension) est un identifiant de src/data/photos.ts
// remplace le visuel du même nom (ex. toiture-ardoises-naturelles-maison-bruxelloise.jpg). Les autres noms sont ignorés
// sauf s'ils figurent dans ITEMS (correspondance manuelle : nom brut → identifiant, recadrage optionnel { aspect, topRatio }).
// Usage : node scripts/import-photos.mjs   (ou npm run photos)
import sharp from 'sharp';
import { mkdir, readdir } from 'node:fs/promises';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import { photos } from '../src/data/photos.ts';

const SRC = fileURLToPath(new URL('../photos-a-trier/', import.meta.url));
const OUT = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));
const MAX = 1600;
const EXT = /\.(jpe?g|png|webp|heic|tiff?)$/i;

/** Correspondances manuelles pour des photos brutes (ex. IMG-xxxx.jpg) : { from, to, crop? } */
export const ITEMS = [];

await mkdir(OUT, { recursive: true });
const files = (await readdir(SRC)).filter((f) => EXT.test(f));
let done = 0;
for (const file of files) {
  const base = parse(file).name.toLowerCase().replace(/^[\d.\s]+/, '').replace(/,paysage$/, '').replace(/[\s,]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  const manual = ITEMS.find((it) => it.from === file);
  const id = manual ? manual.to : base;
  if (!photos[id]) { console.log(`ignoré (nom inconnu du registre) : ${file}`); continue; }
  let image = sharp(join(SRC, file)).rotate();
  if (manual?.crop) {
    const meta = await sharp(join(SRC, file)).rotate().metadata();
    const width = meta.width;
    const height = Math.min(meta.height, Math.round(width / manual.crop.aspect));
    const top = Math.min(Math.round(manual.crop.topRatio * meta.height), meta.height - height);
    image = image.extract({ left: 0, top, width, height });
  }
  const info = await image
    .resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 84, mozjpeg: true })
    .toFile(join(OUT, photos[id].file));
  console.log(`${file} → ${photos[id].file}  ${info.width}x${info.height}  ${Math.round(info.size / 1024)} Ko`);
  done++;
}
console.log(`${done} image(s) importée(s)`);
