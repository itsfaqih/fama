# Encode lessons

A mistake that happens twice will happen again in the next session, which starts with no memory of this one. The cure is a **lesson** stored where the next agent meets it.

## Steps

1. **State the lesson** in three parts: the wrong move, the right move, and why the right move holds in this project. Cite both occurrences (the commits, files, or the user's corrections). Done when the lesson reads as one positive instruction with its reason.
2. **Pick the strongest home.** Take the first that can carry it:
   1. **A mechanical check**: lint rule, type constraint, test, or CI step (see `docs/lint.md`). It enforces on every run, so no agent has to remember it.
   2. **A line in the instructions file** when it bears on most tasks in the repo. A nested copy of that file in a subdirectory scopes it to work there.
   3. **A doc in `docs/`** when it is a multi-step procedure needed only on some tasks, with a pointer in the instructions file naming the tasks that should trigger it. A lesson that sharpens an existing doc goes into that doc. A procedure that applies across projects goes to the user as a proposed user-level skill, outside this repo.

   Done when one home is chosen.

3. **Propose.** Show the user the lesson, the chosen home with the reason it beats the rungs above, and the exact draft text or rule config. Draft agent-facing text by stating the right move positively and keeping the why. Done when the user approves the draft or redirects it.
4. **Write it** after approval, then show it working: the lint rule fires on the original mistake, or the new text loads where the mistake happened. Done when the lesson is in its home and that check passes.
