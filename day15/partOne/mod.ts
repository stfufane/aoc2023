import { Lens } from "../mod.ts";

export function partOne(lenses: Lens[]): number {
  return lenses.map((l) => l.hash).reduce((a, b) => a + b, 0);
}
