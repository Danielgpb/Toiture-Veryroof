// Crée un visuel neutre temporaire (dégradé bleu ardoise + silhouette de toit, sans texte) pour chaque entrée du registre
// dont le fichier manque dans src/assets/photos/. Les fichiers existants ne sont jamais écrasés.
// Usage : node scripts/make-placeholders.mjs
import sharp from 'sharp';
import { access, mkdir } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { photos } from '../src/data/photos.ts';

const OUT = fileURLToPath(new URL('../src/assets/photos/', import.meta.url));
const svg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2A41"/><stop offset="1" stop-color="#121D2E"/></linearGradient>
<radialGradient id="r" cx="0.8" cy="0.2" r="0.5"><stop offset="0" stop-color="#D9632B" stop-opacity="0.28"/><stop offset="1" stop-color="#D9632B" stop-opacity="0"/></radialGradient></defs>
<rect width="${w}" height="${h}" fill="url(#g)"/><rect width="${w}" height="${h}" fill="url(#r)"/>
<path d="M0 ${h * 0.72} L${w * 0.5} ${h * 0.42} L${w} ${h * 0.72} L${w} ${h} L0 ${h} Z" fill="#243952"/>
<path d="M0 ${h * 0.72} L${w * 0.5} ${h * 0.42} L${w} ${h * 0.72}" fill="none" stroke="#D9632B" stroke-width="${Math.round(w * 0.004)}" stroke-linejoin="round"/>
<rect x="${w * 0.64}" y="${h * 0.4}" width="${w * 0.05}" height="${h * 0.16}" fill="#1A2A40"/>
</svg>`;

await mkdir(OUT, { recursive: true });
let made = 0;
for (const p of Object.values(photos)) {
  const file = join(OUT, p.file);
  try { await access(file); continue; } catch {}
  const [w, h] = p.orientation === 'landscape' ? [1600, 900] : [1200, 1600];
  await sharp(Buffer.from(svg(w, h))).jpeg({ quality: 70 }).toFile(file);
  made++;
}
console.log(`${made} visuel(s) temporaire(s) créé(s), ${Object.keys(photos).length} entrées au registre`);
