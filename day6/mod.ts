import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export interface Race {
  time: number;
  distance: number;
}

// Solve quadratic equation for time
export function beat_record(race: Race): number {
  const delta = race.time ** 2 - 4 * race.distance;
  const rdelta = Math.sqrt(delta);

  const t1 = Math.floor((race.time - rdelta) / 2.0);
  const t2 = Math.ceil((race.time + rdelta) / 2.0);

  return t2 - t1 - 1;
}

export function preprocess(text: string): Race[] {
  const [times_line, distances_line] = text.split("\n").map((x) =>
    x.split(/\s+/)
  );
  const times = times_line.map((x) => parseInt(x)).filter((x) => !isNaN(x));
  const distances = distances_line.map((x) => parseInt(x)).filter((x) =>
    !isNaN(x)
  );
  return Array.from({ length: times.length }, (_, i) => ({
    time: times[i],
    distance: distances[i],
  }));
}

export function main(text: string, isPart2: boolean) {
  if (isPart2) {
    return partTwo(text);
  }
  const input = preprocess(text);
  return partOne(input);
}

export { partOne, partTwo };
