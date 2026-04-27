# Product Invariants

These are properties that must **always hold**, regardless of what features are added or changed. They are the behavioral contract of the application.

When you add a new feature, define the invariants first. Then implement. The invariants are your specification — they tell the coding agent what "correct" means.

---

## Board State

| ID | Invariant | Severity |
|----|-----------|----------|
| BOARD-01 | The board is always 8×8 | Critical |
| BOARD-02 | The initial position has exactly 16 white and 16 black pieces | Critical |
| BOARD-03 | Each side always has exactly one king | Critical |
| BOARD-04 | White pieces are uppercase, black pieces are lowercase | Critical |
| BOARD-05 | `applyMove` only changes the from-square, to-square, and any extra squares | Critical |
| BOARD-06 | Applying zero moves returns the initial position unchanged | Major |

**Test file:** `tests/invariants/board.test.ts`

---

## Piece Rendering

| ID | Invariant | Severity |
|----|-----------|----------|
| PIECE-01 | Every piece letter maps to a unique Unicode symbol | Critical |
| PIECE-02 | `getPieceSymbol` returns a non-empty string for every piece letter in the initial position | Major |

**Test file:** `tests/invariants/pieces.test.ts`

---

## Openings Data

| ID | Invariant | Severity |
|----|-----------|----------|
| OPEN-01 | Every move references valid board coordinates (row and col between 0-7) | Critical |
| OPEN-02 | Every move's `from` square contains a piece before the move is applied | Critical |
| OPEN-03 | The `from` piece color matches the expected side (even index = white, odd index = black, zero-indexed) | Critical |
| OPEN-04 | No opening has zero moves | Major |
| OPEN-05 | Move notation matches the destination coordinates (e.g. "Bg7" lands on g7, not g6) | Critical |

**Test file:** `tests/invariants/openings.test.ts`

---

## Features to Add (workshop tasks)

### Light Mode / Theme Toggle (Task 2)

| ID | Invariant | Severity |
|----|-----------|----------|
| THEME-01 | Every theme defines a value for every token in the token set (no theme has a missing key) | Critical |
| THEME-02 | Adjacent board squares (light vs dark) are visibly distinguishable in every theme — at least 1.4:1 contrast ratio | Critical |
| THEME-03 | Both white and black piece glyphs have ≥ 3:1 contrast against both shades of square in every theme | Critical |
| THEME-04 | A theme is always active — no rendered state has an undefined / empty `data-theme` | Critical |
| THEME-05 | Switching theme does not change board state: `selectedOpening` and `moveIndex` are preserved | Major |
| THEME-06 | The user's theme choice persists across page reloads (round-trip through `localStorage`) | Major |

**Test file:** `tests/invariants/theme.test.ts`

THEME-05 and THEME-06 are visible behaviours — they are also covered by QA.tech click-throughs. THEME-01..04 can be enforced in code.

### Board Flip (Task 3)

_Define your own invariants here. Think about:_

| ID | Invariant | Severity |
|----|-----------|----------|
| FLIP-01 | ? | ? |
| FLIP-02 | ? | ? |

_What must always be true about the flipped view? Coordinate labels? Highlights? Piece positions?_

### Guess the Next Move (Task 4)

_Define your own invariants here. Think about:_

| ID | Invariant | Severity |
|----|-----------|----------|
| GUESS-01 | ? | ? |
| GUESS-02 | ? | ? |

_What must always be true about the guess interaction? About correct/incorrect feedback? About recovering from a wrong guess?_

---

## Stretch Invariants

_For "Go Further" tasks, define your own sections here._

---

## Browser-Level Invariants (verified by QA.tech)

These can't be checked in code — they require a real browser:

| ID | Invariant | Severity |
|----|-----------|----------|
| UI-01 | Pieces are visually identifiable as their correct type (bishops look like bishops, knights look like knights) for both sides | Critical |
| UI-02 | The highlighted squares match the move's actual origin and destination | Critical |
| UI-03 | Every piece is clearly visible against its square | Critical |
| UI-04 | Stepping through all moves and resetting returns to the starting position visually | Major |
| UI-05 | Switching openings resets the board correctly | Major |
| UI-06 | The board and controls are usable on mobile without horizontal scrolling | Major |
