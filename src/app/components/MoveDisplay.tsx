"use client";

import { Move } from "../lib/chess";

interface MoveDisplayProps {
  move: Move | null;
}

export default function MoveDisplay({ move }: MoveDisplayProps) {
  if (!move) {
    return (
      <div className="rounded-lg border px-5 py-4" style={{ borderColor: "#3a3228", backgroundColor: "#241f19" }}>
        <p style={{ color: "#8a7e6b" }} className="text-sm italic">
          Tap Next to step through the moves
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border px-5 py-4" style={{ borderColor: "#3a3228", backgroundColor: "#241f19" }}>
      <div className="mb-1 text-xl font-bold" style={{ color: "#c9a84c", fontFamily: "'Georgia', 'Times New Roman', serif" }}>
        {move.notation}
      </div>
      <p style={{ color: "#e8e0d4" }} className="text-sm leading-relaxed">
        {move.description}
      </p>
    </div>
  );
}
