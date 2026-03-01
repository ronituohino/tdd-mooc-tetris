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

  isIllegalMove(movementX, movementY) {
    const coordsAndChars = this.fallingShape.extractCoordinatesAndCharacters();
    let isIllegal = false;
    for (let cc = 0; cc < coordsAndChars.length; cc++) {
      const someChar = coordsAndChars[cc];
      // if some of the spots on the falling shape are past the board boundaries or
      // collide with some occupied space
      const newX = someChar.x + this.shapePosX + movementX;
      const newY = someChar.y + this.shapePosY + movementY;
      if (
        newX < 0 ||
        newX >= this.width ||
        newY >= this.height ||
        this.occupiedSpots.some((os) => newX === os.x && newY === os.y)
      ) {
        isIllegal = true;
        break;
      }
    }
    return isIllegal;
  }

  // input
  moveLeft() {
    if (!this.isIllegalMove(-1, 0)) {
      this.shapePosX -= 1;
    }
  }
  moveRight() {
    if (!this.isIllegalMove(1, 0)) {
      this.shapePosX += 1;
    }
  }
  moveDown() {
    if (!this.isIllegalMove(0, 1)) {
      this.shapePosY += 1;
    }
  }

  tick() {
    if (!this.fallingShape) {
      return;
    }

    if (this.isIllegalMove(0, 1)) {
      // turn falling shape into static
      this.fallingShape.extractCoordinatesAndCharacters().forEach((someChar) =>
        this.occupiedSpots.push({
          x: someChar.x + this.shapePosX,
          y: someChar.y + this.shapePosY,
          char: someChar.char,
        })
      );
      this.fallingShape = undefined;
    } else {
      this.shapePosY += 1;
    }
  }
}
