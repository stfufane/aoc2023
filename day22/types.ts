import { Coordinates } from "../utils.ts";

export interface Coordinates3D {
  x: number;
  y: number;
  z: number;
}

export interface Brick {
  start: Coordinates3D;
  end: Coordinates3D;
  id: number;
}

export interface Rectangle {
  bottomLeft: Coordinates;
  topRight: Coordinates;
}

function doRectanglesIntersect(rect1: Rectangle, rect2: Rectangle): boolean {
  // Check if one rectangle is to the right of the other
  if (
    rect1.bottomLeft.x >= rect2.topRight.x ||
    rect2.bottomLeft.x >= rect1.topRight.x
  ) {
    return false;
  }

  // Check if one rectangle is above the other
  if (
    rect1.bottomLeft.y >= rect2.topRight.y ||
    rect2.bottomLeft.y >= rect1.topRight.y
  ) {
    return false;
  }

  return true;
}

function bricks_overlapping(brick_a: Brick, brick_b: Brick): boolean {
  return doRectanglesIntersect({
    bottomLeft: { x: brick_a.start.x, y: brick_a.start.y },
    topRight: { x: brick_a.end.x, y: brick_a.end.y },
  }, {
    bottomLeft: { x: brick_b.start.x, y: brick_b.start.y },
    topRight: { x: brick_b.end.x, y: brick_b.end.y },
  });
}

export function fall_bricks(bricks: Brick[]) {
  // Sort the bricks by their z coordinate
  bricks.sort((a, b) => a.start.z - b.start.z);
  for (const brick of bricks) {
    // Skip the bricks that are on the ground
    if (brick.start.z === 1) {
      continue;
    }
    // Move the brick to the bottom until it hits an other brick or the ground
    const original_z = brick.start.z;
    while (brick.start.z > 1) {
      if (
        bricks.filter((b) => b.id !== brick.id).some((b) => {
          return b.end.z === brick.start.z && bricks_overlapping(brick, b);
        })
      ) {
        break;
      }
      brick.start.z--;
    }
    brick.end.z -= original_z - brick.start.z;
  }
}

export function get_supporting_bricks(bricks: Brick[]): Map<number, number[]> {
  // Store the list of bricks that are supporting each brick
  const supporting_bricks = new Map<number, number[]>();
  for (const brick of bricks) {
    for (const b of bricks) {
      if (
        b !== brick &&
        b.start.z === brick.end.z && bricks_overlapping(brick, b)
      ) {
        if (!supporting_bricks.has(b.id)) {
          supporting_bricks.set(b.id, [brick.id]);
        } else {
          supporting_bricks.get(b.id)?.push(brick.id);
        }
      }
    }
  }
  return supporting_bricks;
}
