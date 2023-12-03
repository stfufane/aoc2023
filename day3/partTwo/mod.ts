import { Coordinates, Engine, EnginePart, Symbol } from "../types.ts";

export function partTwo(engine: Engine): number {
  return engine.symbols.filter((symbol: Symbol) => {
    return symbol.value == "*";
  })
    .map((symbol: Symbol) => {
      return engine.parts.filter((part: EnginePart) => {
        return part.coordinates.some((coordinates: Coordinates) => {
          return coordinates.is_neighbour(symbol.coordinates);
        });
      });
    })
    .filter((parts: EnginePart[]) => {
      return parts.length == 2;
    })
    .reduce((acc, parts: EnginePart[]) => {
      return acc + parts[0].value * parts[1].value;
    }, 0);
}
