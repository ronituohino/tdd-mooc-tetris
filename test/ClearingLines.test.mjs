import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";

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

describe("On the board, when line(s) become full", () => {
  let board;
  beforeEach(() => {
    board = new Board(6, 6);
  });
  test("a single line is removed and blocks move down", () => {
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

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ....I.
       T...II
       TTT.II`
    );
  });

  test("two lines are cleared and blocks move down", () => {
    board.seed(
      `......
       ......
       ......
       T....I
       IIII.I
       TTTT.I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ....I.
       T...II`
    );
  });
  test("three lines are cleared and blocks move down", () => {
    board.seed(
      `......
       ...T..
       .OTT..
       TOOT.I
       IIII.I
       TTTT.I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ...T..
       .OTTI.`
    );
  });
  test("four lines are cleared and blocks move down", () => {
    board.seed(
      `..T...
       O.TT..
       TOTT.I
       TOOT.T
       IIII.O
       TTTT.I`,
      CUSTOM_I_BLOCK,
      3,
      0,
      1
    );

    for (let i = 0; i < 10; i++) {
      console.log(board.toString());
      board.tick();
    }

    expect(board.toString()).to.equalShape(
      `......
       ......
       ......
       ......
       ..T...
       O.TT..`
    );
  });
});

describe("When a line doesn't become full", () => {
  test.skip("lines are not removed and blocks do not move", () => {});
});
