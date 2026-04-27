export type ThemeMode = "dark" | "light";

export const THEME_MODES: readonly ThemeMode[] = ["dark", "light"] as const;

export interface Theme {
  mode: ThemeMode;
  bg: string;
  surface: string;
  surfaceRaised: string;
  border: string;
  borderSubtle: string;
  accent: string;
  textPrimary: string;
  textMuted: string;
  textDisabled: string;
  textOnAccent: string;
  whitePiece: string;
  blackPiece: string;
  squareLight: string;
  squareDark: string;
  highlightFrom: string;
  highlightTo: string;
  highlightExtra: string;
}

export const DARK_THEME: Theme = {
  mode: "dark",
  bg: "#1a1612",
  surface: "#241f19",
  surfaceRaised: "#2a2420",
  border: "#3a3228",
  borderSubtle: "#2a2420",
  accent: "#c9a84c",
  textPrimary: "#e8e0d4",
  textMuted: "#8a7e6b",
  textDisabled: "#5a5248",
  textOnAccent: "#1a1612",
  whitePiece: "#ffffff",
  blackPiece: "#1a1210",
  squareLight: "#d4c4a0",
  squareDark: "#6b5c42",
  highlightFrom: "rgba(245, 158, 11, 0.45)",
  highlightTo: "rgba(34, 197, 94, 0.45)",
  highlightExtra: "rgba(34, 197, 94, 0.30)",
};

export const LIGHT_THEME: Theme = {
  mode: "light",
  bg: "#f4ede0",
  surface: "#fdf8ec",
  surfaceRaised: "#ece2cc",
  border: "#c9b896",
  borderSubtle: "#ddc9a3",
  accent: "#8a6d2a",
  textPrimary: "#2c2418",
  textMuted: "#6b5c42",
  textDisabled: "#a89f8a",
  textOnAccent: "#fdf8ec",
  whitePiece: "#ffffff",
  blackPiece: "#1a1210",
  squareLight: "#efe0bd",
  squareDark: "#806130",
  highlightFrom: "rgba(217, 119, 6, 0.55)",
  highlightTo: "rgba(22, 163, 74, 0.55)",
  highlightExtra: "rgba(22, 163, 74, 0.35)",
};

const THEMES: Record<ThemeMode, Theme> = {
  dark: DARK_THEME,
  light: LIGHT_THEME,
};

export function getTheme(mode: ThemeMode): Theme {
  return THEMES[mode];
}

export function nextMode(mode: ThemeMode): ThemeMode {
  return mode === "dark" ? "light" : "dark";
}

export function isThemeMode(value: unknown): value is ThemeMode {
  return value === "dark" || value === "light";
}

function parseHex(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#([0-9a-fA-F]{6})$/.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  return { r: (n >> 16) & 0xff, g: (n >> 8) & 0xff, b: n & 0xff };
}

function relativeLuminance(hex: string): number | null {
  const rgb = parseHex(hex);
  if (!rgb) return null;
  const channel = (c: number) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return (
    0.2126 * channel(rgb.r) +
    0.7152 * channel(rgb.g) +
    0.0722 * channel(rgb.b)
  );
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  if (la === null || lb === null) return 0;
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}
