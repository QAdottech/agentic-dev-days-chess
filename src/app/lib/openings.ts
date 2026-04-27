import { Move } from "./chess";

export interface Opening {
  name: string;
  description: string;
  moves: Move[];
}

export const OPENINGS: Record<string, Opening> = {
  notation: {
    name: "How Notation Works",
    description:
      "Chess moves are written in algebraic notation. Each square has a name: column (a-h) + row (1-8). Pieces use letters: K=King, Q=Queen, R=Rook, B=Bishop, N=Knight. Pawns use just the square name.",
    moves: [
      {
        notation: "e4",
        description:
          'Pawn to e4 — just the square name because it\'s a pawn. "e" is the column, "4" is the row.',
        from: { row: 6, col: 4 },
        to: { row: 4, col: 4 },
      },
      {
        notation: "e5",
        description:
          "Black replies pawn to e5. Same idea — column e, row 5.",
        from: { row: 1, col: 4 },
        to: { row: 3, col: 4 },
      },
      {
        notation: "Nf3",
        description:
          '"N" = Knight (K was taken by King!). Knight moves to the f3 square.',
        from: { row: 7, col: 6 },
        to: { row: 5, col: 5 },
      },
      {
        notation: "Nc6",
        description:
          "Black develops their knight to c6. The N tells you it's a knight move.",
        from: { row: 0, col: 1 },
        to: { row: 2, col: 2 },
      },
    ],
  },

  italian: {
    name: "Italian Game",
    description:
      "One of the oldest openings. White develops the bishop to c4, targeting the vulnerable f7 pawn.",
    moves: [
      {
        notation: "1. e4",
        description: "White opens with the king's pawn, controlling the center.",
        from: { row: 6, col: 4 },
        to: { row: 4, col: 4 },
      },
      {
        notation: "1... e5",
        description: "Black mirrors, also claiming central space.",
        from: { row: 1, col: 4 },
        to: { row: 3, col: 4 },
      },
      {
        notation: "2. Nf3",
        description:
          "Knight develops to f3, attacking Black's e5 pawn.",
        from: { row: 7, col: 6 },
        to: { row: 5, col: 5 },
      },
      {
        notation: "2... Nc6",
        description: "Knight defends the e5 pawn.",
        from: { row: 0, col: 1 },
        to: { row: 2, col: 2 },
      },
      {
        notation: "3. Bc4",
        description:
          "The Italian move! Bishop eyes the f7 pawn — Black's weakest point.",
        from: { row: 7, col: 5 },
        to: { row: 4, col: 2 },
      },
    ],
  },

  ruylopez: {
    name: "Ruy L\u00F3pez",
    description:
      'The "Spanish Game" — one of the most respected openings. White\'s bishop pressures the knight defending e5.',
    moves: [
      {
        notation: "1. e4",
        description:
          "The king's pawn — the most popular first move in chess history.",
        from: { row: 6, col: 4 },
        to: { row: 4, col: 4 },
      },
      {
        notation: "1... e5",
        description: "The symmetric response, fighting for the center.",
        from: { row: 1, col: 4 },
        to: { row: 3, col: 4 },
      },
      {
        notation: "2. Nf3",
        description: "Attacking the e5 pawn while developing.",
        from: { row: 7, col: 6 },
        to: { row: 5, col: 5 },
      },
      {
        notation: "2... Nc6",
        description: "The natural defense of e5.",
        from: { row: 0, col: 1 },
        to: { row: 2, col: 2 },
      },
      {
        notation: "3. Bb5",
        description:
          "The Ruy L\u00F3pez! Pinning the knight to the king — deep strategic pressure.",
        from: { row: 7, col: 5 },
        to: { row: 3, col: 1 },
      },
    ],
  },

  sicilian: {
    name: "Sicilian Defense",
    description:
      "Black's most popular reply to 1.e4. Creates an asymmetric fight where Black gets counterplay on the queenside.",
    moves: [
      {
        notation: "1. e4",
        description: "White opens 1.e4, the most common first move.",
        from: { row: 6, col: 4 },
        to: { row: 4, col: 4 },
      },
      {
        notation: "1... c5",
        description:
          "The Sicilian! Black fights for the center with the c-pawn instead of mirroring.",
        from: { row: 1, col: 2 },
        to: { row: 3, col: 2 },
      },
      {
        notation: "2. Nf3",
        description:
          "White develops the knight, preparing to open the center.",
        from: { row: 7, col: 6 },
        to: { row: 5, col: 5 },
      },
      {
        notation: "2... d6",
        description:
          "Black reinforces the center and prepares to develop the dark-squared bishop.",
        from: { row: 1, col: 3 },
        to: { row: 2, col: 3 },
      },
      {
        notation: "3. d4",
        description:
          "White strikes in the center! This is the Open Sicilian — the main line.",
        from: { row: 6, col: 3 },
        to: { row: 4, col: 3 },
      },
      {
        notation: "3... cxd4",
        description:
          "Black captures, opening the c-file for future counterplay.",
        from: { row: 3, col: 2 },
        to: { row: 4, col: 3 },
      },
      {
        notation: "4. Nxd4",
        description:
          "White recaptures with the knight, standing well in the center.",
        from: { row: 5, col: 5 },
        to: { row: 4, col: 3 },
      },
    ],
  },

  queensgambit: {
    name: "Queen's Gambit",
    description:
      'White offers a pawn to gain central control. Not a true gambit — White usually gets the pawn back. Made famous by the Netflix show "The Queen\'s Gambit".',
    moves: [
      {
        notation: "1. d4",
        description:
          "The queen's pawn — leads to more strategic, slower games than 1.e4.",
        from: { row: 6, col: 3 },
        to: { row: 4, col: 3 },
      },
      {
        notation: "1... d5",
        description: "Black mirrors, establishing a strong central presence.",
        from: { row: 1, col: 3 },
        to: { row: 3, col: 3 },
      },
      {
        notation: "2. c4",
        description:
          "The Queen's Gambit! White offers the c-pawn to lure Black's d-pawn away from the center.",
        from: { row: 6, col: 2 },
        to: { row: 4, col: 2 },
      },
      {
        notation: "2... e6",
        description:
          "The Queen's Gambit Declined — Black holds the center solidly but locks in the light-squared bishop.",
        from: { row: 1, col: 4 },
        to: { row: 2, col: 4 },
      },
      {
        notation: "3. Nc3",
        description:
          "White develops the knight, adding pressure on d5.",
        from: { row: 7, col: 1 },
        to: { row: 5, col: 2 },
      },
      {
        notation: "3... Nf6",
        description:
          "Black develops the knight to its most natural square, also defending d5.",
        from: { row: 0, col: 6 },
        to: { row: 2, col: 5 },
      },
    ],
  },

  kingsinidan: {
    name: "King's Indian Defense",
    description:
      "Black lets White build a big center, then counterattacks. A favorite of Bobby Fischer and Garry Kasparov.",
    moves: [
      {
        notation: "1. d4",
        description: "White opens with the queen's pawn.",
        from: { row: 6, col: 3 },
        to: { row: 4, col: 3 },
      },
      {
        notation: "1... Nf6",
        description:
          "Black develops the knight first — a flexible, modern approach.",
        from: { row: 0, col: 6 },
        to: { row: 2, col: 5 },
      },
      {
        notation: "2. c4",
        description: "White grabs more space in the center.",
        from: { row: 6, col: 2 },
        to: { row: 4, col: 2 },
      },
      {
        notation: "2... g6",
        description:
          "The King's Indian setup! Black will fianchetto the bishop to g7.",
        from: { row: 1, col: 6 },
        to: { row: 2, col: 6 },
      },
      {
        notation: "3. Nc3",
        description:
          "White continues natural development.",
        from: { row: 7, col: 1 },
        to: { row: 5, col: 2 },
      },
      {
        notation: "3... Bg7",
        description:
          "The fianchettoed bishop — it looks passive but aims at White's center like a laser.",
        from: { row: 0, col: 5 },
        to: { row: 2, col: 6 },
      },
    ],
  },
};
