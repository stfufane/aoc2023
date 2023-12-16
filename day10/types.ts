import { Coordinates, hash_pair } from "../utils.ts";

export enum Tile {
  Ground = ".",
  Start = "S",
  EastWestPipe = "═",
  NorthSouthPipe = "║",
  SouthEastPipe = "╔",
  SouthWestPipe = "╗",
  NorthWestPipe = "╝",
  NorthEastPipe = "╚",
}

enum Direction {
  North,
  South,
  East,
  West,
}

export interface Grid {
  tiles: Tile[][];
}

function areCoordinatesEqual(a: Coordinates, b: Coordinates): boolean {
  return a.x === b.x && a.y === b.y;
}

function getCoordinates(
  from: Coordinates,
  direction: Direction,
): Coordinates {
  switch (direction) {
    case Direction.North:
      return { x: from.x, y: from.y - 1 };
    case Direction.South:
      return { x: from.x, y: from.y + 1 };
    case Direction.East:
      return { x: from.x + 1, y: from.y };
    case Direction.West:
      return { x: from.x - 1, y: from.y };
  }
}

function getDirections(tile: Tile): Direction[] {
  switch (tile) {
    case Tile.NorthSouthPipe:
      return [Direction.North, Direction.South];
    case Tile.EastWestPipe:
      return [Direction.East, Direction.West];
    case Tile.NorthEastPipe:
      return [Direction.North, Direction.East];
    case Tile.NorthWestPipe:
      return [Direction.North, Direction.West];
    case Tile.SouthEastPipe:
      return [Direction.South, Direction.East];
    case Tile.SouthWestPipe:
      return [Direction.South, Direction.West];
    case Tile.Start:
      return [Direction.North, Direction.South, Direction.East, Direction.West];
    default:
      return [];
  }
}

function canMoveTo(from: Tile, to: Tile, direction: Direction): boolean {
  switch (direction) {
    case Direction.North:
      switch (from) {
        case Tile.Start:
        case Tile.NorthSouthPipe:
        case Tile.NorthEastPipe:
        case Tile.NorthWestPipe:
          return to === Tile.NorthSouthPipe || to === Tile.SouthEastPipe ||
            to === Tile.SouthWestPipe || to === Tile.Start;
        default:
          return false;
      }
      break;
    case Direction.South:
      switch (from) {
        case Tile.Start:
        case Tile.NorthSouthPipe:
        case Tile.SouthEastPipe:
        case Tile.SouthWestPipe:
          return to === Tile.NorthSouthPipe || to === Tile.NorthEastPipe ||
            to === Tile.NorthWestPipe || to === Tile.Start;
        default:
          return false;
      }
      break;
    case Direction.East:
      switch (from) {
        case Tile.Start:
        case Tile.EastWestPipe:
        case Tile.NorthEastPipe:
        case Tile.SouthEastPipe:
          return to === Tile.EastWestPipe || to === Tile.NorthWestPipe ||
            to === Tile.SouthWestPipe || to === Tile.Start;
        default:
          return false;
      }
      break;
    case Direction.West:
      switch (from) {
        case Tile.Start:
        case Tile.EastWestPipe:
        case Tile.NorthWestPipe:
        case Tile.SouthWestPipe:
          return to === Tile.EastWestPipe || to === Tile.NorthEastPipe ||
            to === Tile.SouthEastPipe || to === Tile.Start;
        default:
          return false;
      }
  }
}

function getStartCoordinates(grid: Grid): Coordinates {
  let y = 0;
  for (const row of grid.tiles) {
    let x = 0;
    for (const tile of row) {
      if (tile === Tile.Start) {
        return { x, y };
      }
      x++;
    }
    y++;
  }
  throw new Error("No start found");
}

interface Step {
  count: number;
  tile: Tile;
}

export function getLoopSteps(grid: Grid): Map<number, Step> {
  const loop_coordinates = new Map<number, Step>();
  const start = getStartCoordinates(grid);
  let count = 0;
  let current: Coordinates = start;
  let previous: Coordinates = start;
  do {
    const tile = grid.tiles[current.y][current.x];
    loop_coordinates.set(hash_pair(current.x, current.y), { count, tile });
    // Get possible movements from current tile
    const next_directions = getDirections(tile);
    // Check where we can go from this tile
    for (const direction of next_directions) {
      const next_tile_coordinates = getCoordinates(current, direction);
      // Don't go back to previous tile or outside the grid
      if (
        areCoordinatesEqual(previous, next_tile_coordinates) ||
        next_tile_coordinates.x < 0 || next_tile_coordinates.y < 0 ||
        next_tile_coordinates.x >= grid.tiles[0].length ||
        next_tile_coordinates.y >= grid.tiles.length
      ) {
        continue;
      }
      const next_tile =
        grid.tiles[next_tile_coordinates.y][next_tile_coordinates.x];
      if (canMoveTo(tile, next_tile, direction)) {
        previous = current;
        current = next_tile_coordinates;
        break;
      }
    }
    count++;
  } while (!areCoordinatesEqual(current, start));
  return loop_coordinates;
}
