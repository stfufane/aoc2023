function gcd(a: number, b: number): number {
  return b == 0 ? a : gcd(b, a % b);
}

export function lcm(numbers: number[]): number {
  return numbers.reduce((a, b) => (a * b) / gcd(a, b), numbers[0]);
}

export function hash_pair(x: number, y: number): number {
  return (y << 16) ^ x;
}
