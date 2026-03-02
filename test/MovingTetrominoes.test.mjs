import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function getBoardFirstLine(board) {
  return board.toString().split("\n")[0];
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
    expect(board.toString()).to.equalShape(
      `OO........
       OO........
       ..........
       ..........
       ..........
       ..........`
    );
  });
  test("right of the board", () => {
    board.drop(Tetromino.T_SHAPE.rotateLeft());
    for (let i = 0; i < 10; i++) {
      board.moveRight();
    }
    expect(board.toString()).to.equalShape(
      `.........T
       ........TT
       .........T
       ..........
       ..........
       ..........`
    );
  });
  test("bottom of the board (will stop falling)", () => {
    board.drop(Tetromino.O_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`
    );
  });
});

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("A falling tetromino cannot be moved through", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("other blocks on the left", () => {
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveRight();
    board.moveRight();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ......OO..
       ....OOOO..
       ....OO....`
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
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.moveLeft();
    board.tick();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ..........
       ..OO......
       ..OOOO....
       ....OO....`
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
    board.drop(Tetromino.O_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.O_SHAPE);
    board.moveLeft();
    board.tick();
    board.tick();
    expect(board.toString()).to.equalShape(
      `..........
       ..........
       ...OO.....
       ...OO.....
       ....OO....
       ....OO....`
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
