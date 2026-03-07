import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Score } from "../src/Score.mjs";

const CUSTOM_I_BLOCK = [
  `....
   IIII
   ....
   ....`,
  `.I..
   .I..
   .I..
   .I..`,
  `....
   IIII
   ....
   ....`,
  `.I..
   .I..
   .I..
   .I..`,
];

describe("When lines are cleared on the board", () => {
  let board;
  let score;
  beforeEach(() => {
    score = new Score();
    board = new Board(6, 6, score);
  });

  test("the scorer receives a signal", () => {
    board.seed(
      `......
       ......
       ......
       T....I
       TTT..I
       TTTT.I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalLinesCleared()).to.greaterThan(0);
  });
  test("the scorer will increase by 40 when a line is cleared", () => {
    board.seed(
      `......
       ......
       ......
       T....I
       TTT..I
       TTTT.I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalScore()).to.equal(40);
  });

  test("the scorer will increase by 100 when 2 lines are cleared at once", () => {
    board.seed(
      `......
       ......
       ......
       T...OI
       TTT.OI
       TTT.OI`,
      CUSTOM_I_BLOCK,
      2,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalScore()).to.equal(100);
  });
  test("the scorer will increase by 300 when 3 lines are cleared at once", () => {
    board.seed(
      `......
       ....OO
       T...OO
       TI.TOI
       TT.OOI
       TT.OOI`,
      CUSTOM_I_BLOCK,
      1,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalScore()).to.equal(300);
  });

  test("the scorer will increase by 1200 when 4 lines are cleared at once", () => {
    board.seed(
      `...T..
       ..TTOO
       T.ITOO
       T.ITOI
       T.IOOI
       T.IOOI`,
      CUSTOM_I_BLOCK,
      0,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalScore()).to.equal(1200);
  });
});

describe("When lines are not cleared on the board", () => {
  let board;
  let score;
  beforeEach(() => {
    score = new Score();
    board = new Board(6, 6, score);
  });

  test("the scorer will not receive signals", () => {
    board.seed(
      `......
       ......
       ......
       T....I
       TTT..I
       TTT..I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(score.totalLinesCleared()).to.equal(0);
  });
});
