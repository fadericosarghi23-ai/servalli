/**
 * SERVIZI (8) di Studio Servalli Architettura. Usati in: home (griglia 4x2), /servizi/ (una sezione
 * per servizio, alternate), footer, mappa del sito, select del form contatti, JSON-LD.
 * Testi VERBATIM da /it/servizi.html del sito live: "breve" = prima frase, "paragrafi" = il testo
 * diviso in due. Il sito non ha elenchi puntati: punti vuoti (la lista non viene resa).
 * foto/correlati/categoria = abbinamento ai progetti reali del portfolio.
 */
import type { Icona } from './icone';
import type { CategoriaId } from './progetti';

export type Servizio = {
  id: string;
  nome: string;
  breve: string;
  icona: Icona;
  paragrafi: [string, string];
  punti: string[];
  foto: string;
  correlati: string[];
  categoria: CategoriaId;
};

export const servizi: Servizio[] = [
  {
    id: "raccolta-fondi",
    nome: "Campagne di raccolta fondi",
    breve: "Il nostro studio è in grado di organizzare campagne di raccolta fondi, particolarmente funzionali negli interventi di restauro di importanti architetture religiose o storiche.",
    icona: "moneta",
    paragrafi: [
      "Il nostro studio è in grado di organizzare campagne di raccolta fondi, particolarmente funzionali negli interventi di restauro di importanti architetture religiose o storiche. Viene predisposta tutta la documentazione di presentazione dell’intervento architettonico da sottoporre agli sponsor pubblici o privati interessati all’iniziativa.",
      "Il progetto viene divulgato con la preparazione della comunicazione sull’iniziativa, studiando brochure di presentazione del progetto, campagne stampa ed allestimenti in loco come pannelli esplicativi, stendardi o gigantografie di rivestimento dei ponteggi.",
    ],
    punti: [],
    foto: "sant-agata-nel-carmine",
    correlati: ["sant-agata-nel-carmine","la-chiesa-di-san-giovanni-battista","chiesa-di-san-pancrazio"],
    categoria: "cat-2",
  },
  {
    id: "soprintendenza",
    nome: "Collaborazioni con la Soprintendenza",
    breve: "Collaborare alla valorizzazione del patrimonio culturale sia a livello nazionale che internazionale ed avvicinare i cittadini all’arte ed all’architettura è una delle nostre passioni.",
    icona: "colonna",
    paragrafi: [
      "Collaborare alla valorizzazione del patrimonio culturale sia a livello nazionale che internazionale ed avvicinare i cittadini all’arte ed all’architettura è una delle nostre passioni.",
      "La ventennale esperienza maturata nel restauro di edifici storici ci permette di realizzare progetti che rispondono alle normative relative agli edifici vincolati dal Ministero dei beni e delle attività culturali e del turismo e di relazionarci con i funzionari della Soprintendenza ai beni architettonici e paesaggistici.",
    ],
    punti: [],
    foto: "palazzo-spampatti",
    correlati: ["palazzo-spampatti","chiesa-di-san-rocco","ospedale-vecchio"],
    categoria: "cat-1",
  },
  // [[DA VALIDARE: testo con riferimenti normativi datati (decreto giugno 2013, detrazione 65%, legge di stabilità 2015): aggiornare col cliente prima della pubblicazione]]
  {
    id: "finanziamenti-incentivi",
    nome: "Finanziamenti ed incentivi",
    breve: "I moderni metodi di progettazione e l’utilizzo di tecnologie avanzate permettono oggi alti standard qualitativi ed anche notevoli risparmi nei consumi di energia e calore.",
    icona: "incentivi",
    paragrafi: [
      "I moderni metodi di progettazione e l’utilizzo di tecnologie avanzate permettono oggi alti standard qualitativi ed anche notevoli risparmi nei consumi di energia e calore. Un’attenta progettazione può giovare molto sia all’ambiente che al portafoglio. Inoltre il nuovo decreto approvato dal governo a giugno 2013, ha messo a disposizione una serie di incentivi per rendere le abitazioni più efficienti sia dal punto di vista termico che energetico.",
      "Le detrazioni possono, per alcune tipologie di intervento, raggiungere anche il 65% dell’investimento. La legge di stabilità 2015 ha inoltre prorogato la possibilità di detrazione delle spese sostenute per gli interventi di recupero edilizio ed introdotto la detrazione IRPEF per gli acquisti di immobili ristrutturati. Il nostro studio offre un accurato servizio di consulenza finalizzato all’ottenimento di finanziamenti ed incentivi, dalla valutazione tecnica ed economica delle soluzioni sino alla redazione delle pratiche necessarie.",
    ],
    punti: [],
    foto: "edificio-borgo-palazzo-bergamo",
    correlati: ["edificio-borgo-palazzo-bergamo","villa-quartiere-santa-lucia-bergamo","cascina-lombarda"],
    categoria: "cat-3",
  },
  {
    id: "architettura-sacra",
    nome: "Adeguamento architettura sacra",
    breve: "La riforma avviata dal Concilio Vaticano II, conclusosi nel 1965, ha indicato il desiderio di svolgere funzioni liturgiche secondo una partecipazione più attiva dei fedeli.",
    icona: "chiesa",
    paragrafi: [
      "La riforma avviata dal Concilio Vaticano II, conclusosi nel 1965, ha indicato il desiderio di svolgere funzioni liturgiche secondo una partecipazione più attiva dei fedeli. Ne è conseguita la necessità di modificare alcune impostazioni architettoniche all’interno delle chiese. Negli edifici storici questa esigenza deve essere inoltre coniugata con la volontà di rispetto del passato e delle sue opere artistiche.",
      "Il tema è dunque la riprogettazione dello spazio liturgico interno della chiesa - in particolare del presbiterio - con un principio che ne consideri e valorizzi tutti gli elementi insieme. Il nostro studio, fornito di specifiche competenze e guidato da teologi e liturgisti, ha compiuto alcuni interventi collaborando con la soprintendenza ai beni ambientali ed architettonici e coordinando altri professionisti come scultori e restauratori.",
    ],
    punti: [],
    foto: "chiesa-di-santa-brigida",
    correlati: ["chiesa-di-santa-brigida","chiesa-di-san-rocco","restauro-cappella-gentilizia"],
    categoria: "cat-2",
  },
  {
    id: "barriere-architettoniche",
    nome: "Eliminazione barriere architettoniche",
    breve: "Le barriere architettoniche sono costituite da tutti quegli ostacoli che impediscono o limitano il movimento delle persone che sono, momentaneamente o permanentemente, in condizione di difficoltà a compiere le normali attività di ogni giorno.",
    icona: "rampa",
    paragrafi: [
      "Le barriere architettoniche sono costituite da tutti quegli ostacoli che impediscono o limitano il movimento delle persone che sono, momentaneamente o permanentemente, in condizione di difficoltà a compiere le normali attività di ogni giorno. Questo può avvenire sia in casa che all’esterno, e a tutte le persone capiterà, prima o poi, di incontrarle sul proprio percorso: un passeggino da spingere, un infortunio imprevisto, le limitazioni della terza età. Non sempre le soluzioni per il superamento delle barriere sono anche architettonicamente piacevoli.",
      "Il nostro approccio al problema è di affrontarlo sin dalle prime fasi di progettazione come parte integrante del progetto. Non si dovrà così correre ai ripari in una seconda fase con soluzioni non integrate.",
    ],
    punti: [],
    foto: "casa-di-riposo-di-cologno-al-serio",
    correlati: ["casa-di-riposo-di-cologno-al-serio","ospedale-vecchio","la-villetta-casa-di-riposo-giuseppe-verdi"],
    categoria: "cat-1",
  },
  {
    id: "assistenza-sanitaria",
    nome: "Edifici per assistenza sanitaria",
    breve: "La trasformazione demografica e il miglioramento della qualità di vita hanno portato, negli ultimi decenni, ad un aumento della popolazione anziana.",
    icona: "cura",
    paragrafi: [
      "La trasformazione demografica e il miglioramento della qualità di vita hanno portato, negli ultimi decenni, ad un aumento della popolazione anziana. Il fenomeno è stato naturalmente accompagnato dall’incremento delle malattie tipiche della terza età, che a volte provocano la perdita dell’autosufficienza della persona anziana. Questo fenomeno ha trasformato le residenze sanitarie assistenziali - nate per assistere l’anziano per periodi limitati e reinserirlo nell’ambiente familiare - in luoghi per ospitare persone non più autosufficienti per un periodo di tempo indeterminato. Inoltre si stanno aggiungendo altre strutture come le case protette, dirette ad una utenza autosufficiente, e i centri diurni, che forniscono, durante il giorno, servizi di tipo sociale e medico.",
      "Questi cambiamenti avvengono in un quadro normativo complesso, sia nazionale che regionale, che obbliga le strutture esistenti ad adeguarsi a nuovi standard, dovendo spesso operare sul patrimonio immobiliare esistente. La nostra esperienza ci permette di progettare ed intervenire sugli edifici per assistenza sanitaria adeguandole alle nuove funzioni, risolvendo anche tutti i problemi organizzativi dovuti alla necessità di non interrompere l’attività. La nostra filosofia di progettazione considera la persona anziana nella difficile condizione di affrontare il distacco dalla propria abitazione per andare in un ambiente diverso. La progettazione di questi spazi tende a ricreare un ambiente il meno possibile ospedaliero, ma caldo e accogliente come una nuova casa.",
    ],
    punti: [],
    foto: "la-villetta-casa-di-riposo-giuseppe-verdi",
    correlati: ["la-villetta-casa-di-riposo-giuseppe-verdi","casa-di-riposo-musicisti-fondazione-giuseppe-verdi","casa-di-riposo-di-cologno-al-serio"],
    categoria: "cat-1",
  },
  {
    id: "sicurezza-antincendio",
    nome: "Adeguamento per norme di sicurezza ed antincendio",
    breve: "Per ogni attività la normativa antincendio stabilisce standard di adeguamento per la salvaguardia delle persone, dei beni mobili e degli immobili dal pericolo degli incendi.",
    icona: "fiamma",
    paragrafi: [
      "Per ogni attività la normativa antincendio stabilisce standard di adeguamento per la salvaguardia delle persone, dei beni mobili e degli immobili dal pericolo degli incendi. Il piano di salvaguardia deve inoltre permettere ai Vigili del fuoco di poter intervenire in sicurezza.",
      "Il nostro studio è specializzato nella messa a norma di edifici esistenti e nella progettazione di edifici nuovi in conformità alla normativa.",
    ],
    punti: [],
    foto: "ampliamento-sito-industriale",
    correlati: ["ampliamento-sito-industriale","casa-di-riposo-di-cologno-al-serio","innovation-hub"],
    categoria: "cat-3",
  },
  {
    id: "perizie",
    nome: "Perizie",
    breve: "La valutazione di un immobile o di un terreno avviene attraverso una perizia estimativa, strumento necessario per conoscerne il valore di mercato.",
    icona: "perizia",
    paragrafi: [
      "La valutazione di un immobile o di un terreno avviene attraverso una perizia estimativa, strumento necessario per conoscerne il valore di mercato.",
      "Lo studio esegue valutazioni accurate di immobili e terreni, offrendo consulenze professionali al fine di valorizzare il bene e di ottimizzarne la quotazione.",
    ],
    punti: [],
    foto: "convento-francescano-del-600",
    correlati: ["convento-francescano-del-600","studio-bergamo","ristrutturazione-di-villa-eclettica"],
    categoria: "cat-1",
  },
];
