import {
  buildTrench,
  colorToInstruction,
  getArea,
  Instruction,
} from "../types.ts";

export function partTwo(instructions: Instruction[]): number {
  const new_instructions = instructions.map((instruction) => {
    return colorToInstruction(instruction.color);
  });
  return getArea(
    buildTrench(new_instructions),
    new_instructions.map((instruction) => instruction.steps),
  );
}
