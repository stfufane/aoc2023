import { MapInstructions } from "../mod.ts";

export function partOne(map: MapInstructions): number {
  let steps = 0;
  let start = "AAA";
  while (start !== "ZZZ") {
    const next_direction = map.directions[steps % map.directions.length];
    const next_destination = map.instructions.find((instruction) =>
      instruction.start === start
    );
    start = Reflect.get(next_destination!, next_direction);
    steps++;
  }
  return steps;
}
