# Advent of Code 2023 with Deno

Using a fork of
[this template](https://github.com/ismtabo/advent-of-code-deno-template) to
automate some tasks.

## Usage

### Pre-requisites

- [Deno](https://deno.land/)

### Installation

```bash
git clone https://github.com/stfufane/advent-of-code-deno-template.git -b run-cwd
cd advent-of-code-deno-template
deno install -n aoc -f --allow-read --allow-write --allow-run src/cli/mod.ts
```

### Commands

After intalling the CLI tool, you can run the following commands:

```bash
aoc new --day <day> # Create a new day
aoc get-desc --day <day> --cookie <cookie> # Get the description for a specific day
aoc get-input --day <day> --cookie <cookie> # Get the input for a specific day
aoc run --day <day> --part <part> # Run a specific day/part (add --time to get the execution time)
aoc submit --day <day> --part <part> --answer <answer> --cookie <cookie> # Submit a specific day/part
```

When creating a new day, a test module is created with a test for the example.
You just need to fill the expected result and provide the sample.txt file
associated. You can then run this command to check that your solution works with
the sample data :

```bash
deno test -A day<N> # Where <N> is the day number
```

Note: you can get your cookie by logging in to
[adventofcode.com](https://adventofcode.com/) and copying the value of the
`session` cookie.
