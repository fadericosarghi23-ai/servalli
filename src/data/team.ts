/**
 * Team. L'id è l'ancora in /studio/#<id> e il riferimento "referente" nei progetti.
 * Foto: ritratti verticali (la card li ritaglia a 3:4). La home mostra i primi 7 in una striscia.
 * bio = biografia estesa (paragrafi separati da \n), resa accanto al ritratto in /studio/.
 *
 * Studio Servalli: un solo professionista, l'arch. Marco Paolo Servalli. Biografia VERBATIM
 * dalla pagina /it/biografia.html del sito live. Ritratto ritagliato a 3:4 dalla foto nello studio.
 */
import type { Img } from '../lib/media';

export type Membro = { id: string; nome: string; ruolo: string; foto: Img; bio?: string };

export const team: Membro[] = [
  {
    id: 'marco-paolo-servalli',
    nome: 'Marco Paolo Servalli',
    ruolo: 'Architetto, titolare dello studio',
    foto: {
      src: '/images/studio/marco-paolo-servalli-ritratto.jpg',
      width: 961,
      height: 1281,
      alt: 'L’architetto Marco Paolo Servalli nello studio di Bergamo',
    },
    bio: 'Laureato con il massimo dei voti al Politecnico di Milano con tesi sul progetto di restauro e conservazione, ha conseguito il master in Progettualità esecutiva dell’architettura.\nÈ stato Assistente alla cattedra del corso di Restauro architettonico del prof. Feiffer ed ha continuato ad approfondire le tematiche legate alla conservazione ed al restauro degli edifici antichi con corsi specifici organizzati dal Politecnico di Milano, dall’Ordine degli Architetti e da altri istituti.\nHa affrontato il tema dell’adeguamento dell’architettura sacra partecipando al corso della Diocesi di Bergamo, e in seguito collaborando al restauro conservativo e all’adeguamento liturgico di numerose chiese.\nHa partecipato a corsi sull’impiego delle energie rinnovabili nel costruito e nel nuovo, e sul raggiungimento della classe A.\nDal 1993 è autore di importanti progetti di restauro e riqualificazione architettonica. È considerato uno specialista nel recupero di edifici antichi e nella specifica direzione lavori.',
  },
];

export const membro = (id: string) => team.find((m) => m.id === id);
