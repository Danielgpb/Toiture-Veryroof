// Sitemap XML généré depuis les données du site (Prompt 8) : toutes les pages indexables, priorités par type de page.
import type { APIRoute } from 'astro';
import { site, staticPages } from '../data/site';
import { allServicePages } from '../data/services';
import { activeZones } from '../data/zones';

export interface SitemapEntry { loc: string; priority: string; changefreq: 'weekly' | 'monthly' | 'yearly' }

/** Liste ordonnée des URL du sitemap (exportée pour les tests). */
export function sitemapEntries(): SitemapEntry[] {
  const url = (slug: string) => `${site.domain}/${slug}`;
  const entries: SitemapEntry[] = [{ loc: `${site.domain}${site.homeHref}`, priority: '1.0', changefreq: 'weekly' }];
  for (const p of allServicePages()) entries.push({ loc: url(p.slug), priority: p.kind === 'category' || p.kind === 'core' ? '0.8' : '0.6', changefreq: 'monthly' });
  for (const s of staticPages) {
    const legal = s.slug.startsWith('mentions') || s.slug.startsWith('politique');
    entries.push({ loc: url(s.slug), priority: s.slug === 'services' ? '0.7' : legal ? '0.3' : '0.5', changefreq: legal ? 'yearly' : 'monthly' });
  }
  for (const z of activeZones) entries.push({ loc: url(z.slug), priority: '0.6', changefreq: 'monthly' });
  return entries;
}

export const GET: APIRoute = () => {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapEntries()
    .map((e) => `  <url>\n    <loc>${e.loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`)
    .join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
