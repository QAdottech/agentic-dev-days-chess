"use client";

import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, mode, toggleMode } = useTheme();
  const isDark = mode === "dark";
  const label = isDark ? "Switch to light mode" : "Switch to dark mode";
  const icon = isDark ? "☀" : "☾";

  return (
    <button
      type="button"
      onClick={toggleMode}
      aria-label={label}
      title={label}
      className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        backgroundColor: theme.surfaceRaised,
        color: theme.textPrimary,
        border: `1px solid ${theme.border}`,
      }}
    >
      <span aria-hidden="true">{icon}</span>
      <span className="ml-2">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}
