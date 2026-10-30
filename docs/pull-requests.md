# Pull requests

A reviewer understands the PR from its body alone: why it exists in one sentence, the shape of the change as a diagram or code-shape sketch, and **evidence** that it works: images of what the user sees. Prose stays short; the visuals carry the explanation.

1. **Gates.** Run every lint check for the files the change touches and every test suite the change touches, including `test:components "<component>"` for each component it changes (`test:components` when it changes code many components share, such as styles or data). Done when all are green on the commit you are about to push.
2. **Gather evidence.** Skip when nothing user-visible changed. Otherwise collect a checked image or video for each changed screen or state, from the first source that has it:
   1. **The component test.** The step 1 run already holds a capture per state in `component-artifacts/<component>/`.
   2. **A direct browser capture.** For a state no spec reaches yet, use the agent browser driver (`docs/browser.md`) and capture the screen or state, or record a video for a live interaction.
   3. **The base branch** for a changed screen: capture it too, from a worktree of the base branch at its own dev URL, for a before and after.

   Crop, annotate, and check every screenshot per `docs/screenshots.md`. Save each file to `.pr/` (gitignored) with a name saying what it shows (`after-settings-saved.png`). Done when every user-visible change has a checked image or video. The images show the change to a reviewer; the gates in step 1 are what prove it, so a behaviour seen only in a screenshot gets a spec before the PR opens.

3. **Write the description** by filling every section of the project's PR template. When step 2 gathered no files, delete the `## Screenshots` section. Otherwise fill it, referencing each image by local path (`![After: settings saved](./.pr/after-settings-saved.png)`), with before and after side by side in a table when both exist. Under each image, put its caption from `docs/screenshots.md`.
4. **Publish** with the PR tool in `docs/stack.md`, uploading each file from `.pr/` so its local reference becomes a hosted URL. Read the published body back. Done when the template's sections are present and every image and video reference is a hosted URL.

After later commits change what the user sees, rerun steps 2 to 4 so the evidence matches the head commit.
