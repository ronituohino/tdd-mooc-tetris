import { RotatingShape } from "./RotatingShape.mjs";

export class Board {
  width;
  height;

  // falling shape
  fallingShape;
  shapePosX;
  shapePosY;

  // static shapes
  occupiedSpots;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.shapePosX = -1;
    this.shapePosY = -1;
    this.fallingShape = undefined;

    this.occupiedSpots = [];
  }

  // rendering logic
  toString() {
    // background
    const arr = [];
    for (let i = 0; i < this.width * this.height; i++) {
      arr.push(".");
    }

    // falling shape
    this.fallingShape?.extractCoordinatesAndCharacters().forEach((someChar) => {
      arr[(someChar.y + this.shapePosY) * this.width + (someChar.x + this.shapePosX)] = someChar.char;
    });

    // static shapes
    for (let s = 0; s < this.occupiedSpots.length; s++) {
      const os = this.occupiedSpots[s];
      arr[os.y * this.width + os.x] = os.char;
    }

    // add \n chars between lines
    for (let y = 0; y < this.height; y++) {
      arr.splice((y + 1) * this.width + y, 0, "\n");
    }
    return arr.join("");
  }

  drop(shape) {
    if (this.fallingShape !== undefined) {
      throw new Error("already falling");
    }

    let tetromino;
    if (typeof shape === "string") {
      tetromino = RotatingShape.fromString(shape);
    } else {
      tetromino = shape;
    }

    this.shapePosX = Math.floor(this.width / 2 - tetromino.width / 2);
    this.shapePosY = 0;
    this.fallingShape = tetromino;
  }

  hasFalling() {
    return this.fallingShape !== undefined;
  }

  // input
  moveLeft() {
    const coordsAndChars = this.fallingShape.extractCoordinatesAndCharacters();
    let newPosIllegal = false;
    for (let cc = 0; cc < coordsAndChars.length; cc++) {
      const someChar = coordsAndChars[cc];
      // if some of the spots on the falling shape are past the board boundaries or
      // collide with some occupied space
      if (
        someChar.x + this.shapePosX - 1 < 0 ||
        this.occupiedSpots.some(
          (os) => someChar.x + this.shapePosX - 1 === os.x && someChar.y + this.shapePosY === os.y
        )
      ) {
        newPosIllegal = true;
        break;
      }
    }

    if (!newPosIllegal) {
      this.shapePosX -= 1;
    }
  }
  moveRight() {
    let maxX = 0;
    this.fallingShape.extractCoordinatesAndCharacters().forEach((someChar) => {
      if (someChar.x > maxX) {
        maxX = someChar.x;
      }
    });
    if (this.shapePosX < this.width - maxX - 1) {
      this.shapePosX += 1;
    }
  }
  moveDown() {
    let maxY = 0;
    this.fallingShape.extractCoordinatesAndCharacters().forEach((someChar) => {
      if (someChar.y > maxY) {
        maxY = someChar.x;
      }
    });
    if (this.shapePosY < this.height - maxY - 1) {
      this.shapePosY += 1;
    }
  }

  tick() {
    if (!this.fallingShape) {
      return;
    }

    const coordsAndChars = this.fallingShape.extractCoordinatesAndCharacters();
    const newPos = this.shapePosY + 1;
    let newPosIllegal = false;
    for (let cc = 0; cc < coordsAndChars.length; cc++) {
      const someChar = coordsAndChars[cc];
      // if some of the spots on the falling shape are past the board lower boundary or
      // collide with some occupied space
      if (
        someChar.y + newPos >= this.height ||
        this.occupiedSpots.some((os) => someChar.y + newPos === os.y && someChar.x + this.shapePosX === os.x)
      ) {
        newPosIllegal = true;
        break;
      }
    }

    if (newPosIllegal) {
      // turn falling shape into static
      coordsAndChars.forEach((someChar) =>
        this.occupiedSpots.push({
          x: someChar.x + this.shapePosX,
          y: someChar.y + this.shapePosY,
          char: someChar.char,
        })
      );
      this.fallingShape = undefined;
    } else {
      this.shapePosY = newPos;
    }
  }
}
