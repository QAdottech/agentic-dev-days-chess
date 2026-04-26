# Workshop Tasks

## How this works

You have a chess openings app with a 4-layer verification pipeline:

```
Layer 1: Build + Lint + Types       → catches syntax/type errors        (seconds)
Layer 2: Unit Tests                 → catches logic errors              (seconds)
Layer 3: Invariant Tests            → catches property violations       (seconds)
Layer 4: QA.tech PR Review          → catches visual/behavioral issues  (~5 min)
```

Chess logic lives in `src/app/lib/` as pure functions. Tests import and verify the real code.

Invariants are defined in `INVARIANTS.md`. Read it first.

---

## Your workflow

1. Read the task and the invariants
2. Direct your coding agent to implement AND write tests
3. Push, open a PR against your pair branch
4. Watch the pipeline — did it pass?
5. If not, direct the agent to read the failure and fix it
6. Comment `@qa.tech` on the PR for browser-level verification

Run tests locally: `npm test`

---

## Task 0: Find the Bugs (15 min)

**Goal:** Use the existing invariant tests to find and fix bugs in the app.

The app has bugs. The invariant tests know about them.

### Step 1: Run the tests

```bash
npm test
```

You'll see failures. Read the output carefully — the invariants tell you exactly what's wrong and where.

### Step 2: Direct your coding agent to fix them

Give your agent the test output and ask it to fix the issues. For example:

> "The invariant test PIECE-02 is failing — black bishop and knight symbols are swapped in chess.ts. Fix the PIECE_SYMBOLS mapping so each piece uses the correct Unicode symbol."

### Step 3: Are there bugs the tests DON'T catch?

Look at the app in your browser (`npm run dev`). Step through some openings. Does everything look right? The tests are passing now, but is there a visual issue the code tests can't detect?

If you find something, note it — we'll use QA.tech to verify it later.

### Step 4: Push and open a PR

Create a branch from your pair branch, fix the bugs, push, and open a PR.

**Done when:** All invariant tests pass, PR is open, pipeline is green.

---

## Task 1: Add a New Opening (15 min)

**Goal:** Add a new chess opening and write invariant tests that verify it's correct.

### Choose an opening

Pick one (or look one up):

- **London System**: 1.d4 d5 2.Bf4 Nf6 3.e3 e6
- **Caro-Kann**: 1.e4 c6 2.d4 d5 3.Nc3 dxe4 4.Nxe4
- **French Defense**: 1.e4 e6 2.d4 d5 3.Nc3
- Or any opening you know

### Direct your coding agent

> "Add the [Opening Name] to `src/app/lib/openings.ts`. The moves are: [list moves]. Make sure every move has the correct from/to coordinates, notation, and a short description.
>
> The existing invariant tests in `tests/invariants/openings.test.ts` will automatically run against the new opening. Run `npm test` to verify all invariants pass."

### What to watch for

The existing invariant tests (OPEN-01 through OPEN-05) apply to ALL openings automatically. If your agent gets a coordinate wrong, OPEN-02 or OPEN-05 will catch it. This is the power of invariants — they protect new code without writing new tests.

### Push and open a PR

The QA.tech review will verify the new opening works visually — pieces move correctly, board looks right.

---

## Task 2: Add Dark Mode / Theme Toggle (20 min)

**Goal:** Define your own invariants, then implement.

### Step 1: Define invariants

Before writing code, think about what must always be true about theming. Add invariants to `INVARIANTS.md` under the "Dark Mode" section. Consider:

- What happens to piece visibility when you switch themes?
- Should the theme persist across page reloads?
- What about the highlighted squares — do they work on both themes?
- Does the board maintain contrast between light and dark squares?

### Step 2: Direct your coding agent

> "Add a dark/light theme toggle to the chess app. Create theme logic in `src/app/lib/theme.ts` as pure functions. The toggle should be visible in the header area.
>
> Light theme: current colors. Dark theme: [you decide, or let the agent propose].
>
> Write invariant tests in `tests/invariants/theme.test.ts` that verify the invariants I defined in INVARIANTS.md."

### Step 3: Push and get feedback

The code-level invariants verify the logic. QA.tech verifies it looks right in the browser — contrast, readability, no invisible pieces.

Comment `@qa.tech test the dark mode toggle. Switch between themes and verify pieces are visible on both.`

---

## Task 3: Add Shareable Links (20 min)

**Goal:** More complex feature with state serialization. Define invariants first.

### Step 1: Define invariants

Think: if someone shares a link to "Italian Game at move 3", what must be true?

- Does the URL contain enough information to restore the exact state?
- What happens with an invalid or tampered URL?
- Does opening a shared link show the correct board position?
- What happens if someone shares a link to a move that doesn't exist?

### Step 2: Direct your coding agent

> "Add shareable links to the chess app. When a user is viewing an opening at a specific move, there should be a 'Share' button that copies a URL to the clipboard. Opening that URL should restore the exact opening and move.
>
> Create the URL parsing/serialization logic in `src/app/lib/sharing.ts` as pure functions. Write invariant tests that verify round-tripping: serialize → deserialize → same state."

### Step 3: Push and get feedback

This is where invariants get interesting — there are many edge cases:
- What if the opening key in the URL doesn't exist?
- What if the move index is out of range?
- What if the URL is manually modified?

---

## Task 4: Choose Your Own (stretch)

Ideas:

- **Move animation** — animate pieces sliding between squares. Invariant: animation start/end positions match the move coordinates.
- **Quiz mode** — hide the next move, ask the user to guess. Invariant: the correct answer always matches the opening's move data.
- **Opening comparison** — show two openings side by side. Invariant: both boards are independent (moves on one don't affect the other).
- **Keyboard navigation** — arrow keys for next/back. Invariant: keyboard and button controls always produce the same board state.

---

## Reference: Test Commands

```bash
npm test                  # run all tests
npm run test:invariants   # invariant tests only
npm run test:watch        # watch mode
```

## Reference: Project Structure

```
src/app/
  lib/
    chess.ts              # board state, move logic, piece lookup (pure functions)
    openings.ts           # opening definitions (data)
    theme.ts              # you create in Task 2
    sharing.ts            # you create in Task 3
  components/
    Board.tsx             # 8×8 board with pieces and highlights
    Controls.tsx          # next/back/reset buttons
    MoveDisplay.tsx       # current move notation + description
    MoveList.tsx          # clickable move list
    OpeningSelector.tsx   # opening tabs
    CheatSheet.tsx        # notation reference

tests/invariants/
    board.test.ts         # BOARD-01 through BOARD-06
    pieces.test.ts        # PIECE-01 through PIECE-03
    openings.test.ts      # OPEN-01 through OPEN-05
    theme.test.ts         # you create in Task 2
    sharing.test.ts       # you create in Task 3
```

## Reference: Key Functions in lib/chess.ts

```typescript
cloneBoard(board)                    // deep copy
applyMove(board, move)               // apply one move, return new board
applyMoves(board, moves, upToIndex)  // apply moves 0..upToIndex
getPieceAt(board, square)            // get piece letter at position
isWhitePiece(piece)                  // uppercase = white
isBlackPiece(piece)                  // lowercase = black
getPieceSymbol(piece)                // "K" → "♔"
squareToAlgebraic(square)            // {row:6, col:4} → "e2"
countPieces(board)                   // { white: 16, black: 16 }
findKings(board)                     // locate both kings
```
