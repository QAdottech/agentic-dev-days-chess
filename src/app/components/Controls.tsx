"use client";

import { tokenVar } from "../lib/theme";

interface ControlsProps {
  onReset: () => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export default function Controls({ onReset, onBack, onNext, canGoBack, canGoNext }: ControlsProps) {
  const buttonBase = "rounded-md px-4 py-2 text-sm font-medium transition-colors";

  return (
    <div className="flex gap-3">
      <button
        onClick={onReset}
        className={buttonBase}
        style={{
          backgroundColor: tokenVar("buttonBg"),
          color: tokenVar("fg"),
          border: `1px solid ${tokenVar("panelBorder")}`,
        }}
      >
        Reset
      </button>
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={buttonBase}
        style={{
          backgroundColor: canGoBack ? tokenVar("buttonBg") : tokenVar("buttonBgDisabled"),
          color: canGoBack ? tokenVar("fg") : tokenVar("buttonFgDisabled"),
          border: `1px solid ${canGoBack ? tokenVar("panelBorder") : tokenVar("panelBorderSubtle")}`,
          cursor: canGoBack ? "pointer" : "not-allowed",
        }}
      >
        Back
      </button>
      <button
        onClick={onNext}
        disabled={!canGoNext}
        className={buttonBase}
        style={{
          backgroundColor: canGoNext ? tokenVar("accent") : tokenVar("buttonBgDisabled"),
          color: canGoNext ? tokenVar("accentFg") : tokenVar("buttonFgDisabled"),
          border: `1px solid ${canGoNext ? tokenVar("accent") : tokenVar("panelBorderSubtle")}`,
          cursor: canGoNext ? "pointer" : "not-allowed",
          fontWeight: canGoNext ? 600 : 500,
        }}
      >
        Next
      </button>
    </div>
  );
}
