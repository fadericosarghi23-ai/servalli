/** llms.txt generato dai dati: nessun testo da tenere allineato a mano. */
import type { APIRoute } from 'astro';
import { site, abs } from '../data/site';
import { servizi } from '../data/servizi';
import { team } from '../data/team';
import { categorie, inCategoria, progetti } from '../data/progetti';

export const GET: APIRoute = () => {
  const righe = [
    `# ${site.nome}`,
    '',
    `> ${site.descrizione}`,
    '',
    '## Dati principali',
    '',
    `- Nome: ${site.nome}`,
    `- Sito: ${abs('/')}`,
    `- Sede: ${site.indirizzo.via}, ${site.indirizzo.cap} ${site.indirizzo.citta} (${site.indirizzo.provincia})`,
    ...(site.telefono ? [`- Telefono: ${site.telefono}`] : []),
    `- Email: ${site.email}`,
    ...site.social.map((s) => `- ${s.nome}: ${s.url}`),
    `- Aree: ${site.areeServite.map((a) => a.nome).join(', ')}`,
    `- Titolare: ${team.map((m) => `${m.nome} (${m.ruolo})`).join(', ')}`,
    `- Portfolio: ${progetti.length} progetti documentati`,
    '',
    '## Pagine principali',
    '',
    `- [Home](${abs('/')}): panoramica dello studio, servizi, news, progetti in evidenza e contatti.`,
    `- [Biografia](${abs('/studio/')}): biografia dell’arch. Marco Paolo Servalli e metodo di lavoro.`,
    `- [Servizi](${abs('/servizi/')}): le consulenze dello studio.`,
    `- [News](${abs('/news/')}): progetti recenti e aggiornamenti.`,
    `- [Progetti](${abs('/progetti/')}): portfolio completo, filtrabile per categoria.`,
    `- [Contatti](${abs('/contatti/')}): email, telefono, sede, mappa e modulo di contatto.`,
    '',
    '## Servizi',
    '',
    ...servizi.map((s) => `- [${s.nome}](${abs(`/servizi/#${s.id}`)}): ${s.breve}`),
    ...categorie.flatMap((c) => ['', `## Progetti — ${c.nome}`, '', ...inCategoria(c.id).map((p) => `- [${p.titolo}](${abs(`/progetti/${p.slug}/`)}): ${p.intervento}. ${p.luogo}.${p.importo ? ` Importo: ${p.importo}.` : ''}`)]),
    '',
  ];
  return new Response(righe.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
