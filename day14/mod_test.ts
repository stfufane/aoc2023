import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day14/sample.txt");

const SAMPLE_ANSWER_ONE = 136;
const SAMPLE_ANSWER_TWO = 64;

Deno.test("day 14 part 1", () => {
  assertEquals(partOne(preprocess(sample_input)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 14 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input)), SAMPLE_ANSWER_TWO);
});
