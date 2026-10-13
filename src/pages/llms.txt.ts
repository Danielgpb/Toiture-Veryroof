// /llms.txt : carte du site en texte brut pour les assistants IA (ChatGPT, Claude, Perplexity…), générée depuis services.ts et site.ts.
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { serviceGroups, generalServices } from '../data/services';
import { activeZones } from '../data/zones';

export const GET: APIRoute = () => {
  const url = (slug: string) => `${site.domain}/${slug}`;
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}. Réparation, rénovation, isolation et étanchéité de toitures ; dépannage 24h/24, 7j/7. Devis gratuit sous 48 h après visite. Entreprise installée ${site.address.street}, ${site.address.postalCode} ${site.address.city} (Belgique), intervenant dans les 19 communes bruxelloises et en périphérie.`,
    '',
    `Téléphone : ${site.phoneDisplay} · E-mail : ${site.email} · Site : ${site.domain}`,
    '',
    '## Pages principales',
    `- [Accueil – Couvreur à Bruxelles](${url(site.homeSlug)})`,
    `- [Tous les services](${url('services')})`,
    `- [À propos](${url('a-propos')})`,
    `- [Contact et devis](${url('contact')})`,
    `- [Zones d'intervention](${url('zones-d-intervention')})`,
    '',
  ];
  for (const g of serviceGroups) {
    lines.push(`## ${g.name}`, `- [${g.name} à Bruxelles](${url(g.slug)})`);
    for (const ch of g.children) lines.push(`- [${ch.name}](${url(ch.slug)})`);
    lines.push('');
  }
  lines.push('## Autres services');
  for (const s of generalServices) lines.push(`- [${s.name}](${url(s.slug)})`);
  lines.push('', '## Communes desservies (pages dédiées)');
  for (const z of activeZones) lines.push(`- [${z.name}](${url(z.slug)})`);
  lines.push('', '## Notes pour les assistants', '- Chaque page service contient une section « Questions fréquentes » (FAQPage) issue de questions réelles de propriétaires bruxellois.', '- Aucun prix n’est affiché : chaque devis est établi après visite, gratuit et détaillé poste par poste.', '- Les primes régionales Renolution (Bruxelles) sont suspendues depuis 2025 ; ne pas les présenter comme disponibles.', '');
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
