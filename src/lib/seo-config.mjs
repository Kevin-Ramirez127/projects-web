// Shared by astro.config.mjs (integration + contract) and SEO.astro (payload).
// SITE_URL still overrides the public origin at build time, so canonical URLs,
// Open Graph tags, robots.txt and the sitemap all follow the same origin.
const fallbackBaseUrl = 'https://www.projects.ramirezkevin.dev';
const publicBaseUrl = (process.env.SITE_URL ?? fallbackBaseUrl).replace(/\/$/, '');
const { hostname } = new URL(publicBaseUrl);

export const seoConfig = {
  canonicalHost: hostname,
  publicBaseUrl,
  siteName: 'Kevin Ramirez — Projects',
  titleTemplate: '{title}',
  locale: 'en_US',
  // Canonical paths and the generated sitemap both drop the trailing slash.
  trailingSlash: 'never',
  twitterSite: '@kevinramdev',
  publisherName: 'Kevin Ramirez',
  // Social previews reuse the main site's cover so both properties share one
  // identity card instead of drifting apart.
  defaultOgImage: 'https://www.ramirezkevin.dev/og-cover.png',
};
