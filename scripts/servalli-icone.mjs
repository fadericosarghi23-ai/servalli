/**
 * Favicon, icone PWA e immagine Open Graph di Studio Servalli Architettura.
 *
 *   node scripts/servalli-icone.mjs
 *
 * L'icona riprende quella del sito live (icona.png 59x59: "S" serif bianca su tortora):
 * ridisegnata in vettoriale perché l'originale è troppo piccolo per 192/512 px.
 * L'OG è la foto di Palazzo Spampatti (prima slide della home) con il logo PNG reale.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUB = path.join(ROOT, 'public');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#cdb39d"/><stop offset="1" stop-color="#b39680"/></linearGradient></defs>
  <rect width="64" height="64" rx="6" fill="url(#g)"/>
  <text x="32" y="47" text-anchor="middle" font-family="'Playfair Display', Georgia, 'Times New Roman', serif" font-size="46" fill="#fff">S</text>
</svg>`;
fs.writeFileSync(path.join(PUB, 'favicon.svg'), svg);

const png = (size, file) => sharp(Buffer.from(svg), { density: 72 * (size / 64) * 1.2 }).resize(size, size).png().toFile(path.join(PUB, file));
await png(32, 'favicon-32.png');
await png(180, 'apple-touch-icon.png');
await png(192, 'icon-192.png');
await png(512, 'icon-512.png');

// favicon.ico = PNG 32x32 incapsulato (formato ICO con immagine PNG, supportato dai browser)
const p32 = fs.readFileSync(path.join(PUB, 'favicon-32.png'));
const head = Buffer.alloc(22);
head.writeUInt16LE(0, 0); head.writeUInt16LE(1, 2); head.writeUInt16LE(1, 4);
head.writeUInt8(32, 6); head.writeUInt8(32, 7); head.writeUInt8(0, 8); head.writeUInt8(0, 9);
head.writeUInt16LE(1, 10); head.writeUInt16LE(32, 12); head.writeUInt32LE(p32.length, 14); head.writeUInt32LE(22, 18);
fs.writeFileSync(path.join(PUB, 'favicon.ico'), Buffer.concat([head, p32]));

// Open Graph 1200x630
const logo = await sharp(path.join(PUB, 'img/logo/servalli-architettura.svg'), { density: 144 }).resize({ width: 443 }).png().toBuffer();
fs.mkdirSync(path.join(PUB, 'img/og'), { recursive: true });
await sharp(path.join(PUB, 'images/progetti/palazzo-spampatti/02.jpg'))
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .composite([{ input: logo, left: 1200 - 443 - 48, top: 630 - 109 - 48 }])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(PUB, 'img/og/og-default.jpg'));
console.log('✓ favicon, icone e OG scritti');
