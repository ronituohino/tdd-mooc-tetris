import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Tetromino } from "../src/Tetromino.mjs";
import { TetrominoBag } from "../src/TetrominoBag.mjs";

describe("A tetromino bag", () => {
  let bag;
  beforeEach(() => {
    bag = new TetrominoBag();
  });
  test("can be initialized with n tetrominos", () => {
    bag.add([Tetromino.I_SHAPE, Tetromino.I_SHAPE, Tetromino.O_SHAPE, Tetromino.T_SHAPE, Tetromino.O_SHAPE]);
    expect(bag.length).to.equal(5);
  });
});
