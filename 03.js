const number = 312051;
const pos = new Map();
const points = new Set();

const directions = [
 [1, 0],
 [0, 1],
 [-1, 0],
 [0, -1],
];
let currentDirection = 0;

for (let i = 1; i <= number; i++) {
  if ( i=== 1) {
    pos.set(i, [0, 0]);
    points.add("0|0");
    continue;
  }
  let [prevX, prevY] = pos.get(i - 1);
  let x = prevX + directions[currentDirection][0];
  let y = prevY + directions[currentDirection][1]  
  
  let nextDirectionIndex = (currentDirection + 1) % directions.length;
  let nextDirection = directions[nextDirectionIndex];
  if (!points.has(
    (x + nextDirection[0])  + "|" + (y + nextDirection[1])
  )) {
    currentDirection = nextDirectionIndex;
  }

  pos.set(i, [x, y]);
  points.add(x+"|"+y);
}

console.log(Math.abs(pos.get(number)[0]) + Math.abs(pos.get(number)[1]));
