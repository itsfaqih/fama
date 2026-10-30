# anti-slop provenance

- Source: the user-level `install-anti-slop` skill (`~/.agents/skills/install-anti-slop/assets/anti-slop`), copied by its `scripts/install.mjs` on 2026-10-30.
- Source commit: unknown (the skill directory is not under version control).
- Installed paths: `tools/oxlint/anti-slop/index.ts` (generic rules, all enabled at error). The opt-in `effect/` plugin is copied but not registered, since the project does not depend on Effect.
- Dependency: `@oxlint/plugins` pinned to the Oxlint version Vite+ ships (1.89.0); upgrade both together.
- Intentional deviations: none.

## Local patches

- `rules/no-module-mocking.ts` also treats `vi` imported from `vite-plus/test` as the Vitest object. Vite+ projects must import test APIs from there (`vite-plus/prefer-vite-plus-imports`), so without this the rule never fires.
