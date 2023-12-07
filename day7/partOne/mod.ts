import { Hand } from "../types.ts";

export function partOne(hands: Hand[]): number {
  // Sort the cards from the weakest to the strongest.
  return hands
    .sort((a, b) => {
      if (a.strength != b.strength) {
        return a.strength - b.strength;
      } else {
        let card_index = 0;
        do {
          if (a.cards[card_index] != b.cards[card_index]) {
            return a.cards[card_index] - b.cards[card_index];
          }
          card_index++;
        } while (card_index < 5);
        return 0;
      }
    })
    .map((hand, index) => hand.bid * (index + 1))
    .reduce((a, b) => a + b);
}
