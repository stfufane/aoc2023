import { Direction, Dish, northSupport, tilt } from "../types.ts";

export function partOne(dish: Dish): number {
  tilt(dish, Direction.North);
  return northSupport(dish);
}
