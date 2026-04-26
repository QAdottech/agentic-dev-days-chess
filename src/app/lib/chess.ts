// Types
export interface Square {
  row: number;
  col: number;
}

export interface Move {
  notation: string;
  description: string;
  from: Square;
  to: Square;
  extra?: { from: Square; to: Square }[];
}

export type Board = string[][]; // 8x8 grid, uppercase=white, lowercase=black, ""=empty

// Constants
export const PIECE_SYMBOLS: Record<string, string> = {
  K: "\u2654",
  Q: "\u2655",
  R: "\u2656",
  B: "\u2657",
  N: "\u2658",
  P: "\u2659",
  k: "\u265A",
  q: "\u265B",
  r: "\u265C",
  // BUG: black knight and bishop symbols are swapped
  n: "\u265D", // should be \u265E (knight), but shows bishop symbol
  b: "\u265E", // should be \u265D (bishop), but shows knight symbol
  p: "\u265F",
};

export const INITIAL_BOARD: Board = [
  ["r", "n", "b", "q", "k", "b", "n", "r"],
  ["p", "p", "p", "p", "p", "p", "p", "p"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["P", "P", "P", "P", "P", "P", "P", "P"],
  ["R", "N", "B", "Q", "K", "B", "N", "R"],
];

export const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
export const RANKS = ["8", "7", "6", "5", "4", "3", "2", "1"];

// Pure functions

export function cloneBoard(board: Board): Board {
  return board.map((row) => [...row]);
}

export function applyMove(board: Board, move: Move): Board {
  const newBoard = cloneBoard(board);
  const piece = newBoard[move.from.row][move.from.col];
  newBoard[move.from.row][move.from.col] = "";
  newBoard[move.to.row][move.to.col] = piece;

  if (move.extra) {
    for (const ex of move.extra) {
      const extraPiece = newBoard[ex.from.row][ex.from.col];
      newBoard[ex.from.row][ex.from.col] = "";
      newBoard[ex.to.row][ex.to.col] = extraPiece;
    }
  }

  return newBoard;
}

export function applyMoves(
  board: Board,
  moves: Move[],
  upToIndex: number,
): Board {
  let current = cloneBoard(board);
  for (let i = 0; i <= upToIndex && i < moves.length; i++) {
    current = applyMove(current, moves[i]);
  }
  return current;
}

export function getPieceAt(board: Board, square: Square): string {
  return board[square.row][square.col];
}

export function isWhitePiece(piece: string): boolean {
  return piece !== "" && piece === piece.toUpperCase();
}

export function isBlackPiece(piece: string): boolean {
  return piece !== "" && piece === piece.toLowerCase();
}

export function getPieceSymbol(piece: string): string {
  return PIECE_SYMBOLS[piece] || "";
}

export function squareToAlgebraic(square: Square): string {
  return FILES[square.col] + RANKS[square.row];
}

export function countPieces(board: Board): { white: number; black: number } {
  let white = 0;
  let black = 0;
  for (const row of board) {
    for (const cell of row) {
      if (cell === "") continue;
      if (isWhitePiece(cell)) white++;
      else black++;
    }
  }
  return { white, black };
}

export function findKings(
  board: Board,
): { white: Square | null; black: Square | null } {
  let white: Square | null = null;
  let black: Square | null = null;
  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      if (board[row][col] === "K") white = { row, col };
      if (board[row][col] === "k") black = { row, col };
    }
  }
  return { white, black };
}
