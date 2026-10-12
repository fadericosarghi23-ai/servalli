/**
 * Contenuti ripetuti o in lista (home, studio, news). I testi singoli delle pagine
 * sono scritti direttamente nei file .astro.
 *
 * Studio Servalli Architettura: testi VERBATIM dal sito live servalliarchitettura.it.
 * La sezione a card + elenco (ex /metodo/ della base) ospita le 12 NEWS del sito, in /news/:
 * le 4 più recenti come card con foto (anche in home), le altre 8 come elenco. Gli estratti sono
 * la prima frase di ogni news (troncata con … se lunga); i testi integrali restano sul sito vecchio.
 */
import type { Img } from '../lib/media';
import { progetto } from './progetti';

/** Carosello hero della home: 5 slide, ognuna punta a un progetto (titolo · luogo nella didascalia).
 *  Stessi soggetti dello slideshow del sito live. */
export const heroSlides = [
  { progetto: "palazzo-spampatti", foto: 0 },
  { progetto: "villa-quartiere-santa-lucia-bergamo", foto: 0 },
  { progetto: "chiesa-di-san-pancrazio", foto: 0 },
  { progetto: "villa-santa-lucia-interni", foto: 0 },
  { progetto: "sant-agata-nel-carmine", foto: 0 },
].map(({ progetto: slug, foto }) => {
  const p = progetto(slug);
  return { href: `/progetti/${p.slug}/`, titolo: p.titolo, luogo: p.luogo, img: p.immagini[foto] };
});

/** Progetti nella griglia della home (6), da tutte e 4 le categorie */
export const progettiHome = ["palazzo-spampatti", "sant-agata-nel-carmine", "rigenerazione-urbana-i-locali-tecnici-di-una-palazzina", "appartamento-ai-piedi-di-citta-alta", "la-chiesa-di-san-giovanni-battista", "casa-di-riposo-musicisti-fondazione-giuseppe-verdi"];

/** Numeri (home: 4 card sotto il titolo dello studio). Dati dal sito: attività dal 1993, 28 progetti
 *  in portfolio, 4 ambiti di progetto, 8 servizi di consulenza. */
export const numeriHome = [
  { n: "1993", label: "Inizio dell’attività" },
  { n: "28", label: "Progetti in portfolio" },
  { n: "4", label: "Ambiti di progetto" },
  { n: "8", label: "Servizi di consulenza" },
];

/** Numeri (pagina studio) */
export const numeriStudio = [
  { n: "1993", label: "Primi progetti di restauro" },
  { n: "28", label: "Progetti in portfolio" },
  { n: "12", label: "News e progetti recenti" },
  { n: "2013", label: "Italian Heritage Award" },
];

export type News = { titolo: string; testo: string; img: Img };
const news = (titolo: string, testo: string, img: Img): News => ({ titolo, testo, img });

/** Le 4 card scure con foto (home + /news/): le news più recenti */
export const tappe: News[] = [
  news("Progetto riqualificazione Ex Borsa Merci di Bergamo", "Il progetto prevede il riutilizzo degli spazi dell’Ex Borsa Merci di Bergamo, all’interno del Palazzo dei Contratti e delle Manifestazioni inaugurato nel 1954 su progetto di Marcello…", { src: "/images/news/news-01.jpg", width: 1600, height: 1600, alt: "News: Progetto riqualificazione Ex Borsa Merci di Bergamo" }),
  news("Risanamento conservativo villa anni 50", "La villa si trova lungo viale Vittorio Emanuele, viale principale di Bergamo che porta alla parte più antica della città.", { src: "/images/news/news-02.jpg", width: 1600, height: 1600, alt: "News: Risanamento conservativo villa anni 50" }),
  news("Un ex cinema degli anni ’60 in disuso rinasce come centro poliedrico", "Attorniata da dimore di antiche famiglie laniere, che dal XV al XVIII secolo resero Gandino celebre in tutta Europa, una ex sala cinematografica degli anni ’60 verrà adeguata alle nuove…", { src: "/images/news/news-03.jpg", width: 1600, height: 1600, alt: "News: Un ex cinema degli anni ’60 in disuso rinasce come centro poliedrico" }),
  news("Un progetto per far ritrovare alle facciate l'antica magnificenza", "E’ cosa nota che Giuseppe Verdi volle dedicare l’ultimo periodo della sua vita all’intento di aiutare operatori delle arti musicali impossibilitati a vivere con dignità gli anni della…", { src: "/images/news/news-04.jpg", width: 1500, height: 1500, alt: "News: Un progetto per far ritrovare alle facciate l'antica magnificenza" }),
];

