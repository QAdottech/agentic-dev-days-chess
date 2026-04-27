"use client";

import { OPENINGS } from "../lib/openings";
import { useTheme } from "./ThemeProvider";

interface OpeningSelectorProps {
  selected: string;
  onSelect: (key: string) => void;
}

export default function OpeningSelector({
  selected,
  onSelect,
}: OpeningSelectorProps) {
  const { theme } = useTheme();

  return (
    <div className="flex flex-wrap gap-2">
      {Object.entries(OPENINGS).map(([key, opening]) => {
        const isSelected = selected === key;
        return (
          <button
            key={key}
            onClick={() => onSelect(key)}
            className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
            style={{
              backgroundColor: isSelected ? theme.accent : theme.surfaceRaised,
              color: isSelected ? theme.textOnAccent : theme.textPrimary,
              border: `1px solid ${isSelected ? theme.accent : theme.border}`,
            }}
          >
            {opening.name}
          </button>
        );
      })}
    </div>
  );
}
