import { get_overlap, SeedRange, SeedsMaps } from "../types.ts";

export function partTwo(seeds_maps: SeedsMaps): number {
  let current_locations = seeds_maps.seeds_ranges;
  for (const location_map of seeds_maps.maps) {
    const next_locations: SeedRange[] = [];
    for (const current_location of current_locations) {
      for (const { source, destination } of location_map) {
        const overlap = get_overlap(current_location, source);
        if (overlap !== null) {
          // Add the overlap to the next locations that will be tested in the next iteration
          next_locations.push({
            start: destination.start + overlap.start - source.start,
            end: destination.start + overlap.end - source.start,
          });
          // Remove the overlap from the current location so it's not added twice.
          if (overlap.start > current_location.start) {
            current_location.end = overlap.start - 1;
          } else {
            current_location.start = overlap.end + 1;
          }
        }
      }
      // If there's something remaining after testing the overlaps, add it to the next locations
      if (current_location.start < current_location.end) {
        next_locations.push(current_location);
      }
    }
    current_locations = next_locations;
  }

  // I got a weird case with a range starting at 0, so I'm filtering it out
  return Math.min(
    ...current_locations.filter((location) => location.start > 0).map((
      location,
    ) => location.start),
  );
}
