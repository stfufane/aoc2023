import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Direction, Instruction } from "./types.ts";

export function preprocess(text: string): Instruction[] {
  return text.split("\n").map((line) => {
    const [direction, steps, color] = line.replace(/[\(\)]/g, "").split(" ");
    return {
      direction: direction as Direction,
      steps: Number(steps),
      color,
    };
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
