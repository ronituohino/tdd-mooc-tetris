import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function getBoardFirstLine(board) {
  return board.toString().split("\n")[0];
}

function getBoardSecondLine(board) {
  return board.toString().split("\n")[1];
}

describe("A falling tetromino can be moved", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left", () => {
    board.drop(Tetromino.T_SHAPE);
    const beforeMoveFirstTetrominoCharacterIndex = getBoardFirstLine(board).search("T");
    board.moveLeft();
    const afterMoveFirstTetrominoCharacterIndex = getBoardFirstLine(board).search("T");
    expect(beforeMoveFirstTetrominoCharacterIndex).to.be.greaterThan(afterMoveFirstTetrominoCharacterIndex);
  });
  test("right", () => {
    board.drop(Tetromino.T_SHAPE);
    const beforeMoveFirstTetrominoCharacterIndex = getBoardFirstLine(board).search("T");
    board.moveRight();
    const afterMoveFirstTetrominoCharacterIndex = getBoardFirstLine(board).search("T");
    expect(beforeMoveFirstTetrominoCharacterIndex).to.be.lessThan(afterMoveFirstTetrominoCharacterIndex);
  });
  test("down", () => {
    board.drop(Tetromino.T_SHAPE);
    const beforeMoveFirstLineHasTetrominoCharacter = getBoardFirstLine(board).includes("T");
    board.moveDown();
    const afterMoveFirstLineHasTetrominoCharacter = getBoardFirstLine(board).includes("T");
    expect(beforeMoveFirstLineHasTetrominoCharacter).to.not.equal(afterMoveFirstLineHasTetrominoCharacter);
  });
});

describe("A falling tetromino cannot be moved beyond", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("left of the board", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }
    expect(getBoardFirstLine(board).startsWith("OO")).to.be.true;
    expect(getBoardSecondLine(board).startsWith("OO")).to.be.true;
  });
  test("right of the board", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveRight();
    }
    expect(getBoardFirstLine(board).endsWith("OO")).to.be.true;
    expect(getBoardSecondLine(board).endsWith("OO")).to.be.true;
  });
  test("bottom of the board (will stop falling)", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }
    const lines = board.toString().split("\n");
    expect(lines[lines.length - 2].includes("OO")).to.be.true;
    expect(lines[lines.length - 3].includes("OO")).to.be.true;
  });
});

const CUSTOM_O_SHAPE = [
  `...
   .OO
   .OO`,
  `...
   .OO
   .OO`,
  `...
   .OO
   .OO`,
  `...
   .OO
   .OO`,
];

describe("A falling tetromino cannot be moved through", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("other blocks on the left", () => {
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      CUSTOM_O_SHAPE,
      5,
      2
    );

    board.moveLeft();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......OO..
       ....OOOO..
       ....OO....`
    );
  });
  test("other blocks on the right", () => {
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      CUSTOM_O_SHAPE,
      1,
      2
    );

    board.moveRight();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..OO......
       ..OOOO....
       ....OO....`
    );
  });
  test("other blocks below (will stop falling)", () => {
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      CUSTOM_O_SHAPE,
      2,
      1
    );

    board.moveDown();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...OO.....
       ...OO.....
       ....OO....
       ....OO....`
    );
  });
});
