import { sumNumbers } from "../mod.ts";

export function partOne(input: string[]): number {
  return input.map((line) => {
    return sumNumbers(Array.from(line.match(/\d/g)!, (m) => m[0]));
  })
    .reduce((a, b) => a + b);
}
