import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input_1 = await Deno.readTextFile("./day8/sample1.txt");
const sample_input_2 = await Deno.readTextFile("./day8/sample2.txt");

const SAMPLE_ANSWER_ONE = 6;
const SAMPLE_ANSWER_TWO = 6;

Deno.test("day 8 part 1", () => {
  assertEquals(partOne(preprocess(sample_input_1)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 8 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input_2)), SAMPLE_ANSWER_TWO);
});
