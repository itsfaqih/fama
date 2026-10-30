# Parse at the boundary

Every value the type checker cannot vouch for is **untyped**: HTTP responses, request bodies, database rows, parsed JSON, environment variables, queue messages, files, browser storage, and anything from an untyped library. Decode each one with the schema library in `docs/stack.md` where it enters the program, and handle the decode failure as its own case: a typed error the caller sees and handles. Past the boundary, code trusts the decoded type.

Every case gets handled: each member of a union or enum, each typed error a call can return, the decode failure, the empty result. Use an exhaustive match, or a `switch` the exhaustiveness rule checks, so adding a case breaks the build until it is handled.

Lint enforces most of this: an `any` from parsed JSON or a response body cannot be used until decoded, and a type assertion on an `any` or `unknown` value fails. A database row typed through a generic (`query<User>(...)`) slips past it, so decode rows too, or use a query layer that decodes for you.

The one untyped input today is the `sessionStorage` record in `src/client/language.ts`: a scroll offset and section ids. It is parsed by hand where it is read, and anything that does not parse restores nothing. Reading storage can itself throw where the browser blocks site data, so access goes through a guard that treats that as no record. There is no fetch and no env read beyond `import.meta.env.DEV`, so `docs/stack.md` names no schema library. The next untyped input picks one there before it lands.
