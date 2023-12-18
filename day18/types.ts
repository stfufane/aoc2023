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

export function getArea(
  trench: Array<Hole>,
  instructions: Instruction[],
): number {
  // Use shoelace formula to calculate area
  let area = 0;
  for (let i = 0; i < trench.length - 1; i++) {
    const { x: x1, y: y1 } = trench[i];
    const { x: x2, y: y2 } = trench[i + 1];
    area += x1 * y2 - y1 * x2;
  }
  const trench_length = instructions.reduce((acc, curr) => acc + curr.steps, 1);
  return (trench_length + 1 + Math.abs(area)) / 2;
}
