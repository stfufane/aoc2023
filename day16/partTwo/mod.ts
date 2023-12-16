import { Beam, Contraption, Direction, energizedTiles } from "../types.ts";

export function partTwo(contraption: Contraption): number {
  const all_beams = Array.from({ length: contraption.tiles.length })
    .map((_, x) => [
      new Beam(x, -1, Direction.South),
      new Beam(x, contraption.tiles.length, Direction.North),
    ]).concat(
      Array.from({ length: contraption.tiles.length })
        .map((_, y) => [
          new Beam(-1, y, Direction.East),
          new Beam(contraption.tiles[0].length, y, Direction.West),
        ]),
    ).flat();

  return Math.max(
    ...all_beams.map((beam) => energizedTiles(contraption, beam)),
  );
}
