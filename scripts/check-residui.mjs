/**
 * Cerca residui dei clienti precedenti (tìlde studio, Campomarzio) e segnaposto della base in
 * src/, public/, config e dist/. Esce con errore se ne trova.
 *
 *   npm run check-residui        (dopo npm run build per controllare anche dist/)
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Dati identificativi del vecchio cliente: nome, contatti, sedi, persone, progetti, tecnici
const TERMINI = [
  'tilde', 'tìlde', 'tildestudio', 'tildestudio.eu',
  'Modena', 'Sevilla', 'Castelvetro', '41124', '41009', 'Jiménez Becerril', 'Concejal Alberto', 'IT-MO',
  '44.6405', '10.9266', 'Emilia', 'Andalusia',
  'Pedro Escoriza', 'Torralbo', 'Renato Righi', 'OAMi',
  'Matteo D’Angelo', 'Giacomo Goldoni', 'Francesco Isolani', 'Borja Morillo', 'Alessia Palermo', 'Elena Ogliani', 'Valerio Poltrini', 'Inés Pich', 'Pietro Reginella', 'Valeria Righetti', 'Samuele Silvestri', 'Federico Tavella', 'Binario Lab',
  'Terraplèn', 'terraplen', 'Fet d’Aigua', 'fet-daigua', 'Volume UNO', 'volume-uno', 'Óptica', 'optica-hemera', 'Biscione', 'Concéntrico', 'Paisaje', 'A escena', 'a-escena', 'Cuniola', 'Boulevard della pietra', 'Flùttuo', 'A linha de sombra', 'Trama', 'Contrapunto', 'Studiolo', 'Fragmentos', 'Blu / Azul', 'El Cuarto Lúcido',
  'Pego', 'Besalù', 'Logroño', 'Alicante', 'Granada', 'Badajoz', 'Carpi', 'Mirandola', 'Rionero', 'Catania', 'Omuli', 'Chueca', 'Formigine', 'Barcelona', 'Monte d’Oiro', 'Bagnolo Piemonte', 'San Piero in Bagno', 'Ferrara', 'Sora', 'Cesa',
  // Campomarzio (interfaccia italiana ripresa da quel sito, stessa base)
  'Campomarzio', 'campomarzio', 'Trento', 'Bolzano', 'Pellico', 'Galilei', '02993490214', 'BZ-222823', '0461', 'Ambrosini', 'Andreatta', 'Busana', 'Cappelletti', 'Lunelli', 'Pedretti', 'Pedrotti', 'Cagol', 'madonna-bianca', 'vallagarina', 'piazza-della-mostra', 'house-ca', 'Trentino', 'Alto Adige', 'office.jpg',
  // segnaposto della base
  'esempio.it', 'progetto-0', 'IT-XX',
  'squarespace', '10 Blind', 'TAC!', 'FAR Roma', 'ACER Bologna',
];

// package.json e README.md nominano legittimamente la base (base-tildestudio) e la sua provenienza:
// non sono contenuti del sito, quindi restano fuori dal controllo.
const DIRS = ['src', 'public', 'dist', 'astro.config.mjs', 'netlify.toml'];
const SKIP = new Set(['check-residui.mjs']);
const EXT = /\.(astro|ts|js|mjs|json|md|css|html|txt|xml|svg|webmanifest|toml)$/;

const files = [];
for (const d of DIRS) {
  const full = path.join(ROOT, d);
  if (!fs.existsSync(full)) continue;
  if (fs.statSync(full).isFile()) { files.push(full); continue; }
  (function walk(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (EXT.test(e.name) && !SKIP.has(e.name)) files.push(p);
    }
  })(full);
}

let trovati = 0;
for (const f of files) {
  const t = fs.readFileSync(f, 'utf8');
  for (const term of TERMINI) {
    let i = t.indexOf(term);
    while (i !== -1) {
      trovati++;
      const riga = t.slice(0, i).split('\n').length;
      console.log(`${path.relative(ROOT, f)}:${riga}  «${term}»  …${t.slice(Math.max(0, i - 40), i + 40).replace(/\s+/g, ' ')}…`);
      i = t.indexOf(term, i + term.length);
    }
  }
}
console.log(trovati ? `\n✗ ${trovati} residui trovati in ${files.length} file` : `✓ Nessun residuo del vecchio cliente in ${files.length} file`);
process.exitCode = trovati ? 1 : 0;
