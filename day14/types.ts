import { RichText } from "../rich_text.ts";

export enum Tile {
  Rock = "#",
  Boulder = "O",
  Empty = ".",
}

export interface Dish {
  tiles: Tile[][];
}

export enum Direction {
  North,
  West,
  South,
  East,
}

export function northSupport(dish: Dish) {
  return dish.tiles.map((line, index): number => {
    return (dish.tiles.length - index) *
      line.filter((tile) => tile === Tile.Boulder).length;
  }).reduce((a, b) => a + b, 0);
}

export function tilt(dish: Dish, direction: Direction) {
  switch (direction) {
    case Direction.North:
      tiltNorth(dish);
      break;
    case Direction.South:
      tiltSouth(dish);
      break;
    case Direction.West:
      tiltWest(dish);
      break;
    case Direction.East:
      tiltEast(dish);
      break;
  }
}

function tiltNorth(dish: Dish) {
  for (const [i, line] of dish.tiles.entries()) {
    if (i === 0) {
      continue;
    }
    for (const [j, tile] of line.entries()) {
      if (tile !== Tile.Boulder) {
        continue;
      }
      let nb_empty = 0;
      while (
        (i - nb_empty - 1) >= 0 &&
        dish.tiles[i - nb_empty - 1][j] === Tile.Empty
      ) {
        nb_empty++;
      }
      if (nb_empty > 0) {
        dish.tiles[i - nb_empty][j] = Tile.Boulder;
        dish.tiles[i][j] = Tile.Empty;
      }
    }
  }
}

function tiltSouth(dish: Dish) {
  for (let i = dish.tiles.length - 1; i >= 0; i--) {
    if (i === dish.tiles.length - 1) {
      continue;
    }
    for (const [j, tile] of dish.tiles[i].entries()) {
      if (tile !== Tile.Boulder) {
        continue;
      }
      let nb_empty = 0;
      while (
        (i + nb_empty + 1) < dish.tiles.length &&
        dish.tiles[i + nb_empty + 1][j] === Tile.Empty
      ) {
        nb_empty++;
      }
      if (nb_empty > 0) {
        dish.tiles[i + nb_empty][j] = Tile.Boulder;
        dish.tiles[i][j] = Tile.Empty;
      }
    }
  }
}

function tiltWest(dish: Dish) {
  for (const line of dish.tiles) {
    for (let i = 0; i < line.length; i++) {
      if (i === 0) {
        continue;
      }
      if (line[i] !== Tile.Boulder) {
        continue;
      }
      let nb_empty = 0;
      while ((i - nb_empty - 1) >= 0 && line[i - nb_empty - 1] === Tile.Empty) {
        nb_empty++;
      }
      if (nb_empty > 0) {
        line[i - nb_empty] = Tile.Boulder;
        line[i] = Tile.Empty;
      }
    }
  }
}

function tiltEast(dish: Dish) {
  for (const line of dish.tiles) {
    for (let i = line.length - 1; i >= 0; i--) {
      if (i === line.length - 1) {
        continue;
      }
      if (line[i] !== Tile.Boulder) {
        continue;
      }
      let nb_empty = 0;
      while (
        (i + nb_empty + 1) < line.length &&
        line[i + nb_empty + 1] === Tile.Empty
      ) {
        nb_empty++;
      }
      if (nb_empty > 0) {
        line[i + nb_empty] = Tile.Boulder;
        line[i] = Tile.Empty;
      }
    }
  }
}

export function printDish(dish: Dish) {
  for (const line of dish.tiles) {
    const text = line.join("").replaceAll(Tile.Empty, " ").replaceAll(
      Tile.Boulder,
      new RichText("O", RichText.COLOR.RED).toString(),
    )
      .replaceAll(
        Tile.Rock,
        new RichText("#", RichText.COLOR.GREEN).toString(),
      );
    console.log(text);
  }
  console.log();
}
