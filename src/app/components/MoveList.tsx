"use client";

import { Move } from "../lib/chess";
import { tokenVar } from "../lib/theme";

interface MoveListProps {
  moves: Move[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function MoveList({ moves, currentIndex, onSelect }: MoveListProps) {
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
          Moves
        </h3>
      </div>
      <div className="flex flex-col">
        {moves.map((move, i) => (
          <button
            key={i}
            onClick={() => onSelect(i)}
            className="px-4 py-2 text-left text-sm transition-colors"
            style={{
              backgroundColor:
                i === currentIndex
                  ? "color-mix(in srgb, var(--accent) 15%, transparent)"
                  : "transparent",
              color: i === currentIndex ? tokenVar("accent") : tokenVar("fg"),
              borderBottom:
                i < moves.length - 1 ? `1px solid ${tokenVar("panelBorderSubtle")}` : "none",
            }}
          >
            <span className="font-medium" style={{ fontFamily: "monospace" }}>
              {move.notation}
            </span>
            <span className="ml-2" style={{ color: tokenVar("fgMuted") }}>
              {move.description.length > 50
                ? move.description.slice(0, 50) + "..."
                : move.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
