# Stack

The tools this project uses, chosen with the user during setup. The other docs name the job; this table says which tool does it.

| Job                          | Tool                                                                                                                                    |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Toolchain and task runner    | Vite+ (`vp`), with `vp run <script>` for `package.json` scripts                                                                         |
| Dependency manager           | pnpm (through `vp install` / `vp add`)                                                                                                  |
| Dev-server ports and URLs    | portless (`vp run dev` serves `https://fama.localhost`, `https://<branch>.fama.localhost` in a linked worktree)                         |
| Web frontend                 | React 19 components rendered to static HTML per language at build (`tools/static-site/plugin.ts`); no React in the browser              |
| Interactivity                | Plain DOM scripts in `src/client/`, inlined into each page; every feature works without them through links, `:target` and `<details>`   |
| Smooth scrolling             | Lenis 1.3 (`src/client/scroll.ts`), bundled into the inline client script; the scroll thumb is plain DOM (`src/client/scroll-thumb.ts`) |
| Animation                    | CSS animations; Motion only computes the spring easings at build (`tools/static-site/springs.ts`)                                       |
| Styling                      | Tailwind CSS 4                                                                                                                          |
| Linter                       | Oxlint (through `vp lint`), with the vendored anti-slop plugin                                                                          |
| Formatter                    | Oxfmt (through `vp fmt`)                                                                                                                |
| Type checker                 | tsc (TypeScript 7)                                                                                                                      |
| Workflow linter              | actionlint 1.7.12 (Docker image `rhysd/actionlint`)                                                                                     |
| CI                           | GitHub Actions (`.github/workflows/ci.yml`, Vite+ through `voidzero-dev/setup-vp`)                                                      |
| Unit test runner             | Vitest (through `vp test`), `unit` project                                                                                              |
| Component test runner        | Vitest browser mode with the Playwright provider (headless Chromium), `components` project                                              |
| Browser driver for agents    | agent-browser (global CLI)                                                                                                              |
| PR descriptions and evidence | GitHub CLI (`gh`, 2.101 or later)                                                                                                       |
| Hosting                      | Cloudflare Pages (static `dist/`)                                                                                                       |
| Site tests                   | Playwright against the built `dist/`, with and without JavaScript (`vp run test:site`, `site` project)                                  |
| Visual parity                | `tools/static-site/parity.ts --baseline <dir>`: full-page screenshots against another build                                             |
| Font subsetting              | fonttools `pyftsubset` through `uvx` (`vp run font` reads the `unicode-range` in `styles.css`)                                          |
| Images                       | AVIF from `avifenc` (libavif), with the JPEG as fallback                                                                                |
| Page-load measurement        | Lighthouse 13 (`vp run perf`, simulated 3G, against `dist/` served over HTTP/2 and TLS like Cloudflare Pages)                           |

Jobs this project does not have: backend, infrastructure as code, schema validation (the one storage record is parsed by hand, see `docs/boundaries.md`), dependency containers, API and cloud emulation, logging and analytics (no server), mutation and property-based testing (declined), pre-commit hooks (declined; lint runs in CI).

Rules:

- **New parts start on the chosen tool; an existing part moves over as it is changed.** Where a part cannot move piecemeal (a web framework's routes, a backend's HTTP layer), it keeps its framework and only new projects use the chosen one.
- **One tool per job.** Adding a second tool for a job already in the table needs the user's approval and a row change.
- **Agent guides stay installed.** When a tool ships an agent guide or skill, it is installed, committed with its lockfile, and pointed at from the instructions file, so every worktree has it.
- **Every tool runs offline.** A tool that needs a paid token or a hosted account to run in a worktree is swapped for one that runs offline, and an unmaintained tool for a maintained one.
