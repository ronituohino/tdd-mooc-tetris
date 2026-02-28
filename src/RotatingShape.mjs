export class RotatingShape {
  characters;
  width;
  height;
  // undefined, "no-rotate", "2-state"
  rotationConstraint;
  rotationOtherState;

  constructor(characters, width, height, rotationConstraint, rotationOtherState) {
    this.characters = characters;
    this.width = width;
    this.height = height;
    this.rotationConstraint = rotationConstraint;
    this.rotationOtherState = rotationOtherState;
  }

  static parseText(str) {
    const charArr = str.split("\n").map((s) => s.trim());
    return [charArr.join(""), charArr[0].length, charArr.length];
  }

  static fromString(str, rotationConstraint, rotationOtherState) {
    if (typeof str !== "string") {
      return undefined;
    }

    const [characters, widht, height] = RotatingShape.parseText(str);
    return new RotatingShape(
      characters,
      widht,
      height,
      rotationConstraint,
      rotationConstraint === "2-state" ? RotatingShape.parseText(rotationOtherState)[0] : undefined
    );
  }

  rotateRight(rotationConstraint) {
    if (rotationConstraint === "no-rotate") {
      return this;
    }
    if (rotationConstraint === "2-state") {
      return new RotatingShape(
        this.rotationOtherState,
        this.width,
        this.height,
        this.rotationConstraint,
        this.characters
      );
    }

    let str = "";
    for (let x = 0; x < this.width; x++) {
      for (let y = this.height - 1; y >= 0; y--) {
        str += this.characters[y * this.width + x];
      }
    }
    return new RotatingShape(str, this.width, this.height, rotationConstraint);
  }

  rotateLeft(rotationConstraint) {
    if (rotationConstraint === "no-rotate") {
      return this;
    }

    let str = "";
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = 0; y < this.height; y++) {
        str += this.characters[y * this.width + x];
      }
    }
    return new RotatingShape(str, this.width, this.height, rotationConstraint, "l");
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
