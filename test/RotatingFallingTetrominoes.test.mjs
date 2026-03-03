import { beforeEach, describe, test } from "vitest";
import { expect } from "chai";
import { Board } from "../src/Board.mjs";
import { Tetromino } from "../src/Tetromino.mjs";

function fallToBottom(board) {
  for (let i = 0; i < 10; i++) {
    board.tick();
  }
}

function searchConsecutivePatterns(board, patterns) {
  const indexes = patterns.map(() => -1);
  const lines = board.toString().split("\n");
  let currentIndex = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const resultIndex = line.search(patterns[currentIndex]);
    if (resultIndex === -1) {
      if (currentIndex !== 0) {
        break;
      }
      continue;
    } else {
      indexes[currentIndex] = resultIndex;
      currentIndex += 1;

      if (currentIndex >= indexes.length) {
        break;
      } else {
        continue;
      }
    }
  }
  return indexes;
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

    const indexes = searchConsecutivePatterns(board, ["[.]T[.]", "[.]TT[.]", "[.]T[.]"]);
    indexes.forEach((pattern) => {
      expect(pattern.index).to.not.equal(-1);
    });
    expect(indexes[0]).to.equal(indexes[2]);
    expect(indexes[1]).to.be.lessThan(indexes[0]);
  });
  test("right in the air", () => {
    board.drop(Tetromino.T_SHAPE);
    board.tick();
    board.rotateRight();

    const indexes = searchConsecutivePatterns(board, ["[.]T[.]", "[.]TT[.]", "[.]T[.]"]);
    indexes.forEach((pattern) => {
      expect(pattern.index).to.not.equal(-1);
    });
    expect(indexes[0]).to.equal(indexes[1]);
    expect(indexes[1]).to.equal(indexes[2]);
  });
  test("left while touching a wall", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }
    board.rotateLeft();

    const indexes = searchConsecutivePatterns(board, ["[.]T[.]", "TT[.]", "[.]T[.]"]);
    indexes.forEach((pattern) => {
      expect(pattern.index).to.not.equal(-1);
    });
    expect(indexes[0]).to.equal(indexes[1]);
    expect(indexes[1]).to.equal(indexes[2]);
  });
  test("right while touching a wall", () => {
    board.drop(Tetromino.T_SHAPE);
    for (let i = 0; i < 10; i++) {
      board.moveLeft();
    }
    board.rotateRight();

    const indexes = searchConsecutivePatterns(board, ["[.]T[.]", "[.]TT[.]", "[.]T[.]"]);
    indexes.forEach((pattern) => {
      expect(pattern.index).to.not.equal(-1);
    });
    expect(indexes[0]).to.equal(indexes[1]);
    expect(indexes[1]).to.equal(indexes[2]);
  });
  test("while touching the ground", () => {
    board.drop(Tetromino.T_SHAPE);
    board.rotateRight();
    for (let i = 0; i < 10; i++) {
      board.moveDown();
    }
    board.rotateLeft();
    const indexes = searchConsecutivePatterns(board, ["[.]T[.]", "[.]TTT[.]"]);
    indexes.forEach((pattern) => {
      expect(pattern.index).to.not.equal(-1);
    });
    expect(indexes[0]).to.be.greaterThan(indexes[1]);
  });
  test("left while touching another block", () => {
    board.seed(
      `..........
       ..........
       ..........
       ..........
       ....OO....
       ....OO....`,
      [
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
      ],
      4,
      2
    );

    console.log(board.toString());
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
