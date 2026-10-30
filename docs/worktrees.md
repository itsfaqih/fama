# Worktrees

Parallel agents each work in their own **worktree**. The project stays worktree-friendly when any number of checkouts can install, run the dev server, and run every test suite at the same time, and a fresh worktree goes from `git worktree add` to green with one install command.

Hold every item as you add code, and fix any that fails:

- **Ports.** Every port is assigned at run time; scripts, configs, and code hold none. The dev script gets a free port from the port tool in `docs/stack.md` and serves the app at a name derived from the branch (`https://<branch>.<name>.localhost` when the tool supports it). Multi-service apps name each service and find each other through env vars built from those names. Tests take ephemeral ports instead (container-mapped ports, a free-port helper, or port 0).
- **Dependency install.** The dependency manager shares one content-addressed store across checkouts, so each worktree's install costs links rather than copies. Pin its version in the manifest, convert an existing lockfile with the manager's import command, delete the other managers' lockfiles, and replace their commands in scripts, CI, and docs. When the manager skips dependency build scripts until they are approved, commit an approval entry for each package (`true` when its build is needed and `false` otherwise), so a fresh worktree installs without a prompt.
- **Docker Compose for dev.** Each worktree gets its own containers and volumes: the project name comes from the checkout (`COMPOSE_PROJECT_NAME` set from the worktree directory), Compose names the containers (delete every `container_name`), and Docker picks the host ports (publish `"5432"`, not `"5432:5432"`).
- **State on disk.** SQLite files, uploads, caches, and logs live inside the checkout (gitignored) or in a per-run temp dir. Shared absolute paths (`/tmp/myapp.db`, `~/.myapp`) leak state between worktrees.
- **Migrations.** Parallel branches that each add a migration need distinct migration names. Name migrations by timestamp and let the migration tool apply them out of order, or record in the instructions file how numbers are reserved.
- **Simulators and bundlers.** Mobile projects read the bundler port from env, and scripts target a simulator or emulator by UDID or serial. `docs/e2e-mobile.md` covers the per-worktree device.
- **Env files.** A new worktree has no untracked `.env`. Commit `.env.example` with working local defaults and an idempotent `setup` script that creates `.env` from it, or make the app start with no `.env` at all.
- **Paths in config.** Every path resolves relative to the repo root; an absolute path into one checkout points every worktree at that checkout.
- **Test containers.** Container reuse stays off, per `docs/hermetic-dependencies.md`.

## Prove it

```sh
git worktree add ../<repo>-wt-check -b wt-check
```

In both checkouts at once: install, start the dev server, and run every lint check and test suite the project has. Done when both run concurrently with no port, lock, or data collision, both dev URLs serve their own branch, and every suite is green in both. Then remove the check worktree and branch.
