"use client";

import { useSyncExternalStore } from "react";
import {
  DEFAULT_THEME,
  THEME_STORAGE_KEY,
  ThemeName,
  THEME_NAMES,
  tokenVar,
} from "../lib/theme";

function readDOMTheme(): ThemeName {
  if (typeof document === "undefined") return DEFAULT_THEME;
  const attr = document.documentElement.getAttribute("data-theme");
  return attr === "light" || attr === "dark" ? attr : DEFAULT_THEME;
}

function subscribe(notify: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const observer = new MutationObserver(notify);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

export default function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribe,
    readDOMTheme,
    () => DEFAULT_THEME,
  );

  function toggle() {
    const idx = THEME_NAMES.indexOf(theme);
    const next = THEME_NAMES[(idx + 1) % THEME_NAMES.length];
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // ignore storage failures (private mode, etc.) — attribute is still set
    }
  }

  const label = theme === "dark" ? "Light mode" : "Dark mode";
  const icon = theme === "dark" ? "☀" : "☾";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${label.toLowerCase()}`}
      className="rounded-md px-3 py-1.5 text-sm font-medium transition-colors"
      style={{
        backgroundColor: tokenVar("buttonBg"),
        color: tokenVar("fg"),
        border: `1px solid ${tokenVar("panelBorder")}`,
        cursor: "pointer",
      }}
    >
      <span aria-hidden style={{ marginRight: 6 }}>
        {icon}
      </span>
      {label}
    </button>
  );
}
