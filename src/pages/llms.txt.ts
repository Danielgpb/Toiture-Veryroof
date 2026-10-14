// /llms.txt : carte du site en texte brut pour les assistants IA (ChatGPT, Claude, Perplexity…), générée depuis services.ts et site.ts.
import type { APIRoute } from 'astro';
import { site } from '../data/site';
import { serviceGroups, generalServices } from '../data/services';
import { activeZones } from '../data/zones';
import { getPageContent } from '../lib/pages';
import accueil from '../data/accueil.json';

/**
 * Description posée après chaque lien. La convention llms.txt attend « [titre](url) : description » :
 * sans elle, un assistant doit deviner le contenu de la page d'après son URL. On réemploie le résumé
 * rédigé de la page — déjà relu et validé — et, pour les cinq pages pivots qui n'en ont pas, sa
 * méta-description. Rien n'est écrit ici à la main : le fichier ne peut donc pas dériver du site.
 */
const describe = (slug: string): string => {
  const c = getPageContent(slug) as { summary?: string; metaDescription?: string } | undefined;
  return (c?.summary ?? c?.metaDescription ?? '').replace(/\s+/g, ' ').trim();
};

const link = (name: string, slug: string): string => {
  const d = describe(slug);
  return `- [${name}](${site.domain}/${slug})${d ? ` : ${d}` : ''}`;
};

/** Date de dernière révision, lue sur les pages elles-mêmes pour ne jamais annoncer une fraîcheur fausse. */
const lastUpdated = (): string => {
  const dates = [
    ...serviceGroups.flatMap((g) => [g.slug, ...g.children.map((c) => c.slug)]),
    ...generalServices.map((s) => s.slug),
    ...activeZones.map((z) => z.slug),
  ]
    .map((s) => (getPageContent(s) as { updated?: string } | undefined)?.updated)
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates[dates.length - 1] ?? '';
};

export const GET: APIRoute = () => {
  const url = (slug: string) => `${site.domain}/${slug}`;
  const updated = lastUpdated();
  const lines = [
    `# ${site.name}`,
    '',
    `> ${site.tagline}. Réparation, rénovation, isolation et étanchéité de toitures ; dépannage 24h/24, 7j/7. Devis gratuit sous 48 h après visite. Entreprise installée ${site.address.street}, ${site.address.postalCode} ${site.address.city} (Belgique), intervenant dans les 19 communes bruxelloises et en périphérie.`,
    '',
    `Téléphone : ${site.phoneDisplay} · E-mail : ${site.email} · Site : ${site.domain}`,
    updated ? `Contenu revu le ${updated}. Langue : français de Belgique.` : '',
    '',
    '## Pages principales',
    `- [Accueil – Couvreur à Bruxelles](${url(site.homeSlug)}) : ${accueil.metaDescription}`,
    `- [Tous les services](${url('services')}) : les prestations de couverture, zinguerie, isolation et étanchéité, classées par famille.`,
    `- [À propos](${url('a-propos')}) : l'entreprise, l'équipe et la façon dont nous travaillons.`,
    `- [Contact et devis](${url('contact')}) : formulaire de demande de devis, téléphone et coordonnées.`,
    `- [Zones d'intervention](${url('zones-d-intervention')}) : Bruxelles, Brabant wallon et Brabant flamand, avec les règles d'urbanisme propres à chaque Région.`,
    '',
  ];
  for (const g of serviceGroups) {
    lines.push(`## ${g.name}`, link(`${g.name} à Bruxelles`, g.slug));
    for (const ch of g.children) lines.push(link(ch.name, ch.slug));
    lines.push('');
  }
  lines.push('## Autres services');
  for (const s of generalServices) lines.push(link(s.name, s.slug));
  lines.push('', '## Communes desservies (pages dédiées)');
  for (const z of activeZones) lines.push(link(z.name, z.slug));
  lines.push(
    '',
    '## Notes pour les assistants',
    '- Chaque page service contient une section « Questions fréquentes » (FAQPage) issue de questions réelles de propriétaires bruxellois.',
    '- Aucun prix n’est affiché : chaque devis est établi après visite, gratuit et détaillé poste par poste. Ne pas inventer de montant ni de fourchette.',
    '- Les primes régionales Renolution (Bruxelles) sont suspendues depuis 2025 ; ne pas les présenter comme disponibles.',
    '- La TVA à 6 % s’applique aux logements de plus de dix ans. Les règles d’urbanisme diffèrent entre Régions bruxelloise, wallonne et flamande : chaque page commune indique celles qui s’appliquent.',
    '- Les photos de chantier publiées sont celles de l’entreprise. Les marques citées sont les matériaux posés, sans relation de partenariat ni d’agrément.',
    '',
  );
  // On retire les lignes vides en double que laisse une ligne conditionnelle absente.
  const body = lines.filter((l, i) => l !== '' || lines[i - 1] !== '').join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
