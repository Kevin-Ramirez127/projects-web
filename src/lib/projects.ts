export type ProjectKind = 'main' | 'contribution';

export interface ProjectLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface ProjectSection {
  title: string;
  body?: string[];
  items?: { title: string; body: string }[];
}

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;
  tagline: string;
  summary: string;
  meta: string;
  year: string;
  role: string;
  status: string;
  language: string;
  stack: string[];
  owner?: string;
  featured?: boolean;
  links: ProjectLink[];
  intro: string[];
  sections?: ProjectSection[];
  contribution?: {
    intro: string[];
    commits?: number;
    mergedPrs?: number;
    work: { title: string; body: string }[];
    prUrl?: string;
    note: string;
  };
}

export const projects: Project[] = [
  {
    slug: 'opencode-telegram',
    name: 'opencode-telegram',
    kind: 'main',
    featured: true,
    tagline: 'Your coding agent can now tap you on the shoulder.',
    summary:
      'A Go daemon that bridges OpenCode sessions to Telegram. Runs, failures, questions and permissions land in an allowlisted chat you can answer from your phone.',
    meta: 'Go · ★ 4',
    year: '2026',
    role: 'Creator & maintainer',
    status: 'Active',
    language: 'Go',
    stack: ['Go', 'Telegram Bot API', 'SSE', 'REST', 'Bash'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Kevin-Ramirez127/opencode-telegram',
        external: true,
      },
    ],
    intro: [
      `Long-running coding sessions have an awkward shape. You start an agent on a refactor, watch the first few steps, then go make coffee. By the time you come back it has either finished, failed, or stopped to ask a question forty minutes ago.`,
      `opencode-telegram closes that gap. A small Go daemon runs beside OpenCode, listens to the live event stream for every session, and sends the moments that need a human to a Telegram bot you control. Notifications are the default; acting from Telegram is a switch you have to turn on.`,
    ],
    sections: [
      {
        title: 'Why a daemon instead of a plugin',
        body: [
          `A plugin only lives as long as the TUI is open. A daemon can keep listening while you close the terminal, switch projects, or leave the machine running. It discovers the local OpenCode service from <code>service.json</code>, authenticates with its password, and subscribes to the filtered SSE event stream.`,
          `When the connection drops it reconnects with backoff, then reconciles any forms and permissions that arrived while it was away. That reconciliation matters: a missed permission request is the difference between an agent that keeps working and one that sits still.`,
        ],
      },
      {
        title: 'What reaches your phone',
        items: [
          {
            title: 'Session events',
            body: `Finished, failed, interrupted, and optionally provider retries. Child sessions stay quiet by default because subagents finish constantly.`,
          },
          {
            title: 'Questions',
            body: `When OpenCode shows a form that needs a human answer, the notification includes the options. With custom answers disabled — the default — you can only choose what the form offers.`,
          },
          {
            title: 'Permissions',
            body: `Approve or deny the same permission prompt you would see in the TUI. Telegram is not trusted by default; the allowlist and the security switches decide what it can do.`,
          },
          {
            title: 'Output and thinking',
            body: `Notifications can include the last assistant message. Long output is split at paragraph boundaries instead of being silently truncated, and buttons can summarize the output or reasoning without polluting the session history.`,
          },
        ],
      },
      {
        title: 'Security is the design constraint',
        body: [
          `A Telegram account is not a trusted prompt source, so the daemon is deliberately boring about access. The allowlist requires both the sending user and the chat. A missing or corrupt allowlist file denies everyone. Custom form answers, new prompts and model switching are off unless you enable them. Unauthorized updates are dropped silently.`,
          `The companion OpenCode plugin exposes <code>/telegram</code> in the TUI to turn notifications on or off and to edit the daemon settings through a loopback HTTP API. The daemon itself never exposes that API beyond localhost.`,
        ],
      },
      {
        title: 'Small details that make it usable',
        body: [
          `An installer builds the binary, copies it to <code>~/.local/share/opencode-telegram</code>, and creates a launcher in <code>~/.local/bin</code>. A <code>--systemd</code> flag writes a user service. Rich Telegram messages render headings, lists and code blocks, with a plain-text fallback when the server does not support them. A status command reports the daemon and OpenCode connection state.`,
        ],
      },
    ],
  },
  {
    slug: 'gitsion',
    name: 'gitsion',
    kind: 'main',
    tagline: 'One quiet feed for the repositories you actually follow.',
    summary:
      'A self-hosted GitHub dashboard that turns repositories into a newest-first stream of pushes, pull requests and issues. Public to read, admin-only to manage.',
    meta: 'Go · Astro',
    year: '2026',
    role: 'Creator & maintainer',
    status: 'Active',
    language: 'Go / TypeScript',
    stack: ['Go', 'MongoDB', 'Astro', 'TypeScript', 'Docker'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Kevin-Ramirez127/gitsion',
        external: true,
      },
    ],
    intro: [
      `GitHub is good at telling you that something happened. It is less good at letting you read a small, chosen set of repositories as one story. gitsion is a self-hosted answer: add the repositories you care about once, then open a single page that shows what changed across all of them.`,
      `The dashboard is intentionally public and read-only. Anyone with the URL can read the feed; only an administrator with <code>ADMIN_TOKEN</code> can add, remove, refresh or sync repositories. That split makes it useful as a team window or a public project radar without turning it into another account system.`,
    ],
    sections: [
      {
        title: 'The feed',
        body: [
          `Activity is grouped by project by default, ordered by each repository's latest activity. A second view groups the same events by person, which is useful when you want to know what a collaborator has been doing across repositories. Search and filters — owner, activity type, issue label — combine, and the active filters travel in the URL so a view can be bookmarked or shared.`,
          `Issues and pull requests have their own pages with open and closed sections, ten-item pages and show-more buttons. A repository detail page keeps the latest PR, labels, open issues, owner card and repository facts in one place.`,
        ],
      },
      {
        title: 'How the data stays fresh',
        items: [
          {
            title: 'Snapshots, not live fan-out',
            body: `The Go backend uses the standard library and MongoDB. GitHub's public API is fetched on a schedule and stored as snapshots, so page loads never hit GitHub and a slow API never blocks the dashboard.`,
          },
          {
            title: 'Last good data wins',
            body: `A failed sync keeps the previous snapshot and surfaces the error. The feed shows stale data with a warning instead of going blank.`,
          },
          {
            title: 'Optional token',
            body: `A personal access token raises the rate limit and changes the sync interval from 30 to 15 minutes. Private repositories are rejected on purpose, even when the token can see them.`,
          },
        ],
      },
      {
        title: 'Built to be left alone',
        body: [
          `Docker Compose runs the frontend, backend and MongoDB with one command. The frontend is Astro SSR with the Node adapter and no UI framework; the interactivity is plain client-side JavaScript. A bulk import script can seed an instance from a GitHub user, organization or JSON list.`,
          `SEO is handled end to end: canonical URLs, Open Graph, Twitter cards, JSON-LD, <code>robots.txt</code> and a sitemap covering every tracked repository. Filtered and transient views canonicalize to the clean page and stay out of the index.`,
        ],
      },
      {
        title: 'Why I built it',
        body: [
          `I wanted a feed that felt like a reading list, not an inbox. No notifications, no unread counts, no reason to check it every five minutes. Just the repositories I chose, in order, when I choose to look.`,
        ],
      },
    ],
  },
  {
    slug: 'quick-bitwarden',
    name: 'quick-bitwarden',
    kind: 'main',
    tagline: 'A password manager that opens like a command palette.',
    summary:
      'A Rust daemon and r-modals picker for Bitwarden. Toggle a searchable window, hit Enter, and the password is on your clipboard — then gone from history.',
    meta: 'Rust · ★ 3',
    year: '2026',
    role: 'Creator & maintainer',
    status: 'Active',
    language: 'Rust',
    stack: ['Rust', 'Bitwarden CLI', 'r-modals', 'egui', 'X11/Wayland'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Kevin-Ramirez127/quick-bitwarden',
        external: true,
      },
    ],
    intro: [
      `The Bitwarden CLI is fast and scriptable, but typing <code>bw get password name</code> every time you need a login gets old. quick-bitwarden puts the vault behind a single shortcut: a centered, searchable picker that opens instantly, copies what you choose, and gets out of the way.`,
      `It is two pieces. A small daemon keeps the item list in memory so opening the window is immediate. The window itself is an r-modals dialog, which means it is borderless, keyboard-first, and works on both X11 and Wayland.`,
    ],
    sections: [
      {
        title: 'The copy flow is the product',
        body: [
          `On Enter, quick-bitwarden clears the clipboard first, then asks <code>bw</code> for the password you picked. Clearing first matters: without it, an old clipboard entry can be pasted while the lookup is still in flight. The password stays on the clipboard for <code>QBW_CLEAR_AFTER</code> seconds, then the daemon clears it.`,
          `If <code>cliphist</code> is installed, the password is deleted from clipboard history immediately. That is the difference between a password being on your clipboard and a password being in your clipboard history forever.`,
        ],
      },
      {
        title: 'Search, shortcuts and prefixes',
        items: [
          {
            title: 'Two kinds of copy',
            body: `Enter copies the password. Shift+Enter copies the username instead.`,
          },
          {
            title: 'Prefixes',
            body: `The search field doubles as a command line: <code>&gt;sync</code>, <code>&gt;lock</code>, <code>&gt;hide items</code>, <code>&gt;show items</code>, <code>&gt;restart</code> and <code>&gt;stop</code> are built in.`,
          },
          {
            title: 'Your bindings',
            body: `Shortcuts and prefixes live in one <code>config.toml</code>. Bind a key to a tag on the highlighted row or to any r-modals action: a command, a shell one-liner, or a Rust closure.`,
          },
          {
            title: 'No dead ends',
            body: `A query that is not in the list is forwarded to <code>bw get password</code>, so the cache never blocks you from finding an item.`,
          },
        ],
      },
      {
        title: 'One daemon, one window',
        body: [
          `Concurrent launches are serialized with a lock, and a show request that races an already-opening picker is dropped instead of stacking a second window. The daemon never opens a window itself: each dialog is a short-lived child process, which is what lets <code>hide</code> and <code>toggle</code> close it from outside.`,
          `The cache refreshes only when the window has been hidden for more than <code>QBW_REFRESH_INTERVAL</code> seconds — 30 by default. Passwords are never read from <code>bw</code> until you pick one, so locking the vault outside quick-bitwarden is enforced immediately.`,
        ],
      },
      {
        title: 'Why Rust and r-modals',
        body: [
          `r-modals was already the picker I wanted for my own scripts. Using it here kept the UI layer small and made quick-bitwarden a real test of the library. The daemon, clipboard handling and vault logic are plain Rust with no GUI framework of their own.`,
        ],
      },
    ],
  },
  {
    slug: 'r-modals',
    name: 'r-modals',
    kind: 'main',
    tagline: 'Native modals for Rust, without building a GUI.',
    summary:
      'A library and CLI for instant, borderless, searchable pickers and dialogs on X11 and Wayland. One call in Rust; a dmenu replacement from the shell.',
    meta: 'Rust · ★ 2',
    year: '2026',
    role: 'Creator & maintainer',
    status: 'Active',
    language: 'Rust',
    stack: ['Rust', 'eframe', 'egui', 'X11', 'Wayland'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Kevin-Ramirez127/r-modals',
        external: true,
      },
    ],
    intro: [
      `Every script eventually needs to ask a question. A shell script wants a picker; a Rust tool wants a confirm box; a window manager binding wants a launcher. r-modals turns that into one blocking call: <code>Modal::new("Title").run()</code> returns the pick, or <code>None</code> when you cancel.`,
      `Under the hood it is eframe/egui, so the window is native, borderless and fast on both X11 and Wayland. You do not need to learn an immediate-mode GUI to use it.`,
    ],
    sections: [
      {
        title: 'A picker that does more than pick',
        items: [
          {
            title: 'Options with labels, descriptions and icons',
            body: `Icons can be a file path, raw bytes, or RGBA data.`,
          },
          {
            title: 'Submenus',
            body: `Drill down with <code>sub_option</code> instead of flattening every choice into one list.`,
          },
          {
            title: 'Actions',
            body: `Run a command, a shell one-liner, or a Rust closure when an option is selected.`,
          },
          {
            title: 'Search',
            body: `Substring or fuzzy matching across label, id, description and keywords. Multi-select, empty states, custom input and MRU history are opt-in.`,
          },
        ],
      },
      {
        title: 'The parts that make it feel native',
        body: [
          `Confirm and Prompt dialogs return <code>bool</code> and <code>Option&lt;String&gt;</code> with the same styling and keyboard behavior. Workspaces can place a dialog on a specific Hyprland, Sway, i3, niri, KDE or generic X11 workspace — and optionally do it without stealing focus.`,
          `A spawnable dialog API lets a program start itself as a child dialog and stream options in. That is how shell scripts get the same contract through <code>--menu</code>, <code>--ask</code>, <code>--confirm</code> and <code>--error</code>. Themes are plain CSS, not a bespoke styling layer: <code>Theme::dark()</code>, <code>Theme::light()</code>, <code>Theme::transparent_dark()</code> and <code>Theme::auto()</code> cover the common cases.`,
        ],
      },
      {
        title: 'Shortcuts and prefixes',
        body: [
          `One <code>config.toml</code> can bind keys to options or terminal commands, and bind the start of a query to an action. Prefixes complete with Tab while you type: <code>&gt;s</code> completes to <code>&gt;sync</code>, <code>&gt;sh</code> to <code>&gt;show items</code>. If the query does not start a registered prefix, Tab completes the focused row's label instead.`,
          `Shortcut keys are consumed before the built-in keys, so you can rebind Enter if you really want to. Option shortcuts render as row hints automatically.`,
        ],
      },
      {
        title: 'Command-line mode',
        body: [
          `Piping stdin to <code>r-modals --menu</code> turns it into a dmenu replacement. The pick goes to stdout and the exit code says what happened: 0 for a pick, 1 for cancel, 2 for an error. That small contract is what makes it usable from shell scripts without a wrapper.`,
        ],
      },
    ],
  },
  {
    slug: 'rempkg',
    name: 'rempkg',
    kind: 'main',
    tagline: 'Remember what you installed, not what came with it.',
    summary:
      'One wrapper for pacman, yay, paru, apt, dnf and friends. It installs as usual, then records the packages you chose — with tags — in a readable JSONC file.',
    meta: 'Go · ★ 2',
    year: '2026',
    role: 'Creator & maintainer',
    status: 'Active',
    language: 'Go',
    stack: ['Go', 'JSONC', 'pacman/yay/paru/apt/dnf'],
    links: [
      {
        label: 'Source',
        href: 'https://github.com/Kevin-Ramirez127/rempkg',
        external: true,
      },
    ],
    intro: [
      `Package managers are good at installing things and bad at remembering why. They can list every package on the system, but that list includes hundreds of dependencies you never asked for. When you want to clean up, you are left guessing which packages were your decisions.`,
      `rempkg is a thin wrapper. It passes your command through to the real package manager, watches what happened, and writes down the packages you installed by hand. No lock-in, no daemon, no database: just a JSONC file you can read, edit and version.`,
    ],
    sections: [
      {
        title: 'What gets recorded',
        body: [
          `Each entry stores the package name, the manager, optional tags, the install timestamp and the original command. Install verbs such as <code>-S</code>, <code>install</code> and <code>add</code> upsert entries; remove verbs such as <code>-R</code>, <code>remove</code> and <code>uninstall</code> untrack them. Query and update operations are passed through and never tracked.`,
          `Tags are the useful part. <code>--tag delete-later --tag tool pacman -S cowsay</code> turns a flat list into something you can act on, and <code>--list --filter-tag delete-later</code> answers the question you actually have.`,
        ],
      },
      {
        title: 'Works with sudo, without the mess',
        body: [
          `The default tracking file is <code>~/rempkg/packages.jsonc</code>, resolved to your home directory even when the command runs under sudo. That avoids the classic problem of root-owned state files in a user's dotfiles. <code>REMPKG_FILE</code> or <code>--file</code> can point somewhere else.`,
          `Installation is a single <code>install.sh</code> that builds the Go binary and puts it on your PATH. There are no runtime dependencies.`,
        ],
      },
      {
        title: 'Why not just use the package manager?',
        body: [
          `Because the package manager's job is to make the system work, not to preserve the story of how it got there. rempkg keeps that story small and separate. It does not replace pacman or apt; it remembers what you asked them to do.`,
        ],
      },
    ],
  },
  {
    slug: 'corcho',
    name: 'corcho',
    kind: 'contribution',
    tagline: 'An infinite canvas where notes, sites, tasks and calendars live together.',
    summary:
      'A native Rust + Qt 6 workspace with fifteen card types, git sync, AI nodes and an MCP server. I worked on the canvas interactions that make it feel like a desk.',
    meta: 'Rust · Qt 6',
    year: '2026',
    role: 'Contributor · canvas, picture-in-picture, whiteboard',
    status: 'Merged upstream',
    language: 'Rust / QML',
    stack: ['Rust', 'Qt 6', 'QML', 'C++'],
    owner: 'emiliano-go',
    links: [
      {
        label: 'Upstream project',
        href: 'https://github.com/emiliano-go/corcho',
        external: true,
      },
      {
        label: 'My pull requests',
        href: 'https://github.com/emiliano-go/corcho/pulls?q=is%3Apr+author%3AKevin-Ramirez127',
        external: true,
      },
    ],
    intro: [
      `Corcho is a desktop workspace built with Rust and Qt 6. Notes, websites, tasks, calendars, checklists, whiteboards and more all live on one infinite grid. It is the kind of app that only works if the canvas feels physical: cards should move when you drag them, menus should close when you click away, and a pen should draw where you put it.`,
      `I joined as a contributor and spent most of my time in that layer — the interactions between cards, windows, input devices and Qt's event system.`,
    ],
    contribution: {
      commits: 38,
      mergedPrs: 8,
      intro: [
        `My work landed in eight merged pull requests. The common thread was making the canvas predictable: one action should do one thing, even when cards overlap, a modal is open, or the input comes from a stylus instead of a mouse.`,
      ],
      work: [
        {
          title: 'Picture-in-picture cards',
          body: `Added the ability to pop one or more cards into separate always-on-top windows, place them side by side with a constant gap on sway, carry live Pomodoro state across, and bring a card back to the canvas from its placeholder. Later work added opacity controls for PiP windows.`,
        },
        {
          title: 'Whiteboard input',
          body: `Added pressure-sensitive strokes, an eraser, pencil and eraser cursors, long-press canvas menus for pen and touch, undo-history fixes, clipboard paste and SVG export. Also made sure the native cursor stays out of the way while drawing.`,
        },
        {
          title: 'Checklist and Pomodoro UX',
          body: `Tasks can be reordered and edited, grouped by done state with scroll position preserved, and a Pomodoro card now exposes its settings. Small things individually; together they are the difference between a checklist you use and one you avoid.`,
        },
        {
          title: 'Canvas correctness',
          body: `Stopped dropdown clicks from leaking to widgets underneath, kept card actions isolated to the top card, fixed card dragging and launcher scrolling, restored website scrolling and URL persistence, and fixed a Qt 6.8 qmlcachegen build break caused by a reserved parameter name.`,
        },
        {
          title: 'Templates and menus',
          body: `Refined the canvas menu and added templates to the sidebar, so starting a new card takes fewer decisions.`,
        },
      ],
      prUrl:
        'https://github.com/emiliano-go/corcho/pulls?q=is%3Apr+author%3AKevin-Ramirez127',
      note: `Corcho is maintained by Emiliano Gandini. My contributions are merged upstream; the project itself is his design and direction.`,
    },
  },
  {
    slug: 'postal',
    name: 'postal',
    kind: 'contribution',
    tagline: 'WhatsApp without the browser engine — and without the twenty-gigabyte history.',
    summary:
      'A native WhatsApp client that speaks the multi-device protocol directly. I worked on the interface and the small fixes that make a chat app feel trustworthy.',
    meta: 'Svelte · Rust',
    year: '2026',
    role: 'Contributor · UI, notifications, correctness',
    status: 'Merged upstream',
    language: 'Svelte / Rust',
    stack: ['Svelte 5', 'Tauri', 'Rust', 'TypeScript', 'SQLite'],
    owner: 'emiliano-go',
    links: [
      {
        label: 'Upstream project',
        href: 'https://github.com/emiliano-go/postal',
        external: true,
      },
      {
        label: 'My pull requests',
        href: 'https://github.com/emiliano-go/postal/pulls?q=is%3Apr+author%3AKevin-Ramirez127',
        external: true,
      },
    ],
    intro: [
      `Most WhatsApp desktop clients wrap WhatsApp Web in a browser. That works, but it inherits the web app's appetite: the entire account history gets synced, kept in memory and kept alive. Postal takes the harder path and implements the multi-device protocol directly in Rust. The result is a client that idles under 1% CPU instead of hundreds.`,
      `The protocol core was already strong when I joined. I worked on the layer you actually touch: the sidebar, previews, notifications, keyboard behavior, and a few database and migration bugs that only appear on real accounts.`,
    ],
    contribution: {
      commits: 15,
      mergedPrs: 9,
      intro: [
        `Nine merged pull requests, mostly UI and correctness work. The best compliment for this kind of change is that you stop noticing it.`,
      ],
      work: [
        {
          title: 'Mute @all mentions',
          body: `Added a setting to mute @all mentions globally, plus per-chat mute behavior for mentions. A group chat should not be able to page you just because someone typed @all.`,
        },
        {
          title: 'Chat hover previews',
          body: `Added a configurable hover delay — 600 ms by default — before a chat preview opens, and fixed the preview popping open on muted chats. Long enough that passing over the sidebar does not trigger it, short enough to feel immediate.`,
        },
        {
          title: 'Sidebar and accessibility',
          body: `Collapsible chat tags and Spaces, visible focus outlines, and keyboard accessibility fixes. The sidebar is the part of a chat app you use most; it should not require a mouse.`,
        },
        {
          title: 'Frontend structure',
          body: `Moved application state out of the route component and modularized the frontend. This was refactoring rather than a feature, but it made the next UI change cheaper and the state easier to reason about.`,
        },
        {
          title: 'Correctness on real accounts',
          body: `Fixed message statuses that did not update, added clearing chats from the right-click menu, set the Wayland window title, fixed Hyprland tiling, and healed skipped album/sticker columns on version-stamped databases so existing profiles survive an upgrade.`,
        },
      ],
      prUrl:
        'https://github.com/emiliano-go/postal/pulls?q=is%3Apr+author%3AKevin-Ramirez127',
      note: `Postal is maintained by Emiliano Gandini and its contributors. My work is merged upstream; the protocol and storage design are the maintainers'.`,
    },
  },
];

export const mainProjects = projects.filter((project) => project.kind === 'main');
export const contributions = projects.filter((project) => project.kind === 'contribution');

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function projectPath(slug: string): string {
  return `/projects/${slug}`;
}
