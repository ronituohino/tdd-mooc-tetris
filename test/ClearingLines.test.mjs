import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";

const CUSTOM_I_BLOCK = [
  `...
   III
   ...`,
  `.I.
   .I.
   .I.`,
  `...
   III
   ...`,
  `.I.
   .I.
   .I.`,
];

describe("When a single line (row) becomes full on the board", () => {
  let board;
  beforeEach(() => {
    board = new Board(6, 6);
  });
  test("the line is removed", () => {
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
       ......
       T...II
       TTT.II`
    );
  });
  test.skip("blocks above the line are moved down", () => {});
});

describe("When N lines become full", () => {
  test.skip("N=2 lines are removed", () => {});
  test.skip("N=3 lines are removed", () => {});
  test.skip("N=4 lines are removed", () => {});
});
