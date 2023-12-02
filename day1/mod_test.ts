import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input = await Deno.readTextFile("./day1/sample.txt");
const sample_input2 = await Deno.readTextFile("./day1/sample2.txt");

const SAMPLE_ANSWER_ONE = 142;
const SAMPLE_ANSWER_TWO = 281;

Deno.test("day 1 part 1", () => {
  assertEquals(partOne(preprocess(sample_input)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 1 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input2)), SAMPLE_ANSWER_TWO);
});
