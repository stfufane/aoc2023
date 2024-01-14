import { Brick, get_supporting_bricks } from "../types.ts";

export function partOne(bricks: Brick[]): number {
  // Check which bricks are supporting which bricks
  const supporting_bricks = get_supporting_bricks(bricks);

  // Check what bricks cannot be disintegrated
  const non_disintegrable_bricks = new Set<number>();
  for (const supporting of supporting_bricks.values()) {
    if (supporting.length === 1) {
      non_disintegrable_bricks.add(supporting[0]);
    }
  }
  return bricks.length - non_disintegrable_bricks.size;
}
