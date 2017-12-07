const puzzle = 312051;
const part1 = new Map();
const points1 = new Set();

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];
let currentDirection = 0;

for (let i = 1; i <= puzzle; i++) {
  if (i === 1) {
    part1.set(i, [0, 0]);
    points1.add("0|0");
    continue;
  }
  let [prevX, prevY] = part1.get(i - 1);
  let x = prevX + directions[currentDirection][0];
  let y = prevY + directions[currentDirection][1];

  let nextDirectionIndex = (currentDirection + 1) % directions.length;
  let nextDirection = directions[nextDirectionIndex];
  if (!points1.has(x + nextDirection[0] + "|" + (y + nextDirection[1]))) {
    currentDirection = nextDirectionIndex;
  }

  part1.set(i, [x, y]);
  points1.add(x + "|" + y);
}

console.log(
  "part1",
  Math.abs(part1.get(puzzle)[0]) + Math.abs(part1.get(puzzle)[1])
);

const part2 = new Map();
const points2 = new Map();
currentDirection = 0;
let currentNumber = 0;

while (currentNumber < puzzle) {
  if (currentNumber === 0) {
    currentNumber = 1;
    part2.set(currentNumber, [0, 0]);
    points2.set("0|0", currentNumber);
    continue;
  }
  let [prevX, prevY] = part2.get(currentNumber);
  let x = prevX + directions[currentDirection][0];
  let y = prevY + directions[currentDirection][1];

  let nextDirectionIndex = (currentDirection + 1) % directions.length;
  let nextDirection = directions[nextDirectionIndex];
  if (!points2.has(x + nextDirection[0] + "|" + (y + nextDirection[1]))) {
    currentDirection = nextDirectionIndex;
  }

  currentNumber = getNeighbors(x, y).reduce((acc, x) => acc + x);

  part2.set(currentNumber, [x, y]);
  points2.set(x + "|" + y, currentNumber);
}

console.log("part2", currentNumber);

function getNeighbors(x, y) {
  const neighbors = [];
  const addNeighbors = (offX, offY) => {
    const key = `${x + offX}|${y + offY}`;
    if (points2.has(key)) {
      neighbors.push(points2.get(key));
    }
  };
  addNeighbors(1, 0);
  addNeighbors(1, 1);
  addNeighbors(0, 1);
  addNeighbors(-1, 1);
  addNeighbors(-1, 0);
  addNeighbors(-1, -1);
  addNeighbors(0, -1);
  addNeighbors(1, -1);
  return neighbors;
}
