import { getPlanetsDistance, getPlanetsExpanded, Universe } from "../types.ts";

export function partOne(universe: Universe): number {
  return getPlanetsDistance(getPlanetsExpanded(universe, 2));
}
