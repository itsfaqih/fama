# Fama - Portfolio Website Template

Tailwind CSS-based personal branding template built with React, Vite, Motion, and Base UI.

![Preview](.github/preview.png)

## Live Demo

See the template in use at <https://fama.itsfaqih.dev/>.

## Current Stack

- **Toolchain:** Vite+ (`vp`) 1.4 with Node.js 24 or newer and pnpm 12
- **Application:** React 19 with TypeScript 7
- **Build tool:** Vite 8, bundled with Vite+
- **Styling:** Tailwind CSS 4 with the `@tailwindcss/vite` plugin
- **UI primitives:** Base UI
- **Animation:** Motion
- **Class utilities:** `cn`
- **Code quality:** Oxlint and Oxfmt, run through Vite+

The project uses Tailwind CSS 4's CSS-first configuration in
`src/assets/css/styles.css`. It no longer requires Create React App, PostCSS,
Autoprefixer, or a separate Tailwind configuration file.

## Requirements

- [Vite+](https://viteplus.dev/) (`vp`)
- Node.js 24 or newer
- pnpm 12

The required Node.js version is recorded in `.node-version`, and the package
manager is declared in `package.json`. `vp` reads both and provides the matching
Node.js and pnpm versions.

## Getting Started

Install dependencies:

```sh
vp install
```

Start the Vite development server:

```sh
vp dev
```

The app is available at <http://localhost:5173/> by default. Vite chooses the
next available port if that port is already in use.

## Available Scripts

| Command                  | Description                                                    |
| ------------------------ | -------------------------------------------------------------- |
| `vp run setup`           | Install dependencies and the Chromium build the tests use.     |
| `vp run dev`             | Start the dev server at `https://fama.localhost` (portless).   |
| `vp run build`           | Create the production build in `dist/`.                        |
| `vp run preview`         | Serve the production build locally on a free port.             |
| `vp run test`            | Run the unit tests (shuffled).                                 |
| `vp run test:components` | Run the component tests in headless Chromium.                  |
| `vp run lint`            | Run every lint check: Oxlint, tsc, Oxfmt, actionlint (Docker). |
| `vp run lint:fix`        | Apply Oxlint and Oxfmt fixes.                                  |
| `vp run lint:ts`         | Run Oxlint (warnings fail) and tsc.                            |
| `vp run lint:format`     | Check formatting with Oxfmt.                                   |
| `vp run lint:workflow`   | Check GitHub Actions workflows with actionlint.                |

The rules behind these checks are in `docs/lint.md`, `docs/testing.md`, and `docs/component-tests.md`.

## UI and Navigation

The portfolio includes:

- English and Indonesian language selection.
- Responsive navigation with animated menu transitions.
- Section anchors for `#about`, `#projects`, `#blogs`, `#skills`, and `#contact`.
- Animated hero, section, project, blog, and skills content.
- Project and blog links to the existing external destinations.

## Project Structure

- `index.html` - Vite application entry document.
- `src/index.tsx` - React application bootstrap.
- `src/pages/Home` - Home page composition.
- `src/components` - Reusable atoms, molecules, organisms, templates, and animations.
- `src/data` - Portfolio content and skills data.
- `src/localization` - English and Indonesian text.
- `src/assets/css/styles.css` - Tailwind CSS 4 entry stylesheet and custom utilities.
- `vite.config.ts` - Vite+ configuration: React and Tailwind plugins, Oxlint (`lint`), and Oxfmt (`fmt`).
- `pnpm-workspace.yaml` - pnpm catalog that maps `vite` to the Vite+ core package.

## Production Preview

Build and preview the production output with:

```sh
vp build
vp preview
```

The generated static assets are written to `dist/`.

## Cloudflare Pages

Fama is configured as a static Cloudflare Pages project, not a Worker. The
repository-level configuration lives in `wrangler.toml`:

- **Project name:** `fama`
- **Build command (Git integration):** `pnpm install --frozen-lockfile && pnpm run build`
- **Build output directory:** `dist`
- **Production branch:** `main`
- **Node.js:** 24, selected by `.node-version`

The Git build command installs the locked dependencies before invoking Vite;
Cloudflare provides pnpm in the build image but not the global `vp` CLI, so the
`build` script runs the `vp` binary that the `vite-plus` dev dependency installs
into `node_modules/.bin`.

After authenticating Wrangler and creating the Pages project once, a direct
production upload can be made with:

```sh
vp dlx wrangler pages project create fama --production-branch main
vp dlx wrangler pages deploy --branch main
```

If the `fama` Pages project already exists, skip the `project create` command.
The custom domain `fama.itsfaqih.dev` must be assigned to the Pages project in
Cloudflare after the first project is created.
