import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Grid, Tile } from "./types.ts";

export function preprocess(text: string): Grid {
  const grid: Grid = { tiles: [] };
  text.split("\n")
    .map((line): Tile[] => line.split("").map((char) => char as Tile))
    .map((tiles) => grid.tiles.push(tiles));
  return grid;
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
