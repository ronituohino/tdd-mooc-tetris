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
    let boardStr = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.height; x++) {
        let occupiedSpot = false;
        for (let s = 0; s < this.occupiedSpots.length; s++) {
          let spot = this.occupiedSpots[s];
          if (y === spot.y && x === spot.x) {
            boardStr += spot.style;
            occupiedSpot = true;
            break;
          }
        }
        if (occupiedSpot) {
          continue;
        }
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
    if (this.fallingShape !== undefined) {
      throw new Error("already falling");
    }

    this.shapePosX = Math.floor(this.width / 2);
    this.shapePosY = 0;
    this.fallingShape = shape;
  }

  hasFalling() {
    return this.fallingShape !== undefined;
  }

  tick() {
    let newPos = this.shapePosY + 1;

    if (newPos >= this.height || this.occupiedSpots.some((os) => os.y === newPos && os.x === this.shapePosX)) {
      // turn falling shape into static
      this.occupiedSpots.push({ x: this.shapePosX, y: this.shapePosY, style: this.fallingShape });

      this.fallingShape = undefined;
      //this.shapePosX = -1;
      //this.shapePosY = -1;
    } else {
      this.shapePosY = newPos;
    }
  }
}
