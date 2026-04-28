---
description: Walk the user through defining invariants for a new feature
---

<!-- Keep this file in sync with .claude/commands/new-invariant.md (identical content). -->

# Define a new invariant

Help the user add one or more invariants for a feature they're about to build. Invariants are **guardrails** — properties that fail the moment an agent drifts. Read the README's "Key idea" section and `INVARIANTS.md` for the framing.

**Invariants are organized by what they constrain, not by which feature added them.** New features extend existing categories — they never get their own section.

**You are NOT implementing the feature.** Stop after the invariants are written and the tests are stubbed. The user (or their agent in a follow-up step) implements next.

## The product-property bar

Before writing any invariant, sanity-check it against this question: **would this invariant still hold, and still be testable, if the agent rewrote the feature using a different library, pattern, or function names?**

- If yes → it's a property of the product. Good invariant.
- If no → it's a unit test in disguise. The agent gets locked into one specific implementation, and the "guardrail" breaks the moment the implementation legitimately changes.

Aim for invariants that describe **observable behavior**, **rendered output**, or **stored data shape** — not the existence or signature of a function the feature is introducing.

Naming a function is OK *only* when it's part of the project's stable lib API (e.g. `applyMove` from `src/app/lib/chess.ts`). Naming a function the feature is creating (`toggleTheme`, `flipBoard`, `parsePGN`) is not — restate the property at the product level.

## Process

1. **Ask what feature they're working on.** If unclear, point them at `TASKS.md`. Aim for 2–3 invariants per feature — fewer means the feature isn't pinned down; more usually means some are restating each other.

2. **Read `INVARIANTS.md`** to see existing IDs and the highest number in each category. New IDs continue from there.

3. **For each invariant, work with the user to answer all five questions:**

   - **What agent failure mode does this catch?** Name the specific drift — e.g. "agent forgets to flip coordinate labels when adding board flip", "agent introduces a shallow clone and pieces leak between boards". *Not* a desired state ("the board should be correct"). If the user can't name a failure mode, the invariant is too vague — push back.

   - **State it as a falsifiable property at the product level.** Pick something that's either true or false about the rendered output, the stored data, or observable behavior — not about a function this feature is creating. "Pieces should be visible" fails because it's vague. "After the user toggles to a different theme, every square still contains the same piece as before the toggle" passes — falsifiable, and survives any rewrite. If you can only state the property by naming a function the feature introduces, you've written a unit test, not an invariant.

   - **Which category?** This determines the ID prefix and the section it goes into:
     - `DATA-*` — shape or integrity of stored data
     - `LOGIC-*` — pure function contracts (input → output, immutability, idempotence, round-trips)
     - `UI-*` — DOM/rendering properties checkable in jsdom (element exists, attribute matches state)
     - `BROWSER-*` — properties that require a real browser (visual contrast, mobile layout, animation)

   - **Severity:** Critical (breaks the product) or Major (degrades it).

   - **ID:** the next available number in the chosen category.

4. **Show the proposed rows to the user. Get sign-off before writing.**

5. **Append the rows to the existing `## <Category>` section in `INVARIANTS.md`.** Never create a new section. Use the existing `| ID | Invariant | Severity |` format.

6. **Stub `tests/invariants/<feature>.test.ts`** with one `describe("<ID>: <description>", ...)` block per code-checkable invariant (`DATA`, `LOGIC`, `UI`). Each block contains an `it.todo(...)` placeholder describing the test approach. **Do not write real assertions yet** — that's the implementation step. `BROWSER-*` invariants are not stubbed in code; they're verified by Layer 3.

7. **Print a summary:** IDs added, file paths to review, and a suggested next prompt to drive implementation (e.g. "now implement LOGIC-05 — fill in the test body and the source code in `src/app/lib/`").

## Watch out for

- **Vague invariants** ("should look right", "should work"). Ask for a falsifiable form.
- **Implementation-coupled invariants.** If the invariant names a function this feature is introducing (`toggleTheme`, `flipBoard`, `parsePGN`), it's a unit test. Restate it in terms of rendered output, stored data, or observable behavior. The bar: would this invariant still mean something if the agent rewrote the feature with a different library or pattern?
- **Skipping the failure-mode question.** That's the whole point — it's what separates a guardrail from a wishlist.
- **Inventing a new section in `INVARIANTS.md`** ("LINK-*", "FLIP-*", "THEME-*"). New features extend existing categories. If nothing fits, the invariant is probably mis-phrased.
- **Implementing the feature in this command.** That's the next step, not this one.
