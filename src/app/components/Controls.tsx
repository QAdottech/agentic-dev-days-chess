"use client";

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
          backgroundColor: "#2a2420",
          color: "#e8e0d4",
          border: "1px solid #3a3228",
        }}
      >
        Reset
      </button>
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className={buttonBase}
        style={{
          backgroundColor: canGoBack ? "#2a2420" : "#1e1a16",
          color: canGoBack ? "#e8e0d4" : "#5a5248",
          border: `1px solid ${canGoBack ? "#3a3228" : "#2a2420"}`,
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
          backgroundColor: canGoNext ? "#c9a84c" : "#1e1a16",
          color: canGoNext ? "#1a1612" : "#5a5248",
          border: `1px solid ${canGoNext ? "#c9a84c" : "#2a2420"}`,
          cursor: canGoNext ? "pointer" : "not-allowed",
          fontWeight: canGoNext ? 600 : 500,
        }}
      >
        Next
      </button>
    </div>
  );
}
