import { describe, it, expect } from "vitest";
import {
  DEFAULT_MOVE_INDEX,
  DEFAULT_OPENING,
  buildShareUrl,
  deserialize,
  getDefaultState,
  serialize,
} from "@/app/lib/sharing";
import { OPENINGS } from "@/app/lib/openings";

const openingKeys = Object.keys(OPENINGS);

describe("SHARE-01: deserialize(serialize(state)) === state (round-trip)", () => {
  it.each(openingKeys)("%s: every valid moveIndex round-trips", (opening) => {
    const moves = OPENINGS[opening].moves;
    for (let i = -1; i < moves.length; i++) {
      const original = { opening, moveIndex: i };
      const out = deserialize(serialize(original));
      expect(out, `at moveIndex ${i}`).toEqual(original);
    }
  });
});

describe("SHARE-02: serialize is deterministic", () => {
  it("same input → same output", () => {
    const state = { opening: "italian", moveIndex: 2 };
    expect(serialize(state)).toBe(serialize(state));
  });

  it.each(openingKeys)("%s: stable across calls", (opening) => {
    const state = { opening, moveIndex: 0 };
    const first = serialize(state);
    for (let i = 0; i < 5; i++) {
      expect(serialize(state)).toBe(first);
    }
  });
});

describe("SHARE-03: deserialize handles empty / null / malformed input", () => {
  const defaults = getDefaultState();

  it("null → default", () => {
    expect(deserialize(null)).toEqual(defaults);
  });

  it("undefined → default", () => {
    expect(deserialize(undefined)).toEqual(defaults);
  });

  it("empty string → default", () => {
    expect(deserialize("")).toEqual(defaults);
  });

  it("whitespace → default", () => {
    expect(deserialize("   ")).toEqual(defaults);
  });

  it("garbage → default", () => {
    expect(deserialize("???###@@@")).toEqual(defaults);
  });

  it("missing params → default", () => {
    expect(deserialize("?other=thing")).toEqual(defaults);
  });
});

describe("SHARE-04: unknown opening falls back to default", () => {
  it("unknown opening key → default opening, default move", () => {
    expect(deserialize("?opening=does-not-exist&move=2")).toEqual({
      opening: DEFAULT_OPENING,
      moveIndex: 2,
    });
  });

  it("default move when missing", () => {
    expect(deserialize("?opening=does-not-exist")).toEqual({
      opening: DEFAULT_OPENING,
      moveIndex: DEFAULT_MOVE_INDEX,
    });
  });
});

describe("SHARE-05: out-of-range moveIndex is clamped", () => {
  it("negative beyond -1 → clamp to -1", () => {
    expect(deserialize("?opening=italian&move=-99")).toEqual({
      opening: "italian",
      moveIndex: -1,
    });
  });

  it.each(openingKeys)("%s: too-large move → clamp to last", (opening) => {
    const last = OPENINGS[opening].moves.length - 1;
    const result = deserialize(`?opening=${opening}&move=9999`);
    expect(result.moveIndex).toBe(last);
  });

  it("non-numeric → default move", () => {
    expect(deserialize("?opening=italian&move=banana")).toEqual({
      opening: "italian",
      moveIndex: DEFAULT_MOVE_INDEX,
    });
  });

  it("does not throw on any input", () => {
    const inputs = [
      "?opening=italian&move=Infinity",
      "?move=NaN",
      "?opening=&move=",
      "????",
      "%%%%",
    ];
    for (const i of inputs) {
      expect(() => deserialize(i)).not.toThrow();
    }
  });
});

describe("SHARE-06: accepts raw query strings and leading-? forms", () => {
  it("with leading ?", () => {
    expect(deserialize("?opening=sicilian&move=1")).toEqual({
      opening: "sicilian",
      moveIndex: 1,
    });
  });

  it("without leading ?", () => {
    expect(deserialize("opening=sicilian&move=1")).toEqual({
      opening: "sicilian",
      moveIndex: 1,
    });
  });

  it("URLSearchParams instance", () => {
    const params = new URLSearchParams("opening=sicilian&move=1");
    expect(deserialize(params)).toEqual({ opening: "sicilian", moveIndex: 1 });
  });
});

describe("buildShareUrl: composes a full URL", () => {
  it("attaches query string to origin + pathname", () => {
    const url = buildShareUrl("https://example.com", "/openings", {
      opening: "italian",
      moveIndex: 0,
    });
    expect(url).toBe("https://example.com/openings?opening=italian&move=0");
  });
});
