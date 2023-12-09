import { getDepthNumbers, Report } from "../mod.ts";

export function partOne(reports: Report[]): number {
  return reports.map(getDepthNumbers)
    .map((depth_numbers) => {
      depth_numbers.map((numbers, idx) => {
        if (idx > 0) {
          numbers.push(
            numbers[numbers.length - 1] +
              depth_numbers[idx - 1][depth_numbers[idx - 1].length - 1],
          );
        }
        return numbers;
      });
      return depth_numbers.pop()!.pop()!;
    })
    .reduce((a, b) => a + b, 0);
}
