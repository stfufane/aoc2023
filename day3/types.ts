export class Coordinates {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  is_neighbour(other: Coordinates): boolean {
    return (
      Math.abs(this.x - other.x) <= 1 && Math.abs(this.y - other.y) <= 1 &&
      !(this.x == other.x && this.y == other.y)
    );
  }
}

export interface EnginePart {
  value: number;
  coordinates: Coordinates[];
}

export interface Symbol {
  value: string;
  coordinates: Coordinates;
}

export interface Engine {
  parts: EnginePart[];
  symbols: Symbol[];
}
