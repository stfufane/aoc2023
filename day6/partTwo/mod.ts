export function partTwo(input: string): number {
  const [total_time, max_distance] = input.split("\n").map((x) =>
    Number(x.replaceAll(/\s+/g, "").split(":")[1])
  );

  let winning_ways = 0;
  for (let time = 0; time < total_time; time++) {
    if (time * (total_time - time) > max_distance) {
      winning_ways += 1;
    }
  }
  return winning_ways;
}
