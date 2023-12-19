import { Action, Category, Evaluate, PartInstructions } from "../types.ts";

interface Range {
  min: number;
  max: number;
}

type PartRanges = Record<Category, Range>;

interface RangeToProcess {
  workflow_name: string;
  ranges: PartRanges;
}

export function partTwo(instructions: PartInstructions): number {
  const accepted_ranges: PartRanges[] = [];
  const ranges_to_process: Array<RangeToProcess> = [];
  ranges_to_process.push(
    {
      workflow_name: "in",
      ranges: {
        x: { min: 1, max: 4000 },
        m: { min: 1, max: 4000 },
        a: { min: 1, max: 4000 },
        s: { min: 1, max: 4000 },
      },
    },
  );

  // For each instruction rule, we want to split the ranges into two according to the rule
  // and send them to the next instruction to test.
  while (ranges_to_process.length > 0) {
    let { workflow_name, ranges } = ranges_to_process.pop()!;
    const current_workflow = instructions.workflows.find((workflow) =>
      workflow.name === workflow_name
    )!;
    const rules = current_workflow.rules;

    for (const rule of rules) {
      const { category, evaluate, value: split, workflow: next_workflow } =
        rule;

      const range = ranges[category];
      // Evaluate the rule to create the new ranges
      const valid_ranges = { ...ranges };
      const rest = { ...ranges };

      if (evaluate == Evaluate.GreaterThan) {
        valid_ranges[category] = { min: split + 1, max: range.max };
        rest[category] = { min: range.min, max: split };
      } else {
        valid_ranges[category] = { min: range.min, max: split - 1 };
        rest[category] = { min: split, max: range.max };
      }

      // Add the accepted ranges to the list
      if (next_workflow === Action.Accept) {
        accepted_ranges.push(valid_ranges);
      } else if (next_workflow !== Action.Reject) {
        ranges_to_process.push({
          workflow_name: next_workflow,
          ranges: valid_ranges,
        });
      }
      ranges = rest;
    }

    // Range is used up, so we can skip it
    if (
      ranges.x.min === ranges.x.max && ranges.m.min === ranges.m.max &&
      ranges.a.min === ranges.a.max && ranges.s.min === ranges.s.max
    ) {
      continue;
    }

    if (current_workflow.default_rule === Action.Accept) {
      accepted_ranges.push(ranges);
    } else if (current_workflow.default_rule !== Action.Reject) {
      ranges_to_process.push({
        workflow_name: current_workflow.default_rule,
        ranges,
      });
    }
  }

  // Sum all the combinations of valid ranges
  return accepted_ranges.map((range) =>
    (range.x.max - range.x.min + 1) * (range.m.max - range.m.min + 1) *
    (range.a.max - range.a.min + 1) * (range.s.max - range.s.min + 1)
  ).reduce((a, b) => a + b, 0);
}
