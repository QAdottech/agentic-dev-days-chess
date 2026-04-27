"use client";

import { tokenVar } from "../lib/theme";

interface FlipToggleProps {
  flipped: boolean;
  onToggle: () => void;
}

export default function FlipToggle({ flipped, onToggle }: FlipToggleProps) {
  const label = flipped ? "White's view" : "Black's view";
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={flipped}
      aria-label={`Flip board to ${label.toLowerCase()}`}
      className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        backgroundColor: tokenVar("buttonBg"),
        color: tokenVar("fg"),
        border: `1px solid ${tokenVar("panelBorder")}`,
        cursor: "pointer",
      }}
    >
      <span aria-hidden style={{ marginRight: 6 }}>
        ⇅
      </span>
      {label}
    </button>
  );
}
