// If a test fails, fix the source code, not the test.

import { describe, it, expect } from "vitest";
import {
  INITIAL_BOARD,
  applyMoves,
  FILES,
  RANKS,
} from "@/app/lib/chess";
import {
  flipBoard,
  flipSquare,
  displayFiles,
  displayRanks,
} from "@/app/lib/flip";
import { OPENINGS } from "@/app/lib/openings";

describe("FLIP-02: flipping twice is identity", () => {
  it("returns to the unflipped board for the initial position", () => {
    expect(flipBoard(flipBoard(INITIAL_BOARD))).toEqual(INITIAL_BOARD);
  });

  for (const [key, opening] of Object.entries(OPENINGS)) {
    it(`returns to the unflipped board after every move of ${key}`, () => {
      for (let i = 0; i < opening.moves.length; i++) {
        const board = applyMoves(INITIAL_BOARD, opening.moves, i);
        expect(flipBoard(flipBoard(board))).toEqual(board);
      }
    });
  }
});

describe("FLIP-03: displayBoard[r][c] === board[7-r][7-c]", () => {
  it("holds for the initial position", () => {
    const flipped = flipBoard(INITIAL_BOARD);
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        expect(flipped[r][c]).toBe(INITIAL_BOARD[7 - r][7 - c]);
      }
    }
  });

  it("flipSquare also reverses both axes", () => {
    expect(flipSquare({ row: 0, col: 0 })).toEqual({ row: 7, col: 7 });
    expect(flipSquare({ row: 4, col: 3 })).toEqual({ row: 3, col: 4 });
    expect(flipSquare(flipSquare({ row: 2, col: 5 }))).toEqual({ row: 2, col: 5 });
  });
});

describe("FLIP-04: flipped labels are reversed", () => {
  it("file labels go h..a", () => {
    expect(displayFiles(true)).toEqual(FILES.slice().reverse());
    expect(displayFiles(true)).toEqual(["h", "g", "f", "e", "d", "c", "b", "a"]);
  });

  it("rank labels go 1..8 top-to-bottom", () => {
    expect(displayRanks(true)).toEqual(RANKS.slice().reverse());
    expect(displayRanks(true)).toEqual(["1", "2", "3", "4", "5", "6", "7", "8"]);
  });

  it("flipped=false returns the unmodified arrays", () => {
    expect(displayFiles(false)).toEqual(FILES);
    expect(displayRanks(false)).toEqual(RANKS);
  });
});

describe("FLIP-06: flip preserves piece identity (no loss, dup, or color swap)", () => {
  function counts(board: string[][]) {
    const out: Record<string, number> = {};
    for (const row of board) for (const cell of row) {
      if (!cell) continue;
      out[cell] = (out[cell] ?? 0) + 1;
    }
    return out;
  }

  it("piece counts match before/after flip on the initial position", () => {
    expect(counts(flipBoard(INITIAL_BOARD))).toEqual(counts(INITIAL_BOARD));
  });

  for (const [key, opening] of Object.entries(OPENINGS)) {
    it(`piece counts preserved at every step of ${key}`, () => {
      for (let i = 0; i < opening.moves.length; i++) {
        const board = applyMoves(INITIAL_BOARD, opening.moves, i);
        expect(counts(flipBoard(board))).toEqual(counts(board));
      }
    });
  }
});
