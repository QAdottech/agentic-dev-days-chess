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

**Important:** If a test fails, fix the source code — never weaken the test.

---

## Your workflow

1. Create a feature branch off your pair branch: `git checkout -b pXX-task-N-description`
2. Run `npm test` locally — read what fails
3. Direct your coding agent to fix/implement
4. Push, open a PR against your pair branch
5. Pipeline runs — invariant tests give fast feedback
6. QA.tech reviews the PR — visual/behavioral feedback arrives in a few minutes
7. Direct your agent to fix what QA.tech finds, push again
8. Merge when both layers are green, then branch off for the next task

Each task builds on the previous — merge before starting the next one.

---

## Task 0: Fix the App

**Goal:** Use the verification pipeline to find and fix everything that's wrong.

Start by opening a PR immediately — before fixing anything. This triggers all three layers so you can see the full picture of what's broken:

```bash
git checkout -b pXX-task-0-fix-bugs
git commit --allow-empty -m "trigger verification pipeline"
git push -u origin pXX-task-0-fix-bugs
# open a PR against pair-XX on GitHub
```

While waiting for QA.tech, run the invariant tests locally:

```bash
npm test
```

Fix what the tests catch. Push. Then read the QA.tech review when it arrives — there are issues that only a browser can reveal. Fix those too. Push again.

Keep iterating until both layers are satisfied.

**Done when:** All invariant tests pass AND QA.tech approves the PR.

---

## Task 1: Add a New Opening

**Goal:** Add new content and see how existing invariants protect you.

Pick a chess opening you know, or look one up. Add it to `src/app/lib/openings.ts`. Use the existing openings as a reference for the data shape.

Run `npm test` after adding it and watch the test count — the existing invariants automatically apply to your new opening without writing any new tests.

Push a PR. QA.tech will verify it renders correctly.

---

## Task 2: Light Mode Toggle

**Goal:** Define your own invariants before implementing.

The app is dark-themed. Add a light theme and a toggle. Before writing any code, think about what must always be true about theming and add your invariants to `INVARIANTS.md`.

Then direct your agent to implement it — both the logic and the invariant tests.

The tricky part: the agent can't see if the pieces are actually visible against the new colors. QA.tech can.

---

## Task 3: Board Flip

**Goal:** View the board from Black's perspective.

Add a button that flips the board. Sounds simple. Think about what needs to change: piece positions, coordinate labels, move highlights, interactions.

Define invariants first — what must be true about the flipped view?

This is a task where the agent will be confident but likely wrong. It can't verify the visual output. QA.tech can.

---

## Task 4: Guess the Next Move

**Goal:** Make the app interactive.

Add a mode where the next move is hidden and the user clicks squares to guess. They select a piece, then select a destination. The app tells them if they got it right.

This requires click handlers on the board, two-step interaction (select piece → select target), comparison against the opening data, and visual feedback.

Define invariants for the interaction logic. QA.tech can test the full click-through flow.

---

## Go Further

If you finish early, pick one or combine several:

- **Move animation** — pieces slide between squares instead of teleporting. What invariants ensure the animation start/end positions match the actual move?
- **PGN import** — paste algebraic notation ("1. e4 e5 2. Nf3 Nc6") and have it parsed into the app. How do you verify the parsed result matches the input? What about invalid PGN?
- **Opening comparison** — show two openings side by side on two boards. What invariants ensure the boards are independent?
- **Sub-variations** — add branching where an opening can split into different lines (e.g. Sicilian Najdorf vs Dragon). How does the data model change? Do existing invariants still hold?
- **Shareable links** — encode the current opening and move into the URL so it can be shared. What must be true about the round-trip: serialize → share → deserialize → same state?
- **Keyboard navigation** — arrow keys for next/back, number keys to jump to a move. Invariant: keyboard and button controls always produce the same board state.

For all of these: **define invariants first, then implement.**

---

## Reference

### Test Commands

```bash
npm test                  # run all tests
npm run test:invariants   # invariant tests only
npm run test:watch        # watch mode
npm run dev               # run the app locally
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
