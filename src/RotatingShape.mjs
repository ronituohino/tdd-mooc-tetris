export class RotatingShape {
  shape;

  constructor(initial) {
    this.shape = initial;
  }

  static fromString(str) {
    return new RotatingShape(str);
  }

  toString() {
    return this.shape;
  }
}
