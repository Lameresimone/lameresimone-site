import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://lameresimone.fr',
  trailingSlash: 'never',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/merci-guide') && !page.includes('/bon-cadeau-visuel'),
    }),
  ],
});
