import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

import { Coordinates, Engine } from "./types.ts";

export function preprocess(text: string): Engine {
  const engine: Engine = { parts: [], symbols: [] };
  text.split("\n").map((line, index) => {
    // Detect symbols
    const symbol_pattern = /[^.\d\w\s]/g;
    let match_symbol: RegExpExecArray | null;
    while (null !== (match_symbol = symbol_pattern.exec(line))) {
      engine.symbols.push({
        value: match_symbol[0],
        coordinates: new Coordinates(match_symbol.index, index),
      });
    }
    // Detect engine parts
    const part_pattern = /(\d+)/g;
    let match_part: RegExpExecArray | null;
    while (null !== (match_part = part_pattern.exec(line))) {
      engine.parts.push({
        value: Number(match_part[1]),
        coordinates: Array.from(
          { length: match_part[1].length },
          (_, i) => new Coordinates(match_part!.index + i, index),
        ),
      });
    }
    return line;
  });
  return engine;
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
