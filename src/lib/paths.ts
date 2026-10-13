/** Chemin canonique d'une page : sans le suffixe `.html` ajouté par `build.format: 'file'` et sans slash final. */
export function cleanPath(pathname: string): string {
  const withoutHtml = pathname.replace(/\.html$/, '');
  if (withoutHtml.length > 1 && withoutHtml.endsWith('/')) return withoutHtml.slice(0, -1);
  return withoutHtml;
}
