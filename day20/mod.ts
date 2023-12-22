import { partOne } from "./partOne/mod.ts";
import { partTwo } from "./partTwo/mod.ts";
import {
  Broadcaster,
  Conjunction,
  FlipFlop,
  Module,
  modules,
  Pulse,
  TestModule,
} from "./types.ts";

export function preprocess(text: string): Map<string, Module> {
  for (const line of text.split("\n")) {
    const [from, to] = line.split(" -> ");
    const outputs = to.split(", ");
    switch (from[0]) {
      case "&":
        modules.set(from.slice(1), new Conjunction(from.slice(1), outputs));
        break;
      case "%":
        modules.set(from.slice(1), new FlipFlop(from.slice(1), outputs));
        break;
      case "b":
        modules.set(from, new Broadcaster(from, outputs));
        break;
      default:
        break;
    }
  }

  // Identify test modules and provide inputs list to other modules
  for (const [name, module] of modules) {
    for (const output of module.outputs) {
      if (!modules.has(output)) {
        modules.set(output, new TestModule(output));
      }
      modules.get(output)?.inputs.push(name);
    }
  }

  // Initialise input values for conjuntion modules
  for (const [_name, module] of modules) {
    if (module instanceof Conjunction) {
      for (const input of module.inputs) {
        module.inputs_values.set(input, Pulse.Low);
      }
    }
  }
  return modules;
}

export function main(text: string, isPart2: boolean) {
  const input = preprocess(text);
  if (isPart2) {
    return partTwo(input);
  }
  return partOne(input);
}

export { partOne, partTwo };
