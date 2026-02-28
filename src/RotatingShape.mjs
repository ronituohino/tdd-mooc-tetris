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

    let charArrays = str.split("\n").map((s) => s.trim());
    return new RotatingShape(charArrays.join(""), charArrays[0].length, charArrays.length);
  }

  toString() {
    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        str += this.charArr[y * this.width + x];
      }
      str += "\n";
    }
    return str;
  }
}
