export enum Pulse {
  Low,
  High,
}

export class Module {
  name: string;
  pulse: Pulse;
  outputs: string[];
  inputs: string[] = [];

  constructor(
    name: string,
    pulse: Pulse,
    outputs: string[],
  ) {
    this.name = name;
    this.pulse = pulse;
    this.outputs = outputs;
  }

  process_pulse(pulse: Pulse, input: string): void {
    return;
    console.log(input, pulse, "to", this.name);
  }

  send_pulse(): void {
    for (const output of this.outputs) {
      //   console.log("send pulse from " + this.name, "to " + output);
      pulses.push({
        pulse: this.pulse,
        from: this.name,
        to: modules.get(output)!,
      });
    }
  }
}

export interface PulseToProcess {
  pulse: Pulse;
  from: string;
  to: Module;
}

export const modules: Map<string, Module> = new Map();
export const pulses = new Array<PulseToProcess>();

export class FlipFlop extends Module {
  constructor(
    name: string,
    outputs: string[],
  ) {
    super(name, Pulse.Low, outputs);
  }

  process_pulse(pulse: Pulse, input: string): void {
    super.process_pulse(pulse, input);
    if (pulse == Pulse.High) {
      return;
    }
    this.pulse = this.pulse === Pulse.High ? Pulse.Low : Pulse.High;
    this.send_pulse();
  }
}

export class Conjunction extends Module {
  inputs_values: Map<string, Pulse> = new Map();

  constructor(
    name: string,
    outputs: string[],
  ) {
    super(name, Pulse.High, outputs);
  }

  process_pulse(pulse: Pulse, input: string): void {
    super.process_pulse(pulse, input);
    this.inputs_values.set(input, pulse);
    // Check if all inputs are the same
    if (
      Array.from(this.inputs_values.values()).every((value) =>
        value == Pulse.High
      )
    ) {
      this.pulse = Pulse.Low;
    } else {
      this.pulse = Pulse.High;
    }
    this.send_pulse();
  }
}

export class Broadcaster extends Module {
  constructor(
    name: string,
    outputs: string[],
  ) {
    super(name, Pulse.High, outputs);
  }

  process_pulse(pulse: Pulse, input: string): void {
    super.process_pulse(pulse, input);
    this.pulse = pulse;
    this.send_pulse();
  }
}

export class TestModule extends Module {
  constructor(
    name: string,
  ) {
    super(name, Pulse.High, []);
  }

  process_pulse(pulse: Pulse, input: string): void {
    super.process_pulse(pulse, input);
    this.pulse = pulse;
  }
}
