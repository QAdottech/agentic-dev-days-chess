// If a test fails, fix the source code, not the test.

import { describe, it, expect } from "vitest";
import {
  INITIAL_BOARD,
  cloneBoard,
  applyMove,
  applyMoves,
  countPieces,
  findKings,
  isWhitePiece,
  isBlackPiece,
  Move,
} from "@/app/lib/chess";
import { OPENINGS } from "@/app/lib/openings";

describe("DATA-01: The board is always 8×8", () => {
  it("initial board has 8 rows", () => {
    expect(INITIAL_BOARD).toHaveLength(8);
  });

  it("every row has 8 columns", () => {
    for (const row of INITIAL_BOARD) {
      expect(row).toHaveLength(8);
    }
  });

  it("board stays 8×8 after applying moves", () => {
    const opening = OPENINGS.italian;
    const board = applyMoves(INITIAL_BOARD, opening.moves, opening.moves.length - 1);
    expect(board).toHaveLength(8);
    for (const row of board) {
      expect(row).toHaveLength(8);
    }
  });
});

describe("DATA-02: Initial position has exactly 16 white and 16 black pieces", () => {
  it("counts correct", () => {
    const count = countPieces(INITIAL_BOARD);
    expect(count.white).toBe(16);
    expect(count.black).toBe(16);
  });
});

describe("DATA-03: Each side always has exactly one king", () => {
  it("initial position", () => {
    const kings = findKings(INITIAL_BOARD);
    expect(kings.white).not.toBeNull();
    expect(kings.black).not.toBeNull();
  });

  it("after every opening's full move sequence", () => {
    for (const [name, opening] of Object.entries(OPENINGS)) {
      const board = applyMoves(INITIAL_BOARD, opening.moves, opening.moves.length - 1);
      const kings = findKings(board);
      expect(kings.white, `${name}: white king missing`).not.toBeNull();
      expect(kings.black, `${name}: black king missing`).not.toBeNull();
    }
  });
});

describe("DATA-04: White pieces are uppercase, black pieces are lowercase", () => {
  it("initial position follows the convention", () => {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        const piece = INITIAL_BOARD[row][col];
        if (!piece) continue;
        if (row <= 1) {
          expect(isBlackPiece(piece), `piece at (${row},${col}) should be black`).toBe(true);
        }
        if (row >= 6) {
          expect(isWhitePiece(piece), `piece at (${row},${col}) should be white`).toBe(true);
        }
      }
    }
  });
});

describe("LOGIC-01: applyMove only changes from, to, and extra squares", () => {
  it("non-involved squares are untouched", () => {
    const move: Move = {
      notation: "e4",
      description: "",
      from: { row: 6, col: 4 },
      to: { row: 4, col: 4 },
    };
    const before = INITIAL_BOARD;
    const after = applyMove(before, move);

    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if ((r === 6 && c === 4) || (r === 4 && c === 4)) continue;
        expect(after[r][c], `square (${r},${c}) changed unexpectedly`).toBe(before[r][c]);
      }
    }
  });
});

describe("LOGIC-02: Applying zero moves returns initial position unchanged", () => {
  it("clone matches initial", () => {
    const board = cloneBoard(INITIAL_BOARD);
    expect(board).toEqual(INITIAL_BOARD);
  });
});
