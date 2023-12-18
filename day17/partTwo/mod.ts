import { getShortestPath, Grid } from "../types.ts";

export function partTwo(grid: Grid): number {
  return getShortestPath(grid, 4, 10);
}
