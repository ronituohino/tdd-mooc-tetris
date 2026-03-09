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

  shuffle() {
    for (let i = this.tetrominos.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1));
      [this.tetrominos[i], this.tetrominos[randomIndex]] = [this.tetrominos[randomIndex], this.tetrominos[i]];
    }
  }
}
