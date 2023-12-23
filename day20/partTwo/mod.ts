import { Module, Pulse, pulses } from "../types.ts";

export function partTwo(modules: Map<string, Module>): number {
  const cycles_to_follow = new Map<string, number>();
  // rx has one input, this input is a conjunction and has 4 conjunction inputs.
  // For rx to receive a low pulse, all 4 conjunction inputs must be high.
  const rx_inputs = modules.get("rx")!.inputs;
  for (const rx_input of rx_inputs) {
    const conjunction = modules.get(rx_input)!;
    for (const c_input of conjunction.inputs) {
      const module = modules.get(c_input)!;
      cycles_to_follow.set(module.name, 0);
    }
  }

  let nb_cycles = 0;
  const broadcaster = modules.get("broadcaster")!;
  while (true) {
    nb_cycles++;
    pulses.push({ pulse: Pulse.Low, from: "button", to: broadcaster });
    while (pulses.length > 0) {
      const { pulse, from, to: module } = pulses.shift()!;
      module.process_pulse(pulse, from);
      if (cycles_to_follow.has(from) && pulse == Pulse.High) {
        cycles_to_follow.set(from, nb_cycles);
      }
    }

    // Check if all the cycles have been found.
    let all_cycles_found = true;
    for (const cycle of cycles_to_follow.values()) {
      if (cycle == 0) {
        all_cycles_found = false;
        break;
      }
    }
    if (all_cycles_found) {
      break;
    }
  }
  return Array.from(cycles_to_follow.values()).reduce((a, b) => a * b, 1);
}
