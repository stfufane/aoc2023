export class RichText {
  // deno-lint-ignore no-explicit-any
  private _data: any;
  private _properties: Array<
    | RichText.COLOR
    | RichText.BACKGROUND
    | RichText.STYLE
  >;

  static RESET = "\x1b[0m";

  constructor(
    // deno-lint-ignore no-explicit-any
    data: any,
    ...properties: Array<
      | RichText.COLOR
      | RichText.BACKGROUND
      | RichText.STYLE
    >
  ) {
    this._data = data;
    this._properties = properties;
  }

  toString() {
    return this._properties.join("") + `${this._data}${RichText.RESET}`;
  }
}

// deno-lint-ignore no-namespace
export namespace RichText {
  export enum COLOR {
    RED = "\x1b[31m",
    GREEN = "\x1b[32m",
    YELLOW = "\x1b[33m",
    BLUE = "\x1b[34m",
    MAGENTA = "\x1b[35m",
    CYAN = "\x1b[36m",
    WHITE = "\x1b[37m",
  }

  export enum BACKGROUND {
    RED = "\x1b[41m",
    GREEN = "\x1b[42m",
    YELLOW = "\x1b[43m",
    BLUE = "\x1b[44m",
    MAGENTA = "\x1b[45m",
    CYAN = "\x1b[46m",
    WHITE = "\x1b[47m",
  }

  export enum STYLE {
    BRIGHT = "\x1b[1m",
    DIM = "\x1b[2m",
    UNDERSCORE = "\x1b[4m",
    BLINK = "\x1b[5m",
    REVERSE = "\x1b[7m",
    HIDDEN = "\x1b[8m",
  }
}
