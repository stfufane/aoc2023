import { hash_string } from "../../utils.ts";
import { Direction, Dish, northSupport, tilt } from "../types.ts";

export function partTwo(dish: Dish): number {
  const directions = [
    Direction.North,
    Direction.West,
    Direction.South,
    Direction.East,
  ];

  const cycles: number[] = [];
  let north_supports: number[] = [];
  let cycle_length = 0;
  while (true) {
    for (const direction of directions) {
      tilt(dish, direction);
    }
    const cycle = hash_string(
      dish.tiles.map((tiles) => tiles.join("")).join(""),
    );
    const north_support = northSupport(dish);
    const found = cycles.indexOf(cycle);
    if (found > -1) {
      cycle_length = cycles.length - found;
      north_supports = north_supports.slice(found);
      break;
    }
    cycles.push(cycle);
    north_supports.push(north_support);
  }
  const final_index = (1_000_000_000 - cycles.length - 1) % cycle_length;
  return north_supports[final_index];
}