/** Elenco di dettaglio (/news/): le altre 8 news (titolo + prima frase) */
export const fasi = [
  { titolo: "Quattro nuove unità residenziali, pensate come rustici annessi ad un’antica cascina bergamasca", testo: "La ”Rustichella” nasce come cascina agricola in una zona che è stata negli anni oggetto di una grande trasformazione urbanistica, perdendo così l’antica vocazione rurale.", img: { src: "/images/news/news-05.jpg", width: 1541, height: 649, alt: "News: Quattro nuove unità residenziali, pensate come rustici annessi ad un’antica cascina bergamasca" } as Img },
  { titolo: "Progettato il Padiglione Italia per l’Expo 2016 di Antalya", testo: "La Turchia ha organizzato dal 23 aprile al 30 ottobre 2016 un’importante esposizione internazionale dedicata al tema “Una vita verde per le generazioni future”, con approfondimenti su…", img: { src: "/images/news/news-06.jpg", width: 1417, height: 779, alt: "News: Progettato il Padiglione Italia per l’Expo 2016 di Antalya" } as Img },
  { titolo: "Una casa ben isolata è calda ed accogliente. Ha pochissime dispersioni termiche, e questo significa un enorme risparmio", testo: "Una casa ben isolata è calda ed accogliente, e garantisce il miglior comfort in ogni stagione.", img: { src: "/images/news/news-07.jpg", width: 1440, height: 804, alt: "News: Una casa ben isolata è calda ed accogliente. Ha pochissime dispersioni termiche, e questo significa un enorme risparmio" } as Img },
  { titolo: "Il progetto per Sant’Agata nel Carmine premiato all’Italian Heritage Award", testo: "Il progetto di restauro e fund raising per Sant’Agata nel Carmine a Bergamo è stato premiato all’ITALIAN HERITAGE AWARD 2013 Premio Internazionale per la Valorizzazione dei Beni Culturali…", img: { src: "/images/news/news-08.jpg", width: 1600, height: 1068, alt: "News: Il progetto per Sant’Agata nel Carmine premiato all’Italian Heritage Award" } as Img },
  { titolo: "Riqualificazione di una prestigiosa villa Liberty", testo: "La ex Villa Guffanti è un prestigioso edificio in stile Liberty dagli ambienti voltati e decorati, nato alla fine dell’800 come residenza del proprietario di un attiguo cementificio.", img: { src: "/images/news/news-09.jpg", width: 1600, height: 1068, alt: "News: Riqualificazione di una prestigiosa villa Liberty" } as Img },
  { titolo: "Un armonioso progetto urbanistico per la riqualificazione di un’area dismessa", testo: "Il progetto riguarda il piano di recupero richiesto dal Comune di Vaprio d’Adda per la valorizzazione di un’area industriale dismessa.", img: { src: "/images/news/news-10.jpg", width: 1600, height: 1068, alt: "News: Un armonioso progetto urbanistico per la riqualificazione di un’area dismessa" } as Img },
  { titolo: "Un interessante progetto di riqualificazione di un’area industriale dismessa", testo: "Un interessante esempio di edificio industriale per la produzione della calce, costruito lungo il fiume Meschio nel centro antico di Serravalle, uno dei due antichi nuclei di Vittorio…", img: { src: "/images/news/news-11.jpg", width: 1600, height: 1068, alt: "News: Un interessante progetto di riqualificazione di un’area industriale dismessa" } as Img },
  { titolo: "Una moderna interpretazione della tradizione araba del giardino", testo: "Questo parco celebrativo è ubicato in Iraq ad Al’Amarah, capitale del Maysan, lungo il corso del fiume Tigri.", img: { src: "/images/news/news-12.jpg", width: 1600, height: 1068, alt: "News: Una moderna interpretazione della tradizione araba del giardino" } as Img },
];

/** Aree in cui lavora lo studio (home, fondo scuro): 3 box dai luoghi dei progetti del portfolio
 *  (7 progetti senza località sul sito non sono contati). */
export const aree = [
  { conteggio: "11 progetti", nome: "Bergamo", comuni: "Città Alta, Longuelo, Borgo Palazzo, Borgo San Leonardo, Santa Lucia, Kilometro Rosso" },
  { conteggio: "6 progetti", nome: "Provincia di Bergamo", comuni: "Gandino, Barzana, Almè, Cologno al Serio" },
  { conteggio: "4 progetti", nome: "Milano e all’estero", comuni: "Milano, Antalya (Turchia), Villeneuve-Loubet (Francia)" },
];

/** Approccio (pagina studio): le 6 sezioni di metodo della biografia, testo VERBATIM integrale.
 *  I titoli brevi sono nostri (sul sito le sezioni non hanno titolo). */
