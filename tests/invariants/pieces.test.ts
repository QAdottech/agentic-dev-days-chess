// If a test fails, fix the source code, not the test.

import { describe, it, expect } from "vitest";
import { PIECE_SYMBOLS, getPieceSymbol, INITIAL_BOARD } from "@/app/lib/chess";

describe("LOGIC-03: Every piece letter maps to a unique Unicode symbol", () => {
  it("all 12 pieces are defined", () => {
    const pieces = ["K", "Q", "R", "B", "N", "P", "k", "q", "r", "b", "n", "p"];
    for (const piece of pieces) {
      expect(PIECE_SYMBOLS[piece], `missing symbol for '${piece}'`).toBeDefined();
    }
  });

  it("all symbols are unique", () => {
    const symbols = Object.values(PIECE_SYMBOLS);
    const unique = new Set(symbols);
    expect(unique.size).toBe(symbols.length);
  });
});

describe("LOGIC-04: getPieceSymbol returns non-empty for every piece on the initial board", () => {
  it("every occupied square has a renderable symbol", () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = INITIAL_BOARD[row][col];
        if (!piece) continue;
        const symbol = getPieceSymbol(piece);
        expect(symbol, `no symbol for '${piece}' at (${row},${col})`).not.toBe("");
      }
    }
  });
});
