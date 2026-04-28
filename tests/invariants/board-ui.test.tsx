import { afterEach, describe, expect, it } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";

import Board from "@/app/components/Board";
import { INITIAL_BOARD, Move } from "@/app/lib/chess";

afterEach(() => {
  cleanup();
});

describe("UI-01: The origin and destination highlights match the move coordinates", () => {
  it("highlights e2 and e4 for move 1. e4", () => {
    const move: Move = {
      notation: "1. e4",
      description: "",
      from: { row: 6, col: 4 },
      to: { row: 4, col: 4 },
    };

    render(<Board board={INITIAL_BOARD} currentMove={move} />);

    expect(screen.getByTestId("square-6-4")).toHaveAttribute("data-highlight", "true");
    expect(screen.getByTestId("square-4-4")).toHaveAttribute("data-highlight", "true");
    expect(screen.getByTestId("square-6-5")).toHaveAttribute("data-highlight", "false");
  });
});

describe("UI-02: Previous origin highlights clear when stepping to the next move", () => {
  it("does not leave stale origin highlights on earlier squares", () => {
    const nf3: Move = {
      notation: "2. Nf3",
      description: "",
      from: { row: 7, col: 6 },
      to: { row: 5, col: 5 },
    };
    const nc6: Move = {
      notation: "2... Nc6",
      description: "",
      from: { row: 0, col: 1 },
      to: { row: 2, col: 2 },
    };

    const { rerender } = render(<Board board={INITIAL_BOARD} currentMove={nf3} />);
    expect(screen.getByTestId("square-7-6")).toHaveAttribute("data-highlight", "true");

    rerender(<Board board={INITIAL_BOARD} currentMove={nc6} />);

    expect(screen.getByTestId("square-7-6")).toHaveAttribute("data-highlight", "false");
    expect(screen.getByTestId("square-0-1")).toHaveAttribute("data-highlight", "true");
  });
});
