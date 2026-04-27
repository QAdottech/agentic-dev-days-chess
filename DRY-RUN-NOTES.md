# Workshop Dry-Run Notes

Walking the workshop as a participant would. Issues grouped by where they hit, with severity and a suggested fix. Bigger items at the top of each section.

---

## Pre-task: Setup gap

**Severity: blocker**

There is no setup section in `TASKS.md` and no `README.md`. A first-time participant has no answer to:

- Where do I clone from? Is there one shared repo, or one repo per pair?
- What is "your pair branch"? The current branch is `pair-00` — is each pair assigned a branch on a shared repo, or do they fork?
- Which "coding agent"? Claude Code? Cursor? Do they need an API key? Is it pre-installed on a workshop laptop or do they install it?
- Node version? `verify.yml` uses Node 20, `package.json` doesn't pin one. Local `npm ci` may fail silently on Node 18 / 22 mismatches.
- `npm install` step is implicit. Say it.
- `npm run dev` is never mentioned. Participants should be able to see the app in a browser locally before they push — otherwise the only way to see the bug in `Board.tsx` (highlight offset, see Task 0 below) is through QA.tech, which takes ~5 min.
- How does QA.tech actually get wired up? The `verify.yml` comment says "QA.tech runs automatically via the QA.tech GitHub integration when a Vercel preview deploy is ready" — but participants don't know whether the integration is already installed, whether their PR will trigger it, or what to do if it doesn't.
- Is there a Vercel project already linked? The `trigger vercel deployment` commit suggests yes, but no instructions confirm it.

**Fix:** Add a "Before you start" section to `TASKS.md` with: clone URL, branch convention, agent setup, `npm install`, `npm run dev`, and a sentence on how QA.tech gets triggered (or a note that it is pre-configured by the workshop hosts).

---

## Task 0 — Fix the App

### Issue 0.1 — One of the planted bugs is invisible to `npm test`

**Severity: high (likely to confuse)**

There are three planted bugs, but only two fail invariant tests:

| Bug | Where | Caught by |
|-----|-------|-----------|
| Black knight/bishop unicode swapped | `src/app/lib/chess.ts:29-30` | `npm test` (PIECE-02) |
| King's Indian `Bg7` lands on g6 | `src/app/lib/openings.ts:275` | `npm test` (OPEN-05) |
| `from`-square highlight shifted by +1 column | `src/app/components/Board.tsx:21` | **Only QA.tech (UI-02)** |

Once the first two are fixed, `npm test` is green. The TASKS.md framing — "Read the output — the invariants tell you exactly what's wrong" — invites the participant to declare victory at green tests and move on. Yes, Step 3 then says "QA.tech may find issues your invariant tests didn't catch," but the priors created in Step 1 work against that.

**Fix:** In Step 1, explicitly say something like _"Fix what tests catch, but don't assume the test suite is complete — there is at least one bug only a real browser will see. Run `npm run dev` and click around before declaring victory."_ This also reinforces the central teaching point: code-level invariants ≠ behavioral correctness.

### Issue 0.2 — `EXPECTED_SYMBOLS` in the test is a foot-gun

**Severity: medium**

`tests/invariants/pieces.test.ts:5-18` defines `EXPECTED_SYMBOLS` locally. The failure looks like:

```
expected '♞' to be '♝'
```

A participant (or a less careful agent) may "fix" the test by editing `EXPECTED_SYMBOLS` to match the buggy `PIECE_SYMBOLS`, since both are right there in plain sight and the test "knows" what the right answer is supposed to be. The whole point of an invariant test is that it asserts an external truth — but the participant has the power to edit the truth.

**Fix:** Either (a) add a one-line comment in the test file: `// Do not edit — these are the canonical Unicode chess code points.` or (b) call out in TASKS.md: _"If a test fails, fix the source — never weaken the test."_

### Issue 0.3 — Time budget feels tight

**Severity: low**

20 minutes for: read TASKS, read INVARIANTS, run tests, prompt agent, push, open PR, wait ~5 min for QA.tech, read QA results, prompt agent again, push again. With one QA round-trip the floor is ~10–15 min before a participant has even read the QA result. Hitting one bad agent prompt eats the whole budget.

**Fix:** Either bump to 30 min, or pre-warm: have participants open a PR with no changes first so the QA pipeline is primed and they see what a review looks like before they start fixing.

---

## Task 1 — Add a New Opening

### Issue 1.1 — The example moves are notation only

**Severity: medium**

The suggested openings give pure algebraic notation:

> London System: 1.d4 d5 2.Bf4 Nf6 3.e3 e6

But the data model in `openings.ts` requires `from`/`to` row/col coordinates, plus a `notation` and `description` per move. A capable agent will figure this out, but a less-capable one may invent coordinates. There is also no mention of the `(row, col)` convention (row 0 = top = rank 8). That is documented in `INVARIANTS.md` (COORD-01/02) but TASKS.md doesn't reference it from this task.

**Fix:** Either (a) add one filled-in example move to TASKS.md with from/to spelled out so the agent has a template, or (b) point the agent to the existing openings as a reference: _"Use `OPENINGS.italian` as the shape reference."_

### Issue 1.2 — PR strategy unclear across tasks

**Severity: medium**

Does Task 1 go on top of the Task 0 PR, a new PR off the same branch, a new branch? "Push a PR" reads like a fresh PR each time, but participants are working on `pair-00`. Multiple PRs from the same branch will conflict.

**Fix:** Specify once, up front: _"One PR per task, branched off `pair-NN`. Merge between tasks (or stack)."_

---

