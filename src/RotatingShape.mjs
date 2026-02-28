export class RotatingShape {
  characters;
  width;
  height;

  constructor(characters, widht, height) {
    this.characters = characters;
    this.width = widht;
    this.height = height;
  }

  static fromString(str) {
    if (typeof str !== "string") {
      return undefined;
    }

    let characterArr = str.split("\n").map((s) => s.trim());
    return new RotatingShape(characterArr.join(""), characterArr[0].length, characterArr.length);
  }

  rotateRight() {
    let str = "";
    let index = 0;
    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; y >= 0; y--) {
        str += this.characters[y * this.width + x];
        index += 1;
      }
    }
    this.characters = str;
    return this;
  }

  toString() {
    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        str += this.characters[y * this.width + x];
      }
      str += "\n";
    }
    return str;
  }
}
