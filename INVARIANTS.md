# Product Invariants

Properties that must **always hold**, regardless of which feature is added or changed. Invariants are **guardrails** — they fail the moment an agent drifts. See the README's "Key idea" section for the framing.

## How this file is organized

**Invariants are categorized by what they constrain, not by which feature added them.** New features extend existing categories — they do not get their own sections. This is the principle that lets the file scale: a project with 200 invariants across 40 features still has the same handful of categories, and every new invariant has an obvious home.

| Prefix | Category | Verified at |
|--------|----------|-------------|
| `DATA-*` | Shape and integrity of stored data (board structure, openings well-formedness, piece encoding) | Layer 2 (vitest) |
| `LOGIC-*` | Pure function contracts (input → output behavior, immutability, idempotence, round-trips) | Layer 2 (vitest) |
| `UI-*` | DOM / rendering properties checkable in jsdom (element exists, attribute matches state) | Layer 2 (vitest + @testing-library) |
| `BROWSER-*` | Properties that require a real browser to verify (visual contrast, mobile layout, animation) | Layer 3 (QA.tech) |

**Good invariants describe the product, not the implementation.** A solid invariant survives any rewrite — if swapping React for Solid, or renaming functions, or restructuring state would invalidate it, it's a unit test in disguise. Aim for properties of rendered output, stored data, or observable behavior. Naming a specific function is OK *only* when that function is part of the project's stable public API (e.g. `applyMove` in `src/app/lib/chess.ts`); never when the feature itself is creating the function.

When adding an invariant, decide what it constrains and append to the matching section. **Don't create a new per-feature section.** If nothing fits, the right move is to question the invariant — most "feature-specific" invariants reduce to one of the above when phrased as a falsifiable property.

Tests use `describe("<ID>: <description>", ...)` to map back to this file.

---

## DATA — data shape and integrity

| ID | Invariant | Severity |
|----|-----------|----------|
| DATA-01 | The board is always 8×8 | Critical |
| DATA-02 | The initial position has exactly 16 white and 16 black pieces | Critical |
| DATA-03 | Each side always has exactly one king | Critical |
| DATA-04 | White pieces are uppercase, black pieces are lowercase | Critical |
| DATA-05 | Every move in every opening references valid board coordinates (row and col between 0–7) | Critical |
| DATA-06 | Every move's `from` square contains a piece before the move is applied | Critical |
| DATA-07 | The `from` piece color matches the expected side (even index = white, odd index = black, zero-indexed) | Critical |
| DATA-08 | No opening has zero moves | Major |
| DATA-09 | Move notation matches the destination coordinates (e.g. `Bg7` lands on g7, not g6) | Critical |

**Test files:** `tests/invariants/board.test.ts`, `tests/invariants/openings.test.ts`

---

## LOGIC — pure function contracts

| ID | Invariant | Severity |
|----|-----------|----------|
| LOGIC-01 | `applyMove` only changes the from-square, to-square, and any extra squares | Critical |
| LOGIC-02 | Applying zero moves returns the initial position unchanged | Major |
| LOGIC-03 | Every piece letter maps to a unique Unicode symbol | Critical |
| LOGIC-04 | `getPieceSymbol` returns a non-empty string for every piece letter in the initial position | Major |

**Test files:** `tests/invariants/board.test.ts`, `tests/invariants/pieces.test.ts`

---

## UI — DOM / rendering, checkable in jsdom

| ID | Invariant | Severity |
|----|-----------|----------|
| UI-01 | The highlighted origin and destination squares exactly match the current move coordinates | Critical |
| UI-02 | Advancing to a new move clears origin/destination highlights from previous moves | Critical |

**Test files:** `tests/invariants/board-ui.test.tsx`

---

## BROWSER — verified by Layer 3 (QA.tech)

These can't be checked in code — they require a real browser:

| ID | Invariant | Severity |
|----|-----------|----------|
| BROWSER-01 | Pieces are visually identifiable as their correct type (bishops look like bishops, knights look like knights) for both sides | Critical |
| BROWSER-02 | The highlighted squares match the move's actual origin and destination | Critical |
| BROWSER-03 | Every piece is clearly visible against its square | Critical |
| BROWSER-04 | Stepping through all moves and resetting returns to the starting position visually | Major |
| BROWSER-05 | Switching openings resets the board correctly | Major |
| BROWSER-06 | The board and controls are usable on mobile without horizontal scrolling | Major |

---

## Adding invariants for new features

When you start a feature (Tasks 2–4, stretch tasks, or anything else):

1. Identify what the invariant constrains — data shape, function contract, DOM, or browser-only behavior.
2. Append a row to the matching category above with the next available ID (`DATA-10`, `LOGIC-05`, etc.).
3. Stub the test in the relevant `tests/invariants/*.test.ts` file using `describe("<ID>: <description>", ...)`.
4. Only then implement the feature.

Run `/new-invariant` (in Claude Code or Cursor) for a guided walkthrough.
