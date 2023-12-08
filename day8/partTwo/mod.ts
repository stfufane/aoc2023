import { lcm } from "../../utils.ts";
import { MapInstructions } from "../mod.ts";

export function partTwo(map: MapInstructions): number {
  return lcm(
    Array.from(map.instructions.keys())
      .filter((start) => start.endsWith("A"))
      .map((start): number => {
        let steps = 0;
        while (!start.endsWith("Z")) {
          const next_direction = map.directions[steps % map.directions.length];
          const next_destination = map.instructions.get(start);
          start = next_destination![next_direction];
          steps++;
        }
        return steps;
      }),
  );
}
