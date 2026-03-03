export class RotatingShape {
  characters;
  width;
  height;
  // undefined, "no-rotate", "2-state", "arika"
  rotationConstraint;
  rotationOtherState;
  arikaStates;
  arikaCurrentState;

  constructor(characters, width, height, rotationConstraint, rotationOtherState, arikaStates, currentArikaState) {
    this.characters = characters;
    this.width = width;
    this.height = height;
    this.rotationConstraint = rotationConstraint;
    this.rotationOtherState = rotationOtherState;
    this.arikaStates = arikaStates;
    this.arikaCurrentState = currentArikaState;
  }

  static parseText(str) {
    const charArr = str.split("\n").map((s) => s.trim());
    return [charArr.join(""), charArr[0].length, charArr.length];
  }

  static fromString(str, rotationConstraint, rotationOtherState, arikaStates, initialArikaState) {
    if (typeof str !== "string") {
      return undefined;
    }
    if (rotationConstraint === "arika") {
      const cleanedStates = [];
      let width = 0;
      let height = 0;
      for (let i = 0; i < arikaStates.length; i++) {
        const cleaned = RotatingShape.parseText(arikaStates[i]);
        cleanedStates.push(cleaned[0]);
        width = cleaned[1];
        height = cleaned[2];
      }
      return new RotatingShape(
        undefined,
        width,
        height,
        rotationConstraint,
        undefined,
        cleanedStates,
        initialArikaState
      );
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
      let newState = this.arikaCurrentState + 1;
      if (newState >= this.arikaStates.length) {
        newState = 0;
      }
      return new RotatingShape("", this.width, this.height, "arika", undefined, this.arikaStates, newState);
    }
  }

  rotateLeft() {
    if (this.rotationConstraint === "arika") {
      let newState = this.arikaCurrentState - 1;
      if (newState < 0) {
        newState = this.arikaStates.length - 1;
      }
      return new RotatingShape("", this.width, this.height, "arika", undefined, this.arikaStates, newState);
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
    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        if (this.rotationConstraint === "arika") {
          str += this.arikaStates[this.arikaCurrentState][y * this.width + x];
        } else {
          str += this.characters[y * this.width + x];
        }
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
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        let char;
        if (this.rotationConstraint === "arika") {
          char = this.arikaStates[this.arikaCurrentState][y * this.width + x];
        } else {
          char = this.characters[y * this.width + x];
        }
        if (char !== ".") {
          coordsAndChars.push({ x, y, char });
        }
      }
    }
    return coordsAndChars;
  }
}
