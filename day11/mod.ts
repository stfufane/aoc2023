import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Planet, Universe } from "./types.ts";

export function preprocess(text: string): Universe {
  // Init the lines from the text
  const lines = text.split("\n").map((line) =>
    line.split("").map((char) => char === "." ? 0 : 1)
  );

  // Flat the lines to get all values
  const all_values = lines.flatMap((line) => line);

  // Init the columns from the values
  const columns: number[][] = [];
  for (let i = 0; i < lines[0].length; i++) {
    columns.push([]);
  }
  for (let i = 0; i < all_values.length; i++) {
    columns[i % lines[0].length].push(all_values[i]);
  }

  // Find the planet coordinates
  const planets: Planet[] = [];
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[0].length; j++) {
      if (lines[i][j] === 1) {
        planets.push({ x: j, y: i });
      }
    }
  }

  return { planets, lines, columns };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
