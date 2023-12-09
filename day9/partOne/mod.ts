import { getDepthNumbers, Report } from "../mod.ts";

export function partOne(reports: Report[]): number {
  return reports.map(getDepthNumbers)
    .map((depth_numbers) =>
      depth_numbers
        .flatMap((numbers) => numbers.slice(-1))
        .reduce((a, b) => a + b, 0)
    )
    .reduce((a, b) => a + b, 0);
}
