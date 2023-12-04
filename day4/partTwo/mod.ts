// For faster access because we calculate the same thing multiple times
const results_cache = new Map<number, number>();

export function partTwo(cards: Map<number, number>): number {
  return Array.from(cards.keys()).map((card_id: number): number => {
    return getNbWinningCards(cards, card_id);
  })
    .reduce((acc: number, val: number) => acc + val, 0);
}

export function getNbWinningCards(
  cards: Map<number, number>,
  card_id: number,
): number {
  if (results_cache.has(card_id)) {
    return results_cache.get(card_id)!;
  }

  const winning_numbers: number = cards.get(card_id)!;
  if (winning_numbers === 0) {
    results_cache.set(card_id, 1);
    return 1;
  }

  const total = Array.from(
    { length: winning_numbers },
    (_, i) => card_id + i + 1,
  )
    .reduce(
      (acc: number, val: number) => acc + getNbWinningCards(cards, val),
      1,
    );
  results_cache.set(card_id, total);
  return total;
}
