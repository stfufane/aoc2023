import { DirectionVectors, getArea, Hole, Instruction } from "../types.ts";

export function partOne(instructions: Instruction[]): number {
  const trench = new Array<Hole>();
  let current_hole: Hole = { x: 0, y: 0 };
  for (const instruction of instructions) {
    const { direction, steps, color: _ } = instruction;
    const { x: dx, y: dy } = DirectionVectors.get(direction)!;
    current_hole = {
      x: current_hole.x + (dx * steps),
      y: current_hole.y + (dy * steps),
    };
    trench.push(current_hole);
  }
  // Push the first row again
  trench.push(trench.at(0)!);

  // Using the shoelace formula to calculate area
  return getArea(trench, instructions);
}
