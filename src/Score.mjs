export class Score {
  total;
  linesCleared;
  level;

  constructor() {
    this.level = 0;
    this.total = 0;
    this.linesCleared = 0;
  }

  clear(amount) {
    this.linesCleared += amount;

    switch (amount) {
      case 1:
        this.total += 40;
        break;
      case 2:
        this.total += 100;
        break;
      case 3:
        this.total += 300;
        break;
      case 4:
        this.total += 1200;
        break;
    }
  }

  totalScore() {
    return this.total;
  }
  totalLinesCleared() {
    return this.linesCleared;
  }
}
