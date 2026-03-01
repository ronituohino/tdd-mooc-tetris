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

  toString() {
    let boardStr = ".".repeat(this.width * this.height);
    for (let s = 0; s < this.occupiedSpots.length; s++) {
      let spot = this.occupiedSpots[s];
    }
    return boardStr;
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

    this.shapePosX = Math.floor(this.width / 2);
    this.shapePosY = 0;
    this.fallingShape = tetromino;
  }

  hasFalling() {
    return this.fallingShape !== undefined;
  }

  tick() {
    let newPos = this.shapePosY + 1;

    if (newPos >= this.height || this.occupiedSpots.some((os) => os.y === newPos && os.x === this.shapePosX)) {
      // turn falling shape into static
      this.occupiedSpots.push({ x: this.shapePosX, y: this.shapePosY, shape: this.fallingShape });
      this.fallingShape = undefined;
    } else {
      this.shapePosY = newPos;
    }
  }
}
