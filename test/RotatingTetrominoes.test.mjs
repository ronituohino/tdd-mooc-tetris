import { describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";

function distinctOrientations(shape) {
  const distinct = new Set();
  let goingRight = shape;
  let goingLeft = shape;
  for (let i = 0; i < 10; i++) {
    distinct.add(goingRight.toString());
    goingRight = goingRight.rotateRight();
    distinct.add(goingLeft.toString());
    goingLeft = goingLeft.rotateLeft();
  }
  return distinct;
}

describe("The T shape", () => {
  test("has 4 distinct orientations", () => {
    expect(distinctOrientations(Tetromino.T_SHAPE).size).to.equal(4);
  });
});

describe("The I shape", () => {
  test("has 2 distinct orientations", () => {
    expect(distinctOrientations(Tetromino.I_SHAPE).size).to.equal(2);
  });
});

describe("The O shape", () => {
  test("has 1 distinct orientations", () => {
    expect(distinctOrientations(Tetromino.O_SHAPE).size).to.equal(1);
  });
});
