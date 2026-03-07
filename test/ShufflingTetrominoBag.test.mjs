import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { TetrominoBag } from "../src/TetrominoBag.mjs";

describe("A tetromino bag", () => {
  let bag;
  beforeEach(() => {
    bag = new TetrominoBag();
    bag.add([Tetromino.I_SHAPE, Tetromino.I_SHAPE, Tetromino.T_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE]);
  });
  test("can be initialized with n tetrominos", () => {
    expect(bag.length).to.equal(5);
  });
  test("can give out tetrominos in LIFO order", () => {
    const tetromino = bag.get();
    expect(tetromino.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });
  test("loses tetrominos when it gives them out", () => {
    bag.get();
    expect(bag.length).to.equal(4);
  });
  test("can be shuffled", () => {
    let foundRandom = false;
    while (!foundRandom) {
      bag.shuffle();
      const tetromino = bag.get();
      expect(tetromino.toString()).to.not.equalShape(
        `....
       .OO.
       .OO.
       ....`
      );
      foundRandom = true;
    }
  });
});
