# Style Guide

This site inherits the visual language of
[Kevin-Ramirez127/web](https://github.com/Kevin-Ramirez127/web): warm ink,
bone text, lavender `[ bracket ]` links, dot-matrix side rails, and a center-out
square theme transition. This document is the single source of truth for the
projects site.

## 1. Principles

- Minimal terminal-bracket aesthetic: content over chrome.
- Left-aligned, generous whitespace, hairline dividers — no heavy cards.
- One accent only (`accent`). Everything else is bone/ink opacity steps.
- Motion is subtle: fade + 18–28px rise, never bounce or rotate.
- No-JS and `prefers-reduced-motion` visitors always see the final content.

## 2. Colors

Dark is the default (`:root` values). Light mode overrides every token under
`html[data-theme="light"]`, so every Tailwind utility flips without class
changes.

| Token | Dark | Light | Usage |
|---|---|---|---|
| `ink` | `#222222` | `#e5e5e5` | page background |
| `ink-soft` | `#2a2a2a` | `#eeeef2` | card / hover surface |
| `bone` | `#e5e5e5` | `#1e1e2a` | headings, primary text |
| `bone-dim` | `#C9C6DC` | `#454555` | tags, secondary text |
| `bone-faint` | `#A89D87` | `#5f5f70` | labels, meta, placeholders |
| `accent` | `#8E8BFF` | `#4c4cd9` | bracket links, highlights |
| `accent-dim` | `#7172D8` | `#3b3bb0` | hover borders, focus fallbacks |
| `line` | `#3a3a3a` | `#bbbbc8b3` | hairlines, grid gaps |
| `rail` | `#6f6e67` | `#bbbbc8` | dot-matrix rails |
| `rail-dim` | `#54534d` | `#d2d2dc` | backdrop dots |

Rules:

- Body text: `text-bone/85`–`text-bone/90`, `font-light`.
- Muted labels: `font-matrix text-xs tracking-[0.2em+] text-bone-faint`.
- Dividers: `border-t hairline` (`.hairline` sets `border-color: var(--color-line)`).
- Never hard-code a theme-dependent color. Use a token or it will not flip.

## 3. Typography

- Display / headings: `"Raleway"` variable (200–700).
- Body: `"Inter"` variable (200–700).
- Mono / labels: `"Open Sans"` variable (300–700).
- Pixel: `"Bitcount Grid Double"` (300–700). Rail words only.
- Hero: `text-[18vw] sm:text-7xl md:text-8xl lg:text-[9rem]`.
- Detail title: `text-[12vw] sm:text-6xl md:text-7xl lg:text-8xl`.
- Section titles: `text-5xl md:text-6xl font-extralight`.
- Body: `17–18px / relaxed / font-light`.
- Mono kickers: `...MAIN PROJECTS...`, `...OPEN SOURCE...`, `...OVERVIEW...`.
- Inline code uses `font-matrix` with a token-based background and hairline.

## 4. Layout

- Container: `mx-auto max-w-6xl px-6 md:px-10`.
- Sections: `py-20 md:py-28`, flowing continuously with no divider lines.
- Hero: `min-h-[92vh] flex flex-col`, content centered, `...Scroll...` at the bottom.
- Main projects are an editorial list: index, name, summary, tags, actions.
- Contributions are a 1px hairline grid: `gap-px bg-line border hairline` with
  `bg-ink` cells.
- Detail pages: `max-w-6xl`, one reading column. Prose sections cap at
  `max-w-3xl`; wide content such as the interactive demo uses the full width.

## 5. Components

### Header (`src/components/Nav.astro`)

- Left: the theme toggle. Right: the `[ ramirezkevin.dev ↗ ]` link back to
  the main site, followed by `[ menu ]`.
- The link is always visible so this subdomain never feels detached from the
  portfolio. Below `sm` it shortens to `[ main site ↗ ]`; it always opens in a
  new tab.

### Bracket link (`src/components/BracketLink.astro`)

```html
<a class="bracket-link text-xl" href="...">
  <span class="br">[</span><span>Label</span><span class="br">]</span>
  <span class="fill-wipe" aria-hidden="true">…same content…</span>
</a>
```

- Accent, `inline-flex gap-0.45rem`; brackets use the mono font.
- Hover/focus: an accent box wipes left→right while an ink copy of the full
  content wipes in over it. Active: 1px press.

### Dot-matrix rails (`src/components/GlobalRails.astro`)

One fixed rail for the whole page at 1400px and up only, on the right half,
behind content. Below 1400px it is hidden so the project actions and hero stats
keep their space. Three columns × four section cells (`top`, `projects`,
`contributions`, `contact`). Every cell renders a full-height dotted column
behind a solid word; the word carries `bg-ink` so it masks the dots. An
IntersectionObserver on `main section[id]` slides the strips to the active cell
with a 0.06s per-column cascade.

- Rail word order must match the `<section>` order in `src/pages/index.astro`.
- Words stay in flow; only the dots are absolute. Absolute-only cells collapse
  to zero width under `vertical-rl`.
- Do not reintroduce per-section rails.

### Project row (`src/components/ProjectRow.astro`)

`01` index + optional FLAGSHIP chip, project name, language/stars chip, a
two-sentence summary, stack tags, `[ case study ]` and a small `source ↗`.
Hover turns the name and bottom hairline accent. Actions live inside the text
column so they never collide with the rails.

### Contribution card (`src/components/ContributionCard.astro`)

`C01` index, upstream owner, project name, role, summary, three stack tags and
the upstream status (`Merged upstream` / `Contributed`). Cards sit in a 1px grid
and mask the rails with an opaque `bg-ink`.

### Detail page (`src/pages/[slug].astro`)

- Back link, mono kicker with kind + index, title, status chip, tagline, links.
- Four-cell facts grid: role, year, upstream/status, language.
- Main projects: overview then titled sections with optional numbered item lists.
- Contributions: an accent-bordered "My contribution" block with commits,
  merged PRs and year, followed by numbered work items and an honest note about
  maintainership.
- Closing `...NEXT...` link plus `[ All projects ]`.

### Interactive demo exception

The live demo embedded in the opencode-telegram case study contains two product
mockups that use their own design systems instead of this guide's tokens, but
still follow the site light/dark mode:

- The OpenCode console follows OpenCode's TUI. Dark: `#0a0a0a` / `#141414` /
  `#1e1e1e` surfaces, light wordmark, blue composer rule. Light: `#ffffff` /
  `#fafafa` surfaces and dark wordmark. It keeps OpenTUI Mono, syntax colors
  and the status bar. The session state is shown below the window; the composer
  stays as `Ask anything...`.
- The Telegram phone follows Telegram's themes. Dark: `#17212b` header,
  `#0e1621` chat, dark bubbles. Light: `#1a73c8` header, white incoming and
  `#e1ffc7` outgoing bubbles. Inline keyboards, the system UI font and the
  iOS-style notification stay in both.

The green `✈ Telegram on` status-bar indicator uses `#3fb950` in dark mode and
a darker green in light mode for contrast.

The surrounding demo chrome (toolbar, scenario menu, captions) still uses the
site tokens. Do not refactor the mockups to `--color-*` variables — they are
supposed to look like the real products, with their own light/dark palettes.

### Section header

```html
<p class="reveal font-matrix text-xs tracking-[0.25em] text-bone-faint">...OPEN SOURCE...</p>
<h2 class="reveal mt-3 text-5xl md:text-6xl font-extralight tracking-tight">Built with others</h2>
<p class="reveal mt-5 max-w-2xl text-bone/85 font-light leading-relaxed">…</p>
```

## 6. Motion

Library: [`motion`](https://motion.dev/) (vanilla JS). Config:
`src/lib/motion-config.ts`. Runtime: `src/layouts/BaseLayout.astro`.

| Token | Value | Use |
|---|---|---|
| `duration.instant` | `0.18s` | menu close |
| `duration.fast` | `0.35s` | menu open / links |
| `duration.base` | `0.7s` | reveals, hero |
| `ease.out` | `[0.22, 1, 0.36, 1]` | everything (`ease`, not `easing`) |
| `distance.rise` | `22px` | scroll reveals |
| `distance.heroRise` | `28px` | hero entrance |
| `stagger.hero` | `0.09s` | hero sequence |
| `stagger.menu` | `0.06s` | menu links |

- Hero: `[data-hero]` inside `#top` animates on load with stagger.
- Scroll: `.reveal` via `inView` with `margin: -8% 0px -8% 0px`.
- Menu: overlay fades, links rise + stagger. Links are parked at `opacity: 0`
  before the overlay fades in so they never flash.
- Hidden states are gated behind `html.js-motion`. Every animation has a
  `try/catch` fallback to `.is-visible`, and `html .reveal.is-visible` outranks
  the hidden rule, so a motion failure can never blank the page.
- In Motion v14, `inView(el, onStart)` passes the element as the first argument.

## 7. Theming

- A head-inline script sets `documentElement.dataset.theme` from
  `localStorage` before first paint (dark default, no flash).
- `BaseLayout` syncs both toggles, persists the choice, and updates
  `meta[name="theme-color"]`.
- Toggles live in the header and the menu overlay. Labels name the action
  (`[ light ]` while dark).
- Switch transition: `src/lib/theme-transition.ts` uses the View Transitions API
  to hold the old page while a center-out quadtree of squares grows over it.
  Squares are largest in the center and shrink toward the edges. Solid accent
  fill while growing; the new snapshot replaces the fill when a square
  completes. Reduced motion gets a 200ms cross-fade; no View Transitions support
  switches instantly.
- `SQUARE_FILL` and `THEME_INK` mirror the tokens in `global.css`. Keep both in
  sync.

## 8. Accessibility

- Skip link (`#main`), `:focus-visible` accent outline, `aria-expanded` on the
  menu, `Escape` closes, focus trap inside the open overlay, `inert` when closed.
- Decorative rails are `aria-hidden`.
- Contrast: bone-on-ink AAA. `bone-faint` is meta-only, never body copy.
- Images need `alt`; icons are `aria-hidden="true"`.
- Reduced motion shows all content immediately and skips the square transition.

## 9. Adding a project

1. Add an entry to `src/lib/projects.ts` with `kind: 'main'` or
   `kind: 'contribution'`.
2. Fill `summary`, `tagline`, `intro`, `stack`, `links` and either `sections` or
   `contribution`.
3. The index and `/<slug>` page pick it up automatically.
4. Keep the next-project order sensible: it follows the array.
5. If it belongs in the rail copy, update `GlobalRails.astro` (and keep the
   section order intact).
