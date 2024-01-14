import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Brick, fall_bricks } from "./types.ts";

export function preprocess(text: string): Brick[] {
  const bricks: Brick[] = text.split("\n").map((line, index) => {
    const [start, end] = line.split("~");
    const [x, y, z] = start.split(",").map(Number);
    const [x2, y2, z2] = end.split(",").map(Number);
    if (z > z2) {
      throw new Error("z must be smaller than z2");
    }
    return {
      start: { x, y, z },
      end: { x: x2 + 1, y: y2 + 1, z: z2 + 1 },
      id: index + 1,
    };
  });
  fall_bricks(bricks);
  return bricks;
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
