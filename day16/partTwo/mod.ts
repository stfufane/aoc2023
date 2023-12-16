import { Beam, Contraption, Direction, energizedTiles } from "../types.ts";

export function partTwo(contraption: Contraption): number {
  let best_energy = 0;
  for (let y = 0; y < contraption.tiles.length; y++) {
    best_energy = Math.max(
      best_energy,
      energizedTiles(contraption, new Beam(-1, y, Direction.East)),
      energizedTiles(
        contraption,
        new Beam(contraption.tiles[0].length, y, Direction.West),
      ),
    );
  }
  for (let x = 0; x < contraption.tiles[0].length; x++) {
    best_energy = Math.max(
      best_energy,
      energizedTiles(contraption, new Beam(x, -1, Direction.South)),
      energizedTiles(
        contraption,
        new Beam(x, contraption.tiles.length, Direction.North),
      ),
    );
  }
  return best_energy;
}
