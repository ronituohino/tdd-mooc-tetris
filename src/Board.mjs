export class Board {
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  toString() {
    let boardStr = "";
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.height; x++) {
        boardStr += ".";
      }
      boardStr += "\n";
    }
    return boardStr;
  }

  drop() {
    return "";
  }
}
