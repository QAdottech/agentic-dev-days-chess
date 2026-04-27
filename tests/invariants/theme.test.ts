import { describe, it, expect } from "vitest";
import {
  DARK_THEME,
  LIGHT_THEME,
  THEME_MODES,
  Theme,
  ThemeMode,
  contrastRatio,
  getTheme,
  isThemeMode,
  nextMode,
} from "@/app/lib/theme";

const themes: { name: string; theme: Theme }[] = [
  { name: "dark", theme: DARK_THEME },
  { name: "light", theme: LIGHT_THEME },
];

describe("THEME-01: Exactly two theme modes exist (dark, light)", () => {
  it("THEME_MODES has length 2", () => {
    expect(THEME_MODES).toHaveLength(2);
  });

  it("THEME_MODES contains both 'dark' and 'light'", () => {
    expect(THEME_MODES).toContain("dark");
    expect(THEME_MODES).toContain("light");
  });

  it("isThemeMode accepts only 'dark' and 'light'", () => {
    expect(isThemeMode("dark")).toBe(true);
    expect(isThemeMode("light")).toBe(true);
    expect(isThemeMode("solar")).toBe(false);
    expect(isThemeMode(null)).toBe(false);
    expect(isThemeMode(undefined)).toBe(false);
  });
});

describe("THEME-02: getTheme(mode).mode === mode", () => {
  it.each(THEME_MODES)("getTheme('%s') round-trips", (mode) => {
    expect(getTheme(mode).mode).toBe(mode);
  });
});

describe("THEME-03: nextMode is involutive", () => {
  it.each(THEME_MODES)("nextMode(nextMode('%s')) === '%s'", (mode) => {
    expect(nextMode(nextMode(mode))).toBe(mode);
  });

  it("nextMode toggles between the two modes", () => {
    expect(nextMode("dark")).toBe("light");
    expect(nextMode("light")).toBe("dark");
  });
});

describe("THEME-04: Both themes share the same token keys", () => {
  it("dark and light have identical key sets", () => {
    const darkKeys = Object.keys(DARK_THEME).sort();
    const lightKeys = Object.keys(LIGHT_THEME).sort();
    expect(lightKeys).toEqual(darkKeys);
  });
});

describe("THEME-05: All token values are non-empty strings", () => {
  it.each(themes)("$name: every token is a non-empty string", ({ theme }) => {
    for (const [key, value] of Object.entries(theme)) {
      expect(typeof value, `${key}`).toBe("string");
      expect((value as string).length, `${key}`).toBeGreaterThan(0);
    }
  });
});

describe("THEME-06: Pieces have ≥4.5:1 contrast on the opposite-color square", () => {
  // White piece on dark square; black piece on light square. The same-color
  // pairing (white on light, black on dark) relies on a textShadow at render
  // time and isn't a pure-color invariant.
  it.each(themes)(
    "$name: white piece on dark square ≥ 4.5:1",
    ({ theme }) => {
      expect(contrastRatio(theme.whitePiece, theme.squareDark)).toBeGreaterThanOrEqual(4.5);
    },
  );

  it.each(themes)(
    "$name: black piece on light square ≥ 4.5:1",
    ({ theme }) => {
      expect(contrastRatio(theme.blackPiece, theme.squareLight)).toBeGreaterThanOrEqual(4.5);
    },
  );
});

describe("THEME-07: textPrimary on surface ≥ 4.5:1 (body text)", () => {
  it.each(themes)("$name", ({ theme }) => {
    expect(contrastRatio(theme.textPrimary, theme.surface)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("THEME-08: textOnAccent on accent ≥ 4.5:1", () => {
  it.each(themes)("$name", ({ theme }) => {
    expect(contrastRatio(theme.textOnAccent, theme.accent)).toBeGreaterThanOrEqual(4.5);
  });
});

describe("contrastRatio: sanity", () => {
  it("returns ~21 for black on white", () => {
    expect(contrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 0);
  });

  it("returns 1 for identical colors", () => {
    expect(contrastRatio("#abcdef", "#abcdef")).toBe(1);
  });

  it("returns 0 for invalid input", () => {
    expect(contrastRatio("not-a-color", "#ffffff")).toBe(0);
  });
});

// Type assertion: ThemeMode union is exhausted
const _exhaust: ThemeMode = "dark";
void _exhaust;
