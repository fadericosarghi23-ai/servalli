/**
 * Scarica gli ORIGINALI delle foto da servalliarchitettura.it (/sites/default/files/<file>),
 * li ridimensiona a max 1920px (JPEG mozjpeg q82) in public/images/<sezione>/ e scrive
 * src/data/media.json con misure e flag `drawing` (tavole/rilievi: niente crop in gallery).
 *
 *   node scripts/servalli-immagini.mjs <estrazione.json>
 *
 * estrazione.json = output dello scraper del sito live (progetti, news, pagine).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = 'https://www.servalliarchitettura.it/sites/default/files/';
const j = JSON.parse(fs.readFileSync(process.argv[2], 'utf8'));
const CACHE = path.join(ROOT, 'scripts', '.cache-originali');
fs.mkdirSync(CACHE, { recursive: true });

const DISEGNO = /progetto|planimetria|planumetria|prospett|sezione|pianta|spettrografia|rilievo|monitoraggio|schema|render|titolo-|calcolatrice|monete|termografia/i;

export const slugDi = (url) => {
  const s = url.split('/').pop().replace(/\.html$/, '');
  // due progetti "villa-quartiere-santa-lucia-bergamo" in categorie diverse
  return url.includes('/architettura-d-interni/') && s === 'villa-quartiere-santa-lucia-bergamo' ? 'villa-santa-lucia-interni' : s;
};

async function scarica(file) {
  const f = path.join(CACHE, file);
  if (fs.existsSync(f) && fs.statSync(f).size > 0) return f;
  const r = await fetch(SRC + encodeURIComponent(file).replace(/%2F/g, '/'), { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(`${r.status} ${file}`);
  fs.writeFileSync(f, Buffer.from(await r.arrayBuffer()));
  return f;
}

async function salva(file, rel) {
  const orig = await scarica(file);
  const out = path.join(ROOT, 'public', rel);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const info = await sharp(orig).rotate().resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
    .flatten({ background: '#ffffff' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out);
  return { src: '/' + rel.replace(/\\/g, '/'), width: info.width, height: info.height, drawing: DISEGNO.test(file) || undefined, orig: file };
}

// coda con concorrenza limitata
async function pool(items, n, fn) {
  const res = new Array(items.length);
  let i = 0;
  await Promise.all(Array.from({ length: n }, async () => {
    while (i < items.length) { const k = i++; try { res[k] = await fn(items[k], k); } catch (e) { console.error('✗', e.message); res[k] = null; } }
  }));
  return res;
}

const media = { progetti: {}, news: [], studio: {} };

// Progetti: copertina della card (galleria_portfolio) + payoff + gallery "large", senza doppioni
const cardImg = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts', 'copertine.json'), 'utf8'));
for (const p of j.progetti) {
  const slug = slugDi(p.url);
  const files = [...new Set([cardImg[slug], ...p.imgs.map((i) => i.file)].filter(Boolean))];
  const r = await pool(files, 6, (f, k) => salva(f, `images/progetti/${slug}/${String(k + 1).padStart(2, '0')}.jpg`));
  media.progetti[slug] = r.filter(Boolean);
  console.log(slug, media.progetti[slug].length);
}
// News: immagine di apertura (payoff)
media.news = await pool(j.news, 6, async (n, k) => {
  const f = n.imgs.find((i) => i.style === 'payoff') ?? n.imgs[0];
  return f ? salva(f.file, `images/news/news-${String(k + 1).padStart(2, '0')}.jpg`) : null;
});
// Studio: ritratto, foto servizi, badge
media.studio.ritratto = await salva('marco_paolo_servalli.jpg', 'images/studio/marco-paolo-servalli.jpg');
media.studio.servizi = await salva('ponteggio.jpg', 'images/servizi/ponteggio.jpg');

fs.writeFileSync(path.join(ROOT, 'src', 'data', 'media.json'), JSON.stringify(media, null, 1));
const tot = Object.values(media.progetti).reduce((a, l) => a + l.length, 0) + media.news.filter(Boolean).length + 2;
console.log('✓ immagini scritte:', tot);
