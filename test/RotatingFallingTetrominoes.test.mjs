import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling Tetromino can be rotated", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left in the air", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TT.....
       ....T.....
       ..........
       ..........`
    );
  });
  test.skip("right in the air", () => {});
  test.skip("left while touching a wall", () => {});
  test.skip("right while touching a wall", () => {});
  test.skip("left while touching the ground", () => {});
  test.skip("right while touching the ground", () => {});
  test.skip("left while touching another block", () => {});
  test.skip("right while touching another block", () => {});
});

describe("A falling Tetromino cannot be rotated", () => {
  test.skip("left when other blocks are in the way", () => {});
  test.skip("right when other blocks are in the way", () => {});
});

describe("Wall kick works on", () => {
  test.skip("the left side", () => {});
  test.skip("the right side", () => {});
});

describe("Wall kick does not work on", () => {
  test.skip("the left side if it is blocked", () => {});
  test.skip("the right side if it is blocked", () => {});
});
