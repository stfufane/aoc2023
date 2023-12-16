import { Direction, Dish, northSupport, tilt } from "../types.ts";

export function partTwo(dish: Dish): number {
  const directions = [
    Direction.North,
    Direction.West,
    Direction.South,
    Direction.East,
  ];

  const north_supports: number[] = [];
  let to_process = 1_000_000_000;
  while (true) {
    directions.forEach((direction) => tilt(dish, direction));
    to_process--;
    const north_support = northSupport(dish);
    const found = north_supports.indexOf(north_support);
    if (
      found > 1 &&
      north_supports[found - 1] === north_supports[north_supports.length - 1]
    ) {
      return north_supports.slice(
        found,
      )[to_process % (north_supports.length - found)];
    }
    north_supports.push(north_support);
  }
}
