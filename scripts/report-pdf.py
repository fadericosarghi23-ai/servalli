# -*- coding: utf-8 -*-
"""Genera il report PDF (4 pagine) del sito Studio Servalli Architettura.
Uso:  py -3 scripts/report-pdf.py
Output: docs/Servalli-Report.pdf
"""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle,
                                PageBreak, HRFlowable, ListFlowable, ListItem, Image)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT

TORTORA = colors.HexColor('#7d6656')
INK = colors.HexColor('#2e2925')
GREY = colors.HexColor('#6f7072')
LINE = colors.HexColor('#e2d8ce')

ss = getSampleStyleSheet()
H1 = ParagraphStyle('H1', parent=ss['Title'], fontName='Times-Roman', fontSize=30, leading=34, textColor=INK, spaceAfter=4, alignment=TA_LEFT)
SUB = ParagraphStyle('SUB', parent=ss['Normal'], fontName='Helvetica', fontSize=11, leading=16, textColor=GREY, spaceAfter=2)
EY = ParagraphStyle('EY', parent=ss['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=TORTORA, spaceAfter=10)
H2 = ParagraphStyle('H2', parent=ss['Heading2'], fontName='Times-Roman', fontSize=16, leading=20, textColor=INK, spaceBefore=12, spaceAfter=6)
BODY = ParagraphStyle('BODY', parent=ss['Normal'], fontName='Helvetica', fontSize=9.8, leading=14.5, textColor=INK, spaceAfter=6)
SMALL = ParagraphStyle('SMALL', parent=ss['Normal'], fontName='Helvetica', fontSize=8.5, leading=12, textColor=GREY)
LI = ParagraphStyle('LI', parent=BODY, spaceAfter=3)

def rule():
    return HRFlowable(width='100%', thickness=1, color=LINE, spaceBefore=6, spaceAfter=10)

def bullets(items):
    return ListFlowable([ListItem(Paragraph(t, LI), leftIndent=10, value='•') for t in items],
                        bulletType='bullet', start='•', leftIndent=8)

def kv_table(rows):
    t = Table([[Paragraph('<b>%s</b>' % a, SMALL), Paragraph(b, BODY)] for a, b in rows], colWidths=[40*mm, 126*mm])
    t.setStyle(TableStyle([
        ('VALIGN',(0,0),(-1,-1),'TOP'),
        ('TOPPADDING',(0,0),(-1,-1),3),('BOTTOMPADDING',(0,0),(-1,-1),1),
        ('LINEBELOW',(0,0),(-1,-2),0.5,LINE),
    ]))
    return t

story = []

# ---------- PAGINA 1 — copertina ----------
story += [Image('public/images/progetti/palazzo-spampatti/02.jpg', width=166*mm, height=166*mm*1067/1600)]
story += [Spacer(1, 8*mm)]
story += [Paragraph('REPORT DI PROGETTO', EY)]
story += [Paragraph('Studio Servalli Architettura', H1)]
story += [Paragraph('Nuovo sito web — restauro e riqualificazione di edifici storici e di pregio, Bergamo', SUB)]
story += [rule()]
story += [kv_table([
    ['Cliente', 'Studio Servalli Architettura — arch. Marco Paolo Servalli'],
    ['Sede', 'Via Longuelo 92, 24129 Bergamo (BG) · tel. +39 035 400156 · info@servalliarchitettura.it'],
    ['Sito precedente', 'www.servalliarchitettura.it (Drupal 7, non più supportato dal 2025)'],
    ['Tecnologia', 'Astro 5 · sito statico · HTML/CSS/JS, nessun database'],
    ['Lingua / pagine', 'Italiano · 43 pagine generate'],
    ['Deploy', 'Netlify, build automatica dal repository GitHub'],
])]
story += [Spacer(1, 6*mm)]
story += [Paragraph('Documento di sintesi in 4 pagine: design, contenuti, immagini, verifiche e punti aperti.', SMALL)]
story += [PageBreak()]

# ---------- PAGINA 2 — design & palette ----------
story += [Paragraph('01 — DESIGN E PALETTE', EY)]
story += [Paragraph('Identità visiva', H2)]
story += [Paragraph('Grafica, tipografia, griglie e animazioni provengono dal template di base e sono rimaste '
                    'invariate; al cliente sono stati applicati palette, logo e contenuti. La palette è stata '
                    'ricavata dal foglio di stile del sito attuale ed è applicata solo tramite variabili (token).', BODY)]
story += [Paragraph('Palette', H2)]
sw = [
    ('#c2a68f', 'Tortora di marca', 'Colore del marchio sul sito attuale: qui accento su fondi scuri'),
    ('#7d6656', 'Tortora scuro', 'Bottoni, sopratitoli, fascia contatti (contrasto 5,4:1 col bianco)'),
    ('#2e2925', 'Inchiostro caldo', 'Titoli, footer, sezioni scure'),
    ('#6f7072', 'Grigio testo', 'Grigio del testo del sito attuale: testi secondari'),
    ('#555658', 'Testo', 'Corpo del testo (più scuro per la leggibilità)'),
    ('#f6f2ee', 'Sabbia', 'Fondi delle sezioni alternate'),
    ('#ffffff', 'Bianco', 'Sfondo'),
]
tb = Table([['', Paragraph('<b>%s</b>' % n, SMALL), Paragraph(h, SMALL), Paragraph(u, SMALL)] for h, n, u in sw],
           colWidths=[12*mm, 30*mm, 20*mm, 104*mm])
st = [('VALIGN',(0,0),(-1,-1),'MIDDLE'),('TOPPADDING',(0,0),(-1,-1),4),('BOTTOMPADDING',(0,0),(-1,-1),4),
      ('LINEBELOW',(0,0),(-1,-2),0.5,LINE)]
for i, (h, _, _) in enumerate(sw):
    st += [('BACKGROUND',(0,i),(0,i),colors.HexColor(h)), ('BOX',(0,i),(0,i),0.5,LINE)]
tb.setStyle(TableStyle(st))
story += [tb]
story += [Paragraph('Il tortora pieno (#c2a68f) su bianco ha un contrasto di 2,3:1, insufficiente per testi e bottoni: '
                    'per questo sul fondo chiaro si usa la sua versione scurita. Da confermare con il cliente.', SMALL)]
story += [Paragraph('Tipografia, layout e animazioni', H2)]
story += [bullets([
    'Titoli serif (Newsreader), testo sans-serif (Inter), ospitati sul sito senza servizi esterni.',
    'Griglie responsive desktop / tablet / mobile; i servizi in home sono una griglia 4×2.',
    'Animazioni: carosello in dissolvenza della home, header trasparente che diventa pieno, comparse allo scroll, lightbox delle gallery.',
])]
story += [Paragraph('Logo e icone', H2)]
story += [Paragraph('Il logo (targa tortora con scritta bianca) esisteva solo in PNG 443×109: è stato ridisegnato '
                    'in SVG vettoriale con gli stessi caratteri del sito (Playfair Display e Raleway, convertiti in '
                    'tracciati), quindi resta nitido a ogni dimensione. Favicon e icone dell’app riprendono la “S” '
                    'dell’icona del sito, anch’essa ridisegnata in vettoriale.', BODY)]
story += [PageBreak()]

# ---------- PAGINA 3 — contenuti & immagini ----------
story += [Paragraph('02 — CONTENUTI E IMMAGINI', EY)]
story += [Paragraph('Pagine e contenuti', H2)]
story += [bullets([
    '<b>Home</b>: “Siete pronti a fare nuovi progetti?”, carosello con gli stessi soggetti del sito attuale, biografia breve, servizi, news, progetti in evidenza, aree di lavoro, mappa.',
    '<b>Progetti</b>: 28 schede con i testi integrali del sito, in 4 categorie (immobili di pregio · architetture religiose · aree urbane · interni).',
    '<b>Servizi</b>: le 8 consulenze, ognuna collegata ai progetti pertinenti.',
    '<b>Biografia</b>: Marco Paolo Servalli, sei sezioni sul metodo, CV europeo e curriculum sintetico in PDF.',
    '<b>News</b>: le 12 news del sito (titolo, immagine, prima frase).',
    '<b>Contatti</b>: sede, telefono, email, social, mappa, modulo. Badge “Socio di Assorestauro” nel footer.',
])]
story += [Paragraph('Tutti i testi sono quelli del sito attuale, riportati senza riscritture; il testo della Chiesa di '
                    'San Rocco, scritto in maiuscolo sul sito, è stato riportato in minuscolo.', SMALL)]
story += [Paragraph('Immagini', H2)]
story += [kv_table([
    ['Foto progetti', '216 immagini originali scaricate dal server del sito, nelle gallery con lightbox'],
    ['Altre', 'Ritratto nello studio, foto cantiere dei servizi, 12 immagini delle news'],
    ['Copertine', 'Foto di apertura di ogni progetto; le miniature quadrate di 370px del vecchio sito sono scartate'],
    ['Tavole tecniche', 'Rilievi e spettrografie mostrati interi, senza ritaglio'],
    ['Ottimizzazione', 'Max 1600px, JPEG progressivo: da 46 a 27,5 MB complessivi'],
])]
story += [Paragraph('Molte foto originali sul server sono larghe circa 1000px: per schermi grandi conviene '
                    'chiedere allo studio gli originali ad alta risoluzione.', SMALL)]
story += [PageBreak()]

# ---------- PAGINA 4 — verifiche, punti aperti, pubblicazione ----------
story += [Paragraph('03 — VERIFICHE, PUNTI APERTI E PUBBLICAZIONE', EY)]
story += [Paragraph('Verifiche eseguite', H2)]
story += [bullets([
    'Build pulita da un clone del repository come su Netlify: 43 pagine, nessun errore.',
    '3.205 link e immagini interni controllati: 0 rotti. Misure delle immagini coerenti con i file.',
    'Nessun dato di altri clienti o del template residuo. Animazioni verificate a schermo, anche su mobile.',
    'Dominio canonico, sitemap, robots.txt e dati strutturati impostati su www.servalliarchitettura.it.',
    '54 reindirizzamenti 301 dai vecchi indirizzi /it/... del sito Drupal.',
])]
story += [Paragraph('Da chiudere con il cliente', H2)]
story += [bullets([
    '<b>Località di 7 progetti</b> (Santa Brigida, le due Cascine lombarde, Villa eclettica, Soggiorno nel giardino, Ampliamento sito industriale, Appartamento in città): non sono indicate sul sito, quindi la riga non compare; si aggiungono appena lo studio le comunica.',
    '<b>Orari dello studio</b>: non indicati sul sito; la scheda “Orari” in Contatti compare quando vengono inseriti.',
    '<b>Servizio “Finanziamenti ed incentivi”</b>: i riferimenti alle norme 2013–2015 sono stati resi generici; far confermare il testo.',
    '<b>Modulo di contatto</b>: collegato a Netlify Forms. Dopo il primo deploy attivare in Netlify l’inoltro email dei messaggi a info@servalliarchitettura.it.',
    'Conferma della <b>palette</b> e del <b>logo ridisegnato</b>. Non portati: versione inglese, testi integrali delle news, pagina Credits.',
])]
story += [Paragraph('Pubblicazione', H2)]
story += [kv_table([
    ['Repository', 'github.com/fadericosarghi23-ai/servalli'],
    ['Build', 'npm run build → dist/ · Node 20 · installazione senza lockfile (impostata in netlify.toml)'],
    ['Dominio', 'puntare i DNS di www.servalliarchitettura.it su Netlify al momento della messa online'],
])]
story += [Spacer(1, 6*mm)]
story += [rule()]
story += [Paragraph('Report di progetto · Studio Servalli Architettura · sito statico Astro', SMALL)]

os.makedirs('docs', exist_ok=True)
out = 'docs/Servalli-Report.pdf'
SimpleDocTemplate(out, pagesize=A4, leftMargin=22*mm, rightMargin=22*mm,
                  topMargin=18*mm, bottomMargin=16*mm, title='Studio Servalli Architettura — Report di progetto',
                  author='Studio Servalli Architettura').build(story)
print('PDF scritto:', out)
