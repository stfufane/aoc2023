import { checkSpringsPattern, SpringRow } from "../types.ts";

export function partOne(spring_rows: SpringRow[]): number {
  return spring_rows.map((row) => {
    console.log(row);
    let working_combinations = 0;
    // Springs contains ?, # and .
    // We need to check every combination replacing ? with . or #
    // and check if the pattern matches with the combination.
    const nb_question_marks = (row.springs.match(/\?/g) || []).length;
    const nb_combinations = 2 ** nb_question_marks;
    // Loop through combinations
    for (let i = 0; i < nb_combinations; i++) {
      // Replace occurrences of ? with . or # depending on the bit values
      let springs = "";
      let j = 0;
      for (let char of row.springs) {
        if (char === "?") {
          char = i & (1 << j) ? "#" : ".";
          j++;
        }
        springs += char;
      }
      // Check if the pattern matches
      if (checkSpringsPattern(springs, row.pattern)) {
        working_combinations++;
      }
    }
    return working_combinations;
  }).reduce((acc, val) => acc + val, 0);
}
