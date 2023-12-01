import { sumNumbers } from "../mod.ts";

export function partTwo(input: string[]): number {
  // Lookahead regex to match digits and alpha numbers
  // Thanks : https://mtsknn.fi/blog/how-to-do-overlapping-matches-with-regular-expressions/
  const pattern = /(?=(\d|one|two|three|four|five|six|seven|eight|nine))/g;
  return input.map((line) => {
    return sumNumbers(Array.from(line.matchAll(pattern), (m) => m[1]));
  })
    .reduce((a, b) => a + b);
}
