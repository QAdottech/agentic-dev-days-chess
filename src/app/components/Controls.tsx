"use client";

import { useTheme } from "./ThemeProvider";

interface ControlsProps {
  onReset: () => void;
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
}

export default function Controls({
  onReset,
  onBack,
  onNext,
  canGoBack,
  canGoNext,
}: ControlsProps) {
  const { theme } = useTheme();
  const buttonBase =
    "rounded-md px-4 py-2 text-sm font-medium transition-colors";

  return (
    <div className="flex gap-3">
      <button
        onClick={onReset}
        className={buttonBase}
        style={{
          backgroundColor: theme.surfaceRaised,
          color: theme.textPrimary,
          border: `1px solid ${theme.border}`,
        }}
      >
        Reset
      </button>
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={buttonBase}
        style={{
          backgroundColor: canGoBack ? theme.surfaceRaised : theme.surface,
          color: canGoBack ? theme.textPrimary : theme.textDisabled,
          border: `1px solid ${canGoBack ? theme.border : theme.borderSubtle}`,
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
          backgroundColor: canGoNext ? theme.accent : theme.surface,
          color: canGoNext ? theme.textOnAccent : theme.textDisabled,
          border: `1px solid ${canGoNext ? theme.accent : theme.borderSubtle}`,
          cursor: canGoNext ? "pointer" : "not-allowed",
          fontWeight: canGoNext ? 600 : 500,
        }}
      >
        Next
      </button>
    </div>
  );
}
