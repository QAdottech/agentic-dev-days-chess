import { OPENINGS } from "./openings";

export interface SharedState {
  opening: string;
  moveIndex: number;
}

export const DEFAULT_OPENING = "italian";
export const DEFAULT_MOVE_INDEX = -1;

const OPENING_PARAM = "opening";
const MOVE_PARAM = "move";

export function getDefaultState(): SharedState {
  return { opening: DEFAULT_OPENING, moveIndex: DEFAULT_MOVE_INDEX };
}

function clampMoveIndex(opening: string, raw: number): number {
  const moves = OPENINGS[opening]?.moves;
  if (!moves) return DEFAULT_MOVE_INDEX;
  if (!Number.isFinite(raw)) return DEFAULT_MOVE_INDEX;
  const max = moves.length - 1;
  if (raw < -1) return -1;
  if (raw > max) return max;
  return Math.trunc(raw);
}

export function serialize(state: SharedState): string {
  const params = new URLSearchParams();
  params.set(OPENING_PARAM, state.opening);
  params.set(MOVE_PARAM, String(state.moveIndex));
  return `?${params.toString()}`;
}

export function deserialize(input: string | URLSearchParams | null | undefined): SharedState {
  if (!input) return getDefaultState();

  let params: URLSearchParams;
  if (input instanceof URLSearchParams) {
    params = input;
  } else {
    const trimmed = input.trim();
    if (!trimmed) return getDefaultState();
    const queryStart = trimmed.indexOf("?");
    const queryString = queryStart >= 0 ? trimmed.slice(queryStart + 1) : trimmed;
    try {
      params = new URLSearchParams(queryString);
    } catch {
      return getDefaultState();
    }
  }

  const rawOpening = params.get(OPENING_PARAM);
  const opening =
    rawOpening && rawOpening in OPENINGS ? rawOpening : DEFAULT_OPENING;

  const rawMove = params.get(MOVE_PARAM);
  const parsedMove = rawMove === null ? DEFAULT_MOVE_INDEX : Number.parseInt(rawMove, 10);
  const moveIndex = clampMoveIndex(opening, parsedMove);

  return { opening, moveIndex };
}

export function buildShareUrl(origin: string, pathname: string, state: SharedState): string {
  return `${origin}${pathname}${serialize(state)}`;
}
