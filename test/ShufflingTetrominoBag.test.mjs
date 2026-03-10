import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { TetrominoBag } from "../src/TetrominoBag.mjs";

const setOfTetrominos = [Tetromino.I_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE];

describe("A tetromino bag", () => {
  let bag;
  beforeEach(() => {
    bag = new TetrominoBag();
  });

  test("can be initialized with n tetrominos", () => {
    for (let n = 0; n < 100; n++) {
      bag = new TetrominoBag();
      for (let i = 0; i < n; i++) {
        bag.add([setOfTetrominos[Math.floor(Math.random() * 3)]]);
      }
      expect(bag.length).to.equal(n);
    }
  });
  test("can give out tetrominos in LIFO order", () => {
    bag.add(setOfTetrominos);
    const tetromino = bag.get();
    expect(tetromino.toString()).to.equalShape(
      `....
       .OO.
       .OO.
       ....`
    );
  });
  test("loses tetrominos when it gives them out", () => {
    bag.add(setOfTetrominos);
    bag.get();
    expect(bag.length).to.equal(2);
  });
  test("can be shuffled", () => {
    const uniqueSets = new Set();

    for (let n = 0; n < 1000; n++) {
      bag = new TetrominoBag();
      bag.add(setOfTetrominos);
      bag.shuffle();

      let threeTetrominoesString = "";
      for (let i = 0; i < 3; i++) {
        threeTetrominoesString += bag.get().toString();
      }
      uniqueSets.add(threeTetrominoesString);
    }

    expect(uniqueSets.size).to.equal(6);
    /**
     * ITO
     * IOT
     * TIO
     * TOI
     * OIT
     * OTI
     */
  });
});
