import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

interface MapInstruction {
  start: string;
  L: string;
  R: string;
}

export interface MapInstructions {
  directions: string[];
  instructions: MapInstruction[];
}

export function preprocess(text: string): MapInstructions {
  return {
    directions: text.split("\n\n")[0].split(""),
    instructions: text
      .split("\n")
      .slice(2)
      .map((line) => line.replaceAll(/[=\(,\)]/g, ""))
      .map(
        (line) => {
          const [start, L, R] = line.split(/\s+/g);
          return { start, L, R };
        },
      ),
  };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