export const approccio = [
  { titolo: "Il metodo per il restauro", testo: "Il suo metodo progettuale per il restauro di un’architettura antica si basa sulla conoscenza della storia dell’edificio. L’indagine viene condotta con ricerche bibliografiche e d’archivio al fine di ritrovare gli elementi di conoscenza delle origini e delle trasformazioni dell’architettura. Si può poi eseguire un accurato rilievo dell’edificio con i più moderni metodi di rilievo topografico-architettonico con metodologia laser-scan. Il rilievo strumentale è accompagnato da una campagna di monitoraggio delle deformazioni delle strutture, del loro degrado e del quadro fessurativo, essenziale per verificare i problemi statici dell’edificio. Viene inoltre effettuato il rilievo materico con il quale si studiano i materiali di costruzione e di finitura dell’antica costruzione e tutte le patologie di degrado in base alle quali si progettano le modalità di intervento. Infine si procede alla pulitura interna ed esterna dell’architettura, per ridonare all’edificio il suo originario splendore." },
  { titolo: "Sant’Agata nel Carmine", testo: "La chiesa di Sant’Agata nel Carmine di Bergamo ha richiesto un importante intervento di recupero. È stato realizzato il consolidamento strutturale, il recupero della copertura, dei serramenti e del pavimento, oltre al restauro dell’apparato decorativo interno con la supervisione della Soprintendenza per i beni architettonici. Sono state installate moderne tecnologie per gli impianti elettrico, di riscaldamento, di diffusione sonora ed antintrusione. Un moderno progetto di Fund Raising ha permesso la ricerca di fondi per finanziare il restauro e la manutenzione dell’architettura mediante la raccolta di contributi e finanziamenti sia pubblici che privati. Questo progetto è stato premiato all’Italian Heritage Award 2013, Premio Internazionale per la Valorizzazione dei Beni Culturali." },
  { titolo: "La riqualificazione degli edifici storici", testo: "Nella riqualificazione degli edifici storici si considera l’architettura come un organismo vivo, con una sua storia, una nascita e una vita di trasformazioni. Il recupero è anch’esso un’opera di trasformazione, che adegua l’edificio alle esigenze del vivere moderno, e che deve essere condotta nel rispetto della cultura che lo ha prodotto e del fascino che trasmette. La statica dell’edificio viene salvaguardata attraverso interventi di consolidamento delle murature originarie. I materiali di finitura vengono recuperati o, se necessario, sostituiti con altri analoghi, cercando una continuità culturale con il passato. Elementi moderni, come serramenti in ferro e pavimentazioni attuali, vengono inseriti in armonia con l’esistente. Gli interventi di restauro, su edifici vincolati, sono sottoposti all’approvazione della Soprintendenza ai beni architettonici." },
  { titolo: "Palazzo Spampatti a Gandino", testo: "Con il progetto di recupero del settecentesco Palazzo Spampatti a Gandino si è effettuato un importante intervento di restauro conservativo che ha riguardato tutti gli elementi architettonici di pregio quali volte, solai lignei, tetto, affreschi, elementi in pietra. Il progetto di riqualificazione ha permesso la creazione, in un contesto di grande fascino storico, di nuove unità abitative complete degli impianti e servizi più moderni." },
  { titolo: "Il recupero delle aree dismesse", testo: "Il recupero delle aree dismesse è conseguente alle trasformazioni che negli ultimi decenni hanno modificato la geografia del nostro territorio. Ampliamenti del tessuto urbano e riqualificazioni di aree abbandonate stanno interessando un nuovo sviluppo dei centri abitati. La progettazione urbanistica richiede una pianificazione del territorio, delle destinazioni d'uso, delle infrastrutture, dei trasporti. L’approccio agli interventi urbanistici ed ai grandi progetti è di attenta analisi e di rispetto della cultura del territorio. Ad esempio nel caso di riqualificazioni di aree dismesse vengono proposte soluzioni che valorizzano l'archeologia industriale. In caso di edifici meno caratterizzati, l'esame dell'esistente ed un accurato progetto di trasformazione portano a soluzioni innovative che riutilizzano le strutture portanti ed evitano gli ingenti costi di demolizione e smaltimento." },
  { titolo: "L’architettura d’interni", testo: "Nei progetti di architettura d’interni la casa è valorizzata come uno dei punti di riferimento fondamentali della nostra vita, espressione della nostra personalità. L’architettura d’interni unisce la funzione tecnica della progettazione degli spazi all’aspetto espressivo ed estetico della creazione degli ambienti. Il calore, l’armonia, l’interesse per la storia del luogo, la valorizzazione degli oggetti che lo abitano, connotano i suoi Interventi. Fondamentale per la realizzazione di un buon progetto è sempre comunque il dialogo con il committente, per il raggiungimento di soluzioni che ne esprimano la personalità." },
];

/** Elenco competenze nella sezione "Sede" (pagina studio) */
export const competenzeStudio = [
  "Restauro di immobili di pregio",
  "Restauro di architetture religiose e adeguamento liturgico",
  "Riqualificazione di aree urbane e aree dismesse",
  "Architettura d’interni",
  "Direzione lavori",
  "Collaborazioni con la Soprintendenza",
  "Consulenze, finanziamenti e perizie",
];

/** FAQ: nessuna (il sito non ne ha). */
export const faq: { d: string; r: string }[] = [];
export const FAQ_COL1 = 5;

/** CTA (fascia accento in fondo alle pagine): frase di stacco e testo del teaser Consulenze */
export const cta = {
  eyebrow: "Contatti",
  titolo: "Siete pronti a fare nuovi progetti?",
  testo: "Forniamo consulenze mirate su fund raising, finanziamenti, incentivi, normative e supportiamo le vostre decisioni per valorizzare le potenzialità di un’architettura.",
};
