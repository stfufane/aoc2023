import { GameData } from "../mod.ts";

export function partOne(input: GameData[]) {
  return input
    .filter((game: GameData) => {
      return game.results.get("red")! <= 12 &&
        game.results.get("green")! <= 13 &&
        game.results.get("blue")! <= 14;
    })
    .reduce(
      (acc: number, game: GameData) => acc + game.game,
      0,
    );
}
