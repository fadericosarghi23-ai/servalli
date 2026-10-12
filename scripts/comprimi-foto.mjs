/**
 * Comprime le foto di public/images (max 1600px sul lato lungo, JPEG mozjpeg q72 progressivo,
 * senza metadati) e aggiorna width/height in src/ dove l'immagine è referenziata, così
 * gli attributi intrinseci restano esatti.
 *
 *   node scripts/comprimi-foto.mjs
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MAX = 1600;

const files = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.jpe?g$/i.test(e.name)) files.push(p);
  }
})(path.join(ROOT, 'public', 'images'));

const dims = new Map();
let prima = 0, dopo = 0;
for (const f of files) {
  const buf = fs.readFileSync(f);
  prima += buf.length;
  const out = await sharp(buf).resize({ width: MAX, height: MAX, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 72, mozjpeg: true, progressive: true }).toBuffer({ resolveWithObject: true });
  const usa = out.data.length < buf.length ? out.data : buf;
  const meta = usa === buf ? await sharp(buf).metadata() : out.info;
  fs.writeFileSync(f, usa);
  dopo += usa.length;
  dims.set('/' + path.relative(path.join(ROOT, 'public'), f).split(path.sep).join('/'), { w: meta.width, h: meta.height });
}

// aggiorna { src: "/images/...", width: N, height: M } nei sorgenti
const src = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.(ts|astro|json)$/.test(e.name)) src.push(p);
  }
})(path.join(ROOT, 'src'));
let aggiornati = 0;
for (const f of src) {
  let t = fs.readFileSync(f, 'utf8');
  const n = t.replace(/(["'])(\/images\/[^"']+\.jpg)\1(\s*,\s*"?width"?\s*:\s*)(\d+)(\s*,\s*"?height"?\s*:\s*)(\d+)/g, (m, q, s, a, w, b, h) => {
    const d = dims.get(s);
    if (!d) return m;
    aggiornati++;
    return `${q}${s}${q}${a}${d.w}${b}${d.h}`;
  });
  if (n !== t) fs.writeFileSync(f, n);
}
console.log(`${files.length} foto: ${(prima / 1048576).toFixed(1)} MB → ${(dopo / 1048576).toFixed(1)} MB, ${aggiornati} riferimenti aggiornati`);
