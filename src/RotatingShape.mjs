export class RotatingShape {
  characters;
  width;
  height;
  // undefined, "no-rotate", "2-state", "arika"
  rotationConstraint;
  rotationOtherState;
  arikaCurrentState = 0;
  arikaStates;

  constructor(characters, width, height, rotationConstraint, rotationOtherState, arikaStates) {
    this.characters = characters;
    this.width = width;
    this.height = height;
    this.rotationConstraint = rotationConstraint;
    this.rotationOtherState = rotationOtherState;
    this.arikaStates = arikaStates;
    this.arikaCurrentState = 0;
  }

  static parseText(str) {
    const charArr = str.split("\n").map((s) => s.trim());
    return [charArr.join(""), charArr[0].length, charArr.length];
  }

  static fromString(str, rotationConstraint, rotationOtherState, arikaStates) {
    if (typeof str !== "string") {
      return undefined;
    }
    if (rotationConstraint === "arika") {
      return new RotatingShape(undefined, undefined, undefined, rotationConstraint, undefined, arikaStates);
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

  rotateRight() {
    if (this.rotationConstraint === "arika") {
      this.arikaCurrentState += 1;
      if (this.arikaCurrentState >= this.arikaStates.length - 1) {
        this.arikaCurrentState = 0;
      }
      return this;
    }
    if (this.rotationConstraint === "no-rotate") {
      return this;
    }
    if (this.rotationConstraint === "2-state") {
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
    return new RotatingShape(str, this.width, this.height);
  }

  rotateLeft() {
    if (this.rotationConstraint === "arika") {
      this.arikaCurrentState -= 1;
      if (this.arikaCurrentState < 0) {
        this.arikaCurrentState = this.arikaStates.length - 1;
      }
      return this;
    }
    if (this.rotationConstraint === "no-rotate") {
      return this;
    }
    if (this.rotationConstraint === "2-state") {
      return new RotatingShape(
        this.rotationOtherState,
        this.width,
        this.height,
        this.rotationConstraint,
        this.characters
      );
    }

    let str = "";
    for (let x = this.width - 1; x >= 0; x--) {
      for (let y = 0; y < this.height; y++) {
        str += this.characters[y * this.width + x];
      }
    }
    return new RotatingShape(str, this.width, this.height);
  }

  toString() {
    if (this.rotationConstraint === "arika") {
      return this.arikaStates[this.arikaCurrentState];
    }

    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        str += this.characters[y * this.width + x];
      }
      str += "\n";
    }
    return str;
  }

  /** Goes through the shape and extracts shape characters into an array [{x,y,element}, ...]
   *  x and y are in local shape coordinates.
   *
   *  E.g. [{x: 1, y: 0, element: "T"}, {x:0, y:1, element: "T"}, ...]
   */
  extractCoordinatesAndCharacters() {
    let coordsAndChars = [];
    if (this.rotationConstraint === "arika") {
      const [rawChars, width, height] = RotatingShape.parseText(this.arikaStates[this.arikaCurrentState]);
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const char = rawChars[y * this.width + x];
          if (char !== ".") {
            coordsAndChars.push({ x, y, char });
          }
        }
      }
      return coordsAndChars;
    }

    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const char = this.characters[y * this.width + x];
        if (char !== ".") {
          coordsAndChars.push({ x, y, char });
        }
      }
    }
    return coordsAndChars;
  }
}
