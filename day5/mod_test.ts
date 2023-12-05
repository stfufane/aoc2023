import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day5/sample.txt");

const SAMPLE_ANSWER_ONE = 35;
const SAMPLE_ANSWER_TWO = 46;

Deno.test("day 5 part 1", () => {
  assertEquals(partOne(preprocess(sample_input)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 5 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input)), SAMPLE_ANSWER_TWO);
});
