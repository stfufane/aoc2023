import { Coordinates } from "../../utils.ts";
import { Grid } from "../mod.ts";
import {
  ascend,
  BinaryHeap,
} from "https://deno.land/std@0.209.0/data_structures/mod.ts";

function inBounds(grid: Grid, coordinates: Coordinates): boolean {
  return (
    coordinates.x >= 0 && coordinates.x < grid[0].length &&
    coordinates.y >= 0 && coordinates.y < grid.length
  );
}

interface Path {
  x: number;
  y: number;
  dx: number;
  dy: number;
  straight_moves: number;
}

interface HeatPath extends Path {
  heat_loss: number;
}

export function partOne(grid: Grid): number {
  // Implement A-Star algorithm to find the shortest path between start and end.
  const seen_paths = new Array<Path>();
  const heat_paths = new BinaryHeap<HeatPath>((a, b) =>
    ascend(a.heat_loss, b.heat_loss)
  );
  heat_paths.push({
    x: 0,
    y: 0,
    dx: 0,
    dy: 0,
    straight_moves: 0,
    heat_loss: 0,
  });

  while (heat_paths.length > 0) {
    const heat_path = heat_paths.pop()!;
    if (
      heat_path.x == grid[0].length - 1 &&
      heat_path.y == grid.length - 1
    ) {
      return heat_path.heat_loss;
    }

    if (
      seen_paths.find((path) =>
        path.x === heat_path.x && path.y === heat_path.y &&
        path.dx === heat_path.dx && path.dy === heat_path.dy &&
        path.straight_moves == heat_path.straight_moves
      ) !== undefined
    ) {
      continue;
    }

    seen_paths.push(heat_path);

    if (
      heat_path.straight_moves < 3 && (heat_path.dx !== 0 || heat_path.dy !== 0)
    ) {
      const next_coordinates = {
        x: heat_path.x + heat_path.dx,
        y: heat_path.y + heat_path.dy,
      };
      if (inBounds(grid, next_coordinates)) {
        const heat_loss = heat_path.heat_loss +
          Number(grid[next_coordinates.y][next_coordinates.x]);
        heat_paths.push({
          x: next_coordinates.x,
          y: next_coordinates.y,
          dx: heat_path.dx,
          dy: heat_path.dy,
          heat_loss,
          straight_moves: heat_path.straight_moves + 1,
        });
      }
    }

    for (
      const [next_dx, next_dy] of [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0],
      ]
    ) {
      if (
        (next_dx != heat_path.dx || next_dy != heat_path.dy) &&
        (next_dx != -heat_path.dx || next_dy != -heat_path.dy)
      ) {
        const next_coordinates = {
          x: heat_path.x + next_dx,
          y: heat_path.y + next_dy,
        };
        if (inBounds(grid, next_coordinates)) {
          const heat_loss = heat_path.heat_loss +
            Number(grid[next_coordinates.y][next_coordinates.x]);
          heat_paths.push({
            x: next_coordinates.x,
            y: next_coordinates.y,
            dx: next_dx,
            dy: next_dy,
            heat_loss,
            straight_moves: 1,
          });
        }
      }
    }
  }
  return 0;
}
