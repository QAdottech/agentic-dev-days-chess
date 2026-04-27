"use client";

import { Move } from "../lib/chess";
import { useTheme } from "./ThemeProvider";

interface MoveListProps {
  moves: Move[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function MoveList({
  moves,
  currentIndex,
  onSelect,
}: MoveListProps) {
  const { theme, mode } = useTheme();
  const activeBg =
    mode === "dark" ? "rgba(201, 168, 76, 0.15)" : "rgba(138, 109, 42, 0.15)";

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
              backgroundColor: i === currentIndex ? activeBg : "transparent",
              color: i === currentIndex ? theme.accent : theme.textPrimary,
              borderBottom:
                i < moves.length - 1
                  ? `1px solid ${theme.borderSubtle}`
                  : "none",
            }}
          >
            <span className="font-medium" style={{ fontFamily: "monospace" }}>
              {move.notation}
            </span>
            <span className="ml-2" style={{ color: theme.textMuted }}>
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
