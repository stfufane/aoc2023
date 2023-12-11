export interface Planet {
  x: number;
  y: number;
}

export interface Universe {
  planets: Planet[];
  lines: number[][];
  columns: number[][];
}

export function getPlanetsExpanded(
  universe: Universe,
  expansion: number,
): Planet[] {
  return universe.planets.map((planet) => {
    return {
      x: planet.x +
        universe.columns
            .filter((column, index) =>
              index < planet.x && column.every((value) => value === 0)
            ).length * (expansion - 1),
      y: planet.y +
        universe.lines
            .filter((line, index) =>
              index < planet.y && line.every((value) => value === 0)
            ).length * (expansion - 1),
    };
  });
}

export function getPlanetsDistance(planets: Planet[]): number {
  // Generate all the unique pairs of planets and calculate distance between each pair.
  return planets
    .flatMap((planet, index) => {
      return planets.slice(index + 1).map((other) => [planet, other]);
    })
    .map((pair) =>
      Math.abs(pair[0].x - pair[1].x) + Math.abs(pair[0].y - pair[1].y)
    ).reduce((a, b) => a + b);
}
