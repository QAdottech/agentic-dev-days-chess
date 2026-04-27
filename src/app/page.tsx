"use client";

import { useState } from "react";
import { INITIAL_BOARD, applyMoves } from "./lib/chess";
import { OPENINGS } from "./lib/openings";
import { tokenVar } from "./lib/theme";
import Board from "./components/Board";
import MoveDisplay from "./components/MoveDisplay";
import OpeningSelector from "./components/OpeningSelector";
import Controls from "./components/Controls";
import MoveList from "./components/MoveList";
import CheatSheet from "./components/CheatSheet";
import ThemeToggle from "./components/ThemeToggle";
import FlipToggle from "./components/FlipToggle";

export default function Home() {
  const [selectedOpening, setSelectedOpening] = useState("italian");
  const [moveIndex, setMoveIndex] = useState(-1);
  const [flipped, setFlipped] = useState(false);

  const opening = OPENINGS[selectedOpening];
  const moves = opening.moves;
  const board =
    moveIndex >= 0 ? applyMoves(INITIAL_BOARD, moves, moveIndex) : INITIAL_BOARD;
  const currentMove = moveIndex >= 0 ? moves[moveIndex] : null;

  function handleSelectOpening(key: string) {
    setSelectedOpening(key);
    setMoveIndex(-1);
  }

  function handleReset() {
    setMoveIndex(-1);
  }

  function handleBack() {
    setMoveIndex((prev) => Math.max(-1, prev - 1));
  }

  function handleNext() {
    setMoveIndex((prev) => Math.min(moves.length - 1, prev + 1));
  }

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: tokenVar("bg"),
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: tokenVar("accent") }}>
              Chess Openings
            </h1>
            <p className="mt-1 text-sm" style={{ color: tokenVar("fgMuted") }}>
              Interactive guide to classic opening theory
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <FlipToggle flipped={flipped} onToggle={() => setFlipped((f) => !f)} />
            <ThemeToggle />
          </div>
        </div>

        {/* Opening selector */}
        <div className="mb-6">
          <OpeningSelector
            selected={selectedOpening}
            onSelect={handleSelectOpening}
          />
        </div>

        {/* Opening description */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold" style={{ color: tokenVar("fg") }}>
            {opening.name}
          </h2>
          <p className="mt-1 text-sm leading-relaxed" style={{ color: tokenVar("fgMuted") }}>
            {opening.description}
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Board + controls */}
          <div className="flex flex-col items-center gap-4">
            <Board board={board} currentMove={currentMove} flipped={flipped} />
            <Controls
              onReset={handleReset}
              onBack={handleBack}
              onNext={handleNext}
              canGoBack={moveIndex >= 0}
              canGoNext={moveIndex < moves.length - 1}
            />
            <MoveDisplay move={currentMove} />
          </div>

          {/* Right: Move list + cheat sheet */}
          <div className="flex min-w-[280px] flex-col gap-4 lg:flex-1">
            <MoveList
              moves={moves}
              currentIndex={moveIndex}
              onSelect={setMoveIndex}
            />
            <CheatSheet />
          </div>
        </div>
      </div>
    </div>
  );
}
