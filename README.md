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
git checkout pair-XX    # replace XX with your pair number
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

### 6. Run the tests

```bash
npm test
```

You'll see failures. That's expected — the app has bugs. Read `TASKS.md` for what to do next.

### 7. Your coding agent

Use whatever coding agent you prefer — Claude Code, Cursor, Copilot, or anything else. The tasks are agent-agnostic.

### 8. How PRs work

Your pair has a **live workspace branch** (`pair-XX`) with its own PR against main. This PR gives you a live deployment of your current state.

For each task, create a feature branch off your pair branch and open a PR **against your pair branch** (not main):

```bash
git checkout pair-XX
git checkout -b pXX-task-0-fix-bugs
# ... make changes ...
git push -u origin pXX-task-0-fix-bugs
# open PR against pair-XX on GitHub
```

When you push a PR:
- **Vercel** deploys a preview of your changes
- **GitHub Actions** runs the invariant tests (Layer 1 + 2)
- **QA.tech** reviews your PR against the preview deployment (Layer 3) — this happens automatically and takes a few minutes

Merge each task's PR into your pair branch before starting the next one. Each task builds on the previous. Your live workspace PR against main updates automatically as you merge.

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

## Key idea

**Invariants** are properties that must always hold, regardless of what features you add:
- "Every piece symbol matches its type" (a knight should look like a knight)
- "Every move in every opening targets a valid square"
- "The board is always 8×8"

Define invariants first. Then implement. The invariants tell your coding agent what "correct" means.

Read `INVARIANTS.md` for the full list, then open `TASKS.md` to get started.
