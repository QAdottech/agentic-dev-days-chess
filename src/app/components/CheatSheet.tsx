"use client";

import { useTheme } from "./ThemeProvider";

const NOTATION_REF = [
  { symbol: "K", name: "King" },
  { symbol: "Q", name: "Queen" },
  { symbol: "R", name: "Rook" },
  { symbol: "B", name: "Bishop" },
  { symbol: "N", name: "Knight" },
  { symbol: "", name: "Pawn (no letter)" },
];

const PIECE_DISPLAY: Record<string, string> = {
  K: "♔",
  Q: "♕",
  R: "♖",
  B: "♗",
  N: "♘",
};

export default function CheatSheet() {
  const { theme } = useTheme();

  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
    >
      <div
        className="border-b px-4 py-2"
        style={{ borderColor: theme.border }}
      >
        <h3 className="text-sm font-semibold" style={{ color: theme.accent }}>
          Notation Cheat Sheet
        </h3>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-1">
          {NOTATION_REF.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm"
              style={{ color: theme.textPrimary }}
            >
              {item.symbol ? (
                <>
                  <span className="text-lg">{PIECE_DISPLAY[item.symbol]}</span>
                  <span>
                    <span
                      className="font-bold"
                      style={{ color: theme.accent }}
                    >
                      {item.symbol}
                    </span>{" "}
                    = {item.name}
                  </span>
                </>
              ) : (
                <span style={{ color: theme.textMuted }} className="italic">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          className="mt-3 border-t pt-2 text-xs"
          style={{ borderColor: theme.border, color: theme.textMuted }}
        >
          <p>
            <strong style={{ color: theme.accent }}>x</strong> = captures &middot;{" "}
            <strong style={{ color: theme.accent }}>+</strong> = check &middot;{" "}
            <strong style={{ color: theme.accent }}>#</strong> = checkmate
          </p>
          <p className="mt-1">
            <strong style={{ color: theme.accent }}>O-O</strong> = kingside castle
            &middot;{" "}
            <strong style={{ color: theme.accent }}>O-O-O</strong> = queenside
            castle
          </p>
        </div>
      </div>
    </div>
  );
}
