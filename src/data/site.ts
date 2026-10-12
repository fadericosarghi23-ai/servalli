/**
 * IDENTITÀ DEL CLIENTE — unico punto da cui header, footer, contatti, JSON-LD,
 * meta, privacy, cookie, robots e llms.txt leggono i dati dello studio.
 *
 * Studio Servalli Architettura, arch. Marco Paolo Servalli (Bergamo). Dati dal sito live
 * servalliarchitettura.it e dal documento unico di riversamento.
 * Sede unica: sede2 è null e i template non la rendono.
 */

export const site = {
  /** Nome breve usato ovunque (title, header, footer, JSON-LD) */
  nome: 'Studio Servalli Architettura',
  /** Denominazione completa/ragione sociale (JSON-LD legalName, privacy). Vuota = non resa. */
  ragioneSociale: 'Studio Servalli Architettura',
  /** Varianti del nome (JSON-LD alternateName) */
  nomiAlternativi: ['Servalli Architettura', 'Marco Paolo Servalli Architettura'],
  /** Alt del logo: nome + discipline */
  logoAlt: 'Studio Servalli Architettura, restauro e riqualificazione di edifici storici',
  /** Tipo di attività in 2-4 parole, usato in eyebrow e meta */
  attivita: 'Restauro e riqualificazione',
  /** Slogan breve (JSON-LD slogan, footer) */
  slogan: 'Valorizzare il calore, l’armonia, la storia di un luogo',
  /** Descrizione dello studio in 1 frase (meta description di default, JSON-LD, llms.txt) */
  descrizione:
    'Studio di architettura a Bergamo dell’arch. Marco Paolo Servalli: restauro di immobili di pregio e architetture religiose, riqualificazione urbana e interni.',
  /** Frase del footer sotto il logo */
  footerClaim: 'Valorizzare il calore, l’armonia, la storia di un luogo.',

  // ── Dominio e tecnici ───────────────────────────────────────────────
  /** Dominio canonico SENZA slash finale. Tenere allineato con SITE_URL in astro.config.mjs */
  dominio: 'https://www.servalliarchitettura.it',
  /** Colore della barra del browser: deve coincidere con --accent in global.css */
  themeColor: '#7d6656',
  /** Codice ISO regione/provincia per meta geo.region */
  geoRegion: 'IT-BG',

  // ── Contatti ────────────────────────────────────────────────────────
  email: 'info@servalliarchitettura.it',
  /** Telefono come si legge a schermo. Vuoto = le righe col telefono non vengono rese. */
  telefono: '+39 035 400156',
  /** Telefono per i link tel: in formato E.164 senza spazi */
  telefonoE164: '+39035400156',
  /** PEC e P.IVA: vuote = non rese. */
  pec: '',
  piva: 'IT01089940165',
  /** REA: vuoto = non reso */
  rea: '',

  indirizzo: {
    via: 'Via Longuelo 92',
    cap: '24129',
    citta: 'Bergamo',
    provincia: 'BG',
    paese: 'IT',
  },
  /** Seconda sede: lo studio ne ha una sola */
  sede2: null as null | { via: string; cap: string; citta: string; paese: string; mapsUrl: string },
  /** Zona/quartiere in cui si trova lo studio (testo libero per "Dove siamo") */
  zona: 'quartiere Longuelo, Bergamo',
  /** Coordinate per la mappa OpenStreetMap (civico 92 di Via Longuelo, da OSM) */
  geo: { lat: 45.6960757, lng: 9.6337972 } as null | { lat: number; lng: number },
  /** Link "Apri in Google Maps / Indicazioni stradali" della sede principale */
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Via%20Longuelo%2092%2C%2024129%20Bergamo',
  /** Modalità di ricevimento (pagina contatti) */
  ricevimento: '[[DA COMPILARE: orari dello studio o modalità di ricevimento, es. su appuntamento]]',

  /** Social: lasciare l'array vuoto per nascondere il blocco. */
  social: [
    { nome: 'Facebook', url: 'https://www.facebook.com/ServalliArchitettura/', icona: 'facebook' },
    { nome: 'LinkedIn', url: 'https://www.linkedin.com/company/studio-servalli-architettura', icona: 'linkedin' },
    { nome: 'Pinterest', url: 'https://www.pinterest.com/mpservalli/', icona: 'pinterest' },
    { nome: 'YouTube', url: 'https://www.youtube.com/channel/UCbKIyKSI0RJGQ2CabfJT6Jw', icona: 'youtube' },
  ] as { nome: string; url: string; icona: 'facebook' | 'instagram' | 'linkedin' | 'pinterest' | 'youtube' }[],

  /** Associazioni (badge "Socio di" nel footer) */
  socioDi: { nome: 'Assorestauro', url: 'http://www.assorestauro.org/socio/servalli-marco-paolo.html' },

  /** Aree servite (JSON-LD areaServed, llms.txt) — dai luoghi dei progetti */
  areeServite: [
    { tipo: 'City', nome: 'Bergamo' },
    { tipo: 'State', nome: 'Lombardia' },
    { tipo: 'Country', nome: 'Italia' },
  ],
  /** Competenze (JSON-LD knowsAbout) */
  competenze: [
    'Restauro di immobili di pregio',
    'Restauro di architetture religiose',
    'Riqualificazione di aree urbane',
    'Architettura d’interni',
    'Direzione lavori',
  ],

  /** Form contatti. endpoint vuoto + mailto: il form apre il programma di posta verso l'email.
   *  [[DA COMPILARE: collegamento del form (Netlify Forms o endpoint) da concordare col cliente]] */
  form: {
    netlify: false,
    endpoint: '',
    mailto: 'info@servalliarchitettura.it',
  },

  /** Analytics/pixel: nessuno */
  analytics: null as null | string,

  /** Anno per il copyright */
  anno: new Date().getFullYear(),
};

export const indirizzoRiga = `${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta}`;
export const abs = (p: string) => site.dominio + p;
