"use client";

const NOTATION_REF = [
  { symbol: "K", name: "King" },
  { symbol: "Q", name: "Queen" },
  { symbol: "R", name: "Rook" },
  { symbol: "B", name: "Bishop" },
  { symbol: "N", name: "Knight" },
  { symbol: "", name: "Pawn (no letter)" },
];

const PIECE_DISPLAY: Record<string, string> = {
  K: "\u2654",
  Q: "\u2655",
  R: "\u2656",
  B: "\u2657",
  N: "\u2658",
};

export default function CheatSheet() {
  return (
    <div className="rounded-lg border" style={{ borderColor: "#3a3228", backgroundColor: "#241f19" }}>
      <div className="border-b px-4 py-2" style={{ borderColor: "#3a3228" }}>
        <h3 className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
          Notation Cheat Sheet
        </h3>
      </div>
      <div className="px-4 py-3">
        <div className="grid grid-cols-2 gap-1">
          {NOTATION_REF.map((item) => (
            <div key={item.name} className="flex items-center gap-2 text-sm" style={{ color: "#e8e0d4" }}>
              {item.symbol ? (
                <>
                  <span
                    className="text-lg"
                    style={{
                      fontFamily:
                        "'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols2', 'DejaVu Sans', 'Symbola', sans-serif",
                    }}
                  >
                    {PIECE_DISPLAY[item.symbol]}
                  </span>
                  <span>
                    <span className="font-bold" style={{ color: "#c9a84c" }}>{item.symbol}</span> = {item.name}
                  </span>
                </>
              ) : (
                <span style={{ color: "#8a7e6b" }} className="italic">
                  {item.name}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-3 border-t pt-2 text-xs" style={{ borderColor: "#3a3228", color: "#8a7e6b" }}>
          <p><strong style={{ color: "#c9a84c" }}>x</strong> = captures &middot; <strong style={{ color: "#c9a84c" }}>+</strong> = check &middot; <strong style={{ color: "#c9a84c" }}>#</strong> = checkmate</p>
          <p className="mt-1"><strong style={{ color: "#c9a84c" }}>O-O</strong> = kingside castle &middot; <strong style={{ color: "#c9a84c" }}>O-O-O</strong> = queenside castle</p>
        </div>
      </div>
    </div>
  );
}
