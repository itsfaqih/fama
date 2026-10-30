# Lint

Each lint tool has one check script, `lint:<name>`, that runs it once over the whole repo and exits non-zero on any finding (warnings fail), plus a fix script, `lint:<name>:fix`, when the tool has an autofixer. The script count follows the tools, not the file types: a formatter that reads YAML, Markdown, JSON, and CSS is one `lint:format` (`<formatter> --check .`) and one `lint:format:fix` (`<formatter> .`). Tools that own the same language may share a script (`lint:ts` runs the type checker and the linter), and each tool still appears in exactly one check script. A check-only tool (`lint:workflow`) has no fix script. `lint` runs every check script and `lint:fix` every fix script.

After each batch of edits, run `lint`, or the check script of each tool that reads the files you touched, before running tests.

## Coverage

Coverage is exhaustive: every file type in the repo is read by the tool of some check script. Each type has one linter, one formatter, and (for typed languages) one type checker, recorded in `docs/stack.md`. When a file type is added to the repo, including the easy-to-forget ones (shell scripts, Dockerfiles, CI workflows, SQL, Markdown), widen the scope of a tool that already reads it, or add the tool that does with its own `lint:<name>` and, if it fixes, `lint:<name>:fix`.

## Findings

Fix a finding at its root. Rules and strict compiler settings stay at their level; turning one down needs the user's approval and a comment in config giving the reason. A single justified exception gets an inline disable with its reason on the same line.

When an agent repeats a mistake a rule can detect, encode it as a lint rule (a config option, a restricted-import entry, or a custom rule) through `docs/lessons.md`.

The test rules catch the mechanical subset of `docs/falsifiable-tests.md`: no assertion, conditional or standalone assertion, fixed waits, forced clicks, missing awaits. Run the checks before the red check.
