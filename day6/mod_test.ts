import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day6/sample.txt");

const SAMPLE_ANSWER_ONE = 288;
const SAMPLE_ANSWER_TWO = 71503;

Deno.test("day 6 part 1", () => {
  assertEquals(partOne(preprocess(sample_input)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 6 part 2", () => {
  assertEquals(partTwo(sample_input), SAMPLE_ANSWER_TWO);
});
