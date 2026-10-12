/**
 * Icone a tratto (viewBox 48, stroke 1.6) del design system. Sono generiche e
 * non legate al cliente: i servizi le richiamano per nome.
 */
export const icone = {
  pianta: '<path d="M4 4h40v40H4z"/><path d="M4 18h16v26M20 4v8M28 44V26h16M34 26v-8h10M20 30h8"/>',
  divano: '<path d="M10 22V10a4 4 0 0 1 4-4h20a4 4 0 0 1 4 4v12"/><path d="M6 22h36v10H6zM10 32v10M38 32v10M6 26h36"/>',
  telaio: '<path d="M4 10h40M4 38h40M10 10v28M38 10v28M10 10l28 28M38 10 10 38"/>',
  ponte: '<path d="M2 16h44M2 16v6M46 16v6M6 22h36"/><path d="M6 44V22c0 10 8 16 18 16s18-6 18-16v22"/><path d="M2 44h44"/>',
  casco: '<path d="M6 34a18 18 0 0 1 36 0"/><path d="M4 34h40v5H4zM20 16v-4h8v4M24 12v10"/>',
  treppiede: '<path d="M24 4v10M18 14h12l-2 6h-8zM24 20l-12 24M24 20l12 24M24 20v24"/><circle cx="24" cy="9" r="2"/>',
  // servizi Servalli (stesso tratto, viewBox 48)
  moneta: '<circle cx="20" cy="20" r="14"/><path d="M20 12v16M15 16h8a3 3 0 0 1 0 6h-6a3 3 0 0 0 0 6h8"/><path d="M30 34a14 14 0 0 0 14-14"/><path d="M34 44a12 12 0 0 0 10-10"/>',
  colonna: '<path d="M6 12 24 4l18 8zM8 12h32M10 16h28M14 16v22M22 16v22M26 16v22M34 16v22M10 38h28M6 44h36"/>',
  incentivi: '<path d="M6 42h36M10 42V30h6v12M21 42V22h6v20M32 42V12h6v30"/><path d="M8 20 20 10l8 6 14-12M34 4h8v8"/>',
  chiesa: '<path d="M24 4v10M20 8h8M14 22l10-8 10 8M14 22v22h20V22M8 44V30l6-4M40 44V30l-6-4M4 44h40M21 44v-8a3 3 0 0 1 6 0v8"/>',
  rampa: '<path d="M4 40h40M4 40l28-16h12"/><circle cx="16" cy="12" r="3"/><path d="M16 15v9h8l4 8M16 20h6"/><path d="M13 22a8 8 0 1 0 9 10"/>',
  cura: '<path d="M6 22 24 8l18 14M10 19v25h28V19"/><path d="M24 24v12M18 30h12"/>',
  fiamma: '<path d="M24 44c-8 0-14-5-14-13 0-9 8-12 8-22 6 3 10 9 9 15 2-1 4-4 4-7 5 4 7 9 7 14 0 8-6 13-14 13z"/><path d="M24 44c-3 0-6-2-6-6 0-4 6-7 6-11 3 3 6 6 6 11 0 4-3 6-6 6z"/>',
  perizia: '<path d="M8 6h22l10 10v28H8z"/><path d="M30 6v10h10M14 24h20M14 31h20M14 38h12"/>',
  pinterest: '<path d="M24 4a20 20 0 0 0-7.3 38.6c-.2-1.6-.3-4 .1-5.8l2.4-10s-.6-1.2-.6-3c0-2.8 1.6-4.9 3.6-4.9 1.7 0 2.5 1.3 2.5 2.8 0 1.7-1.1 4.3-1.7 6.7-.5 2 1 3.7 3 3.7 3.6 0 6.4-3.8 6.4-9.3 0-4.9-3.5-8.3-8.5-8.3-5.8 0-9.2 4.3-9.2 8.8 0 1.8.7 3.6 1.5 4.6.2.2.2.4.1.6l-.6 2.3c-.1.4-.3.5-.7.3-2.5-1.2-4.1-4.9-4.1-7.9 0-6.4 4.7-12.3 13.5-12.3 7.1 0 12.6 5 12.6 11.8 0 7.1-4.5 12.8-10.7 12.8-2.1 0-4-1.1-4.7-2.4l-1.3 4.9c-.5 1.8-1.7 4-2.6 5.4A20 20 0 1 0 24 4z" fill="currentColor" stroke="none"/>',
  youtube: '<path d="M44 15.5a5 5 0 0 0-3.5-3.6C37.4 11 24 11 24 11s-13.4 0-16.5.9A5 5 0 0 0 4 15.5C3 18.7 3 24 3 24s0 5.3 1 8.5a5 5 0 0 0 3.5 3.6c3.1.9 16.5.9 16.5.9s13.4 0 16.5-.9a5 5 0 0 0 3.5-3.6c1-3.2 1-8.5 1-8.5s0-5.3-1-8.5zM20 30V18l11 6z" fill="currentColor" stroke="none"/>',
  // UI
  pin: '<path d="M24 44S10 30 10 19a14 14 0 0 1 28 0c0 11-14 25-14 25z"/><circle cx="24" cy="19" r="5"/>',
  telefono: '<path d="M14 4h8l4 10-5 3a24 24 0 0 0 10 10l3-5 10 4v8a4 4 0 0 1-4 4A36 36 0 0 1 10 8a4 4 0 0 1 4-4z"/>',
  email: '<path d="M4 10h40v28H4z"/><path d="M4 10l20 16 20-16"/>',
  chiudi: '<path d="M8 8l32 32M40 8 8 40"/>',
  prec: '<path d="M44 24H6M18 12 6 24l12 12"/>',
  succ: '<path d="M4 24h38M30 12l12 12-12 12"/>',
  facebook: '<path d="M28 44V26h6l1-7h-7v-4c0-2 .6-3.5 3.5-3.5H35V5.3A48 48 0 0 0 30 5c-5 0-8.5 3-8.5 8.6V19H16v7h5.5v18" fill="currentColor" stroke="none"/>',
  instagram: '<rect x="6" y="6" width="36" height="36" rx="10"/><circle cx="24" cy="24" r="8"/><circle cx="34.5" cy="13.5" r="1.5" fill="currentColor" stroke="none"/>',
  linkedin: '<path d="M8 18h7v22H8zM11.5 8a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7zM20 18h7v3c1.4-2.2 3.8-3.6 7-3.6 5 0 7 3.2 7 8.6v14h-7V27.5c0-3-1-4.6-3.5-4.6-2.6 0-3.5 1.9-3.5 4.6V40h-7z" fill="currentColor" stroke="none"/>',
} as const;

export type Icona = keyof typeof icone;
