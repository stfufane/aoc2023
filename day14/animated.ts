import { delay } from "https://deno.land/x/delay@v0.2.0/mod.ts";
import { hash_string } from "../utils.ts";
import { Direction, Dish, northSupport, printDish, Tile } from "./types.ts";

const dish: Dish = { tiles: [] };
const text = Deno.readTextFileSync("./day14/sample.txt");
text.split("\n")
  .map((line): Tile[] => line.split("").map((char) => char as Tile))
  .map((tiles) => dish.tiles.push(tiles));

const directions = [
  Direction.North,
  Direction.West,
  Direction.South,
  Direction.East,
];

async function delayedPrint(dish: Dish) {
  await delay(5);
  console.clear();
  printDish(dish);
}

async function tilt(dish: Dish, direction: Direction) {
  switch (direction) {
    case Direction.North:
      await tiltNorth(dish);
      break;
    case Direction.South:
      await tiltSouth(dish);
      break;
    case Direction.West:
      await tiltWest(dish);
      break;
    case Direction.East:
      await tiltEast(dish);
      break;
  }
}

async function tiltNorth(dish: Dish) {
  for (const [i, line] of dish.tiles.entries()) {
    if (i === 0) {
      continue;
    }
    for (const [j, tile] of line.entries()) {
      if (tile !== Tile.Boulder) {
        continue;
      }
      for (let previous = i - 1; previous >= 0; previous--) {
        if (dish.tiles[previous][j] !== Tile.Empty) {
          break;
        }
        dish.tiles[previous][j] = Tile.Boulder;
        dish.tiles[previous + 1][j] = Tile.Empty;
        await delayedPrint(dish);
      }
    }
  }
}

async function tiltSouth(dish: Dish) {
  for (let i = dish.tiles.length - 1; i >= 0; i--) {
    if (i === dish.tiles.length - 1) {
      continue;
    }
    for (const [j, tile] of dish.tiles[i].entries()) {
      if (tile !== Tile.Boulder) {
        continue;
      }
      for (let next = i + 1; next < dish.tiles.length; next++) {
        if (dish.tiles[next][j] !== Tile.Empty) {
          break;
        }
        dish.tiles[next][j] = Tile.Boulder;
        dish.tiles[next - 1][j] = Tile.Empty;
        await delayedPrint(dish);
      }
    }
  }
}

async function tiltWest(dish: Dish) {
  for (const line of dish.tiles) {
    for (let i = 0; i < line.length; i++) {
      if (i === 0) {
        continue;
      }
      if (line[i] !== Tile.Boulder) {
        continue;
      }
      for (let previous = i - 1; previous >= 0; previous--) {
        if (line[previous] !== Tile.Empty) {
          break;
        }
        line[previous] = Tile.Boulder;
        line[previous + 1] = Tile.Empty;
        await delayedPrint(dish);
      }
    }
  }
}

async function tiltEast(dish: Dish) {
  for (const line of dish.tiles) {
    for (let i = line.length - 1; i >= 0; i--) {
      if (i === line.length - 1) {
        continue;
      }
      if (line[i] !== Tile.Boulder) {
        continue;
      }
      for (let next = i + 1; next < line.length; next++) {
        if (line[next] !== Tile.Empty) {
          break;
        }
        line[next] = Tile.Boulder;
        line[next - 1] = Tile.Empty;
        await delayedPrint(dish);
      }
    }
  }
}

(async () => {
  const cycles: number[] = [];
  let north_supports: number[] = [];
  while (true) {
    for (const direction of directions) {
      await tilt(dish, direction);
    }
    const cycle = hash_string(
      dish.tiles.map((tiles) => tiles.join("")).join(""),
    );
    const north_support = northSupport(dish);
    const found = cycles.indexOf(cycle);
    if (found > -1) {
      north_supports = north_supports.slice(found);
      break;
    }
    cycles.push(cycle);
    north_supports.push(north_support);
  }
})();
