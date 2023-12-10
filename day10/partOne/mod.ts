import { getLoopSteps, Grid } from "../types.ts";

export function partOne(grid: Grid): number {
  return getLoopSteps(grid).size / 2;
}
