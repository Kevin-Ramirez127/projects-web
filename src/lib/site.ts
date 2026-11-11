export const site = {
  name: 'Kevin Ramirez',
  title: 'Kevin Ramirez — Projects',
  description:
    'The tools I build and maintain, plus the open-source projects I contribute to: developer tooling, self-hosted software and native desktop apps.',
  url: 'https://projects.ramirezkevin.dev',
  locale: 'en_US',
  language: 'en',
  author: 'Kevin Ramirez',
  location: 'Montevideo, Uruguay',
  keywords: [
    'Kevin Ramirez',
    'Projects',
    'Open Source',
    'Developer Tools',
    'Go',
    'Rust',
    'Astro',
    'Opencode',
    'Telegram',
    'Self-hosted',
  ],
  social: {
    github: 'https://github.com/Kevin-Ramirez127',
    linkedin: 'https://www.linkedin.com/in/kevin-ramirez-silva/',
    portfolio: 'https://www.ramirezkevin.dev',
  },
  themeColor: '#222222',
} as const;

export type SiteConfig = typeof site;
