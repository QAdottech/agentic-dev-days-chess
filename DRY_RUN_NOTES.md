# Workshop Dry-Run Notes

Walking through `README.md` → `INVARIANTS.md` → `TASKS.md` as a participant would, recording every spot a real pair is likely to stumble. Severity: **Blocker** = pair gets stuck, **Friction** = wastes a few minutes, **Polish** = cosmetic / nice-to-have.

---

## Cross-cutting issues

### 1. `INVARIANTS.md` "Features to Add" section is out of sync with `TASKS.md` — Blocker

`INVARIANTS.md` has placeholder sections for:
- Light Mode / Theme Toggle (Task 2) ✓ matches
- **Shareable Links (Task 3)** — but TASKS.md Task 3 is **Board Flip**. Shareable Links is in the "Go Further" stretch list.

Participants who try to follow the doc will be looking for a FLIP-01 placeholder and won't find one. Same problem for Task 4 (Guess the Move): no template at all.

**Fix:** Replace the `Shareable Links` placeholder with a `Board Flip (Task 3)` placeholder, add a `Guess the Move (Task 4)` placeholder, and move Shareable Links into a "Stretch invariants" subsection.

### 2. Host-only prerequisites are not called out — Blocker if missed

`README.md` step 7 promises:
- Vercel deploys a preview
- GitHub Actions runs invariant tests
- QA.tech reviews against the preview

But the repo has **no `vercel.json` / `vercel.ts`, no QA.tech config**, and the Actions workflow assumes a PR-to-anything trigger. All three layers depend on workshop-host wiring that lives outside the repo.

This needs either (a) a "Host Checklist" section calling out what must be set up before the workshop, or (b) explicit confirmation in the README that these are pre-wired and the participant doesn't need to touch them.

Specific things to verify before workshop day:
- Each `pair-XX` branch exists on the remote.
- Vercel project is linked to the repo and deploys previews for PRs targeting `pair-XX` (not just `main`).
- QA.tech reviews PRs that target `pair-XX`, not just `main`.
- GitHub Actions `on: pull_request` already triggers for any base branch — ✓ this one is fine.

### 3. Branch-name inconsistency between docs — Polish

- `README.md` step 7: ``p{XX}-task-0-fix-bugs`` (literal curly braces)
- `TASKS.md` step 1: `pXX-task-N-description` (no braces)

Minor, but a participant copy-pasting the README example will end up with a literal `{XX}` in the branch name.

### 4. Node version mismatch with platform defaults — Friction

- `README.md`: "Requires Node 20+"
- `.github/workflows/verify.yml`: pinned to Node 20
- Vercel platform default (per current knowledge): Node 24 LTS

Local + CI run Node 20, Vercel preview runs Node 24. Unlikely to bite this app, but worth pinning Vercel to Node 20 (or upgrading everything to 24) so the three layers really do run in identical environments.

### 5. The "How this works" preamble in TASKS.md says "If a test fails, fix the source code — never weaken the test." — but only `pieces.test.ts` reinforces it inline — Polish

`pieces.test.ts` has a clear comment: "If a test fails, fix the source code, not this table." `board.test.ts` and `openings.test.ts` don't. A participant skimming a single failing test file might not see the rule. Consider adding the same one-line reminder at the top of each invariant test file.

---

## Setup (README)

### 6. "Run the app locally" step has no expected-output hint beyond "notice anything off?" — Friction

The visible bugs in the dark UI are:
- Black knights and bishops are swapped (`b` shows ♞, `n` shows ♝). A non-chess-player will not notice.
- The "current move from-square" highlight is shifted **one column to the right** of the actual from-square (`Board.tsx:19` — `from.col + 1`). Subtle.

Neither of these is mentioned. That's intentional discovery, but mention that **non-chess-experts should pair with a chess-aware partner or rely on the test output for Task 0** so they don't get demoralized staring at the board.

### 7. "Each pair has a branch" — what if a pair walks in late? — Friction

