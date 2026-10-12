# Studio Servalli Architettura — sito

Sito dell'arch. Marco Paolo Servalli (Bergamo), costruito sulla base `base-tildestudio-2` (struttura,
layout, tipografia e animazioni invariati) e riempito con `Downloads/servalli-documento-unico.md` più
l'estrazione diretta del sito live www.servalliarchitettura.it (Drupal 7).

Astro 5, CSS senza framework, tutto guidato dai dati in `src/data/`. Lingua: italiano.

```bash
npm install
npm run dev            # http://localhost:4800
npm run build          # dist/ statico (43 pagine)
npm run slots          # slot [[DA COMPILARE]] / [[DA VALIDARE]] ancora aperti
npm run check-residui  # residui di tìlde/Campomarzio e segnaposto della base: deve dare 0
```

## Cosa c'è

| Rotta | Contenuto |
| --- | --- |
| `/` | hero carosello (5 slide, stessi soggetti dello slideshow live), biografia breve + numeri, 8 servizi, 4 news, 6 progetti, aree, sede + mappa |
| `/studio/` | Biografia: intro, numeri, 6 sezioni di metodo (verbatim), biografia + ritratto, CV in PDF, sede |
| `/servizi/` | 8 servizi verbatim, ognuno abbinato a progetti reali |
| `/news/` | 12 news del sito (ex `/metodo/` della base): 4 card con foto + 8 in elenco |
| `/progetti/` + 4 categorie + 28 schede | portfolio con testi verbatim e gallery reali (216 foto) |
| `/contatti/` | sede unica, telefono, email, social, mappa OSM, form (non collegato) |

## Fonti e scelte

- **Testi**: verbatim dal sito live (schede progetto, servizi, biografia, news). San Rocco era in
  MAIUSCOLO sul sito: riportato in minuscolo. Estratti delle news = prima frase.
- **Foto**: originali da `/sites/default/files/` → `public/images/<sezione>/`, poi compressi a max 1600px q72 (`scripts/comprimi-foto.mjs`, 27,5 MB)
  (`scripts/servalli-immagini.mjs`, misure in `src/data/media.json`). La copertina di ogni progetto è la
  foto d'apertura; le miniature quadrate 370px della vecchia griglia sono scartate.
  `scripts/servalli-progetti.mjs` rigenera `src/data/progetti.ts`.
- **Palette** (solo token in `global.css`): dal CSS del tema live, tortora `#C2A68F` + testo `#6f7072`.
  Bottoni/sopratitoli/fascia CTA usano il tortora scurito `#7d6656` (5.4:1 sul bianco).
- **Logo**: SVG ridisegnato dal PNG reale 443×109 (header/footer); il PNG resta per i dati strutturati. Favicon/icone/OG da `scripts/servalli-icone.mjs`.
- **Font**: quelli della base (il sito usa Raleway/Arapey, Google Fonts non proprietari).
- **Redirect 301** in `netlify.toml` da tutti i vecchi URL `/it/...` (progetti, categorie, news, pagine).
- Recensioni/testimonianze: assenti (la base non le ha). Badge "Socio di Assorestauro" nel footer.

## Stato (nessuno slot [[DA COMPILARE]] aperto)

- Località di 7 progetti non scritte sul sito: `luogo: ""` e la riga non viene resa (card, testata,
  scheda, liste). Da inserire in `src/data/progetti.ts` quando il cliente le comunica.
- Orari: `site.ricevimento` vuoto, la card in /contatti/ compare quando si compila.
- Form: Netlify Forms (`site.form.netlify`), redirect a /grazie/. Attivare le notifiche email in Netlify.
- Logo: SVG ridisegnato dal PNG (`scripts/servalli-logo-svg.cjs`, Playfair Display + Raleway in tracciati).
- "Finanziamenti ed incentivi": norme 2013/2015 rese generiche, da far confermare.
- [[DA VALIDARE]]: palette.
- Non portati: versione inglese, testi integrali delle news, pagina Credits (solo loghi senza nomi).
