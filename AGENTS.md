# Agent instructions

Every check here is a command with a deterministic verdict. A check done by hand (a browser walk, a curl, reading output) becomes a test, script, or lint rule before the work is called done.

## Read a doc when

- **Stack**: you pick or swap a tool, or restructure the frontend or its build → `docs/stack.md`
- **Worktrees**: you add a port, path, or env var → `docs/worktrees.md`
- **Lint**: you add a file type or hit a lint finding → `docs/lint.md`
- **Boundaries**: you handle input from outside the program (URL, storage, JSON) or branch on a union → `docs/boundaries.md`
- **Testing**: you write or change a unit test, or look for missing tests → `docs/testing.md`
- **Falsifiable tests**: you write or review any test, or fix a bug → `docs/falsifiable-tests.md`
- **Component tests**: you add or change a component or one of its states → `docs/component-tests.md`
- **Browser**: you interact with the running web app directly → `docs/browser.md`
- **Screenshots**: you capture an image for a PR or report → `docs/screenshots.md`
- **Pull request**: you open or update a PR → `docs/pull-requests.md`
- **Lessons**: you make the same mistake twice (the user corrects it twice, or a fix undoes earlier work) → `docs/lessons.md`

## Project facts

- Dev URLs: `vp run dev` serves the main checkout at `https://fama.localhost` and a worktree at `https://<branch>.fama.localhost`.
- Tool guides: Vite+ in `node_modules/vite-plus/AGENTS.md`; agent-browser through `agent-browser skills get core`.
