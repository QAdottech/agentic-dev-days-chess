"use client";

import type { CSSProperties } from "react";
import { Board as BoardType, Move, getPieceSymbol, isWhitePiece, FILES, RANKS } from "../lib/chess";

interface BoardProps {
  board: BoardType;
  currentMove: Move | null;
}

const boardVars: CSSProperties = {
  display: "inline-block",
  ["--sq" as string]: "clamp(32px, calc((100vw - 80px) / 8.875), 64px)",
  ["--lbl" as string]: "calc(var(--sq) * 0.4375)",
  ["--piece" as string]: "calc(var(--sq) * 0.625)",
};

export default function Board({ board, currentMove }: BoardProps) {
  const highlights = new Map<string, string>();

  if (currentMove) {
    highlights.set(
      `${currentMove.to.row},${currentMove.to.col}`,
      "rgba(34, 197, 94, 0.45)",
    );
    highlights.set(
      `${currentMove.from.row},${currentMove.from.col}`,
      "rgba(245, 158, 11, 0.45)",
    );

    if (currentMove.extra) {
      for (const ex of currentMove.extra) {
        highlights.set(
          `${ex.to.row},${ex.to.col}`,
          "rgba(34, 197, 94, 0.3)",
        );
      }
    }
  }

  return (
    <div style={boardVars}>
      {/* Top file labels */}
      <div style={{ display: "flex", paddingLeft: "var(--lbl)" }}>
        {FILES.map((f) => (
          <div
            key={f}
            style={{
              width: "var(--sq)",
              textAlign: "center",
              fontSize: 12,
              color: "#8a7e6b",
              fontFamily: "monospace",
              paddingBottom: 2,
            }}
          >
            {f}
          </div>
        ))}
      </div>

      {board.map((row, r) => (
        <div key={r} style={{ display: "flex", alignItems: "center" }}>
          {/* Left rank label */}
          <div
            style={{
              width: "var(--lbl)",
              textAlign: "center",
              fontSize: 12,
              color: "#8a7e6b",
              fontFamily: "monospace",
            }}
          >
            {RANKS[r]}
          </div>

          {row.map((piece, c) => {
            const isLight = (r + c) % 2 === 0;
            const baseColor = isLight ? "#d4c4a0" : "#6b5c42";
            const highlight = highlights.get(`${r},${c}`);

            return (
              <div
                key={c}
                style={{
                  width: "var(--sq)",
                  height: "var(--sq)",
                  backgroundColor: baseColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  fontSize: "var(--piece)",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                {highlight && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundColor: highlight,
                      pointerEvents: "none",
                    }}
                  />
                )}
                {piece && (
                  <span
                    style={{
                      position: "relative",
                      zIndex: 1,
                      color: isWhitePiece(piece) ? "#fff" : "#1a1210",
                      textShadow: isWhitePiece(piece)
                        ? "0 1px 3px rgba(0,0,0,0.6)"
                        : "0 1px 3px rgba(0,0,0,0.3)",
                      filter: isWhitePiece(piece)
                        ? "none"
                        : "drop-shadow(0 0 1px rgba(255,255,255,0.2))",
                    }}
                  >
                    {getPieceSymbol(piece)}
                  </span>
                )}
              </div>
            );
          })}

          {/* Right rank label */}
          <div
            style={{
              width: "var(--lbl)",
              textAlign: "center",
              fontSize: 12,
              color: "#8a7e6b",
              fontFamily: "monospace",
            }}
          >
            {RANKS[r]}
          </div>
        </div>
      ))}

      {/* Bottom file labels */}
      <div style={{ display: "flex", paddingLeft: "var(--lbl)" }}>
        {FILES.map((f) => (
          <div
            key={f}
            style={{
              width: "var(--sq)",
              textAlign: "center",
              fontSize: 12,
              color: "#8a7e6b",
              fontFamily: "monospace",
              paddingTop: 2,
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
