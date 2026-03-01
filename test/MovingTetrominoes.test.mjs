import { describe, test } from "vitest";
import { expect } from "chai";

describe("A falling tetromino can be moved", () => {
  test("left", () => {});
  test.skip("right", () => {});
  test.skip("down", () => {});
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
