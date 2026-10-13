// Supprime les copies de synchronisation (iCloud/Finder) du type « page 2.html » que la synchro du dossier Bureau crée pendant le build.
import { readdir, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = fileURLToPath(new URL('../dist/', import.meta.url));
async function walk(dir) { const out = []; for (const e of await readdir(dir, { withFileTypes: true })) { const p = join(dir, e.name); if (e.isDirectory()) out.push(...(await walk(p))); else out.push(p); } return out; }
let n = 0;
try { for (const f of await walk(dist)) if (/ \d+\.[a-z0-9]+$/i.test(f)) { await rm(f); n++; } } catch { /* pas de dist */ }
if (n) console.log(`clean-dist : ${n} copie(s) de synchronisation supprimée(s) (déplacer le projet hors d'un dossier synchronisé iCloud évite le problème)`);
