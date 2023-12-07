export interface Hand {
  bid: number;
  strength: number;
}

export function letter_to_number(letter: string, isPart2: boolean): number {
  switch (letter) {
    case "T":
      return 10;
    case "J":
      return isPart2 ? 1 : 11;
    case "Q":
      return 12;
    case "K":
      return 13;
    case "A":
      return 14;
    default:
      return Number(letter);
  }
}

export function get_strength(cards: number[], isPart2: boolean): number {
  // Strength goes from 0 to 6, 6 being the strongest.
  // 6 : all cards are the same
  // 5 : four cards are the same
  // 4 : full house
  // 3 : three cards are the same
  // 2 : two pairs
  // 1 : one pair
  // 0 : nothing
  let card_occurrences = Array.from(
    cards.reduce(
      function (prev, cur) {
        prev.set(cur, prev.has(cur) ? prev.get(cur)! + 1 : 1);
        return prev;
      },
      new Map<number, number>(),
    ).entries(),
  ).sort((a, b) => b[1] - a[1]);

  if (isPart2) {
    // Find if an occurrence has 1 as a key
    const has_one = card_occurrences.find((occurrence) => occurrence[0] == 1);
    if (has_one) {
      const nb_jokers = has_one[1];
      // Remove the occurence of 1
      card_occurrences = card_occurrences.filter((occurrence) => {
        return occurrence[0] != 1;
      });
      // Increment the highest card by the number of jokers
      if (card_occurrences[0]) {
        card_occurrences[0][1] += nb_jokers;
      } else {
        // Only jokers, put aces instead.
        card_occurrences.push([14, nb_jokers]);
      }
    }
  }

  let card_strength = 0;
  switch (card_occurrences[0][1]) {
    case 5:
    case 4:
      card_strength = card_occurrences[0][1] + 1;
      break;
    case 3:
      card_strength = card_occurrences[1][1] == 2
        ? card_occurrences[0][1] + 1
        : 3;
      break;
    case 2:
      card_strength = card_occurrences[1][1] == 2 ? 2 : 1;
      break;
    default:
      card_strength = 0;
  }

  return cards
    .map((card, index) => card * Math.pow(10, cards.length - index - 1))
    .reduce((a, b) => a + b, card_strength * 100_000);
}
