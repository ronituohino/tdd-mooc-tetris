export class RotatingShape {
  shape;

  constructor(initial) {
    this.shape = initial;
  }

  static fromString(str) {
    if (typeof str !== "string") {
      return undefined;
    }

    let charArrays = str.split("\n").map((s) => s.trim().split(""));
    return new RotatingShape(charArrays);
  }

  rotateRight() {}

  toString() {
    return `${this.shape.map((charArrays) => charArrays.join("")).join("\n")}\n`;
  }
}
