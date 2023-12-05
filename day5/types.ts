export interface SeedRange {
  start: number;
  end: number;
}

function are_overlapping(
  seed_range: SeedRange,
  other: SeedRange,
): boolean {
  return (
    seed_range.start >= other.start && seed_range.start <= other.end ||
    seed_range.end >= other.start && seed_range.end <= other.end
  );
}

export function get_overlap(
  seed_range: SeedRange,
  other: SeedRange,
): SeedRange | null {
  if (are_overlapping(seed_range, other)) {
    return {
      start: Math.max(seed_range.start, other.start),
      end: Math.min(seed_range.end, other.end),
    };
  }
  return null;
}

export interface SeedMap {
  source: SeedRange;
  destination: SeedRange;
}

export interface SeedsMaps {
  seeds: number[];
  seeds_ranges: SeedRange[];
  maps: SeedMap[][];
}
