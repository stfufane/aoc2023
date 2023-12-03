import { Coordinates, Engine, EnginePart, Symbol } from "../types.ts";

export function partOne(engine: Engine): number {
  return engine.parts.filter((part: EnginePart) => {
    return part.coordinates.some((coordinates: Coordinates) => {
      return engine.symbols.some((symbol: Symbol) => {
        return coordinates.is_neighbour(symbol.coordinates);
      });
    });
  })
    .reduce((acc, part: EnginePart) => acc + part.value, 0);
}
