import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { SpringRow } from "./types.ts";

export function preprocess(text: string, isPart2: boolean): SpringRow[] {
  const size = isPart2 ? 5 : 1;
  return text.split("\n")
    .map((line) => line.split(" "))
    .map(([springs, pattern]): SpringRow => ({
      springs: new Array<string>(size).fill(springs).flat().join("?"),
      pattern: new Array<string>(size).fill(pattern).flat().join(",")
        .split(",").map(Number),
    }));
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text, isPart2);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
