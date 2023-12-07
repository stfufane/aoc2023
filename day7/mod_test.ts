import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day7/sample.txt");

const SAMPLE_ANSWER_ONE = 6440;
const SAMPLE_ANSWER_TWO = 5905;

Deno.test("day 7 part 1", () => {
  assertEquals(partOne(preprocess(sample_input, false)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 7 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input, true)), SAMPLE_ANSWER_TWO);
});
