import { beat_record, Race } from "../mod.ts";

export function partOne(races: Race[]): number {
  return races.map((race) => beat_record(race)).reduce((a, b) => a * b, 1);
}
