"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { INITIAL_BOARD, applyMoves } from "../lib/chess";
import { OPENINGS } from "../lib/openings";
import { deserialize, serialize } from "../lib/sharing";
import Board from "./Board";
import MoveDisplay from "./MoveDisplay";
import OpeningSelector from "./OpeningSelector";
import Controls from "./Controls";
import MoveList from "./MoveList";
import CheatSheet from "./CheatSheet";
import ThemeToggle from "./ThemeToggle";
import ShareButton from "./ShareButton";
import { useTheme } from "./ThemeProvider";

export default function HomeClient() {
  const { theme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = deserialize(searchParams.toString());
  const [selectedOpening, setSelectedOpening] = useState(initial.opening);
  const [moveIndex, setMoveIndex] = useState(initial.moveIndex);

  // Reflect current state into the URL without scrolling.
  useEffect(() => {
    const next = serialize({ opening: selectedOpening, moveIndex });
    if (next !== `?${searchParams.toString()}`) {
      router.replace(next, { scroll: false });
    }
  }, [selectedOpening, moveIndex, router, searchParams]);

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
        backgroundColor: theme.bg,
        fontFamily: "'Georgia', 'Times New Roman', serif",
      }}
    >
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold" style={{ color: theme.accent }}>
              Chess Openings
            </h1>
            <p className="mt-1 text-sm" style={{ color: theme.textMuted }}>
              Interactive guide to classic opening theory
            </p>
          </div>
          <div className="flex gap-2">
            <ShareButton opening={selectedOpening} moveIndex={moveIndex} />
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
          <h2
            className="text-xl font-semibold"
            style={{ color: theme.textPrimary }}
          >
            {opening.name}
          </h2>
          <p
            className="mt-1 text-sm leading-relaxed"
            style={{ color: theme.textMuted }}
          >
            {opening.description}
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Left: Board + controls */}
          <div className="flex flex-col items-center gap-4">
            <Board board={board} currentMove={currentMove} />
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
