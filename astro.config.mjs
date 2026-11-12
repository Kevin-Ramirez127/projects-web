import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import easeo from '@easeo/astro';
import { seoConfig } from './src/lib/seo-config.mjs';

export default defineConfig({
  // SITE_URL still overrides the public origin when deploying somewhere else.
  site: seoConfig.publicBaseUrl,
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [
    sitemap({
      // easeo canonicalizes paths without a trailing slash; keep the sitemap
      // in the same shape so crawlers see one URL per page.
      serialize(item) {
        if (item.url !== `${seoConfig.publicBaseUrl}/`) {
          item.url = item.url.replace(/\/+$/, '');
        }
        return item;
      },
    }),
    easeo({
      config: seoConfig,
      // Emit the machine-readable SEO intent so it can be diffed in CI.
      contract: {
        canonicalHost: seoConfig.canonicalHost,
        scheme: 'https',
        defaults: {
          indexable: true,
          canonical: 'self',
          ogRequired: true,
          twitterRequired: true,
          schemaRequired: true,
          title: { required: true, minLength: 20, maxLength: 60 },
          description: { required: true, minLength: 70, maxLength: 160 },
        },
        rules: [
          { match: '/', expect: { schemaRequired: true, schemaTypes: ['WebSite'] } },
          { match: '/projects/*', expect: { schemaRequired: true, schemaTypes: ['Article'] } },
        ],
      },
    }),
  ],
});
