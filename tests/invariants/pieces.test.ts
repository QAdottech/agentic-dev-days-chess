import { describe, it, expect } from "vitest";
import { PIECE_SYMBOLS, getPieceSymbol, INITIAL_BOARD } from "@/app/lib/chess";

// The correct Unicode chess symbols
const EXPECTED_SYMBOLS: Record<string, string> = {
  K: "\u2654", // ♔ White King
  Q: "\u2655", // ♕ White Queen
  R: "\u2656", // ♖ White Rook
  B: "\u2657", // ♗ White Bishop
  N: "\u2658", // ♘ White Knight
  P: "\u2659", // ♙ White Pawn
  k: "\u265A", // ♚ Black King
  q: "\u265B", // ♛ Black Queen
  r: "\u265C", // ♜ Black Rook
  b: "\u265D", // ♝ Black Bishop
  n: "\u265E", // ♞ Black Knight
  p: "\u265F", // ♟ Black Pawn
};

describe("PIECE-01: Every piece letter maps to a unique Unicode symbol", () => {
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

describe("PIECE-02: White/black pairs use matching Unicode symbol pairs", () => {
  const pairs = [
    { white: "K", black: "k", name: "King" },
    { white: "Q", black: "q", name: "Queen" },
    { white: "R", black: "r", name: "Rook" },
    { white: "B", black: "b", name: "Bishop" },
    { white: "N", black: "n", name: "Knight" },
    { white: "P", black: "p", name: "Pawn" },
  ];

  it.each(pairs)("$name: white=$white black=$black are the correct symbols", ({ white, black }) => {
    expect(PIECE_SYMBOLS[white]).toBe(EXPECTED_SYMBOLS[white]);
    expect(PIECE_SYMBOLS[black]).toBe(EXPECTED_SYMBOLS[black]);
  });
});

describe("PIECE-03: getPieceSymbol returns non-empty for every piece on the initial board", () => {
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
