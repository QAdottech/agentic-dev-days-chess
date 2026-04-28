<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Chess Openings Workshop

## Project structure

- `src/app/lib/` — pure functions (chess logic, openings data). All business logic goes here. Testable without React.
- `src/app/components/` — React components. UI only, import logic from lib/.
- `tests/invariants/` — invariant tests that verify product properties. Run with `npm test`.
- `INVARIANTS.md` — the specification. Every invariant has an ID (e.g. BOARD-01, OPEN-05) and maps to a test.

## Invariant workflow

This project uses **invariants** — properties that must always hold regardless of what changes are made.

1. Invariants are defined in `INVARIANTS.md` with an ID, description, and severity
2. Each invariant has a corresponding test in `tests/invariants/`
3. New features should have invariants defined BEFORE implementation
4. Tests use `describe("ID: description")` naming to map back to INVARIANTS.md

When adding a feature:
- First update `INVARIANTS.md` with new invariant definitions
- Then create `tests/invariants/<feature>.test.ts` with tests for those invariants
- Then implement the feature in `src/app/lib/` (pure functions) and `src/app/components/` (UI)
- Run `npm run lint && npm test` before pushing

## Important rules

- **If a test fails, fix the source code, not the test.** Invariant tests encode the specification.
- All new logic should be **pure functions** in `src/app/lib/`, not inline in components.
- The board coordinate system: row 0 = Black's back rank (rank 8), row 7 = White's back rank (rank 1).

## Verification pipeline

- Layer 1: `npm run lint` + `npm run build` — syntax, types, lint
- Layer 2: `npm test` — invariant tests
- Layer 3: QA.tech PR review — visual/behavioral (automatic on PR, 5-15 min)

Use `gh pr checks <number>` to see pipeline status and `gh pr view <number> --comments` to read QA.tech feedback.
