export class RotatingShape {
  charArr;
  width;
  height;

  constructor(charArr, widht, height) {
    this.charArr = charArr;
    this.width = widht;
    this.height = height;
  }

  static fromString(str) {
    if (typeof str !== "string") {
      return undefined;
    }

    let charArrays = str.split("\n").map((s) => s.trim().split(""));
    return new RotatingShape(charArrays, charArrays[0].length, charArrays.length);
  }

  rotateRight() {}

  toString() {
    return `${this.charArr.map((charArrays) => charArrays.join("")).join("\n")}\n`;
  }
}
