# Workshop Tasks

## How this works

You have a chess openings app with a verification pipeline:

```
Layer 1: Build + Lint + Types       → catches syntax/type errors        (seconds)
Layer 2: Invariant Tests            → catches property violations       (seconds)
Layer 3: QA.tech PR Review          → catches visual/behavioral issues  (~5 min)
```

Chess logic lives in `src/app/lib/` as pure functions. Tests import and verify the real code.

Invariants are defined in `INVARIANTS.md`. Read it first.

---

## Your workflow

1. Run `npm test` locally — read what fails
2. Direct your coding agent to fix/implement
3. Push, open a PR against your pair branch
4. Pipeline runs — invariant tests give fast feedback
5. QA.tech reviews the PR — visual/behavioral feedback
6. Direct your agent to fix what QA.tech finds
7. Push again — repeat until green

---

## Task 0: Fix the App (20 min)

**Goal:** Use the verification pipeline to find and fix all bugs in the app.

### Step 1: Run the invariant tests

```bash
npm test
```

You'll see failures. Read the output — the invariants tell you exactly what's wrong. Direct your coding agent to fix the issues based on the test output.

### Step 2: Push and open a PR

Once tests pass locally, push and open a PR against your pair branch.

The pipeline will run the invariant tests in CI. But that's only the code layer.

### Step 3: Wait for QA.tech

QA.tech will automatically review your PR against the deployed preview. It tests the app in a real browser — things that code tests can't check.

When the review arrives, read it carefully. There may be issues that your invariant tests didn't catch. Direct your agent to fix those too, push again.

### Step 4: Iterate

Keep going until both layers are satisfied. This is the loop:

```
Agent fixes code → tests pass → push → QA.tech finds visual issues → agent fixes → push → QA.tech approves
```

**Done when:** Invariant tests pass AND QA.tech approves the PR.

---

## Task 1: Add a New Opening (15 min)

**Goal:** Add new content and see how the existing invariants automatically validate it.

### Choose an opening

Pick one (or look one up):

- **London System**: 1.d4 d5 2.Bf4 Nf6 3.e3 e6
- **Caro-Kann**: 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4
- **French Defense**: 1.e4 e6 2.d4 d5 3.Nc3
- Or any opening you know

### Direct your coding agent

> "Add the [Opening Name] to `src/app/lib/openings.ts`. The moves are: [list moves]. Make sure every move has the correct from/to coordinates, notation, and a short description."

### What to watch for

The existing invariant tests (OPEN-01 through OPEN-05) apply to ALL openings automatically. If your agent gets a coordinate wrong, the tests will catch it. This is the power of invariants — they protect new code without writing new tests.

Push a PR. QA.tech will verify the new opening works visually.

---

## Task 2: Add Light Mode / Theme Toggle (20 min)

**Goal:** Define your own invariants before implementing.

The app currently has a dark theme. Add a light theme and a toggle to switch between them.

### Step 1: Define invariants

Before writing code, think: what must always be true about theming? Add invariants to `INVARIANTS.md`. Consider:

- Are all pieces visible in both themes? (contrast against board squares)
- Does the toggle switch between exactly two states?
- Should the theme persist across page reloads?
- Do move highlights work on both themes?
- Is all text readable in both themes?

### Step 2: Direct your coding agent

> "Add a light/dark theme toggle to the chess app. The app is currently dark-themed. Create theme logic in `src/app/lib/theme.ts` as pure functions. Add a toggle button in the header area. Write invariant tests in `tests/invariants/theme.test.ts` that verify the invariants I defined."

### Step 3: Push and get feedback

Code-level invariants verify the logic. QA.tech verifies it looks right — contrast, readability, no invisible pieces on either theme.

---

## Task 3: Add Shareable Links (20 min)

**Goal:** Complex feature with state serialization. Define invariants first.

### Step 1: Define invariants

If someone shares a link to "Italian Game at move 3", what must be true?

- Does the URL restore the exact state?
- What happens with an invalid URL?
- What about a move index that's out of range?

### Step 2: Direct your coding agent

> "Add shareable links. Create URL serialization logic in `src/app/lib/sharing.ts` as pure functions. Write invariant tests that verify round-tripping: serialize → deserialize → same state."

---

## Task 4: Choose Your Own (stretch)

- **Move animation** — pieces slide between squares
- **Quiz mode** — guess the next move
- **Opening comparison** — two boards side by side
- **Keyboard navigation** — arrow keys for next/back

Define invariants first. Always.

---

## Reference

### Test Commands

```bash
npm test                  # run all tests
npm run test:invariants   # invariant tests only
npm run test:watch        # watch mode
```

### Project Structure

```
src/app/
  lib/
    chess.ts              # board state, move logic (pure functions)
    openings.ts           # opening definitions (data)
  components/
    Board.tsx             # 8×8 board with pieces and highlights
    Controls.tsx          # next/back/reset buttons
    MoveDisplay.tsx       # current move notation + description
    MoveList.tsx          # clickable move list
    OpeningSelector.tsx   # opening tabs
    CheatSheet.tsx        # notation reference

tests/invariants/
    board.test.ts         # BOARD-01..06
    pieces.test.ts        # PIECE-01..03
    openings.test.ts      # OPEN-01..05
```

### Key Functions in lib/chess.ts

```typescript
cloneBoard(board)                    // deep copy
applyMove(board, move)               // apply one move, return new board
applyMoves(board, moves, upToIndex)  // apply moves 0..upToIndex
getPieceAt(board, square)            // get piece letter at position
isWhitePiece(piece) / isBlackPiece(piece)
getPieceSymbol(piece)                // "K" → "♔"
squareToAlgebraic(square)            // {row:6, col:4} → "e2"
countPieces(board)                   // { white: 16, black: 16 }
findKings(board)                     // locate both kings
```
