import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

describe("A falling tetromino can be moved", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `...T......
       ..TTT.....
       ..........
       ..........
       ..........
       ..........`
    );
  });
  test("right", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    expect(board.toString()).to.equalShape(
      `.....T....
       ....TTT...
       ..........
       ..........
       ..........
       ..........`
    );
  });
  test("down", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ...TTT....
       ..........
       ..........
       ..........`
    );
  });
});

describe("A falling tetromino cannot be moved beyond", () => {
  test.skip("left of the board", () => {});
  test.skip("right of the board", () => {});
  test.skip("bottom of the board (will stop falling)", () => {});
});

describe("A falling tetromino cannot be moved through", () => {
  test.skip("other blocks on the left", () => {});
  test.skip("other blocks on the right", () => {});
  test.skip("other blocks below (will stop falling)", () => {});
});
