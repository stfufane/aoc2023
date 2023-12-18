import { getShortestPath, Grid } from "../types.ts";

export function partOne(grid: Grid): number {
  return getShortestPath(grid, 0, 3);
}
