# Falsifiable tests

A test earns its place by being **falsifiable**: some plausible bug in the code under test turns it red. A **tautological** test passes whatever the code does, so it buys confidence it has not earned.

## Shapes of tautology

Hunt each of these in every test you write or review:

- **Mock echo**: the assertion checks a value the test itself stubbed, or only checks that a mock was called.
- **Mirrored oracle**: the expected value is computed with the same logic as the implementation (or by calling it). Write the expected value as a literal, worked out from the spec.
- **Rubber-stamp snapshot**: a snapshot accepted on first run without reading it. A snapshot is falsifiable only after a human or agent has checked its content against the spec.
- **Logic in the test**: a branch, loop, or helper that works out what to expect. A test body is a straight line of arrange, act, assert, with literal inputs and literal expected values, since nothing tests the test.
- **Vacuous assertion**: "is defined", "is truthy", "does not throw", or a status-only check on something that holds regardless of correctness. Assert on the content.
- **Unreached assertion**: `expect` inside a `catch`, a callback, or a conditional that may never run; a test with no assertions at all.
- **Framework test**: the test exercises the library or language (an ORM saves a row, `map` maps) rather than the project's own logic.
- **Smoke-only e2e**: a flow test that checks the page loaded and never checks the outcome the user came for.

## The red check

For each test you write or keep, prove it can fail:

1. Break the behaviour it names in the implementation: flip the condition, return early, change the constant, drop the write.
2. Run that test. It goes **red**, and the failure message points at the behaviour.
3. Revert the break and see it green.

A test that stays green under the break is tautological: rewrite it against the observable outcome, then repeat the check.

Done when every new or modified test has been seen red against a deliberate break, and the break is reverted. When you report the work, list each changed behaviour that no test exercises as untested.

## Bug fixes

Reproduce the bug before fixing it. The unfixed code is the break:

1. Write the test at the seam where the bug shows (the component test when a user met it in the UI, the unit test when it lives in pure logic), with the report's inputs as literals.
2. Run it and see it **red** for the reported reason. A test red for another reason (a typo, a missing fixture) has not reproduced the bug.
3. Fix the code, see the test green, and keep the test.
