import { Race } from "../mod.ts";

export function partOne(races: Race[]): number {
  return races.map((race) => {
    return Array.from({ length: race.time }, (_, time) => time + 1).map(
      (time) => {
        return time * (race.time - time);
      },
    ).filter((distance) => {
      return distance > race.distance;
    }).length;
  }).reduce((a, b) => a * b, 1);
}
