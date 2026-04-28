"use client";

import { Move, squareToAlgebraic } from "../lib/chess";

interface MoveListProps {
  moves: Move[];
  currentIndex: number;
  onSelect: (index: number) => void;
}

export default function MoveList({ moves, currentIndex, onSelect }: MoveListProps) {
  return (
    <div className="rounded-lg border" style={{ borderColor: "#3a3228", backgroundColor: "#241f19" }}>
      <div className="border-b px-4 py-2" style={{ borderColor: "#3a3228" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
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
              backgroundColor: i === currentIndex ? "rgba(201, 168, 76, 0.15)" : "transparent",
              color: i === currentIndex ? "#c9a84c" : "#e8e0d4",
              borderBottom: i < moves.length - 1 ? "1px solid #2a2420" : "none",
            }}
          >
            <span className="font-medium" style={{ fontFamily: "monospace" }}>
              {move.notation}
            </span>
            <span className="ml-2" style={{ color: "#8a7e6b" }}>
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
