// If a test fails, fix the source code, not the test.

import { describe, it, expect } from "vitest";
import {
  THEMES,
  THEME_NAMES,
  DEFAULT_THEME,
  contrastRatio,
  ThemeTokenKey,
} from "@/app/lib/theme";

const REQUIRED_KEYS: ThemeTokenKey[] = [
  "bg",
  "fg",
  "fgMuted",
  "fgSubtle",
  "accent",
  "accentFg",
  "panelBg",
  "panelBorder",
  "panelBorderSubtle",
  "buttonBg",
  "buttonBgDisabled",
  "buttonFgDisabled",
  "squareLight",
  "squareDark",
  "pieceWhite",
  "pieceBlack",
  "highlightFrom",
  "highlightTo",
  "highlightExtra",
];

describe("THEME-01: every theme defines every token", () => {
  for (const name of THEME_NAMES) {
    it(`${name} has every required token`, () => {
      const tokens = THEMES[name];
      for (const key of REQUIRED_KEYS) {
        expect(tokens[key], `${name} missing token ${key}`).toBeDefined();
        expect(tokens[key].length, `${name}.${key} is empty`).toBeGreaterThan(0);
      }
    });
  }
});

describe("THEME-02: light vs dark squares are visibly distinguishable in every theme", () => {
  for (const name of THEME_NAMES) {
    it(`${name}: square contrast ≥ 1.4`, () => {
      const t = THEMES[name];
      const ratio = contrastRatio(t.squareLight, t.squareDark);
      expect(ratio, `${name} squares contrast ${ratio.toFixed(2)} too low`).toBeGreaterThanOrEqual(
        1.4,
      );
    });
  }
});

describe("THEME-03: piece glyphs have ≥ 3:1 contrast against the opposite-shade square", () => {
  for (const name of THEME_NAMES) {
    it(`${name}: white piece on dark square ≥ 3.0`, () => {
      const t = THEMES[name];
      const r = contrastRatio(t.pieceWhite, t.squareDark);
      expect(r, `${name} white-on-dark contrast ${r.toFixed(2)} too low`).toBeGreaterThanOrEqual(
        3.0,
      );
    });
    it(`${name}: black piece on light square ≥ 3.0`, () => {
      const t = THEMES[name];
      const r = contrastRatio(t.pieceBlack, t.squareLight);
      expect(r, `${name} black-on-light contrast ${r.toFixed(2)} too low`).toBeGreaterThanOrEqual(
        3.0,
      );
    });
  }
});

describe("THEME-04: a default theme is always defined", () => {
  it("DEFAULT_THEME is one of the registered themes", () => {
    expect(THEME_NAMES).toContain(DEFAULT_THEME);
  });
  it("THEMES has an entry for DEFAULT_THEME", () => {
    expect(THEMES[DEFAULT_THEME]).toBeDefined();
  });
});
