import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import { Category, Evaluate, PartInstructions } from "./types.ts";

export function preprocess(text: string): PartInstructions {
  const [workflows_list, parts_list] = text.split("\n\n");
  const workflows = workflows_list.split("\n").map((workflow) => {
    const [name, rules_list] = workflow.replace("}", "").split("{");
    const all_rules = rules_list.split(",");
    const default_rule = all_rules.pop()!;
    const rules = all_rules.map((rule) => {
      const [condition, workflow] = rule.split(":");
      return {
        category: condition[0] as Category,
        evaluate: condition[1] as Evaluate,
        value: Number(condition.slice(2)),
        workflow,
      };
    });
    return {
      name,
      rules,
      default_rule,
    };
  });

  const parts = parts_list.split("\n").map((parts) =>
    parts.replace(/[{}]/g, "")
  ).map((parts) => {
    const [x, m, a, s] = parts.split(",").map((part) =>
      Number(part.split("=")[1])
    );
    return { x, m, a, s };
  });
  return {
    workflows,
    parts,
  };
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
