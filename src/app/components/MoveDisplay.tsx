"use client";

import { Move } from "../lib/chess";
import { useTheme } from "./ThemeProvider";

interface MoveDisplayProps {
  move: Move | null;
}

export default function MoveDisplay({ move }: MoveDisplayProps) {
  const { theme } = useTheme();

  if (!move) {
    return (
      <div
        className="rounded-lg border px-5 py-4"
        style={{ borderColor: theme.border, backgroundColor: theme.surface }}
      >
        <p style={{ color: theme.textMuted }} className="text-sm italic">
          Tap Next to step through the moves
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border px-5 py-4"
      style={{ borderColor: theme.border, backgroundColor: theme.surface }}
    >
      <div
        className="mb-1 text-xl font-bold"
        style={{
          color: theme.accent,
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {move.notation}
      </div>
      <p
        style={{ color: theme.textPrimary }}
        className="text-sm leading-relaxed"
      >
        {move.description}
      </p>
    </div>
  );
}
