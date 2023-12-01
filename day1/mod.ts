import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function preprocess(text: string): string[] {
  return text.split("\n").filter((line) => line.length > 0);
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

const alpha_to_num = new Map([
  ["one", "1"],
  ["two", "2"],
  ["three", "3"],
  ["four", "4"],
  ["five", "5"],
  ["six", "6"],
  ["seven", "7"],
  ["eight", "8"],
  ["nine", "9"],
]);

export function sumNumbers(matches: string[]): number {
  const first_digit = alpha_to_num.get(matches[0]) ?? matches[0];
  const last_digit = alpha_to_num.get(matches[matches.length - 1]) ??
    matches[matches.length - 1];
  return Number(`${first_digit}${last_digit}`);
}

export { partOne, partTwo };
