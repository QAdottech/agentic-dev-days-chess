"use client";

import {
  Board as BoardType,
  Move,
  getPieceSymbol,
  isWhitePiece,
  FILES,
  RANKS,
} from "../lib/chess";
import { useTheme } from "./ThemeProvider";

interface BoardProps {
  board: BoardType;
  currentMove: Move | null;
}

export default function Board({ board, currentMove }: BoardProps) {
  const { theme } = useTheme();
  const highlights = new Map<string, string>();

  if (currentMove) {
    highlights.set(
      `${currentMove.to.row},${currentMove.to.col}`,
      theme.highlightTo,
    );
    highlights.set(
      `${currentMove.from.row},${currentMove.from.col}`,
      theme.highlightFrom,
    );

    if (currentMove.extra) {
      for (const ex of currentMove.extra) {
        highlights.set(`${ex.to.row},${ex.to.col}`, theme.highlightExtra);
      }
    }
  }

  const labelStyle = {
    fontSize: 12,
    color: theme.textMuted,
    fontFamily: "monospace",
  } as const;

  return (
    <div style={{ display: "inline-block" }}>
      {/* Top file labels */}
      <div style={{ display: "flex", paddingLeft: 28 }}>
        {FILES.map((f) => (
          <div
            key={f}
            style={{
              width: 64,
              textAlign: "center",
              paddingBottom: 2,
              ...labelStyle,
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
              width: 28,
              textAlign: "center",
              ...labelStyle,
            }}
          >
            {RANKS[r]}
          </div>

          {row.map((piece, c) => {
            const isLight = (r + c) % 2 === 0;
            const baseColor = isLight ? theme.squareLight : theme.squareDark;
            const highlight = highlights.get(`${r},${c}`);

            return (
              <div
                key={c}
                style={{
                  width: 64,
                  height: 64,
                  backgroundColor: baseColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  fontSize: 40,
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
                      color: isWhitePiece(piece)
                        ? theme.whitePiece
                        : theme.blackPiece,
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
              width: 28,
              textAlign: "center",
              ...labelStyle,
            }}
          >
            {RANKS[r]}
          </div>
        </div>
      ))}

      {/* Bottom file labels */}
      <div style={{ display: "flex", paddingLeft: 28 }}>
        {FILES.map((f) => (
          <div
            key={f}
            style={{
              width: 64,
              textAlign: "center",
              paddingTop: 2,
              ...labelStyle,
            }}
          >
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
