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
    this.fallingShape?.extractElements().forEach((spot) => {
      arr[(spot.y + this.shapePosY) * this.width + (spot.x + this.shapePosX)] = spot.element;
    });

    // static shapes
    for (let s = 0; s < this.occupiedSpots.length; s++) {
      const spot = this.occupiedSpots[s];
      arr[spot.y * this.width + spot.x] = spot.element;
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

  tick() {
    if (!this.fallingShape) {
      return;
    }

    const elements = this.fallingShape.extractElements();
    const newPos = this.shapePosY + 1;
    let newPosIllegal = false;
    for (let e = 0; e < elements.length; e++) {
      const spot = elements[e];
      if (
        spot.y + newPos >= this.height ||
        this.occupiedSpots.some((os) => spot.y + newPos === os.y && spot.x + this.shapePosX === os.x)
      ) {
        newPosIllegal = true;
        break;
      }
    }

    if (newPosIllegal) {
      // turn falling shape into static
      this.fallingShape
        .extractElements()
        .forEach((spot) =>
          this.occupiedSpots.push({ x: spot.x + this.shapePosX, y: spot.y + this.shapePosY, element: spot.element })
        );
      this.fallingShape = undefined;
    } else {
      this.shapePosY = newPos;
    }
  }
}
