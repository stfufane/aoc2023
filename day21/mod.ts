import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export enum Tile {
  Plot = ".",
  Rock = "#",
  Start = "S",
}

export type Grid = Tile[][];

export function preprocess(text: string): Grid {
  return text.split("\n").map((line) => line.split("") as Tile[]);
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
