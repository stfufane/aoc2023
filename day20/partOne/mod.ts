import { Module, Pulse, pulses } from "../types.ts";

export function partOne(modules: Map<string, Module>): number {
  let low_pulses = 0;
  let high_pulses = 0;

  const broadcaster = modules.get("broadcaster")!;
  for (let push = 0; push < 1000; push++) {
    pulses.push({ pulse: Pulse.Low, from: "button", to: broadcaster });
    while (pulses.length > 0) {
      const { pulse, from, to: module } = pulses.shift()!;
      low_pulses += pulse == Pulse.Low ? 1 : 0;
      high_pulses += pulse == Pulse.High ? 1 : 0;
      module.process_pulse(pulse, from);
    }
  }
  return low_pulses * high_pulses;
}
