export class Board {
  width;
  height;

  // falling shape
  fallingShape;
  hasFallingShape;
  shapePosX;
  shapePosY;

  // static shapes
  occupiedSpots;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.shapePosX = -1;
    this.shapePosY = -1;
    this.fallingShape = "";
    this.hasFallingShape = false;

    this.occupiedSpots = [];
  }

  toString() {
    let boardStr = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.height; x++) {
        if (y === this.shapePosY && x === this.shapePosX) {
          boardStr += this.fallingShape;
        } else {
          boardStr += ".";
        }
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  drop(shape) {
    if (this.hasFallingShape) {
      throw new Error("already falling");
    }

    this.shapePosX = Math.floor(this.width / 2);
    this.shapePosY = 0;
    this.fallingShape = shape;
    this.hasFallingShape = true;
  }

  hasFalling() {
    return this.hasFallingShape;
  }

  tick() {
    if (this.shapePosY >= this.height - 1) {
      // turn falling shape into static
      this.occupiedSpots.push({ x: this.shapePosX, y: this.shapePosY, style: this.fallingShape });

      this.hasFallingShape = false;
      this.fallingShape = "";
      this.shapePosX = -1;
      this.shapePosY = -1;
    } else {
      this.shapePosY += 1;
    }
  }
}
