import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

const CUSTOM_T_BLOCK = [
  `.T.
   TTT
   ...`,
  `.T.
   .TT
   .T.`,
  `...
   TTT
   .T.`,
  `.T.
   TT.
   .T.`,
];

describe("A falling Tetromino can be rotated", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left in the air", () => {
    board.seed(undefined, CUSTOM_T_BLOCK, 1, 1);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..T.......
       .TT.......
       ..T.......
       ..........
       ..........`
    );
  });
  test("right in the air", () => {
    board.seed(undefined, CUSTOM_T_BLOCK, 1, 1);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..T.......
       ..TT......
       ..T.......
       ..........
       ..........`
    );
  });
  test("left while touching a wall", () => {
    board.seed(undefined, CUSTOM_T_BLOCK, 0, 1);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       .T........
       TT........
       .T........
       ..........
       ..........`
    );
  });
  test("right while touching a wall", () => {
    board.seed(undefined, CUSTOM_T_BLOCK, 0, 1);
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       .T........
       .TT.......
       .T........
       ..........
       ..........`
    );
  });
  test("while touching the ground", () => {
    board.seed(undefined, CUSTOM_T_BLOCK, 1, 3, 1);
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..T.......
       .TTT......
       ..........`
    );
  });
  test("left while touching another block", () => {
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      CUSTOM_T_BLOCK,
      5,
      2
    );
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ......T...
       .....TTT..
       ....OO....
       ....OO....`
    );

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
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      CUSTOM_T_BLOCK,
      2,
      2
    );
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...T......
       ..TTT.....
       ....OO....
       ....OO....`
    );

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
    board.moveRight();
    board.tick();
    board.tick();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       .....T....
       ....TTT...
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

describe("Wall kick works", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 6);
  });

  test("on the left side", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
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
  test("on the right side", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateLeft();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    expect(board.toString()).to.equalShape(
      `........
       .......T
       ......TT
       .......T
       ........
       ........`
    );
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `........
       ......T.
       .....TTT
       ........
       ........
       ........`
    );
  });
  test("with an I shape on the left", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       IIII....
       ........
       ........`
    );
  });
  test("with an I shape on the right", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.tick();
    board.tick();
    board.tick();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.rotateRight();
    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ....IIII
       ........
       ........`
    );
  });
});

describe("Wall kick does not work on", () => {
  let board;
  beforeEach(() => {
    board = new Board(8, 8);
  });

  test("the left side if it is blocked", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveLeft();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveLeft();
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       T.......
       TTI.....
       T.I.....
       ..I.....
       ..I.....`
    );
  });
  test("the right side if it is blocked", () => {
    board.drop(Tetromino.I_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    board.moveRight();
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.tick();
    board.rotateLeft();
    expect(board.toString()).to.equalShape(
      `........
       ........
       ........
       ......T.
       .....ITT
       .....IT.
       .....I..
       .....I..`
    );
  });
});
