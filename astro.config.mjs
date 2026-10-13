import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://toiture-veryroof.be',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  redirects: { '/': '/couvreur-bruxelles' },
});
