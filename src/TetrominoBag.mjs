export class TetrominoBag {
  tetrominos;
  length;

  constructor() {
    this.tetrominos = [];
    this.length = 0;
  }

  add(tetrominos) {
    for (let t = 0; t < tetrominos.length; t++) {
      this.tetrominos.push(tetrominos[t]);
    }
    this.length += tetrominos.length;
  }

  get() {
    const tetromino = this.tetrominos.pop();
    this.length -= 1;
    return tetromino;
  }
}
