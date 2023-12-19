import { Action, getNextWorkflow, PartInstructions } from "../types.ts";

export function partOne(instructions: PartInstructions): number {
  return instructions.parts.map((part) => {
    let next: string | Action | undefined = "in";
    do {
      const next_workflow = instructions.workflows.find((workflow) =>
        workflow.name === next
      );
      next = getNextWorkflow(part, next_workflow!)!;
    } while (next !== Action.Accept && next !== Action.Reject);
    return { part, next };
  }).filter(({ next }) => next === Action.Accept)
    .map(({ part }) => part.x + part.m + part.a + part.s)
    .reduce((a, b) => a + b, 0);
}
