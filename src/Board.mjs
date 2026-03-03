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

  seed(initalBoardState, fallingShapeStates, fallingShapePosX, fallingShapePosY, initialFallingShapeState) {
    if (initalBoardState !== undefined) {
      const charArr = initalBoardState.split("\n").map((lines) => lines.trim());
      const boardStr = charArr.join("");
      if (charArr[0].length != this.width || charArr.length != this.height) {
        throw new Error(`Seed function board dimensions do not match ${this.width} x ${this.height}`);
      }
      for (let y = 0; y < this.height; y++) {
        for (let x = 0; x < this.width; x++) {
          const char = boardStr[y * this.width + x];
          if (char !== ".") {
            this.occupiedSpots.push({ x, y, char });
          }
        }
      }
    }

    this.fallingShape = RotatingShape.fromString(
      fallingShapeStates,
      initialFallingShapeState ? initialFallingShapeState : 0
    );
    this.shapePosX = fallingShapePosX;
    this.shapePosY = fallingShapePosY;
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
      tetromino = RotatingShape.fromString(shape.repeat(4).split(""), 0);
    } else {
      tetromino = shape;
    }

    this.shapePosX = Math.floor(this.width / 2 - tetromino.width / 2);

    let minY = tetromino.height;
    tetromino.extractCoordinatesAndCharacters().forEach((char) => {
      if (char.y < minY) {
        minY = char.y;
      }
    });
    this.shapePosY = 0 - minY;

    this.fallingShape = tetromino;
  }

  hasFalling() {
    return this.fallingShape !== undefined;
  }

  isIllegalMove(shape, movementX, movementY) {
    const coordsAndChars = shape.extractCoordinatesAndCharacters();
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

  isIllegalRotation(direction, movementX, movementY) {
    let testShape;
    if (direction === "right") {
      testShape = this.fallingShape.rotateRight();
    } else if (direction === "left") {
      testShape = this.fallingShape.rotateLeft();
    }
    return this.isIllegalMove(testShape, movementX, movementY);
  }

  // input
  moveLeft() {
    if (!this.isIllegalMove(this.fallingShape, -1, 0)) {
      this.shapePosX -= 1;
    }
  }
  moveRight() {
    if (!this.isIllegalMove(this.fallingShape, 1, 0)) {
      this.shapePosX += 1;
    }
  }
  moveDown() {
    if (!this.isIllegalMove(this.fallingShape, 0, 1)) {
      this.shapePosY += 1;
    }
  }
  rotateLeft() {
    if (!this.isIllegalRotation("left", 0, 0)) {
      this.fallingShape = this.fallingShape.rotateLeft();
    } else {
      for (let i = 1; i < Math.max(1, Math.min(this.fallingShape.width, this.fallingShape.height) - 1); i++) {
        if (!this.isIllegalRotation("left", i, 0)) {
          this.fallingShape = this.fallingShape.rotateLeft();
          this.shapePosX += i;
          break;
        }
      }
    }
  }
  rotateRight() {
    if (!this.isIllegalRotation("right", 0, 0)) {
      this.fallingShape = this.fallingShape.rotateRight();
    } else {
      for (let i = 1; i < Math.max(1, Math.min(this.fallingShape.width, this.fallingShape.height) - 1); i++) {
        if (!this.isIllegalRotation("right", i * -1, 0)) {
          this.fallingShape = this.fallingShape.rotateRight();
          this.shapePosX -= i;
          break;
        }
      }
    }
  }

  tick() {
    if (!this.fallingShape) {
      return;
    }

    if (this.isIllegalMove(this.fallingShape, 0, 1)) {
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
