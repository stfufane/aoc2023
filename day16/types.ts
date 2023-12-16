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

export function outOfBounds(
  coordinates: Coordinates,
  contraption: Contraption,
): boolean {
  return coordinates.x < 0 ||
    coordinates.y < 0 ||
    coordinates.y >= contraption.tiles.length ||
    coordinates.x >= contraption.tiles[0].length;
}

export function energizedTiles(
  contraption: Contraption,
  start_beam: Beam,
): number {
  const visited = new Map<string, number>();
  const setVisited = (beam: Beam): void => {
    const nb_visited = visited.get(beam.getKey()) || 0;
    visited.set(beam.getKey(), nb_visited + 1);
  };

  const beams_to_process = new Array<Beam>();
  const beam_starts = new Set<string>();
  // Fake path to start outside of the grid.
  beams_to_process.push(start_beam);

  while (beams_to_process.length > 0) {
    const beam = beams_to_process.shift() as Beam;

    // Check if we didn't process this beam already.
    if (beam_starts.size > 0 && beam_starts.has(beam.getPath())) {
      continue;
    }
    beam_starts.add(beam.getPath());

    // Loop until we find a tile that splits the signal and create new beams
    let beam_consumed = false;
    const beam_paths = new Set<string>();
    while (!beam_consumed) {
      setVisited(beam);
      const next_coordinates = beam.getNextCoordinates();
      if (outOfBounds(next_coordinates, contraption)) {
        break;
      }
      beam.setCoordinates(next_coordinates);
      // Avoid getting stuck in a loop :)
      if (beam_paths.has(beam.getPath())) {
        break;
      }
      beam_paths.add(beam.getPath());

      const next_tile =
        contraption.tiles[next_coordinates.y][next_coordinates.x];
      switch (next_tile) {
        case Tile.Empty:
          continue;
        case Tile.LeftMirror:
          switch (beam.direction) {
            case Direction.North:
              beam.direction = Direction.East;
              break;
            case Direction.South:
              beam.direction = Direction.West;
              break;
            case Direction.West:
              beam.direction = Direction.South;
              break;
            case Direction.East:
              beam.direction = Direction.North;
              break;
          }
          continue;
        case Tile.RightMirror:
          switch (beam.direction) {
            case Direction.North:
              beam.direction = Direction.West;
              break;
            case Direction.South:
              beam.direction = Direction.East;
              break;
            case Direction.West:
              beam.direction = Direction.North;
              break;
            case Direction.East:
              beam.direction = Direction.South;
              break;
          }
          continue;
        case Tile.VSplitter:
          switch (beam.direction) {
            case Direction.North:
            case Direction.South:
              continue;
            case Direction.West:
            case Direction.East:
              beams_to_process.push(new Beam(beam.x, beam.y, Direction.North));
              beams_to_process.push(new Beam(beam.x, beam.y, Direction.South));
              beam_consumed = true;
              break;
          }
          break;
        case Tile.HSplitter:
          switch (beam.direction) {
            case Direction.North:
            case Direction.South:
              beams_to_process.push(new Beam(beam.x, beam.y, Direction.West));
              beams_to_process.push(new Beam(beam.x, beam.y, Direction.East));
              beam_consumed = true;
              break;
            case Direction.West:
            case Direction.East:
              continue;
          }
          break;
      }
    }
  }
  return visited.size - 1;
}
