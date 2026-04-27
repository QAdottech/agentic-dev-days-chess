export type ThemeName = "dark" | "light";

export const THEME_NAMES: ThemeName[] = ["dark", "light"];
export const DEFAULT_THEME: ThemeName = "dark";
export const THEME_STORAGE_KEY = "chess-theme";

export type ThemeTokenKey =
  | "bg"
  | "fg"
  | "fgMuted"
  | "fgSubtle"
  | "accent"
  | "accentFg"
  | "panelBg"
  | "panelBorder"
  | "panelBorderSubtle"
  | "buttonBg"
  | "buttonBgDisabled"
  | "buttonFgDisabled"
  | "squareLight"
  | "squareDark"
  | "pieceWhite"
  | "pieceBlack"
  | "pieceWhiteStroke"
  | "pieceBlackStroke"
  | "highlightFrom"
  | "highlightTo"
  | "highlightExtra";

export type ThemeTokens = Record<ThemeTokenKey, string>;

export const THEMES: Record<ThemeName, ThemeTokens> = {
  dark: {
    bg: "#1a1612",
    fg: "#e8e0d4",
    fgMuted: "#8a7e6b",
    fgSubtle: "#5a5248",
    accent: "#c9a84c",
    accentFg: "#1a1612",
    panelBg: "#241f19",
    panelBorder: "#3a3228",
    panelBorderSubtle: "#2a2420",
    buttonBg: "#2a2420",
    buttonBgDisabled: "#1e1a16",
    buttonFgDisabled: "#5a5248",
    squareLight: "#d4c4a0",
    squareDark: "#6b5c42",
    pieceWhite: "#ffffff",
    pieceBlack: "#1a1210",
    pieceWhiteStroke: "rgba(0, 0, 0, 0)",
    pieceBlackStroke: "rgba(255, 255, 255, 0.18)",
    highlightFrom: "rgba(245, 158, 11, 0.45)",
    highlightTo: "rgba(34, 197, 94, 0.45)",
    highlightExtra: "rgba(34, 197, 94, 0.3)",
  },
  light: {
    bg: "#f5efe1",
    fg: "#2a221a",
    fgMuted: "#6b5c42",
    fgSubtle: "#a89880",
    accent: "#8a6a1c",
    accentFg: "#f5efe1",
    panelBg: "#ffffff",
    panelBorder: "#d6c9b0",
    panelBorderSubtle: "#e8dfc8",
    buttonBg: "#ffffff",
    buttonBgDisabled: "#ece5d4",
    buttonFgDisabled: "#a89880",
    squareLight: "#f0d9a8",
    squareDark: "#a07a44",
    pieceWhite: "#fbf6e8",
    pieceBlack: "#1a1210",
    pieceWhiteStroke: "#2a221a",
    pieceBlackStroke: "rgba(0, 0, 0, 0)",
    highlightFrom: "rgba(217, 119, 6, 0.55)",
    highlightTo: "rgba(22, 163, 74, 0.5)",
    highlightExtra: "rgba(22, 163, 74, 0.35)",
  },
};

const TOKEN_TO_VAR: Record<ThemeTokenKey, string> = {
  bg: "--bg",
  fg: "--fg",
  fgMuted: "--fg-muted",
  fgSubtle: "--fg-subtle",
  accent: "--accent",
  accentFg: "--accent-fg",
  panelBg: "--panel-bg",
  panelBorder: "--panel-border",
  panelBorderSubtle: "--panel-border-subtle",
  buttonBg: "--button-bg",
  buttonBgDisabled: "--button-bg-disabled",
  buttonFgDisabled: "--button-fg-disabled",
  squareLight: "--square-light",
  squareDark: "--square-dark",
  pieceWhite: "--piece-white",
  pieceBlack: "--piece-black",
  pieceWhiteStroke: "--piece-white-stroke",
  pieceBlackStroke: "--piece-black-stroke",
  highlightFrom: "--highlight-from",
  highlightTo: "--highlight-to",
  highlightExtra: "--highlight-extra",
};

export function tokenVar(key: ThemeTokenKey): string {
  return `var(${TOKEN_TO_VAR[key]})`;
}

export function tokenVarName(key: ThemeTokenKey): string {
  return TOKEN_TO_VAR[key];
}

// Relative luminance of an opaque hex color, per WCAG 2.x.
function relativeLuminance(hex: string): number {
  const m = hex.replace("#", "");
  const expanded =
    m.length === 3
      ? m
          .split("")
          .map((c) => c + c)
          .join("")
      : m;
  const r = parseInt(expanded.slice(0, 2), 16) / 255;
  const g = parseInt(expanded.slice(2, 4), 16) / 255;
  const b = parseInt(expanded.slice(4, 6), 16) / 255;
  const f = (v: number) =>
    v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const lighter = Math.max(la, lb);
  const darker = Math.min(la, lb);
  return (lighter + 0.05) / (darker + 0.05);
}