If pairs are pre-assigned but the room dynamically changes, the README has no fallback ("if your pair number isn't in `git branch -a`, ask the host" or "create one off `main`").

---

## INVARIANTS.md

### 8. UI-01..05 ("Browser-Level Invariants verified by QA.tech") have no link to the QA.tech check that actually verifies them — Polish

Participants can't see how QA.tech is told to check these. If QA.tech runs from a generic prompt, that's fine — but the doc implies a 1:1 mapping. Either remove the implication or document where the QA.tech instruction lives.

### 9. OPEN-02 / OPEN-03 catch alternation, but **nothing** validates that the piece letter in `notation` matches the piece on the from-square — Friction (and a teaching opportunity)

A participant in Task 1 can write `notation: "Nf6"` while the from-square holds a pawn, and **all tests still pass**. OPEN-05 only validates the destination square name. This is a real invariant gap.

Two options:
- Leave it as-is and treat it as a planted gap participants can discover ("what invariant is missing?"). Mention this explicitly in the workshop facilitator notes.
- Add an OPEN-06 that checks the piece letter in the notation matches `getPieceAt(board, move.from)`.

I'd lean toward **leaving the gap and using it as a discussion prompt** — it makes the point that invariants are never complete.

---

## Task 0: Fix the App

### 10. The 3 invariant-test failures are crystal clear, but the visual highlight bug isn't mentioned anywhere — Working as designed

Running `npm test` produces:
- `PIECE-02` Bishop + Knight: black symbol pair swapped
- `OPEN-05` `kingsinidan / 3... Bg7`: notation says g7, coordinates point to g6

A participant who fixes only those two issues will go green on Layer 2 and rely on QA.tech to flag the highlight bug in `Board.tsx:19`. **This is the intended pedagogy.** Worth flagging to facilitators so they know which bugs each layer is supposed to catch:

| Bug | Layer that catches it |
|---|---|
| Knight/Bishop unicode swap | Layer 2 (`pieces.test.ts`) |
| `kingsinidan` `Bg7` coords mismatch | Layer 2 (`openings.test.ts`) |
| `Board.tsx:19` `from.col + 1` highlight | Layer 3 (QA.tech only) |

### 11. The `kingsinidan` fix is genuinely ambiguous — Friction

