// Genera servalli/src/data/progetti.ts da estrazione.json + media.json
import fs from 'node:fs';
import path from 'node:path';

const [estr, root] = process.argv.slice(2);
const j = JSON.parse(fs.readFileSync(estr, 'utf8'));
const media = JSON.parse(fs.readFileSync(path.join(root, 'src/data/media.json'), 'utf8'));

const CAT = {
  'restauro-di-immobili-di-pregio': 'cat-1',
  'restauro-di-architetture-religiose': 'cat-2',
  'riqualificazione-di-aree-urbane': 'cat-3',
  'architettura-d-interni': 'cat-4',
};
const slugDi = (url) => {
  const s = url.split('/').pop().replace(/\.html$/, '');
  return url.includes('/architettura-d-interni/') && s === 'villa-quartiere-santa-lucia-bergamo' ? 'villa-santa-lucia-interni' : s;
};

// Titoli card: maiuscole normalizzate (sul sito alcuni sono in MAIUSCOLO)
const TITOLO = {
  'chiesa-di-san-rocco': 'Chiesa di San Rocco',
  'convento-francescano-del-600': 'Convento francescano del ’600',
  'la-villetta-casa-di-riposo-giuseppe-verdi': '“La Villetta”, Casa di riposo Giuseppe Verdi',
  'casa-di-riposo-musicisti-fondazione-giuseppe-verdi': 'Casa di riposo per Musicisti, Fondazione Giuseppe Verdi',
  'un-soggiorno-proteso-nel-giardino': 'Un soggiorno proteso nel giardino',
  'ampliamento-sito-industriale': 'Ampliamento sito industriale',
  'dettagli-d-epoca-un-piccolo-appartamento': 'Dettagli d’epoca per un piccolo appartamento',
  'appartamento-ai-piedi-di-citta-alta': 'Appartamento ai piedi di Città Alta',
  'sant-agata-nel-carmine': 'Sant’Agata nel Carmine',
};
// Luogo: solo se scritto nei testi del sito; altrimenti slot aperto
const LUOGO = {
  'restauro-cappella-gentilizia': 'Gandino (BG)',
  'chiesa-di-san-rocco': 'Barzana (BG)',
  'sant-agata-nel-carmine': 'Bergamo Alta',
  'chiesa-di-san-pancrazio': 'Bergamo',
  'la-chiesa-di-san-giovanni-battista': 'Almè (BG)',
  'convento-francescano-del-600': 'Longuelo, Bergamo',
  'la-villetta-casa-di-riposo-giuseppe-verdi': 'Milano',
  'palazzo-spampatti': 'Gandino (BG)',
  'casa-di-riposo-musicisti-fondazione-giuseppe-verdi': 'Milano',
  'villa-quartiere-santa-lucia-bergamo': 'Bergamo',
  'studio-bergamo': 'Longuelo, Bergamo',
  'casa-di-riposo-di-cologno-al-serio': 'Cologno al Serio (BG)',
  'ospedale-vecchio': 'Cologno al Serio (BG)',
  'rigenerazione-urbana-i-locali-tecnici-di-una-palazzina': 'Bergamo',
  'progettato-il-padiglione-italia-l-expo-2016-di-antalya': 'Antalya (Turchia)',
  'edificio-borgo-palazzo-bergamo': 'Bergamo',
  'dettagli-d-epoca-un-piccolo-appartamento': 'Borgo San Leonardo, Bergamo',
  'appartamento-ai-piedi-di-citta-alta': 'Bergamo',
  'innovation-hub': 'Kilometro Rosso, Bergamo',
  'villa-santa-lucia-interni': 'Bergamo',
  'appartamento-costa-azzurra': 'Villeneuve-Loubet (Francia)',
};
// San Rocco: sul sito il testo è tutto in maiuscolo → riportato in minuscolo con le maiuscole dei nomi
const SAN_ROCCO = [
  'Il restauro conservativo dell’apparato decorativo interno e la riprogettazione dell’impianto liturgico del presbiterio hanno rimodulato la chiesa di San Rocco alle esigenze delle celebrazioni della comunità formata da molte giovani famiglie.',
  'La chiesa di Barzana, consacrata e dedicata a San Rocco nel 1671, venne arricchita nell’apparato decorativo alla fine del ’700 e all’inizio del ’900. Risale agli anni ’70 del secolo scorso l’adeguamento liturgico del presbiterio, con l’eliminazione delle balaustre, la creazione del nuovo altare, di un nuovo ambone e lo spostamento del fonte battesimale.',
  'Condiviso con la Soprintendenza ai monumenti, il progetto di restauro dell’apparato decorativo dell’aula e del presbiterio ha recuperato le cromie settecentesche, riportando la relazione originale tra spazio architettonico e superfici interne.',
  'Con il progetto di adeguamento liturgico, condiviso con lo scultore Giancarlo Defendi, si sono riviste le proporzioni e le linee dell’altare e dell’ambone realizzati nel 1972, eliminando la pedana in marmo sotto l’altare e semplificando i gradini sul presbiterio. Una nuova sede in legno, realizzata dalla Scuola di falegnameria Tino Sana, ha sostituito quella in marmo degli anni ’70. Altare e ambone sono completati da due nuovi altorilievi: i dodici Apostoli per la mensa e i quattro Evangelisti per l’ambone.',
  'Il gruppo dei restauratori è intervenuto in modo attento nella pulizia e consolidamento degli affreschi, delle dorature e delle superfici della volta. L’interessante portone in radica di noce dell’ingresso principale è stato riportato al suo fascino originale.',
];

