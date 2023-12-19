export enum Evaluate {
  GreaterThan = ">",
  LessThan = "<",
}

export enum Category {
  X = "x",
  M = "m",
  A = "a",
  S = "s",
}

export enum Action {
  Accept = "A",
  Reject = "R",
}

export interface Rule {
  category: Category;
  evaluate: Evaluate;
  value: number;
  workflow: string | Action;
}

export interface Workflow {
  name: string;
  rules: Rule[];
  default_rule: string | Action;
}

export type PartRatings = Record<Category, number>;

export interface PartInstructions {
  workflows: Workflow[];
  parts: PartRatings[];
}

export function getNextWorkflow(
  part: Record<Category, number>,
  workflow: Workflow,
): string | Action | undefined {
  for (const rule of workflow.rules) {
    const { category, evaluate, value, workflow: next_workflow } = rule;
    const partValue = part[category as Category];
    let next: string | undefined = undefined;
    switch (evaluate) {
      case Evaluate.GreaterThan:
        next = partValue > value ? next_workflow : undefined;
        break;
      case Evaluate.LessThan:
        next = partValue < value ? next_workflow : undefined;
        break;
      default:
        break;
    }
    // Check the next rule
    if (next === undefined) {
      continue;
    }
    return next;
  }
  // No rule was found :(
  return workflow.default_rule;
}
