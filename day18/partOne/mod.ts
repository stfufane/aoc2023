import { buildTrench, getArea, Instruction } from "../types.ts";

export function partOne(instructions: Instruction[]): number {
  // Using the shoelace formula to calculate area
  return getArea(
    buildTrench(instructions),
    instructions.map((instruction) => instruction.steps),
  );
}
