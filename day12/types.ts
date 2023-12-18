export interface SpringRow {
  springs: string;
  pattern: number[];
}

// With help from https://www.reddit.com/r/adventofcode/comments/18hbjdi/2023_day_12_part_2_this_image_helped_a_few_people/
export function validPermutations(spring_row: SpringRow): number {
  const permutations: Map<string, number> = new Map();
  permutations.set("0,0", 1);
  for (const c of spring_row.springs) {
    const next: [number, number, number][] = [];
    for (const [key, perm_count] of permutations.entries()) {
      const [group_id, group_amount] = key.split(",").map(Number);
      if (c !== "#") {
        if (group_amount === 0) {
          next.push([group_id, group_amount, perm_count]);
        } else if (group_amount === spring_row.pattern[group_id]) {
          next.push([group_id + 1, 0, perm_count]);
        }
      }
      if (c !== ".") {
        if (
          group_id < spring_row.pattern.length &&
          group_amount < spring_row.pattern[group_id]
        ) {
          next.push([group_id, group_amount + 1, perm_count]);
        }
      }
    }

    permutations.clear();
    for (const [group_id, group_amount, perm_count] of next) {
      const key = `${group_id},${group_amount}`;
      permutations.set(key, (permutations.get(key) || 0) + perm_count);
    }
  }

  return [...permutations.entries()].reduce((acc, [key, perm_count]) => {
    const [group_id, group_amount] = key.split(",").map(Number);
    return acc +
      (isValid(spring_row.pattern, group_id, group_amount) ? perm_count : 0);
  }, 0);
}

function isValid(
  pattern: number[],
  group_id: number,
  group_amount: number,
): boolean {
  return group_id === pattern.length ||
    group_id === pattern.length - 1 &&
      group_amount === pattern[group_id];
}
