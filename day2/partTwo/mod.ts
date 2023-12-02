import { GameData } from "../mod.ts";

export function partTwo(input: GameData[]): number {
  return input
    .map((game: GameData) => {
      return game.results.get("red")! *
        game.results.get("green")! *
        game.results.get("blue")!;
    })
    .reduce((acc: number, result: number) => acc + result, 0);
}
