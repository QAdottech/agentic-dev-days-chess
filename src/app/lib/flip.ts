import { Board, FILES, RANKS, Square } from "./chess";

export function flipBoard(board: Board): Board {
  return board
    .slice()
    .reverse()
    .map((row) => row.slice().reverse());
}

export function flipSquare(square: Square): Square {
  return { row: 7 - square.row, col: 7 - square.col };
}

export function displayFiles(flipped: boolean): string[] {
  return flipped ? FILES.slice().reverse() : FILES;
}

export function displayRanks(flipped: boolean): string[] {
  return flipped ? RANKS.slice().reverse() : RANKS;
}
