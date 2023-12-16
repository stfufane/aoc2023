import { Coordinates } from "../utils.ts";

export enum Tile {
  LeftMirror = "/",
  RightMirror = "\\",
  VSplitter = "|",
  HSplitter = "-",
  Empty = ".",
}

export interface Contraption {
  tiles: Tile[][];
}

export enum Direction {
  North,
  West,
  South,
  East,
}

export class Beam {
  x: number;
  y: number;
  direction: Direction;

  constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  getCoordinates(): Coordinates {
    return { x: this.x, y: this.y };
  }

  getNextCoordinates(): Coordinates {
    switch (this.direction) {
      case Direction.North:
        return { x: this.x, y: this.y - 1 };
      case Direction.South:
        return { x: this.x, y: this.y + 1 };
      case Direction.East:
        return { x: this.x + 1, y: this.y };
      case Direction.West:
        return { x: this.x - 1, y: this.y };
    }
  }

  setCoordinates(coordinates: Coordinates): void {
    this.x = coordinates.x;
    this.y = coordinates.y;
  }

  public getKey(): string {
    return `${this.x}_${this.y}`;
  }

  public getPath(): string {
    return `${this.getKey()}_${this.direction}`;
  }
}

function outOfBounds(
  coordinates: Coordinates,
  contraption: Contraption,
): boolean {
  return coordinates.x < 0 ||
    coordinates.y < 0 ||
    coordinates.y >= contraption.tiles.length ||
    coordinates.x >= contraption.tiles[0].length;
}

const DirectionFlip = new Map<Tile, Map<Direction, Direction>>([
  [
    Tile.LeftMirror,
    new Map([
      [Direction.North, Direction.East],
      [Direction.South, Direction.West],
      [Direction.West, Direction.South],
      [Direction.East, Direction.North],
    ]),
  ],
  [
    Tile.RightMirror,
    new Map([
      [Direction.North, Direction.West],
      [Direction.South, Direction.East],
      [Direction.West, Direction.North],
      [Direction.East, Direction.South],
    ]),
  ],
]);

export function energizedTiles(
  contraption: Contraption,
  start_beam: Beam,
): number {
  const energized = new Set<string>();
  const beams_to_process = new Array<Beam>();
  const beam_paths = new Set<string>();

  // Fake path to start outside of the grid.
  beams_to_process.push(start_beam);

  while (beams_to_process.length > 0) {
    const beam = beams_to_process.shift() as Beam;

    // Loop until we find a tile that splits the signal and create new beams
    let beam_consumed = false;
    while (!beam_consumed) {
      // Avoid getting stuck in a loop and revisit the same path.
      if (beam_paths.has(beam.getPath())) {
        break;
      }
      beam_paths.add(beam.getPath());

      energized.add(beam.getKey());
      const next_coordinates = beam.getNextCoordinates();
      if (outOfBounds(next_coordinates, contraption)) {
        break;
      }
      beam.setCoordinates(next_coordinates);

      const next_tile =
        contraption.tiles[next_coordinates.y][next_coordinates.x];
      switch (next_tile) {
        case Tile.Empty:
          continue;
        case Tile.LeftMirror:
        case Tile.RightMirror:
          beam.direction = DirectionFlip.get(next_tile)!.get(
            beam.direction,
          )!;
          continue;
        case Tile.VSplitter:
          switch (beam.direction) {
            case Direction.West:
            case Direction.East:
              beams_to_process.push(
                new Beam(beam.x, beam.y, Direction.North),
                new Beam(beam.x, beam.y, Direction.South),
              );
              beam_consumed = true;
              break;
            default:
              continue;
          }
          break;
        case Tile.HSplitter:
          switch (beam.direction) {
            case Direction.North:
            case Direction.South:
              beams_to_process.push(
                new Beam(beam.x, beam.y, Direction.West),
                new Beam(beam.x, beam.y, Direction.East),
              );
              beam_consumed = true;
              break;
            default:
              continue;
          }
          break;
      }
    }
  }
  return energized.size - 1;
}
