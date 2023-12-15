import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";

export function hash_label(s: string): number {
  return s.split("").reduce((acc, c) => {
    return ((acc + c.charCodeAt(0)) * 17) % 256;
  }, 0);
}

export enum Instruction {
  Insert,
  Remove,
}

export interface Lens {
  hash: number;
  label: string;
  label_hash: number;
  instruction: Instruction;
  length: number;
}

export function preprocess(text: string): Lens[] {
  return text.split(",").map((s) => {
    let length = 0;
    let instruction = Instruction.Remove;
    if (s.charAt(s.length - 1) !== "-") {
      length = Number(s.charAt(s.length - 1));
      instruction = Instruction.Insert;
    }
    const label = s.split(/[-=]/g)[0];
    return {
      hash: hash_label(s),
      label,
      label_hash: hash_label(label),
      instruction,
      length,
    };
  });
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
