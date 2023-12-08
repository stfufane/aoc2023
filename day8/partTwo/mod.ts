import { MapInstructions } from "../mod.ts";

function gcd(a: number, b: number) {
  if (b == 0) {
    return a;
  }
  return gcd(b, a % b);
}

function lcm(arr: number[]) {
  let lcm = arr[0];
  for (let i = 1; i < arr.length; i++) {
    lcm = (arr[i] * lcm) /
      (gcd(arr[i], lcm));
  }
  return lcm;
}

export function partTwo(map: MapInstructions): number {
  const all_starts = Array.from(
    map.instructions.filter((instruction) => instruction.start[2] == "A").map((
      instruction,
    ) => instruction.start),
  );
  const all_steps = all_starts.map((start): number => {
    let steps = 0;
    while (!start.endsWith("Z")) {
      const next_direction = map.directions[steps % map.directions.length];
      const next_destination = map.instructions.find((instruction) =>
        instruction.start === start
      );
      start = Reflect.get(next_destination!, next_direction);
      steps++;
    }
    return steps;
  });
  return lcm(all_steps);
}
