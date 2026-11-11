import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // Override with SITE_URL when deploying somewhere else.
  site: process.env.SITE_URL ?? 'https://projects.ramirezkevin.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [sitemap()],
});
