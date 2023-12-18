import { Coordinates } from "../../utils.ts";
import {
  colorToInstruction,
  DirectionVectors,
  getArea,
  Hole,
  Instruction,
} from "../types.ts";

export function partTwo(instructions: Instruction[]): number {
  const trench = new Array<Hole>();
  const new_instructions = instructions.map((instruction) => {
    return colorToInstruction(instruction.color);
  });
  let current_coords: Coordinates = { x: 0, y: 0 };
  for (const instruction of new_instructions) {
    const { direction, steps, color: _ } = instruction;
    const { x: dx, y: dy } = DirectionVectors.get(direction)!;
    current_coords = {
      x: current_coords.x + (dx * steps),
      y: current_coords.y + (dy * steps),
    };
    trench.push(current_coords);
  }
  // Push the first row again
  trench.push(trench.at(0)!);

  // Using the shoelace formula to calculate area
  return getArea(trench, new_instructions);
}
