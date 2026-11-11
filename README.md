# projects-web

A projects showcase for Kevin Ramirez. The index lists the projects I build and
maintain, then the open-source projects I contribute to. Every project has its
own case-study page.

Built with the visual language from [Kevin-Ramirez127/web](https://github.com/Kevin-Ramirez127/web):
warm ink, bone text, lavender brackets, dot-matrix rails, and the same
center-out square theme transition.

## Stack

- Astro 5 (static output)
- Tailwind CSS 4 via `@tailwindcss/vite`
- `motion` (Framer Motion successor, vanilla API)
- TypeScript strict (`pnpm check`)
- pnpm

## Develop

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm check    # astro typecheck, 0 errors
pnpm build    # static output in dist/
pnpm preview  # serve the built site
```

Node 22+ and pnpm 11+ required.

## Structure

```text
src/
  layouts/BaseLayout.astro      fonts, theme boot script, Motion runtime, menu
  components/
    Nav.astro                   [ menu ] header + fullscreen overlay
    ThemeToggle.astro           [ light ] / [ dark ] action label
    BracketLink.astro           accent bracket link with fill-wipe hover
    GlobalRails.astro           fixed dot-matrix rails, section-aware
    ProjectRow.astro            one row in the main projects list
    ContributionCard.astro      one cell in the open-source grid
    Footer.astro                contact section + bottom bar
    SEO.astro                   canonical, Open Graph, Twitter, JSON-LD
  lib/
    projects.ts                 all project copy and metadata
    motion-config.ts            durations, easing, distances, stagger
    theme-transition.ts         View Transitions square reveal
    site.ts                     site name, description, social links
  pages/
    index.astro                 projects index
    projects/[slug].astro       case-study template for every project
    404.astro
  styles/global.css             Tailwind 4 @theme tokens + shared CSS
docs/STYLE-GUIDE.md             the rules this site follows
```

## Editing projects

All content lives in `src/lib/projects.ts`. Each entry is either `kind: 'main'`
or `kind: 'contribution'`.

- `summary`, `tagline`, `intro` and `sections` feed the card and case study.
- `links` render as bracket links in the hero and sidebar. Add `external: true`
  for anything that leaves the site.
- Contributions use `contribution` instead of `sections`: `commits`,
  `mergedPrs`, a list of `work` items, a `prUrl` and an honest `note` about who
  maintains the project.
- `featured: true` adds the FLAGSHIP chip in the main list.

The next-project link follows the array order, so reordering the array also
reorders the case-study navigation.

## Design notes

- Dark is the default. Light mode overrides every token under
  `html[data-theme="light"]`; no component class changes.
- The theme toggle uses the same View Transitions square reveal as the portfolio
  (`src/lib/theme-transition.ts`). Reduced motion gets a short cross-fade, and
  browsers without View Transitions switch instantly.
- Motion is limited to fade + rise. `.reveal` is gated behind `html.js-motion`,
  so no-JS visitors see the final content. Reduced motion shows everything
  immediately.
- Rails are decorative (`aria-hidden`) and only appear at 1400px and up, so
  they never collide with the project actions on smaller screens.
- The dot-matrix words in `GlobalRails.astro` must stay in the same order as the
  `<section>` elements in `src/pages/index.astro`.

## Deploy

The site is fully static. Set `SITE_URL` at build time to the public origin so
canonical URLs, Open Graph tags and the sitemap are correct:

```sh
SITE_URL=https://your-domain.example pnpm build
```

`robots.txt` is generated from the same `site` value, so the sitemap URL follows
automatically. Update the default `site` in `astro.config.mjs` if the domain
changes.

`public/og-cover.png` is the social preview (1200×630). Replace it and keep the
filename stable.

## Notes on content

- Star counts in `meta` are a snapshot taken when the page was written. They are
  copy, not live data; update them when the projects change.
- `firmauy-website` is a private repository. The case study links to the public
  FirmaUY project and says so instead of linking to a 404.
- Contributions are described from my own commits and merged pull requests. The
  maintainers own the direction of those projects.
