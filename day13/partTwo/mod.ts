import { Pattern } from "../mod.ts";

enum Reflection {
  Mirrored,
  Different,
  Smudge,
}

function checkReflection(line1: string, line2: string): Reflection {
  // Check if the two lines have exactly one different character
  let smudge = false;
  for (let i = 0; i < line1.length; i++) {
    if (line1[i] !== line2[i]) {
      if (smudge) {
        return Reflection.Different;
      }
      smudge = true;
    }
  }
  return smudge ? Reflection.Smudge : Reflection.Mirrored;
}

function checkMirrored(lines: string[], mirror: number) {
  let smudge_count = 0;
  if (mirror < (lines.length / 2)) {
    for (let i = mirror - 1, j = 0; i >= 0; i--, j++) {
      const reflection = checkReflection(lines[i], lines[mirror + j]);
      if (reflection === Reflection.Smudge) {
        smudge_count++;
      }
      // Lines are different or there's already a smudge, so it's not mirrored
      if (reflection === Reflection.Different || smudge_count > 1) {
        return false;
      }
    }
  } else {
    for (let i = mirror, j = 1; i < lines.length; i++, j++) {
      const reflection = checkReflection(lines[i], lines[mirror - j]);
      if (reflection === Reflection.Smudge) {
        smudge_count++;
      }
      if (reflection === Reflection.Different || smudge_count > 1) {
        return false;
      }
    }
  }
  return smudge_count === 1;
}

export function partTwo(patterns: Pattern[]): number {
  return patterns.map((pattern) => {
    const find_mirror = (lines: string[]): number => {
      for (let i = 1; i < lines.length; i++) {
        if (checkMirrored(lines, i)) {
          return i;
        }
      }
      return 0;
    };
    return find_mirror(pattern.lines) * 100 + find_mirror(pattern.columns);
  }).reduce((a, b) => a + b);
}
