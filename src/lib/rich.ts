import { escapeHtml, brandify } from './phone.ts';

export interface RichContext {
  /** Nom exact de page → href (ex. « Réparation de fuite de toiture » → /reparation-fuite-toiture-bruxelles). */
  pages: Record<string, string>;
  homeHref: string;
  phoneDisplay: string;
  phoneHref: string;
}

/**
 * Rend un paragraphe de contenu en HTML : [[Nom exact]] → lien vers la page, [[home:ancre]] → lien vers l'accueil,
 * numéro de téléphone → lien tel:. Le reste est échappé. Un nom inconnu lève une erreur de build.
 */
/** Espaces insécables du français : avant : ; ? ! », après «, entre un nombre et son unité (48 h, 6 %, 19 communes). */
export function frenchSpaces(s: string): string {
  return s
    .replace(/ ([:;?!»])/g, '\u00a0$1')
    .replace(/« /g, '«\u00a0')
    .replace(/(\d) (h|%|communes|mois|ans|min|km|m²|mm|cm)(?![\p{L}])/gu, '$1\u00a0$2');
}

export function renderRich(text: string, ctx: RichContext): string {
  const parts = text.split(/(\[\[[^\]]+\]\])/g);
  return parts
    .map((part) => {
      const m = part.match(/^\[\[([^\]]+)\]\]$/);
      if (!m) return brandify(frenchSpaces(escapeHtml(part)).split(ctx.phoneDisplay).join(`<a href="${ctx.phoneHref}">${ctx.phoneDisplay}</a>`));
      const inner = m[1];
      if (inner.startsWith('home:')) return `<a href="${ctx.homeHref}">${escapeHtml(inner.slice(5))}</a>`;
      const href = ctx.pages[inner];
      if (!href) throw new Error(`renderRich : lien [[${inner}]] inconnu (nom exact de page attendu)`);
      return `<a href="${href}">${escapeHtml(inner)}</a>`;
    })
    .join('');
}
