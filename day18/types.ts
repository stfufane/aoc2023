import { Coordinates } from "../utils.ts";

export enum Direction {
  Up = "U",
  Down = "D",
  Left = "L",
  Right = "R",
}

export interface Instruction {
  direction: Direction;
  steps: number;
  color: string;
}

export type Hole = Coordinates;

export const DirectionVectors = new Map<Direction, Coordinates>([
  [Direction.Up, { x: 0, y: -1 }],
  [Direction.Down, { x: 0, y: 1 }],
  [Direction.Left, { x: -1, y: 0 }],
  [Direction.Right, { x: 1, y: 0 }],
]);

export const ColorToDirection = new Map<number, Direction>([
  [0, Direction.Right],
  [1, Direction.Down],
  [2, Direction.Left],
  [3, Direction.Up],
]);

export function colorToInstruction(color: string): Instruction {
  const steps = parseInt(color.substring(1, 6), 16);
  const direction = ColorToDirection.get(Number(color[6]));
  return { direction: direction!, steps, color };
}

export function buildTrench(instructions: Instruction[]): Array<Hole> {
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
  return trench;
}

export function getArea(
  trench: Array<Hole>,
  steps: number[],
): number {
  // Use shoelace formula to calculate area
  let area = 0;
  for (let i = 0; i < trench.length - 1; i++) {
    const { x: x1, y: y1 } = trench[i];
    const { x: x2, y: y2 } = trench[i + 1];
    area += x1 * y2 - y1 * x2;
  }
  const trench_length = steps.reduce((acc, curr) => acc + curr, 1);
  return (trench_length + 1 + Math.abs(area)) / 2;
}
