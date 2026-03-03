import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(
    "",
    "arika",
    undefined,
    [
      `....
       TTT.
       .T..
       ....`,
      `.T..
       TT..
       .T..
       ....`,
      `....
       .T..
       TTT.
       ....`,
      `.T..
       .TT.
       .T..
       ....`,
    ],
    0
  );
  static I_SHAPE = RotatingShape.fromString(
    "",
    "arika",
    undefined,
    [
      `....
       IIII
       ....
       ....`,
      `..I.
       ..I.
       ..I.
       ..I.`,
      `....
       IIII
       ....
       ....`,
      `..I.
       ..I.
       ..I.
       ..I.`,
    ],
    0
  );

  static O_SHAPE = RotatingShape.fromString(
    `.OO
     .OO
     ...`,
    "no-rotate"
  );
}