## Task 2 — Light Mode

### Issue 2.1 — Pure-function theme on a hard-coded-color UI

**Severity: medium**

The instruction _"Create theme logic in `src/app/lib/theme.ts` as pure functions"_ is a clean teaching pattern, but the existing UI hard-codes hex values inline (`page.tsx:44`, `Board.tsx:71-72`, `Controls.tsx:20-50`). To actually swap themes the agent must rewrite every component to read from theme tokens. That is the bulk of the work, and it is invisible from the prompt as written — the prompt makes it sound like adding a `theme.ts` and a toggle button is the job.

**Fix:** Acknowledge the rewrite explicitly: _"You'll also need to thread theme tokens through `Board.tsx`, `page.tsx`, `Controls.tsx`, and friends — they currently hard-code dark hex values. The agent should replace those with theme-derived values."_ Or, alternatively, add a starter `theme.ts` with both palettes already defined so participants only need to wire it.

### Issue 2.2 — `tests/invariants/theme.test.ts` template missing

**Severity: low**

Participants are asked to write invariant tests in a new file. There is no example of test structure beyond the existing `board.test.ts` etc. A weaker agent may not notice the convention (`describe("THEME-01: ...")`, `it.each` patterns).

**Fix:** Either point them at an existing file as a template, or include a one-test stub.

### Issue 2.3 — 20 min is optimistic

Same problem as Task 0 — there's a real implementation, an invariant write-up, *and* a QA round-trip. 30 min seems more realistic.

---

## Task 3 — Shareable Links

### Issue 3.1 — URL shape unspecified

**Severity: low (intentional?)**

Hash? Query string? Path segment? `?opening=italian&move=3` or `/italian/3`? This is open-ended on purpose, probably, but the agent will pick something arbitrary and the participant may not realize the choice was theirs to make.

**Fix:** One sentence is enough: _"Pick a URL shape (e.g. `?opening=italian&move=3`). The shape doesn't matter; the round-trip invariant does."_

### Issue 3.2 — Next.js 16 / App Router gotchas

**Severity: medium**

The CLAUDE.md → AGENTS.md says _"This is NOT the Next.js you know. Read `node_modules/next/dist/docs/` before writing any code."_ Sharing-link work touches `useSearchParams`, server-vs-client component boundaries, and Next 16 specifics. The note is in AGENTS.md but TASKS.md doesn't echo it at this task — the participant may not realize their agent needs the reminder *here* especially.

**Fix:** Repeat the AGENTS.md instruction in TASKS.md once at the top, or add it specifically to Task 3.

---

## Cross-cutting issues in INVARIANTS.md / tests

### Issue X.1 — `OPEN-05` documented and tested differently

**Severity: high (this is straight-up wrong)**

- `INVARIANTS.md:44` defines OPEN-05 as: _"Applying all moves in an opening never results in two pieces on the same square (except captures)."_
- `tests/invariants/openings.test.ts:75` defines OPEN-05 as: _"Notation describes the destination square correctly."_

Two completely different invariants share an ID. The doc-version is unimplemented; the test-version is undocumented. A participant who reads both will be confused. Worse, the King's Indian planted bug (`Bg7` → g6) is the *test*-version, so the failure says "OPEN-05" but the participant who just read INVARIANTS.md is looking for a same-square overlap problem.

**Fix:** Pick one. Either rename the test to OPEN-06 and add the missing same-square test, or update INVARIANTS.md to match the test. Easiest: update INVARIANTS.md to match the existing test.

### Issue X.2 — `COORD-01..03` are documented but have no test file

**Severity: medium**

`INVARIANTS.md:54-58` lists COORD-01..03 with the note _"Test file: tests/invariants/coordinates.test.ts (optional, can add to board.test.ts)."_ The file doesn't exist. board.test.ts doesn't cover them either.

A participant looking at the table assumes every row has a test. The "optional" parenthetical is easy to miss.

**Fix:** Either create the test file, fold the assertions into `board.test.ts`, or strike the COORD section from INVARIANTS.md until Task 4 needs it.

### Issue X.3 — INVARIANTS.md OPEN-03 statement is slightly off

**Severity: low (nit)**

> "The `from` piece color matches the expected side (odd moves = white, even moves = black, zero-indexed)"

Zero-indexed and odd-means-white only works if you mean "index 0 is white" → index 0 is even, not odd. The test is correct (`shouldBeWhite = i % 2 === 0`), the prose isn't.

**Fix:** Swap "odd" and "even" in the doc.

---

## Summary — what to fix before workshop

Ranked by impact:

1. **Add a setup section** to TASKS.md (clone, branch model, agent, `npm install`, `npm run dev`, QA.tech expectation). Without this, Task 0 is blocked.
2. **Reconcile OPEN-05** between INVARIANTS.md and the test. They contradict.
3. **Frame Task 0 honestly** — there is a bug only QA.tech catches. Tell participants up front so green tests don't fool them.
4. **Specify PR/branch strategy** across tasks (one PR per task off `pair-NN`).
5. **Acknowledge the Task 2 rewrite** — adding `theme.ts` is the small part; threading tokens through 5+ files is the real work.
6. **Add a small example** of a fully-specified move (with row/col) to Task 1 so the agent has a template.
7. **Resolve COORD section** in INVARIANTS.md (test it or remove it).
8. **Tighten time budgets** or run a pre-flight PR so first QA cycle isn't on the clock.
9. **Fix the OPEN-03 prose** ("odd" / "even" swap).
10. **Add a "do not weaken tests" reminder** near the pieces.test.ts foot-gun.
