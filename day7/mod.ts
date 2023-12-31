import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { get_strength, Hand, letter_to_number } from "./types.ts";

export function preprocess(text: string, isPart2: boolean): Hand[] {
  return text.split("\n").map((line) => {
    return {
      bid: Number(line.split(" ")[1]),
      strength: get_strength(
        line.split(" ")[0].split("").map((card_letter) =>
          letter_to_number(card_letter, isPart2)
        ),
        isPart2,
      ),
    };
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text, isPart2);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
