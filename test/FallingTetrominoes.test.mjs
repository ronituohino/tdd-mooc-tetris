import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

describe("Falling tetrominoes", () => {
  let board;
  beforeEach(() => {
    board = new Board(10, 6);
  });

  test("start from the top middle", () => {
    board.drop(Tetromino.T_SHAPE);

    const firstLine = board.toString().split("\n")[0];
    expect(firstLine.startsWith("..")).to.be.true;
    expect(firstLine.endsWith("..")).to.be.true;
    expect(firstLine.includes("T")).to.be.true;
  });

  test("stop when they hit the bottom", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    const lines = board.toString().split("\n");
    const lastLine = lines[lines.length - 2];
    expect(lastLine.includes("T")).to.be.true;
    expect(board.hasFalling()).to.be.false;
  });

  test("stop when they land on another block", () => {
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);
    board.drop(Tetromino.T_SHAPE);
    fallToBottom(board);

    // 2 T blocks on top of each other (present in 4 rows)
    const lines = board.toString().split("\n");
    for (let i = 0; i < 4; i++) {
      const line = lines[lines.length - 2 - i];
      expect(line.includes("T")).to.be.true;
    }
    expect(board.hasFalling()).to.be.false;
  });
});
