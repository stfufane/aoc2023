import { hash_string } from "../../utils.ts";
import { Grid, Tile } from "../mod.ts";

export function partOne(grid: Grid): number {
  const start_row = grid.findIndex((row) => row.includes(Tile.Start));
  const start_col = grid[start_row].findIndex((tile) => tile === Tile.Start);
  const start = [start_row, start_col] as Position;
  grid[start_row][start_col] = Tile.Plot;
  const possible_ends = DFS(grid, start, 64);
  return possible_ends.length;
}

type Position = [number, number];
const checked_paths = new Set<number>();

function DFS(
  grid: Grid,
  pos: Position,
  steps: number,
): Position[] {
  if (steps === 0) {
    return [pos];
  }

  const [x, y] = pos;
  const possible_ends: Position[] = [];

  // directions: up, down, left, right
  const directions = [[-1, 0], [1, 0], [0, -1], [0, 1]];
  for (const [dx, dy] of directions) {
    const newX = x + dx;
    const newY = y + dy;
    if (
      newX >= 0 && newX < grid.length && newY >= 0 && newY < grid[0].length &&
      grid[newX][newY] === Tile.Plot
    ) {
      const hash = hash_string([newX, newY, steps - 1].join(","));
      if (checked_paths.has(hash)) {
        continue;
      }
      checked_paths.add(hash);
      possible_ends.push(...DFS(grid, [newX, newY], steps - 1));
    }
  }

  return possible_ends;
}
