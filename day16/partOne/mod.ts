import { Beam, Contraption, Direction, energizedTiles } from "../types.ts";

export function partOne(contraption: Contraption): number {
  return energizedTiles(contraption, new Beam(-1, 0, Direction.East));
}
