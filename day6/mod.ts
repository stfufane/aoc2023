import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export interface Race {
  time: number;
  distance: number;
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
