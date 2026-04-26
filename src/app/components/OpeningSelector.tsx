"use client";

import { OPENINGS } from "../lib/openings";

interface OpeningSelectorProps {
  selected: string;
  onSelect: (key: string) => void;
}

export default function OpeningSelector({ selected, onSelect }: OpeningSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(OPENINGS).map(([key, opening]) => (
        <button
          key={key}
          onClick={() => onSelect(key)}
          className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
          style={{
            backgroundColor: selected === key ? "#c9a84c" : "#2a2420",
            color: selected === key ? "#1a1612" : "#e8e0d4",
            border: `1px solid ${selected === key ? "#c9a84c" : "#3a3228"}`,
          }}
        >
          {opening.name}
        </button>
      ))}
    </div>
  );
}
