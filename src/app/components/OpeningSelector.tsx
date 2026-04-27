"use client";

import { OPENINGS } from "../lib/openings";
import { tokenVar } from "../lib/theme";

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
            backgroundColor: selected === key ? tokenVar("accent") : tokenVar("buttonBg"),
            color: selected === key ? tokenVar("accentFg") : tokenVar("fg"),
            border: `1px solid ${selected === key ? tokenVar("accent") : tokenVar("panelBorder")}`,
          }}
        >
          {opening.name}
        </button>
      ))}
    </div>
  );
}
