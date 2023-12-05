import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { SeedMap, SeedRange, SeedsMaps } from "./types.ts";

export function preprocess(text: string): SeedsMaps {
  const lines = text.split("\n\n");
  const seeds = lines[0].split(":")[1].trim().split(/\s+/).map(Number);
  const seeds_ranges: SeedRange[] = [];
  for (let i = 0; i < seeds.length; i += 2) {
    seeds_ranges.push({ start: seeds[i], end: seeds[i] + seeds[i + 1] - 1 });
  }
  const maps = lines.slice(1).map((lines): SeedMap[] => {
    return lines.split("\n").slice(1).map((line): SeedMap => {
      const [destination, source, range] = line.split(/\s+/).map(Number);
      return {
        source: { start: source, end: source + range - 1 },
        destination: { start: destination, end: destination + range - 1 },
      };
    });
  });
  return { seeds, seeds_ranges, maps };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
