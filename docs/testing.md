# Testing

The test runner in `docs/stack.md` runs unit tests as the `unit` project with the `test` script, shuffled on every run. Components are tested in a real browser per `docs/component-tests.md`.

No module here crosses a process boundary (no fetch, storage, or server), so the project has no integration suite. The first module that does gets one, as `test:integration` with its own runner project, following the integration sections below.

A **unit test** covers pure logic with no I/O. An **integration test** drives a module through its public seam (an HTTP handler, a service function, a queue consumer) with its real collaborators running, and asserts on what the outside world can observe afterwards: the response, the row, the stored object, the message on the queue. Dependencies run for real or as emulators, and a stateless third-party call is stubbed at the network boundary, never by mocking a module. Every new test also passes `docs/falsifiable-tests.md`.

## Test behavior from the outside

A test calls the module's public API (the seam) and asserts what its caller observes, so a refactor that keeps behavior leaves every test green. Private helpers, internal call order, and your own collaborators are exercised through the seam and left unasserted. Name each test for a behavior the caller sees (`rejects an expired invite`), not for a function. Where the module serves a user, the assertion is what that user would see: the response the client renders, the email that arrives, the row the next page reads.

## Find missing tests

The project has no mutation tester or property-based testing library (declined at setup). Once a change's tests pass, list each behavior it adds or changes and check that a test fails without it, as the red check in `docs/falsifiable-tests.md` describes.

## Writing an integration test

1. **Map the I/O.** List every module that crosses a process boundary (DB queries, HTTP clients, SDK calls, queue producers and consumers, file storage). For each, list the branches it handles: success, not found, conflict, timeout, a reply that fails its schema. Destructive, sync, and identity operations also get their boundary cases: stale state, a concurrent change from another client, a retry after a lost response, a caller who doesn't own the record, and an oversized batch. Every boundary-crossing module has a row with its branches.
2. **Isolate.** Each test owns its data: one database per worker (create from a migrated template, keyed by the runner's worker id) or a transaction rolled back after each test. Generate unique keys (bucket prefixes, queue names, emails) per test so parallel workers never meet.
3. **One test per branch.** Arrange through the app's own write paths or plain SQL, act through the public seam, assert on observable state with literal expected values. Provoke error branches for real where possible: violate a unique constraint, read a missing object key, stop the container mid-test for a connection failure. Tests read connection details from the runner's context channel.
4. **Prove it.** Run the red check from `docs/falsifiable-tests.md` on each new test, then run the whole suite shuffled and repeated (three times). Done when every branch has a test that has been seen red and three shuffled runs from a clean state pass.

## HTTP APIs

For an HTTP API, the public seam is the network. Start the real server on port 0 in the test file's setup hook, read the bound port, and call it with a real HTTP client. Then assert on status, headers, and parsed body. Requests then pass through the same listener, middleware, body parsing, and serialization as production. In-memory request helpers and calling handlers directly each skip part of that path.