const pulisci = (t) => t.replace(/\s+/g, ' ').replace(/ ([,.;:])/g, '$1').trim();
const descrittore = (file) => {
  const m = file.replace(/\.(jpe?g|png)$/i, '').match(/_-_(.+)$/);
  if (!m) return '';
  return m[1].replace(/_\d+$/, '').replace(/_/g, ' ').trim().replace(/^precedente$/, 'prima dell’intervento');
};

const q = (s) => JSON.stringify(s);
const righe = [];
for (const p of j.progetti) {
  const slug = slugDi(p.url);
  const cat = CAT[p.cat];
  const titolo = TITOLO[slug] ?? pulisci(p.card[0]);
  const paragrafi = slug === 'chiesa-di-san-rocco'
    ? SAN_ROCCO
    : p.body.flatMap((b) => b.t.split('\n')).map(pulisci).filter((t) => t.length > 2);
  const autore = pulisci(p.autore).replace('dierzione', 'direzione');
  // copertina = foto di apertura (payoff, 1920px); la miniatura quadrata della card va dopo,
  // o fuori se è sotto gli 800px (sul sito non esiste più grande)
  const lista = [...(media.progetti[slug] || [])];
  if (lista.length > 1) { const card = lista.shift(); lista.splice(1, 0, card); if (card.width < 800) lista.splice(1, 1); }
  const imgs = lista.map((im, k) => {
    const d = descrittore(im.orig);
    const alt = d ? `${titolo}, ${d}` : `${titolo}, foto ${k + 1}`;
    return `      { src: ${q(im.src)}, width: ${im.width}, height: ${im.height}, alt: ${q(alt)}${im.drawing ? ', drawing: true' : ''} },`;
  });
  const luogo = LUOGO[slug] ?? ''; // non indicata sul sito: riga nascosta
  righe.push(`  {
    slug: ${q(slug)},
    titolo: ${q(titolo)},
    luogo: ${q(luogo)},
    categoria: '${cat}',
    categorie: ['${cat}'],
    intervento: ${q(pulisci(p.tagline))},
    progettisti: ${autore ? `[${q(autore)}]` : 'undefined'},
    temi: [],
    referente: 'marco-paolo-servalli',
    paragrafi: [
${paragrafi.map((t) => '      ' + q(t) + ',').join('\n')}
    ],
    immagini: [
${imgs.join('\n')}
    ],
  },`);
}

