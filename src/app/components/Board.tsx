"use client";

import { Board as BoardType, Move, getPieceSymbol, isWhitePiece } from "../lib/chess";
import { displayFiles, displayRanks, flipBoard } from "../lib/flip";
import { tokenVar } from "../lib/theme";

interface BoardProps {
  board: BoardType;
  currentMove: Move | null;
  flipped?: boolean;
}

export default function Board({ board, currentMove, flipped = false }: BoardProps) {
  // Highlight keys are stored in the *real* coordinate system; the renderer
  // computes the displayed cell's real (r,c) and looks it up. This is what
  // makes FLIP-05 hold.
  const highlights = new Map<string, string>();

  if (currentMove) {
    highlights.set(
      `${currentMove.to.row},${currentMove.to.col}`,
      tokenVar("highlightTo"),
    );
    highlights.set(
      `${currentMove.from.row},${currentMove.from.col}`,
      tokenVar("highlightFrom"),
    );

    if (currentMove.extra) {
      for (const ex of currentMove.extra) {
        highlights.set(
          `${ex.to.row},${ex.to.col}`,
          tokenVar("highlightExtra"),
        );
      }
    }
  }

  const renderBoard = flipped ? flipBoard(board) : board;
  const files = displayFiles(flipped);
  const ranks = displayRanks(flipped);

  const boardVars = {
    "--sq": "clamp(34px, calc((100vw - 80px) / 8), 64px)",
    "--label": "calc(var(--sq) * 0.4375)",
    "--piece-font": "calc(var(--sq) * 0.625)",
  } as React.CSSProperties;

  const labelStyle: React.CSSProperties = {
    width: "var(--label)",
    textAlign: "center",
    fontSize: 12,
    color: tokenVar("fgMuted"),
    fontFamily: "monospace",
  };

  const fileLabelStyle: React.CSSProperties = {
    width: "var(--sq)",
    textAlign: "center",
    fontSize: 12,
    color: tokenVar("fgMuted"),
    fontFamily: "monospace",
  };

  return (
    <div style={{ display: "inline-block", maxWidth: "100%", ...boardVars }}>
      {/* Top file labels */}
      <div style={{ display: "flex", paddingLeft: "var(--label)" }}>
        {files.map((f) => (
          <div key={f} style={{ ...fileLabelStyle, paddingBottom: 2 }}>
            {f}
          </div>
        ))}
      </div>

      {renderBoard.map((row, dr) => {
        const realR = flipped ? 7 - dr : dr;
        return (
          <div key={dr} style={{ display: "flex", alignItems: "center" }}>
            {/* Left rank label */}
            <div style={labelStyle}>{ranks[dr]}</div>

            {row.map((piece, dc) => {
              const realC = flipped ? 7 - dc : dc;
              const isLight = (realR + realC) % 2 === 0;
              const baseColor = isLight
                ? tokenVar("squareLight")
                : tokenVar("squareDark");
              const highlight = highlights.get(`${realR},${realC}`);

              return (
                <div
                  key={dc}
                  style={{
                    width: "var(--sq)",
                    height: "var(--sq)",
                    backgroundColor: baseColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                    fontSize: "var(--piece-font)",
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
                          ? tokenVar("pieceWhite")
                          : tokenVar("pieceBlack"),
                        WebkitTextStroke: isWhitePiece(piece)
                          ? `1px ${tokenVar("pieceWhiteStroke")}`
                          : `1px ${tokenVar("pieceBlackStroke")}`,
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
            <div style={labelStyle}>{ranks[dr]}</div>
          </div>
        );
      })}

      {/* Bottom file labels */}
      <div style={{ display: "flex", paddingLeft: "var(--label)" }}>
        {files.map((f) => (
          <div key={f} style={{ ...fileLabelStyle, paddingTop: 2 }}>
            {f}
          </div>
        ))}
      </div>
    </div>
  );
}
