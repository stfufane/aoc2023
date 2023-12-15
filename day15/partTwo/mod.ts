import { Instruction, Lens } from "../mod.ts";

interface BoxLens {
  label: string;
  focal_length: number;
}

interface Box {
  lenses: BoxLens[];
}

export function partTwo(lenses: Lens[]): number {
  const boxes = new Array<Box>(256);
  for (const lens of lenses) {
    const box_idx = lens.label_hash;
    if (!boxes[box_idx]) {
      boxes[box_idx] = { lenses: [] };
    }
    const box_has_lens = boxes[box_idx].lenses.find((l) =>
      l.label === lens.label
    );
    if (lens.instruction === Instruction.Insert) {
      if (box_has_lens) {
        // Update the lens in the box
        boxes[box_idx].lenses = boxes[box_idx].lenses.map((l) =>
          l.label === lens.label
            ? { label: l.label, focal_length: lens.length }
            : l
        );
      } else {
        // Add the lens to the box
        boxes[box_idx].lenses.push({
          label: lens.label,
          focal_length: lens.length,
        });
      }
    } else {
      // Remove the lens from the box
      if (box_has_lens) {
        boxes[box_idx].lenses = boxes[box_idx].lenses.filter((l) =>
          l.label !== lens.label
        );
      }
    }
  }

  return boxes.map((box, box_idx) => {
    return box.lenses.map((lens, lens_idx) => {
      return (box_idx + 1) * (lens_idx + 1) * lens.focal_length;
    }).reduce((a, b) => a + b, 0);
  }).reduce((a, b) => a + b, 0);
}
