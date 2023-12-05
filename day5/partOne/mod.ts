import { SeedsMaps } from "../types.ts";

export function partOne(seeds_maps: SeedsMaps): number {
  const seed_locations = seeds_maps.seeds.map((seed) => {
    let current_location = seed;
    for (const location_map of seeds_maps.maps) {
      for (const { source, destination } of location_map) {
        if (
          current_location >= source.start && current_location <= source.end
        ) {
          current_location = destination.start +
            (current_location - source.start);
          break;
        }
      }
    }
    return current_location;
  });
  return Math.min(...seed_locations);
}
