export class RotatingShape {
  width;
  height;
  states;
  currentState;

  constructor(width, height, states, currentState) {
    this.width = width;
    this.height = height;
    this.states = states;
    this.currentState = currentState;
  }

  static parseText(str) {
    const charArr = str.split("\n").map((s) => s.trim());
    return [charArr.join(""), charArr[0].length, charArr.length];
  }

  static fromString(states, initialState) {
    const cleanedStates = [];
    let width = 0;
    let height = 0;
    for (let i = 0; i < states.length; i++) {
      const cleaned = RotatingShape.parseText(states[i]);
      cleanedStates.push(cleaned[0]);
      width = cleaned[1];
      height = cleaned[2];
    }
    return new RotatingShape(width, height, cleanedStates, initialState);
  }

  rotateRight() {
    let newState = this.currentState + 1;
    if (newState >= this.states.length) {
      newState = 0;
    }
    return new RotatingShape(this.width, this.height, this.states, newState);
  }

  rotateLeft() {
    let newState = this.currentState - 1;
    if (newState < 0) {
      newState = this.states.length - 1;
    }
    return new RotatingShape(this.width, this.height, this.states, newState);
  }

  toString() {
    let str = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        str += this.states[this.currentState][y * this.width + x];
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
        const char = this.states[this.currentState][y * this.width + x];
        if (char !== ".") {
          coordsAndChars.push({ x, y, char });
        }
      }
    }
    return coordsAndChars;
  }
}
