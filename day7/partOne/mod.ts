import { Hand } from "../types.ts";

export function partOne(hands: Hand[]): number {
  // Sort the cards from the weakest to the strongest.
  return hands
    .sort((a, b) => a.strength - b.strength)
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((a, b) => a + b);
}
