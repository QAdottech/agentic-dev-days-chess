# Closing the Loop — Workshop

An interactive chess openings app with planted bugs and a verification pipeline. Your job: use a coding agent to fix and extend the app, guided by invariant tests and AI-powered browser testing.

## What you'll experience

Coding agents are good at generating code. But how do you know it actually works? In this workshop you'll build a verification environment that gives your coding agent layered feedback:

```
Layer 1: Build + Lint + Types       → catches syntax/type errors        (seconds)
Layer 2: Invariant Tests            → catches property violations       (seconds)
Layer 3: QA.tech PR Review          → catches visual/behavioral issues  (~5 min)
```

The app has bugs. Some are caught by code-level invariant tests. Others are only visible in a real browser. You'll use all three layers to find and fix them, then add new features with the same workflow.

## Setup

### 1. Clone the repo

```bash
git clone https://github.com/QAdottech/agentic-dev-days-chess.git
cd agentic-dev-days-chess
```

### 2. Check out your pair branch

Each pair has a branch. Use the one assigned to you:

```bash
git checkout pair-01    # use your assigned pair number (two digits: 01, 02, ... 10)
```

This is your "main" — you'll branch off it for each task and open PRs back to it.

### 3. Install dependencies

```bash
npm install
```

Requires Node 20+.

### 4. Run the app locally

```bash
npm run dev
```

Open http://localhost:3000 — you should see a chess openings guide. Click around, step through some openings. Notice anything off?

### 5. Install GitHub CLI

The GitHub CLI lets you (and your coding agent) read PR feedback directly from the terminal — pipeline status, QA.tech reviews, etc.

```bash
brew install gh    # or see https://cli.github.com
gh auth login
```

### 6. Check for issues locally

```bash
npm run lint    # Layer 1: lint errors
npm test        # Layer 2: invariant test failures
```

You'll see failures from both. That's expected — the app has bugs. Read `TASKS.md` for what to do next.

### 7. Your coding agent

Use whatever coding agent you prefer — Claude Code, Cursor, Copilot, or anything else. The tasks are agent-agnostic.

### 8. How PRs work

Your pair has a **live workspace branch** (`pair-XX`) with its own PR against main. This PR gives you a live deployment of your current state.

For each task, create a feature branch off your pair branch and open a PR **against your pair branch** (not main):

```bash
git checkout pair-01
git checkout -b p01-task-0-fix-bugs
# ... make changes ...
git push -u origin p01-task-0-fix-bugs
# open PR against pair-01 on GitHub
```

When you push a PR:
- **Vercel** deploys a preview of your changes
- **GitHub Actions** runs Layer 1 + 2 (seconds)
- **QA.tech** reviews your PR against the preview (Layer 3 — takes 5-15 min depending on load)

QA.tech re-runs on every push, so you'll see multiple reviews as you iterate. That's expected.

You can start the next task while waiting for QA.tech — just branch off your current task branch. Merge in order when reviews come back.

Your live workspace PR against main updates automatically as you merge.

## What's in the repo

```
src/app/
  lib/
    chess.ts              # board state, move logic (pure functions)
    openings.ts           # opening definitions (data)
  components/             # Board, Controls, MoveDisplay, etc.
  page.tsx                # main page

tests/invariants/         # invariant tests that verify product properties
INVARIANTS.md             # the specification — what must always be true
TASKS.md                  # workshop tasks — start here after setup
```

## Key idea: invariants as guardrails

Coding agents are fast, but they drift — refactoring working code and breaking callsites, mutating state that was supposed to be immutable, changing data models while adding features. Without bumpers, you spend your review time hunting for damage instead of evaluating new work.

**Invariants are machine-checkable properties that fail the moment the agent drifts.** Three from this repo:

- `LOGIC-01` — `applyMove` only changes the from-square, to-square, and any extras. Catches the agent rewriting move logic and leaking changes elsewhere on the board.
- `DATA-06` — every opening's `from` square has a piece on it when the move is applied. Catches data-entry mistakes when adding openings.
- `DATA-09` — move notation matches destination coordinates: `"Bg7"` must land on g7. Catches transcription bugs that look right in the diff but render wrong on the board.

Invariants are organized by **what they constrain** (data shape, function contracts, DOM, browser-only) — not by which feature added them. That's what lets the file scale: every new invariant has an obvious home, and removing a feature never orphans its rules. See `INVARIANTS.md` for the full taxonomy.

The contract:

1. Define the invariant **before** the feature.
2. Direct the agent until the invariants pass.
3. **If a test fails, the agent fixes the source, not the test.** Otherwise the guardrail is just decoration.

Invariants accumulate. Every feature adds a few; none ever leave. The longer the project lives, the more bumpered the agent is against its own future drift.

Read `INVARIANTS.md` for the full list, then open `TASKS.md` to get started.
