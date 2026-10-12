// Uso: node scripts/servalli-logo-svg.cjs <cartella con playfair.ttf e raleway.ttf da Google Fonts> public/img/logo/servalli-architettura.svg  (richiede opentype.js@1.3.4)
// Ridisegna il logo Servalli (targa tortora 443x109) in SVG con testo convertito in tracciati.
// node logo.cjs <dir-font> <out.svg>
const opentype = require('opentype.js');
const fs = require('fs');
const path = require('path');
const [fontDir, out] = process.argv.slice(2);
const playfair = opentype.loadSync(path.join(fontDir, 'playfair.ttf'));
const raleway = opentype.loadSync(path.join(fontDir, 'raleway.ttf'));

// testo adattato al riquadro misurato sul PNG originale: [x0, x1, y0, y1]
function fit(font, text, box, spacing = 0) {
  const size = 100;
  const p0 = font.getPath(text, 0, 0, size, { letterSpacing: spacing });
  const b = p0.getBoundingBox();
  const s = (box[1] - box[0] + 1) / (b.x2 - b.x1);
  const fs2 = size * s;
  const p = font.getPath(text, 0, 0, fs2, { letterSpacing: spacing });
  const bb = p.getBoundingBox();
  const dx = box[0] - bb.x1;
  const dy = box[3] + 1 - bb.y2; // allinea il fondo (linea di base delle maiuscole)
  const q = font.getPath(text, dx, dy, fs2, { letterSpacing: spacing });
  return { d: q.toPathData(2), h: bb.y2 - bb.y1, target: box[3] - box[2] + 1, size: fs2 };
}

const studio = fit(raleway, 'STUDIO', [196, 241, 21, 29], 0.06);
const servalli = fit(playfair, 'Servalli', [149, 286, 30, 64]);
const arch = fit(raleway, 'ARCHITETTURA', [171, 265, 78, 87], 0.06);
for (const [n, t] of Object.entries({ studio, servalli, arch })) console.log(n, 'altezza', t.h.toFixed(1), 'attesa', t.target, 'corpo', t.size.toFixed(1));

const W = 443, H = 109, B = 11;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-label="Studio Servalli Architettura">
  <defs>
    <linearGradient id="pannello" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#cbbba1"/><stop offset="1" stop-color="#ad9279"/></linearGradient>
    <filter id="ombra" x="-5%" y="-10%" width="110%" height="130%"><feDropShadow dx="0.6" dy="1" stdDeviation="0.7" flood-color="#5f4d40" flood-opacity="0.45"/></filter>
  </defs>
  <path fill="#9a8069" d="M0 0H${W}L${W - B} ${B}H${B}Z"/>
  <path fill="#dacbb4" d="M0 ${H}H${W}L${W - B} ${H - B}H${B}Z"/>
  <path fill="#bba68b" d="M0 0L${B} ${B}V${H - B}L0 ${H}Z"/>
  <path fill="#b3a288" d="M${W} 0L${W - B} ${B}V${H - B}L${W} ${H}Z"/>
  <rect x="${B}" y="${B}" width="${W - 2 * B}" height="${H - 2 * B}" fill="url(#pannello)"/>
  <g fill="#ffffff">
    <path d="${studio.d}"/>
    <path d="${servalli.d}" filter="url(#ombra)"/>
    <path d="${arch.d}"/>
  </g>
</svg>
`;
fs.writeFileSync(out, svg);
console.log('scritto', out, svg.length, 'byte');
