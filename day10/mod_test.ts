import { partOne, partTwo, preprocess } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.208.0/assert/mod.ts";

const sample_input1 = await Deno.readTextFile("./day10/sample1.txt");
const sample_input2 = await Deno.readTextFile("./day10/sample2.txt");

const SAMPLE_ANSWER_ONE = 8;
const SAMPLE_ANSWER_TWO = 10;

Deno.test("day 10 part 1", () => {
  assertEquals(partOne(preprocess(sample_input1)), SAMPLE_ANSWER_ONE);
});

Deno.test("day 10 part 2", () => {
  assertEquals(partTwo(preprocess(sample_input2)), SAMPLE_ANSWER_TWO);
});
