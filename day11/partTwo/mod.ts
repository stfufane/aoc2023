import { getPlanetsDistance, getPlanetsExpanded, Universe } from "../types.ts";

export function partTwo(universe: Universe): number {
  return getPlanetsDistance(getPlanetsExpanded(universe, 1_000_000));
}
