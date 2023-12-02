export function partOne(input: string[]) {
  return input.map((line: string) => line.split(": "))
    .map((game_info: string[]) =>  { return { game_number: Number(game_info[0].split(" ")[1]), games: game_info[1].split("; ") }})
    .map((game: { game_number: number; games: string[]; }) => { 
      // For each game, retrieve the maximum value for each color (blue, red, green)
      const game_result = new Map<string, number>([['blue', 0], ['red', 0], ['green', 0]]);
      game.games.forEach((game_info: string) => {
        game_info.split(", ").forEach((game_color: string) => {
          const [value, color] = game_color.split(" ");
          game_result.set(color, Math.max(Number(value), (game_result.get(color)!)));
        });
      });
      return { game: game.game_number, results: game_result };
    }
  )
  .filter((game: { game: number; results: Map<string, number>; }) => {
    return game.results.get('red')! <= 12 && game.results.get('green')! <= 13 && game.results.get('blue')! <= 14;
  })
  .reduce((acc: number, game: { game: number; results: Map<string, number>; }) => acc + game.game, 0);
}