Two ways to make `OPEN-05` pass:
1. Change the notation to `Bg6` (wrong — destroys the King's Indian opening).
2. Change `to: { row: 2, col: 6 }` to `to: { row: 1, col: 6 }` (correct — that's where the fianchettoed bishop actually lands).

A non-chess-player or an over-eager agent may pick (1). Participants may need a hint: "the move name is the spec; the coordinates were typed wrong."

Also worth noting: the OPENINGS key is `kingsinidan` — looks like a typo for `kingsindian`. Probably intentional (it's only a state key, not user-visible). If a participant "fixes" the key, they should be told it's harmless either way.

---

## Task 1: Add a New Opening

### 12. Coordinate orientation is confusing — Friction

Row 0 is Black's back rank; row 7 is White's back rank. `RANKS = ["8","7","6","5","4","3","2","1"]`. A participant who thinks of "rank 1 = row 1" will write coordinates upside-down. The "How Notation Works" tutorial inside the app demonstrates this, but only after the participant runs the app. Consider adding a one-line note in TASKS.md Task 1: "Heads-up: row 0 is Black's back rank, row 7 is White's. See the `notation` opening as a worked example."

### 13. No checklist for what makes a "valid" added opening — Friction

A participant adds an opening, tests pass, but the opening might be chess-illegal (e.g. moving through pieces, two whites in a row). The test count increases — they "win" the green light. That's fine if the workshop point is "invariants are partial," but a one-liner in Task 1 like "the tests don't check chess legality — visual review still matters" would land the lesson.

---

## Task 2: Light Mode Toggle

### 14. Persistence of the toggle is unspecified — Friction

Should the choice persist across page reloads? Across openings? Per-tab? The agent will pick one — probably localStorage — and the participant may want a different one. This is exactly the kind of thing that belongs in a THEME-XX invariant, but the task should hint at it as a question to answer.

### 15. Where the toggle lives in the UI is unspecified — Polish

Fine to leave to participant choice, but expect questions.

---

## Task 3: Board Flip

### 16. INVARIANTS.md has no FLIP-XX template — Blocker (see issue #1)

### 17. "Think about what needs to change: ... interactions" — references something that doesn't exist yet — Polish

Interactions are introduced in Task 4. Listing "interactions" here either implies tasks must be done together, or that participants should think ahead. Drop it from Task 3 or move it to a "if you've also done Task 4" callout.

### 18. Open question: does flip swap the displayed move list orientation? Coordinate labels? — Friction

Worth listing as bullet hints under the task or as suggested invariants:
- Files run a→h on White's view, h→a on Black's view.
- Ranks run 1→8 on White's view, 8→1 on Black's view.
- The from/to highlights still point at the same squares regardless of orientation.

---

## Task 4: Guess the Move

### 19. INVARIANTS.md has no GUESS-XX template — Blocker (see issue #1)

### 20. Spec is underspecified in several ways — Friction

Underspecified items the agent will silently invent:
- Is "guess mode" a toggle, or is the next move always hidden?
- Should the move list also hide upcoming notation, or just the board?
- What happens when the user picks the wrong **piece** (not a destination)? Reject the click? Allow re-select?
- What's the visual feedback: green/red square flash? toast? both?
- After a correct guess, does the board auto-advance, or does the user click Next?

These are great invariant prompts ("the user can always recover from a misclick", "the move list never reveals the answer in guess mode") — consider adding them as guiding questions in the task.

### 21. Click-handler infrastructure doesn't exist on Board today — Friction

The participant has to add `onClick` handlers to squares in `Board.tsx`. This is a moderately invasive change — the existing component is purely presentational. Worth a one-line callout that this task is structurally larger than Tasks 2–3.

---

## Stretch goals ("Go Further")

### 22. INVARIANTS.md template only covers Shareable Links from this list — Polish

Of the six stretch ideas, only Shareable Links has a placeholder, and it's sitting in the wrong slot (where Board Flip should be). Either give all stretch goals a placeholder, or have a single "Stretch invariants — define your own headers" subsection.

### 23. Time math: 5 tasks × ~5 min QA.tech per push ≈ 25+ min waiting on Layer 3 — Friction

If pushes need rework (which they should, by design), the time per task is closer to 10–15 min real-time. A 4-task arc is realistic in a half-day workshop; a 5-task arc plus stretch is tight. Worth setting expectations.

---

## Suggested doc fixes (concrete edits)

1. `INVARIANTS.md`: rename `Shareable Links (Task 3)` → `Board Flip (Task 3)`, add `Guess the Move (Task 4)` placeholder, move `Shareable Links` to a `Stretch invariants` subsection.
2. `README.md`: add a "Workshop host checklist" section listing pair branches, Vercel project link, and QA.tech app installation as host pre-reqs.
3. `README.md`: fix `p{XX}-task-0-fix-bugs` → `pXX-task-0-fix-bugs` to match `TASKS.md`.
4. `TASKS.md` Task 1: add a one-line hint about row 0 = Black, row 7 = White.
5. `TASKS.md` Task 3: drop "interactions" from the bullet list (or guard it).
6. `TASKS.md` Task 4: list 4–5 underspecified questions explicitly as invariant prompts.
7. Top of `board.test.ts` and `openings.test.ts`: add the same "if a test fails, fix the source code, not the test" reminder that's in `pieces.test.ts`.
8. Optional: pin Vercel build to Node 20 to match local + CI.

## Suggested facilitator notes (not for participants)

- Bug-to-layer mapping table (issue #10) — so facilitators can confirm the right layer caught the right bug.
- The OPEN-06 "piece letter matches piece on from-square" gap (issue #9) — useful as a discussion prompt at the end.
- The `kingsinidan` ambiguity (issue #11) — be ready to nudge participants who pick the "wrong" fix.
