import { hash_pair } from "../../utils.ts";
import { getLoopSteps, Grid } from "../types.ts";

const BLUE_TEXT = "\x1b[34m";
const YELLOW_BACKGROUND = "\x1b[43m";
const RESET = "\x1b[0m";

export function partTwo(grid: Grid): number {
  const loop_coordinates = getLoopSteps(grid);
  // Use non-zero winding rule to determine if a point is inside the loop
  // https://en.wikipedia.org/wiki/Nonzero-rule
  let count = 0;
  for (let y = 0; y < grid.tiles.length - 1; y++) {
    let winding_number = 0;
    let line = "";
    for (let x = 0; x < grid.tiles[y].length; x++) {
      const step = loop_coordinates.get(hash_pair(x, y));
      if (step != undefined) {
        // Process winding number for the current row.
        // For that we check the point below the current point
        // and see if it is the previous or next on the loop.
        const step_below = loop_coordinates.get(hash_pair(x, y + 1));
        if (step_below !== undefined) {
          if (step_below.count === step.count - 1) {
            winding_number++;
          } else if (
            step_below.count === (step.count + 1) % loop_coordinates.size
          ) {
            winding_number--;
          }
        }
        line += BLUE_TEXT + step.tile + RESET;
        // Go to the next point of the row.
        continue;
      }

      // Check if the point is inside the loop.
      if (winding_number !== 0) {
        line += YELLOW_BACKGROUND + " " + RESET;
        count++;
      } else {
        line += " ";
      }
    }
    console.log(line);
  }

  return count;
}
