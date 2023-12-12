export interface SpringRow {
  springs: string;
  pattern: number[];
}

export function checkSpringsPattern(
  springs: string,
  pattern: number[],
): boolean {
  const groups = springs.split(/[.+]+/g).filter((s) => s.length > 0);
  return groups.length === pattern.length && groups
    .every((s, i) => s.length === pattern[i]);
}
