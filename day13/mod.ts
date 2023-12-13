import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export interface Pattern {
  lines: string[];
  columns: string[];
}

export function preprocess(text: string): Pattern[] {
  return text.split("\n\n").map((pattern) => {
    const lines = pattern.split("\n");

    // Init the columns from the values
    const columns = new Array<string>(lines[0].length).fill("");
    for (let i = 0; i < lines[0].length; i++) {
      for (const line of lines) {
        columns[i] += line.charAt(i);
      }
    }
    return { lines, columns };
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
