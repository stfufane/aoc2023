import { getLoopSteps, Grid } from "../types.ts";

export function partTwo(grid: Grid): number {
  const loop_coordinates = getLoopSteps(grid);
  // Use non-zero winding rule to determine if a point is inside the loop
  // https://en.wikipedia.org/wiki/Nonzero-rule
  let count = 0;
  for (let y = 0; y < grid.tiles.length - 1; y++) {
    let winding_number = 0;
    for (let x = 0; x < grid.tiles[y].length; x++) {
      const step = loop_coordinates.get(`${x},${y}`);
      if (step != undefined) {
        // Process winding number for the current row.
        // For that we check the point below the current point
        // and see if it is the previous or next on the loop.
        const step_below = loop_coordinates.get(`${x},${y + 1}`)!;
        if (step_below === step - 1) {
          winding_number++;
        } else if (
          step_below === (step + 1) % loop_coordinates.size
        ) {
          winding_number--;
        }
        // Go to the next point of the row.
        continue;
      }

      // Check if the point is inside the loop.
      if (winding_number !== 0) {
        count++;
      }
    }
  }

  return count;
}
