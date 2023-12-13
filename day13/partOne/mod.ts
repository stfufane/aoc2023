import { Pattern } from "../mod.ts";

function checkReflection(lines: string[], mirror: number) {
  if (mirror < (lines.length / 2)) {
    for (let i = mirror - 1, j = 0; i >= 0; i--, j++) {
      if (lines[i] !== lines[mirror + j]) {
        return false;
      }
    }
  } else {
    for (let i = mirror, j = 1; i < lines.length; i++, j++) {
      if (lines[i] !== lines[mirror - j]) {
        return false;
      }
    }
  }
  return true;
}

export function partOne(patterns: Pattern[]): number {
  return patterns.map((pattern) => {
    const find_mirror = (lines: string[]): number => {
      for (let i = 1; i < lines.length; i++) {
        if (checkReflection(lines, i)) {
          return i;
        }
      }
      return 0;
    };
    return find_mirror(pattern.lines) * 100 + find_mirror(pattern.columns);
  }).reduce((a, b) => a + b);
}
