"use client";

import { Move } from "../lib/chess";
import { tokenVar } from "../lib/theme";

interface MoveDisplayProps {
  move: Move | null;
}

export default function MoveDisplay({ move }: MoveDisplayProps) {
  if (!move) {
    return (
      <div
        className="rounded-lg border px-5 py-4"
        style={{ borderColor: tokenVar("panelBorder"), backgroundColor: tokenVar("panelBg") }}
      >
        <p style={{ color: tokenVar("fgMuted") }} className="text-sm italic">
          Tap Next to step through the moves
        </p>
      </div>
    );
  }

  return (
    <div
      className="rounded-lg border px-5 py-4"
      style={{ borderColor: tokenVar("panelBorder"), backgroundColor: tokenVar("panelBg") }}
    >
      <div
        className="mb-1 text-xl font-bold"
        style={{ color: tokenVar("accent"), fontFamily: "'Georgia', 'Times New Roman', serif" }}
      >
        {move.notation}
      </div>
      <p style={{ color: tokenVar("fg") }} className="text-sm leading-relaxed">
        {move.description}
      </p>
    </div>
  );
}
