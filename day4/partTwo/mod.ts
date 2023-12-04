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
  const winning_numbers: number = cards.get(card_id)!;
  if (winning_numbers === 0) {
    return 1;
  }

  return Array.from(
    { length: winning_numbers },
    (_, i) => card_id + i + 1,
  )
    .reduce(
      (acc: number, val: number) => acc + getNbWinningCards(cards, val),
      1,
    );
}
