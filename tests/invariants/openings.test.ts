// If a test fails, fix the source code, not the test.

import { describe, it, expect } from "vitest";
import {
  INITIAL_BOARD,
  applyMoves,
  getPieceAt,
  isWhitePiece,
  isBlackPiece,
  squareToAlgebraic,
} from "@/app/lib/chess";
import { OPENINGS } from "@/app/lib/openings";

const openingEntries = Object.entries(OPENINGS);

describe("OPEN-01: Every move references valid board coordinates (0-7)", () => {
  it.each(openingEntries)("%s: all coordinates in range", (name, opening) => {
    for (const move of opening.moves) {
      expect(move.from.row, `${name} ${move.notation} from.row`).toBeGreaterThanOrEqual(0);
      expect(move.from.row, `${name} ${move.notation} from.row`).toBeLessThanOrEqual(7);
      expect(move.from.col, `${name} ${move.notation} from.col`).toBeGreaterThanOrEqual(0);
      expect(move.from.col, `${name} ${move.notation} from.col`).toBeLessThanOrEqual(7);
      expect(move.to.row, `${name} ${move.notation} to.row`).toBeGreaterThanOrEqual(0);
      expect(move.to.row, `${name} ${move.notation} to.row`).toBeLessThanOrEqual(7);
      expect(move.to.col, `${name} ${move.notation} to.col`).toBeGreaterThanOrEqual(0);
      expect(move.to.col, `${name} ${move.notation} to.col`).toBeLessThanOrEqual(7);
    }
  });
});

describe("OPEN-02: Every move's from-square contains a piece", () => {
  it.each(openingEntries)("%s: from-square is never empty", (name, opening) => {
    let board = INITIAL_BOARD;
    for (let i = 0; i < opening.moves.length; i++) {
      const move = opening.moves[i];
      const piece = getPieceAt(board, move.from);
      expect(
        piece,
        `${name} move ${i} (${move.notation}): no piece at ${squareToAlgebraic(move.from)}`
      ).not.toBe("");
      board = applyMoves(INITIAL_BOARD, opening.moves, i);
    }
  });
});

describe("OPEN-03: Move color matches expected side (white=even index, black=odd index)", () => {
  it.each(openingEntries)("%s: correct side moves each turn", (name, opening) => {
    let board = INITIAL_BOARD;
    for (let i = 0; i < opening.moves.length; i++) {
      const move = opening.moves[i];
      const piece = getPieceAt(board, move.from);
      const shouldBeWhite = i % 2 === 0;

      if (shouldBeWhite) {
        expect(
          isWhitePiece(piece),
          `${name} move ${i} (${move.notation}): expected white piece at ${squareToAlgebraic(move.from)}, got '${piece}'`
        ).toBe(true);
      } else {
        expect(
          isBlackPiece(piece),
          `${name} move ${i} (${move.notation}): expected black piece at ${squareToAlgebraic(move.from)}, got '${piece}'`
        ).toBe(true);
      }

      board = applyMoves(INITIAL_BOARD, opening.moves, i);
    }
  });
});

describe("OPEN-04: No opening has zero moves", () => {
  it.each(openingEntries)("%s has at least one move", (name, opening) => {
    expect(opening.moves.length).toBeGreaterThan(0);
  });
});

describe("OPEN-05: Notation describes the destination square correctly", () => {
  it.each(openingEntries)("%s: notation matches destination", (name, opening) => {
    for (const move of opening.moves) {
      // Extract the destination square from notation (last 2 chars, ignoring check/mate symbols)
      const cleaned = move.notation.replace(/[+#!?]/g, "").replace(/^.*\.+\s*/, "");
      // For castling (O-O, O-O-O), skip this check
      if (cleaned.startsWith("O")) continue;
      const destSquare = cleaned.slice(-2);
      const actualSquare = squareToAlgebraic(move.to);
      expect(
        actualSquare,
        `${name} ${move.notation}: notation says ${destSquare} but coordinates give ${actualSquare}`
      ).toBe(destSquare);
    }
  });
});