const out = `/**
 * PORTFOLIO di Studio Servalli Architettura: 4 categorie e 28 progetti, come sul sito live
 * servalliarchitettura.it. Testi VERBATIM dalle schede di dettaglio (generato da
 * scripts/servalli-immagini.mjs + estrazione del sito; poi modificabile a mano).
 *
 * Immagini: originali scaricati dal sito e ridotti a max 1920px in public/images/progetti/<slug>/.
 * La prima è la copertina della card (come sul sito), le altre la gallery della scheda.
 * drawing = tavola/rilievo/spettrografia: niente crop nella gallery.
 * \`progettisti\` = riga crediti della scheda ("Progetto e direzione lavori ...").
 */
import type { Img } from '../lib/media';

export type CategoriaId = 'cat-1' | 'cat-2' | 'cat-3' | 'cat-4';

export type Categoria = {
  id: CategoriaId;
  /** slug della pagina /progetti/<slug>/ */
  slug: string;
  /** nome completo (filtri, breadcrumb, eyebrow) */
  nome: string;
  /** etichetta corta sul badge della card */
  etichetta: string;
  /** testo introduttivo della pagina categoria */
  intro: string;
  title: string;
  description: string;
};

export const categorie: Categoria[] = [
  {
    id: 'cat-1',
    slug: 'restauro-di-immobili-di-pregio',
    nome: 'Restauro di immobili di pregio',
    etichetta: 'Immobili di pregio',
    intro: 'L’architettura è un organismo vivo, con una sua storia, una nascita e una vita di trasformazioni. Il recupero è anch’esso un’opera di trasformazione, che adegua l’edificio alle esigenze del vivere moderno.',
    title: 'Restauro di immobili di pregio | Studio Servalli Architettura',
    description: 'Restauro e riqualificazione di palazzi, ville, conventi e residenze storiche tra Bergamo e Milano, nel rispetto della cultura che li ha prodotti.',
  },
  {
    id: 'cat-2',
    slug: 'restauro-di-architetture-religiose',
    nome: 'Restauro di architetture religiose',
    etichetta: 'Architetture religiose',
    intro: 'Il metodo progettuale per il restauro di un’architettura antica si basa sulla conoscenza della storia dell’edificio, con ricerche bibliografiche e d’archivio, rilievi e monitoraggi.',
    title: 'Restauro di architetture religiose | Studio Servalli Architettura',
    description: 'Restauro conservativo e adeguamento liturgico di chiese storiche nella provincia di Bergamo, in collaborazione con la Soprintendenza.',
  },
  {
    id: 'cat-3',
    slug: 'riqualificazione-di-aree-urbane',
    nome: 'Riqualificazione di aree urbane',
    etichetta: 'Aree urbane',
    intro: 'Le trasformazioni degli ultimi decenni hanno contribuito a modificare la geografia del nostro territorio. Ampliamenti del tessuto urbano e riqualificazioni di aree dismesse stanno interessando un nuovo sviluppo dei centri abitati.',
    title: 'Riqualificazione di aree urbane | Studio Servalli Architettura',
    description: 'Rigenerazione urbana, nuovi edifici residenziali e industriali e grandi progetti espositivi: l’approccio è di attenta analisi e di rispetto del territorio.',
  },
  {
    id: 'cat-4',
    slug: 'architettura-d-interni',
    nome: 'Architettura d’interni',
    etichetta: 'Interni',
    intro: 'La casa è uno dei punti di riferimento della nostra vita. Un nido, un rifugio, un habitat, ma anche espressione della nostra personalità.',
    title: 'Architettura d’interni | Studio Servalli Architettura',
    description: 'Progetti di architettura d’interni per residenze e spazi di lavoro: funzione tecnica degli spazi ed estetica degli ambienti, in dialogo con il committente.',
  },
];

export const categoria = (id: CategoriaId) => categorie.find((c) => c.id === id)!;

export type Progetto = {
  slug: string;
  titolo: string;
  luogo: string;
  /** categoria principale (badge) */
  categoria: CategoriaId;
  /** tutte le categorie in cui compare (filtri) */
  categorie: CategoriaId[];
  intervento: string;
  progettisti?: string[];
  importo?: string;
  temi: string[];
  /** id del membro del team referente (src/data/team.ts); vuoto = riga nascosta */
  referente: string;
  paragrafi: string[];
  immagini: Img[];
};

export const progetti: Progetto[] = [
${righe.join('\n')}
];

export const progetto = (slug: string) => progetti.find((p) => p.slug === slug)!;
export const copertina = (p: Progetto) => p.immagini[0];
export const inCategoria = (id: CategoriaId) => progetti.filter((p) => p.categorie.includes(id));
`;
fs.writeFileSync(path.join(root, 'src/data/progetti.ts'), out);
console.log('progetti', righe.length, 'righe', out.split('\n').length);
