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
| PIECE-02 | White and black versions of the same piece use matching symbol pairs (♔/♚, ♕/♛, ♖/♜, ♗/♝, ♘/♞, ♙/♟) | Critical |
| PIECE-03 | `getPieceSymbol` returns a non-empty string for every piece letter in the initial position | Major |

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

_Define your own invariants here. Think about:_

| ID | Invariant | Severity |
|----|-----------|----------|
| THEME-01 | ? | ? |
| THEME-02 | ? | ? |

_What must always be true about theme switching? About color contrast? About persistence?_

### Shareable Links (Task 3)

_Define your own invariants here. Think about:_

| ID | Invariant | Severity |
|----|-----------|----------|
| SHARE-01 | ? | ? |
| SHARE-02 | ? | ? |

_What must always be true about URL serialization? About loading a shared link? About invalid URLs?_

---

## Browser-Level Invariants (verified by QA.tech)

These can't be checked in code — they require a real browser:

| ID | Invariant | Severity |
|----|-----------|----------|
| UI-01 | Pieces are visually distinguishable on both light and dark squares | Critical |
| UI-02 | The highlighted square matches the move's actual origin and destination | Critical |
| UI-03 | Stepping through all moves of an opening and resetting returns to the starting position visually | Major |
| UI-04 | Switching openings resets the board correctly | Major |
| UI-05 | The board renders correctly on mobile viewports | Major |
