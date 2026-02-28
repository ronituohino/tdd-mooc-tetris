export class Board {
  width;
  height;

  shapePosX;
  shapePosY;

  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.shapePosX = -1;
    this.shapePosY = -1;
  }

  toString() {
    let boardStr = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.height; x++) {
        if (y === this.shapePosY && x === this.shapePosX) {
          boardStr += "X";
        } else {
          boardStr += ".";
        }
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  drop() {
    this.shapePosX = Math.floor(this.width / 2);
    this.shapePosY = 0;
  }

  tick() {
    this.shapePosY += 1;
  }
}
