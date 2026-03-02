export class ArikaShape {
  states;
  currentState;

  constructor(states, currentState) {
    this.states = states;
    this.currentState = currentState;
  }

  rotateRight() {
    let newState = this.currentState + 1;
    if (newState >= this.states.length) {
      newState = 0;
    }
    return new ArikaShape(this.states, newState);
  }
  rotateLeft() {}
  toString() {}
  extractCoordinatesAndCharacters() {}
}
