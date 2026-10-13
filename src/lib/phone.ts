export const escapeHtml = (s: string): string => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

/** Met le nom de marque en évidence dans un fragment HTML déjà échappé (demande client du 13/10/2026) : <strong class="brand">. */
export const BRAND = 'Toiture Veryroof';
export const brandify = (html: string): string => html.split(BRAND).join(`<strong class="brand">${BRAND}</strong>`);

export interface LinkTextOptions {
  /** true (défaut) : l'expression doit exister dans le texte, sinon erreur de build (évite un lien qui disparaît en silence). */
  required?: boolean;
}

/** Rend `text` en HTML en transformant chaque occurrence de `needle` en lien vers `href`. */
export function linkText(text: string, needle: string, href: string, { required = true }: LinkTextOptions = {}): string {
  if (!text.includes(needle)) {
    if (required) throw new Error(`linkText : expression « ${needle} » introuvable dans « ${text.slice(0, 60)}… »`);
    return brandify(escapeHtml(text));
  }
  const safeNeedle = escapeHtml(needle);
  return brandify(escapeHtml(text).split(safeNeedle).join(`<a href="${href}">${safeNeedle}</a>`));
}

/** Click-to-call : chaque occurrence du numéro affiché devient un lien tel: (silencieux si le numéro est absent). */
export function linkPhone(text: string, display: string, href: string): string {
  return linkText(text, display, href, { required: false });
}
