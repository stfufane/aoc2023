import { SpringRow, validPermutations } from "../types.ts";

export function partTwo(spring_rows: SpringRow[]): number {
  return spring_rows.reduce((acc, row) => acc + validPermutations(row), 0);
}
