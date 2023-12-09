import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export interface Report {
  numbers: number[];
}

export function getDepthNumbers(report: Report) {
  const depth_numbers: number[][] = [];
  let depth = 0;
  depth_numbers[depth] = report.numbers;
  do {
    depth_numbers[depth + 1] = [];
    depth_numbers[depth].map((number, idx, values) => {
      if (idx < (values.length - 1)) {
        depth_numbers[depth + 1].push(values[idx + 1] - number);
      }
    });
    depth++;
  } while (
    depth_numbers[depth].some((numbers) => numbers !== 0)
  );
  return depth_numbers.reverse();
}

export function preprocess(text: string, isPart2: boolean): Report[] {
  return text.split("\n").map((line) => {
    if (isPart2) {
      return { numbers: line.split(" ").map(Number).reverse() };
    } else {
      return { numbers: line.split(" ").map(Number) };
    }
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
