# Driving the browser

Use the agent browser driver in `docs/stack.md` whenever you need to interact with the running web app directly:

- walking the app to find flows or blockers,
- reproducing a failing test by hand,
- checking a change before writing its test,
- capturing screenshots or video of a change for a pull request (`docs/pull-requests.md`), annotated and cropped per `docs/screenshots.md`.

Walk each flow as a user does: through the visible UI only (click, type, navigate), judged by what the user sees on screen. A state set through the API or a script skips what the user would hit.

Open the branch's dev URL (per `docs/worktrees.md`); the site has no sign-in.

Turn each check that matters into a component test (`docs/component-tests.md`), so the next run repeats it without an agent. Record video with the driver's recording command when a pull request needs to show motion.
