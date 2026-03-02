import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

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
  test("right in the air", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ....T.....
       ....TT....
       ....T.....
       ..........
       ..........`
    );
  });
  test("left while touching a wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `.T........
       TT........
       .T........
       ..........
       ..........
       ..........`
    );
  });
  test("right while touching a wall", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `.T........
       .TT.......
       .T........
       ..........
       ..........
       ..........`
    );
  });
  test("while touching the ground", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ....T.....
       ...TTT....
       ..........`
    );
  });
  test("left while touching another block", () => {
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......T...
       .....TT...
       ....OOT...
       ....OO....`
    );
  });
  test("right while touching another block", () => {
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.tick();
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ...TT.....
       ...TOO....
       ....OO....`
    );
  });
});

describe("A falling Tetromino cannot be rotated", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left when other blocks are in the way", () => {
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....OO....
       ....OO....`
    );
  });
  test("right when other blocks are in the way", () => {
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ....T.....
       ...TTT....
       ....OO....
       ....OO....`
    );
  });
  test("when block would reach higher than before (no floor kick)", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....T.....
       ...TTT....`
    );
  });
});

describe("Wall kick works on", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 6);
  });

  test("the left side", () => {
    board.drop(Tetromino.T_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateRight();
    board.moveLeft();
    board.tick();
    expect(board.toString()).to.equalShape(
      `........
       T.......
       TT......
       T.......
       ........
       ........`
    );
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `........
       .T......
       TTT.....
       ........
       ........
       ........`
    );
  });
  test.skip("the right side", () => {});
});

describe("Wall kick does not work on", () => {
  test.skip("the left side if it is blocked", () => {});
  test.skip("the right side if it is blocked", () => {});
});
