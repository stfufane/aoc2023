import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day12/sample.txt");

const SAMPLE_ANSWER_ONE = 21;
const SAMPLE_ANSWER_TWO = 0; // 525152;

Deno.test("day 12 part 1", () => {
  assertEquals(partOne(preprocess(sample_input, false)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 12 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input, true)), SAMPLE_ANSWER_TWO);
});
