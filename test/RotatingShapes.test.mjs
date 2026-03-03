import { describe, test } from "vitest";
import { expect } from "chai";
import { RotatingShape } from "../src/RotatingShape.mjs";

describe("Rotating 3x3 shape", () => {
  let shape = RotatingShape.fromString(
    [
      `ABC
       DEF
       GHI`,
      `GDA
       HEB
       IFC`,
      `IHG
       FED
       CBA`,
      `CFI
       BEH
       ADG`,
    ],
    0
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ABC
       DEF
       GHI`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `GDA
       HEB
       IFC`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `CFI
       BEH
       ADG`
    );
  });
});

describe("Rotating 5x5 shape", () => {
  let shape = RotatingShape.fromString(
    [
      `ABCDE
       FGHIJ
       KLMNO
       PQRST
       UVWXY`,
      `UPKFA
       VQLGB
       WRMHC
       XSNID
       YTOJE`,
      `YXWVU
       TSRQP
       ONMLK
       JIHGF
       EDCBA`,
      `EJOTY
       DINSX
       CHMRW
       BGLQV
       AFKPU`,
    ],
    0
  );

  test("initial orientation", () => {
    expect(shape.toString()).to.equalShape(
      `ABCDE
       FGHIJ
       KLMNO
       PQRST
       UVWXY`
    );
  });

  test("can be rotated right/clockwise", () => {
    expect(shape.rotateRight().toString()).to.equalShape(
      `UPKFA
       VQLGB
       WRMHC
       XSNID
       YTOJE`
    );
  });

  test("can be rotated left/counter-clockwise", () => {
    expect(shape.rotateLeft().toString()).to.equalShape(
      `EJOTY
       DINSX
       CHMRW
       BGLQV
       AFKPU`
    );
  });
});
