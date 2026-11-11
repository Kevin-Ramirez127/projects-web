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
    TelegramPlane.astro         inline SVG mark used by the demo
    OpenCodeWordmark.astro      official OpenCode wordmark (SVG)
    OpenCodeLogo.astro          official OpenCode logo (SVG)
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
    projects/opencode-telegram/demo.astro
                                interactive OpenCode ↔ Telegram simulation
    404.astro
  styles/
    global.css                  Tailwind 4 @theme tokens + shared CSS
    demo.css                    phone/terminal chrome for the simulation
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

## Interactive demo

`/projects/opencode-telegram/demo/` is a fully client-side simulation of the
daemon. It shows an OpenCode session next to a Telegram phone and lets you pick
five interactions: session finished, agent question, permission request, prompt
from Telegram, and session failure.

- The scenario menu, message feeds, notification banner, typed computer output
  and phone buttons are all animated with Motion and CSS.
- Questions and permissions are real interactions: tap an option on the phone
  and the computer session continues or stops.
- The prompt scenario enables the phone composer, so you can type your own
  instruction and send it to the simulated session.
- No raster images are used. The phone, terminal, icons and logos are CSS and
  inline SVG.
- Reduced motion skips the animations but keeps every scenario playable, and
  no-JS visitors get a readable fallback.

### Design systems

The page chrome follows this site's style guide. The two devices use their own
design systems, with light and dark variants that follow the site theme:

- The OpenCode console uses OpenCode's TUI language. Dark: `#0a0a0a` ground,
  raised `#141414` / `#1e1e1e` surfaces, light wordmark, blue composer rule.
  Light: `#ffffff` / `#fafafa` surfaces, dark wordmark, the same OpenTUI Mono,
  syntax colors and status bar. The session state sits in a small line below
  the window, not inside the composer.
- The Telegram phone uses Telegram's themes. Dark: `#17212b` header, `#0e1621`
  chat, dark incoming bubbles and `#2b5278` outgoing bubbles. Light: `#1a73c8`
  header, white incoming bubbles and `#e1ffc7` outgoing bubbles. Both keep the
  inline keyboards, system UI font, patterned background and iOS-style
  notification.

The OpenCode status bar also carries a green `✈ Telegram on` indicator
(`#3fb950` in dark mode, a darker green in light mode for contrast) before the
OpenCode shortcuts.

The OpenTUI Mono font is self-hosted at `public/fonts/opentui-mono-*.woff2`
under the SIL Open Font License (`public/fonts/OpenTUIMono-OFL.txt`). The
OpenCode wordmark and logo are the official brand SVGs.

The demo is linked from the opencode-telegram case study and from its row on the
main projects page.

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
