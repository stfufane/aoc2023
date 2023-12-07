import { beat_record } from "../mod.ts";

export function partTwo(input: string): number {
  const [total_time, max_distance] = input.split("\n").map((x) =>
    Number(x.replaceAll(/\s+/g, "").split(":")[1])
  );

  return beat_record({ time: total_time, distance: max_distance });
}
