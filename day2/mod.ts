import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export interface GameData {
  game: number;
  results: Map<string, number>;
}

export function preprocess(text: string): GameData[] {
  return text.split("\n").filter((line) => line.length > 0).map((
    line: string,
  ) => line.split(": "))
    .map((game_info: string[]) => {
      return {
        game_number: Number(game_info[0].split(" ")[1]),
        games: game_info[1].split("; "),
      };
    })
    .map((game: { game_number: number; games: string[] }) => {
      // For each game, retrieve the maximum value for each color (blue, red, green)
      const game_result = new Map<string, number>([["blue", 0], ["red", 0], [
        "green",
        0,
      ]]);
      game.games.forEach((game_info: string) => {
        game_info.split(", ").forEach((game_color: string) => {
          const [value, color] = game_color.split(" ");
          game_result.set(
            color,
            Math.max(Number(value), game_result.get(color)!),
          );
        });
      });
      return { game: game.game_number, results: game_result };
    });
}

export function main(text: string, isPart2: boolean) {
  const input: GameData[] = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
