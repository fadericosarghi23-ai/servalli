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
- **Foto**: originali da `/sites/default/files/` ridotti a max 1920px → `public/images/<sezione>/`
  (`scripts/servalli-immagini.mjs`, misure in `src/data/media.json`). La copertina di ogni progetto è la
  foto d'apertura; le miniature quadrate 370px della vecchia griglia sono scartate.
  `scripts/servalli-progetti.mjs` rigenera `src/data/progetti.ts`.
- **Palette** (solo token in `global.css`): dal CSS del tema live, tortora `#C2A68F` + testo `#6f7072`.
  Bottoni/sopratitoli/fascia CTA usano il tortora scurito `#7d6656` (5.4:1 sul bianco).
- **Logo**: PNG reale 443×109 in header/footer. Favicon/icone/OG da `scripts/servalli-icone.mjs`.
- **Font**: quelli della base (il sito usa Raleway/Arapey, Google Fonts non proprietari).
- **Redirect 301** in `netlify.toml` da tutti i vecchi URL `/it/...` (progetti, categorie, news, pagine).
- Recensioni/testimonianze: assenti (la base non le ha). Badge "Socio di Assorestauro" nel footer.

## Slot aperti

- Località di 7 progetti (non scritte sul sito): Santa Brigida, Cascina lombarda, Villa eclettica,
  Soggiorno nel giardino, Ampliamento sito industriale, Risanamento cascina, Appartamento in città.
- Orari dello studio. Collegamento del form. Logo SVG originale.
- [[DA VALIDARE]]: servizio "Finanziamenti ed incentivi" (norme 2013/2015 datate); palette.
- Non portati: versione inglese, testi integrali delle news, pagina Credits (solo loghi senza nomi).
