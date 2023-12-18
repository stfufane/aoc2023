import { SpringRow, validPermutations } from "../types.ts";

export function partOne(spring_rows: SpringRow[]): number {
  return spring_rows.reduce((acc, row) => acc + validPermutations(row), 0);
}
