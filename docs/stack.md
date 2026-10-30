# Stack

The tools this project uses, chosen with the user during setup. The other docs name the job; this table says which tool does it.

| Job                          | Tool                                                                                                            |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| Toolchain and task runner    | Vite+ (`vp`), with `vp run <script>` for `package.json` scripts                                                 |
| Dependency manager           | pnpm (through `vp install` / `vp add`)                                                                          |
| Dev-server ports and URLs    | portless (`vp run dev` serves `https://fama.localhost`, `https://<branch>.fama.localhost` in a linked worktree) |
| Web frontend                 | React 19 on Vite (through Vite+)                                                                                |
| Interactive UI primitives    | Base UI                                                                                                         |
| Animation                    | Motion (`motion/react`)                                                                                         |
| Styling                      | Tailwind CSS 4                                                                                                  |
| Linter                       | Oxlint (through `vp lint`), with the vendored anti-slop plugin                                                  |
| Formatter                    | Oxfmt (through `vp fmt`)                                                                                        |
| Type checker                 | tsc (TypeScript 7)                                                                                              |
| Workflow linter              | actionlint 1.7.12 (Docker image `rhysd/actionlint`)                                                             |
| CI                           | GitHub Actions (`.github/workflows/ci.yml`, Vite+ through `voidzero-dev/setup-vp`)                              |
| Unit test runner             | Vitest (through `vp test`), `unit` project                                                                      |
| Component test runner        | Vitest browser mode with the Playwright provider (headless Chromium), `components` project                      |
| Browser driver for agents    | agent-browser (global CLI)                                                                                      |
| PR descriptions and evidence | GitHub CLI (`gh`, 2.101 or later)                                                                               |
| Hosting                      | Cloudflare Pages (static `dist/`)                                                                               |

Jobs this project does not have: backend, infrastructure as code, schema validation (no input crosses a boundary: no fetch, storage, or env), dependency containers, API and cloud emulation, web e2e runner (the user chose component tests), logging and analytics (no server), mutation and property-based testing (declined), pre-commit hooks (declined; lint runs in CI).

Rules:

- **New parts start on the chosen tool; an existing part moves over as it is changed.** Where a part cannot move piecemeal (a web framework's routes, a backend's HTTP layer), it keeps its framework and only new projects use the chosen one.
- **One tool per job.** Adding a second tool for a job already in the table needs the user's approval and a row change.
- **Agent guides stay installed.** When a tool ships an agent guide or skill, it is installed, committed with its lockfile, and pointed at from the instructions file, so every worktree has it.
- **Every tool runs offline.** A tool that needs a paid token or a hosted account to run in a worktree is swapped for one that runs offline, and an unmaintained tool for a maintained one.
