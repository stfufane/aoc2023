import { Brick, get_supporting_bricks } from "../types.ts";

function falling_bricks(
  brick_id: number,
  supporting_bricks: Map<number, number[]>,
): number {
  const next_falling_bricks = new Set<number>();
  const all_falling_bricks = new Set<number>();
  next_falling_bricks.add(brick_id);

  while (next_falling_bricks.size > 0) {
    const next = next_falling_bricks.values().next().value;
    for (const [supported, supporting] of supporting_bricks) {
      if (supported === brick_id) {
        continue;
      }
      if (supporting.every((b) => next_falling_bricks.has(b))) {
        all_falling_bricks.add(supported);
        next_falling_bricks.add(supported);
      }
    }
    next_falling_bricks.delete(next);
  }

  return all_falling_bricks.size;
}

export function partTwo(bricks: Brick[]): number {
  // Check which bricks are supporting which bricks
  const supporting_bricks = get_supporting_bricks(bricks);

  // Check how many bricks would fall for each brick that can be removed
  return bricks.map((brick) => falling_bricks(brick.id, supporting_bricks))
    .reduce((acc, curr) => acc + curr, 0);
}
