import { RotatingShape } from "./RotatingShape.mjs";

export class Tetromino {
  static T_SHAPE = RotatingShape.fromString(
    `.T.
     TTT
     ...`
  );
  static I_SHAPE = RotatingShape.fromString(
    `.....
     .....
     IIII.
     .....
     .....`,
    "2-state",
    `..I..
     ..I..
     ..I..
     ..I..
     .....`
  );
}
