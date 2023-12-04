export function partOne(cards: Map<number, number>): number {
  return Array.from(cards.values()).filter((nb_winnning: number) =>
    nb_winnning > 0
  )
    .map((nb_winning: number): number => Math.pow(2, nb_winning - 1))
    .reduce((acc: number, val: number): number => acc + val, 0);
}
