## Level 0 - Tetris requirements

### Input system

- Keyboard input
  - Rotate
  - Move left
  - Move right
- Input is blocked if not possible

### Game board

- 18x10 grid of occupied / not occupied spaces

### Game score

- Point counter

### Game logic

- Game ticker
- Move active block down on every tick
- When active block cannot move on tick, freeze it
- If a horizontal line is filled

  - Remove those occupied spaces from game board and add points
  - Move all occupied spaces above downward
  - If multiple horizontal lines are filled, give more score
    - 1 line: 40 points
    - 2 lines: 260 points ?
    - 3 lines: 520 points ?
    - 4 lines (tetris!): 1200 points

- If a block is frozen above the level, reset game
  - Reset game board
  - Save score
  - Reset score

### Game blocks

- Snake (3x2)
- Reverse snake (3x2)
- T (3x2)
- L (3x2)
- Reverse L (3x2)
- I, 4x1
- Square, 2x2
