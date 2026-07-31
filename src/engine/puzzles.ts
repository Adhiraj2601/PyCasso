// Puzzle definitions for Pycasso
// Each puzzle defines a 5x5 target grid with cell colors and optional icons

export interface CellData {
  color: string;
  icon: string;
}

export interface Puzzle {
  id: number;
  title: string;
  size: number;
  targetGrid: CellData[][];
  defaultCode: string;
}

// Helper to create a row of cells quickly
function row(...cells: [string, string?][]): CellData[] {
  return cells.map(([color, icon]) => ({ color, icon: icon || '' }));
}

export const PUZZLES: Puzzle[] = [
  {
    id: 1,
    title: 'Checkerboard',
    size: 5,
    targetGrid: [
      row(['white'], ['black'], ['white'], ['black'], ['white']),
      row(['black'], ['white'], ['black'], ['white'], ['black']),
      row(['white'], ['black'], ['white'], ['black'], ['white']),
      row(['black'], ['white'], ['black'], ['white'], ['black']),
      row(['white'], ['black'], ['white'], ['black'], ['white']),
    ],
    defaultCode: `# Available Colors: "white", "black", "red", "blue", "green", "yellow", "orange", "purple", "pink", "cyan", "gray", "brown"
# Available Symbols: "", "star", "heart", "snowflake", "moon"
# Usage: pydle(x, y, symbol="", color="white")

for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 2,
    title: 'Sunset',
    size: 5,
    targetGrid: [
      row(['yellow'], ['yellow'], ['orange'], ['yellow'], ['yellow']),
      row(['orange'], ['orange'], ['orange'], ['orange'], ['orange']),
      row(['red'], ['orange'], ['red'], ['orange'], ['red']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['purple'], ['purple'], ['red'], ['purple'], ['purple']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 3,
    title: 'Blue Cross',
    size: 5,
    targetGrid: [
      row(['black'], ['black'], ['blue'], ['black'], ['black']),
      row(['black'], ['black'], ['blue'], ['black'], ['black']),
      row(['blue'], ['blue'], ['blue'], ['blue'], ['blue']),
      row(['black'], ['black'], ['blue'], ['black'], ['black']),
      row(['black'], ['black'], ['blue'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 4,
    title: 'Smiley',
    size: 5,
    targetGrid: [
      row(['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow']),
      row(['yellow'], ['black'], ['yellow'], ['black'], ['yellow']),
      row(['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow']),
      row(['yellow'], ['black'], ['yellow'], ['black'], ['yellow']),
      row(['yellow'], ['yellow'], ['black'], ['yellow'], ['yellow']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 5,
    title: 'Diamond',
    size: 5,
    targetGrid: [
      row(['black'], ['black'], ['cyan'], ['black'], ['black']),
      row(['black'], ['cyan'], ['cyan'], ['cyan'], ['black']),
      row(['cyan'], ['cyan'], ['cyan'], ['cyan'], ['cyan']),
      row(['black'], ['cyan'], ['cyan'], ['cyan'], ['black']),
      row(['black'], ['black'], ['cyan'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 6,
    title: 'Heart',
    size: 5,
    targetGrid: [
      row(['black'], ['red'], ['black'], ['red'], ['black']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['black'], ['red'], ['red'], ['red'], ['black']),
      row(['black'], ['black'], ['red'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 7,
    title: 'Arrow Up',
    size: 5,
    targetGrid: [
      row(['black'], ['black'], ['green'], ['black'], ['black']),
      row(['black'], ['green'], ['green'], ['green'], ['black']),
      row(['green'], ['black'], ['green'], ['black'], ['green']),
      row(['black'], ['black'], ['green'], ['black'], ['black']),
      row(['black'], ['black'], ['green'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 8,
    title: 'Snowfall',
    size: 5,
    targetGrid: [
      row(['blue', 'snowflake'], ['blue'], ['blue'], ['blue'], ['blue', 'snowflake']),
      row(['blue'], ['blue', 'snowflake'], ['blue'], ['blue', 'snowflake'], ['blue']),
      row(['blue'], ['blue'], ['blue', 'snowflake'], ['blue'], ['blue']),
      row(['blue', 'snowflake'], ['blue'], ['blue'], ['blue'], ['blue', 'snowflake']),
      row(['white'], ['white'], ['white'], ['white'], ['white']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 9,
    title: 'Stripes',
    size: 5,
    targetGrid: [
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['white'], ['white'], ['white'], ['white'], ['white']),
      row(['blue'], ['blue'], ['blue'], ['blue'], ['blue']),
      row(['white'], ['white'], ['white'], ['white'], ['white']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 10,
    title: 'Night Sky',
    size: 5,
    targetGrid: [
      row(['black', 'star'], ['black'], ['black'], ['black', 'star'], ['black']),
      row(['black'], ['black'], ['black', 'star'], ['black'], ['black']),
      row(['black'], ['black', 'star'], ['black'], ['black'], ['black', 'star']),
      row(['black', 'star'], ['black'], ['black'], ['black', 'star'], ['black']),
      row(['black'], ['black'], ['black', 'star'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 11,
    title: 'Frame',
    size: 5,
    targetGrid: [
      row(['orange'], ['orange'], ['orange'], ['orange'], ['orange']),
      row(['orange'], ['black'], ['black'], ['black'], ['orange']),
      row(['orange'], ['black'], ['black'], ['black'], ['orange']),
      row(['orange'], ['black'], ['black'], ['black'], ['orange']),
      row(['orange'], ['orange'], ['orange'], ['orange'], ['orange']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 12,
    title: 'Diagonal',
    size: 5,
    targetGrid: [
      row(['purple'], ['black'], ['black'], ['black'], ['black']),
      row(['black'], ['purple'], ['black'], ['black'], ['black']),
      row(['black'], ['black'], ['purple'], ['black'], ['black']),
      row(['black'], ['black'], ['black'], ['purple'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['purple']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 13,
    title: 'Corners',
    size: 5,
    targetGrid: [
      row(['red'], ['black'], ['black'], ['black'], ['red']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
      row(['black'], ['black'], ['yellow'], ['black'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
      row(['blue'], ['black'], ['black'], ['black'], ['green']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 14,
    title: 'Spiral',
    size: 5,
    targetGrid: [
      row(['cyan'], ['cyan'], ['cyan'], ['cyan'], ['cyan']),
      row(['black'], ['black'], ['black'], ['black'], ['cyan']),
      row(['cyan'], ['cyan'], ['cyan'], ['black'], ['cyan']),
      row(['cyan'], ['black'], ['black'], ['black'], ['cyan']),
      row(['cyan'], ['cyan'], ['cyan'], ['cyan'], ['cyan']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 15,
    title: 'Penguin',
    size: 5,
    targetGrid: [
      row(['black'], ['blue'], ['black'], ['blue'], ['black']),
      row(['blue'], ['black'], ['blue'], ['black'], ['blue']),
      row(['blue'], ['blue'], ['orange'], ['orange'], ['black']),
      row(['blue'], ['black'], ['black'], ['orange'], ['black']),
      row(['black'], ['blue'], ['black'], ['blue'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 16,
    title: 'Rainbow Row',
    size: 5,
    targetGrid: [
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['orange'], ['orange'], ['orange'], ['orange'], ['orange']),
      row(['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow']),
      row(['green'], ['green'], ['green'], ['green'], ['green']),
      row(['blue'], ['blue'], ['blue'], ['blue'], ['blue']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 17,
    title: 'Love Grid',
    size: 5,
    targetGrid: [
      row(['pink', 'heart'], ['black'], ['pink', 'heart'], ['black'], ['pink', 'heart']),
      row(['black'], ['pink', 'heart'], ['black'], ['pink', 'heart'], ['black']),
      row(['pink', 'heart'], ['black'], ['pink', 'heart'], ['black'], ['pink', 'heart']),
      row(['black'], ['pink', 'heart'], ['black'], ['pink', 'heart'], ['black']),
      row(['pink', 'heart'], ['black'], ['pink', 'heart'], ['black'], ['pink', 'heart']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 18,
    title: 'Bullseye',
    size: 5,
    targetGrid: [
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['red'], ['white'], ['white'], ['white'], ['red']),
      row(['red'], ['white'], ['red'], ['white'], ['red']),
      row(['red'], ['white'], ['white'], ['white'], ['red']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 19,
    title: 'Tetris L',
    size: 5,
    targetGrid: [
      row(['black'], ['orange'], ['black'], ['black'], ['black']),
      row(['black'], ['orange'], ['black'], ['black'], ['black']),
      row(['black'], ['orange'], ['orange'], ['black'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 20,
    title: 'Starfield',
    size: 5,
    targetGrid: [
      row(['black'], ['black', 'star'], ['black'], ['black'], ['black', 'star']),
      row(['black', 'star'], ['black'], ['black'], ['black', 'star'], ['black']),
      row(['black'], ['black'], ['yellow', 'star'], ['black'], ['black']),
      row(['black', 'star'], ['black'], ['black'], ['black', 'star'], ['black']),
      row(['black'], ['black', 'star'], ['black'], ['black'], ['black', 'star']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 21,
    title: 'X Marks',
    size: 5,
    targetGrid: [
      row(['red'], ['black'], ['black'], ['black'], ['red']),
      row(['black'], ['red'], ['black'], ['red'], ['black']),
      row(['black'], ['black'], ['red'], ['black'], ['black']),
      row(['black'], ['red'], ['black'], ['red'], ['black']),
      row(['red'], ['black'], ['black'], ['black'], ['red']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 22,
    title: 'Gradient',
    size: 5,
    targetGrid: [
      row(['white'], ['white'], ['white'], ['white'], ['white']),
      row(['gray'], ['gray'], ['gray'], ['gray'], ['gray']),
      row(['gray'], ['gray'], ['gray'], ['gray'], ['gray']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 23,
    title: 'Castle',
    size: 5,
    targetGrid: [
      row(['gray'], ['black'], ['gray'], ['black'], ['gray']),
      row(['gray'], ['gray'], ['gray'], ['gray'], ['gray']),
      row(['gray'], ['gray'], ['gray'], ['gray'], ['gray']),
      row(['gray'], ['brown'], ['gray'], ['gray'], ['gray']),
      row(['gray'], ['brown'], ['gray'], ['gray'], ['gray']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 24,
    title: 'Cactus',
    size: 5,
    targetGrid: [
      row(['yellow'], ['yellow'], ['green'], ['yellow'], ['yellow']),
      row(['yellow'], ['green'], ['green'], ['yellow'], ['yellow']),
      row(['green'], ['yellow'], ['green'], ['yellow'], ['green']),
      row(['yellow'], ['yellow'], ['green'], ['green'], ['yellow']),
      row(['brown'], ['brown'], ['brown'], ['brown'], ['brown']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 25,
    title: 'Moon Night',
    size: 5,
    targetGrid: [
      row(['black'], ['black'], ['black'], ['black', 'moon'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
      row(['black'], ['black', 'star'], ['black'], ['black'], ['black', 'star']),
      row(['black'], ['black'], ['black'], ['black', 'star'], ['black']),
      row(['green'], ['green'], ['green'], ['green'], ['green']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 26,
    title: 'Crown',
    size: 5,
    targetGrid: [
      row(['black'], ['yellow'], ['black'], ['yellow'], ['black']),
      row(['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow']),
      row(['yellow'], ['yellow'], ['yellow'], ['yellow'], ['yellow']),
      row(['black'], ['yellow'], ['yellow'], ['yellow'], ['black']),
      row(['black'], ['black'], ['black'], ['black'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 27,
    title: 'Waves',
    size: 5,
    targetGrid: [
      row(['blue'], ['cyan'], ['blue'], ['cyan'], ['blue']),
      row(['cyan'], ['blue'], ['cyan'], ['blue'], ['cyan']),
      row(['blue'], ['cyan'], ['blue'], ['cyan'], ['blue']),
      row(['cyan'], ['blue'], ['cyan'], ['blue'], ['cyan']),
      row(['blue'], ['cyan'], ['blue'], ['cyan'], ['blue']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 28,
    title: 'Mushroom',
    size: 5,
    targetGrid: [
      row(['black'], ['red'], ['red'], ['red'], ['black']),
      row(['red'], ['white'], ['red'], ['white'], ['red']),
      row(['red'], ['red'], ['red'], ['red'], ['red']),
      row(['black'], ['white'], ['white'], ['white'], ['black']),
      row(['black'], ['white'], ['white'], ['white'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 29,
    title: 'Ice Crystal',
    size: 5,
    targetGrid: [
      row(['white', 'snowflake'], ['cyan'], ['white'], ['cyan'], ['white', 'snowflake']),
      row(['cyan'], ['white', 'snowflake'], ['cyan'], ['white', 'snowflake'], ['cyan']),
      row(['white'], ['cyan'], ['white', 'snowflake'], ['cyan'], ['white']),
      row(['cyan'], ['white', 'snowflake'], ['cyan'], ['white', 'snowflake'], ['cyan']),
      row(['white', 'snowflake'], ['cyan'], ['white'], ['cyan'], ['white', 'snowflake']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 30,
    title: 'Pac-Man',
    size: 5,
    targetGrid: [
      row(['black'], ['yellow'], ['yellow'], ['yellow'], ['black']),
      row(['yellow'], ['yellow'], ['black'], ['yellow'], ['black']),
      row(['yellow'], ['yellow'], ['yellow'], ['black'], ['black']),
      row(['yellow'], ['yellow'], ['black'], ['yellow'], ['black']),
      row(['black'], ['yellow'], ['yellow'], ['yellow'], ['black']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
  {
    id: 31,
    title: 'Creeper',
    size: 5,
    targetGrid: [
      row(['green'], ['green'], ['green'], ['green'], ['green']),
      row(['green'], ['black'], ['green'], ['black'], ['green']),
      row(['green'], ['green'], ['black'], ['green'], ['green']),
      row(['green'], ['black'], ['black'], ['black'], ['green']),
      row(['green'], ['black'], ['green'], ['black'], ['green']),
    ],
    defaultCode: `for x in range(5):
    for y in range(5):
        pydle(x, y, "", "white")`,
  },
];
