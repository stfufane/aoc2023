import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string): Map<number, number> {
  return new Map(
    text.split("\n").map((line) => {
      const [card_info, all_numbers] = line.split(":");
      const id = Number(card_info.split(/\s+/)[1]);
      const [winning, mine] = all_numbers.split(" | ").map((numbers) =>
        numbers.trim().split(/\s+/).map((n) => Number(n))
      );
      return [id, mine.filter((n) => winning.includes(n)).length];
    }),
  );
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
