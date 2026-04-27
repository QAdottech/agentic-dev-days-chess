"use client";

import { tokenVar } from "../lib/theme";

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
  return (
    <div
      className="rounded-lg border"
      style={{ borderColor: tokenVar("panelBorder"), backgroundColor: tokenVar("panelBg") }}
    >
      <div
        className="border-b px-4 py-2"
        style={{ borderColor: tokenVar("panelBorder") }}
      >
        <h3 className="text-sm font-semibold" style={{ color: tokenVar("accent") }}>
          Notation Cheat Sheet
        </h3>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-1">
          {NOTATION_REF.map((item) => (
            <div
              key={item.name}
              className="flex items-center gap-2 text-sm"
              style={{ color: tokenVar("fg") }}
            >
              {item.symbol ? (
                <>
                  <span className="text-lg" style={{ color: tokenVar("fg") }}>
                    {PIECE_DISPLAY[item.symbol]}
                  </span>
                  <span>
                    <span className="font-bold" style={{ color: tokenVar("accent") }}>
                      {item.symbol}
                    </span>{" "}
                    = {item.name}
                  </span>
                </>
              ) : (
                <span style={{ color: tokenVar("fgMuted") }} className="italic">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div
          className="mt-3 border-t pt-2 text-xs"
          style={{ borderColor: tokenVar("panelBorder"), color: tokenVar("fgMuted") }}
        >
          <p>
            <strong style={{ color: tokenVar("accent") }}>x</strong> = captures &middot;{" "}
            <strong style={{ color: tokenVar("accent") }}>+</strong> = check &middot;{" "}
            <strong style={{ color: tokenVar("accent") }}>#</strong> = checkmate
          </p>
          <p className="mt-1">
            <strong style={{ color: tokenVar("accent") }}>O-O</strong> = kingside castle &middot;{" "}
            <strong style={{ color: tokenVar("accent") }}>O-O-O</strong> = queenside castle
          </p>
        </div>
      </div>
    </div>
  );
}
