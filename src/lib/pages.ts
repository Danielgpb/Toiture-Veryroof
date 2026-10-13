import { allServicePages } from '../data/services';
import { site } from '../data/site';
import type { RichContext } from './rich';

export interface SectionContent { h2: string; paragraphs: string[] }
/** Question réelle (relevée sur les forums, voir docs/core30/regles-veryroof.md) et réponse en 2 à 4 phrases, liens [[Nom exact]] admis. */
export interface FaqItem { question: string; answer: string }
/** Source officielle citée en fin de page (autorité, citabilité IA). */
export interface SourceLink { label: string; url: string }
export interface HubContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  opening: string[];
  problems: SectionContent;
  services: SectionContent;
  local: SectionContent;
  /** Services phares uniquement : « À quoi vous attendre ». */
  expect?: SectionContent;
  why: SectionContent;
  finalCta: { paragraphs: string[] };
  homeLink: string;
  gridIntro: string;
  gridHeading?: string;
  childDescriptions: Record<string, string>;
  /** 4 à 5 questions fréquentes (HTML visible + schema FAQPage). */
  faq: FaqItem[];
  /** Titre H2 de la FAQ ; défaut « <Nom de page> : vos questions ». */
  faqHeading?: string;
  /** 1 à 4 sources officielles affichées sous l'article. */
  sources: SourceLink[];
  /** Date de dernière mise à jour (AAAA-MM-JJ), affichée et déclarée dans le schema. */
  updated: string;
}

/** Pages enfants et services généraux (Prompt 6) : 600–800 mots, lien retour vers le parent (ou l'accueil). */
export interface ChildContent {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  opening: string[];
  when: SectionContent;
  process: SectionContent;
  cost: SectionContent;
  why: SectionContent;
  finalCta: { paragraphs: string[] };
  parentLink: string;
  /** Une phrase pour la carte de la page Services. */
  summary: string;
  /** 4 à 5 questions fréquentes (HTML visible + schema FAQPage). */
  faq: FaqItem[];
  /** Titre H2 de la FAQ ; défaut « <Nom de page> : vos questions ». */
  faqHeading?: string;
  /** 1 à 4 sources officielles affichées sous l'article. */
  sources: SourceLink[];
  /** Date de dernière mise à jour (AAAA-MM-JJ), affichée et déclarée dans le schema. */
  updated: string;
}

/** Pages communes (« Prompt 9 », docs/core30/prompt-9-pages-communes.md), version « problème → solution » décidée le 13/10/2026 :
 *  chaque entrée part d'un symptôme vécu par l'habitant, ancré dans un lieu connu de la commune, et donne la réponse avec le lien du service. */
export interface ProblemItem { problem: string; solution: string }
export interface ZoneContent {
  slug: string;
  /** Nom de la commune (zones.ts). */
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  opening: string[];
  /** « Vous avez ce problème ? Nous le réglons » : 5 à 8 couples problème → solution, liens [[Nom exact]] dans les solutions. */
  problems: { h2: string; items: ProblemItem[] };
  /** Permis, patrimoine, aides de la Région concernée. */
  rules: SectionContent;
  /** Quartiers desservis : 5 à 12 noms réels. */
  quartiers: string[];
  /** Repères connus de tous (parcs, places, avenues, monuments) : 4 à 10 noms vérifiés. */
  landmarks: string[];
  /** Titre de la section quartiers, ex. « De Wolvendael à Saint-Job : nos quartiers à Uccle ». */
  areaHeading?: string;
  /** Phrase d'intro de la section quartiers (style « Uccle, nous connaissons par cœur… »). */
  areaIntro?: string;
  faq: FaqItem[];
  faqHeading?: string;
  finalCta: { paragraphs: string[] };
  homeLink: string;
  /** Une phrase pour la carte « autres communes » et le hub des zones. */
  summary: string;
  /** 1 à 4 sources officielles affichées sous l'article. */
  sources: SourceLink[];
  /** Date de dernière mise à jour (AAAA-MM-JJ), affichée et déclarée dans le schema. */
  updated: string;
}

/** Page service v2 (13/10/2026, demande client) : « problème → nous le réglons », technique et matériel, étapes, prix sans chiffres, FAQ. */
export interface TechItem { label: string; text: string }
export interface ServiceContentV2 {
  slug: string;
  name: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroSubheadline: string;
  opening: string[];
  /** 5 à 8 couples : symptôme en question courte → réponse technique commençant par « Nous », lien [[Nom exact]] admis. */
  problems: { h2: string; items: ProblemItem[] };
  /** Matériaux et techniques : 4 à 6 points « label : texte ». */
  tech: { h2: string; items: TechItem[] };
  /** Ce qui fait varier le prix : 3 à 5 points, jamais de montant. */
  cost: { h2: string; items: string[] };
  faq: FaqItem[];
  faqHeading?: string;
  finalCta: { paragraphs: string[] };
  /** Lien vers la page parente ([[Nom exact]]) ou l'accueil ([[home:…]]) pour un service général. */
  parentLink: string;
  summary: string;
  sources: SourceLink[];
  updated: string;
}

export type PageContent = HubContent | ChildContent | ZoneContent | ServiceContentV2;

const modules = import.meta.glob<{ default: PageContent }>('../data/pages/*.json', { eager: true });

/** Contenu rédigé d'une page (src/data/pages/<slug>.json), ou undefined si la page est encore un placeholder. */
export function getPageContent(slug: string): PageContent | undefined {
  return modules[`../data/pages/${slug}.json`]?.default;
}

/** Contexte de rendu des liens [[Nom]] : tous les noms exacts de pages services → URL. */
export function richContext(): RichContext {
  const pages: Record<string, string> = {};
  for (const p of allServicePages()) pages[p.name] = `/${p.slug}`;
  return { pages, homeHref: `/${site.homeSlug}`, phoneDisplay: site.phoneDisplay, phoneHref: site.phoneHref };
}
