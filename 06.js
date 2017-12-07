const puzzle = [10, 3, 15, 10, 5, 15, 5, 15, 9, 2, 5, 8, 5, 2, 3, 6];
// const puzzle = [0, 2, 7, 0];

let part1 = 0;
const seen = new Set();
seen.add(puzzle.join("|"));

while (!seen.has(redistribute(puzzle).join("|"))) {
  seen.add(puzzle.join("|"));
  part1++;
}
part1++;

console.log("part1", part1);
console.log("part2", part1 - [...seen].indexOf(puzzle.join("|")));

function redistribute(data) {
  let index = getHighest(data);
  let value = data[index];
  data[index] = 0;
  while (value > 0) {
    index = (index + 1) % data.length;
    data[index] = data[index] + 1;
    value--;
  }
  return data;
}

function getHighest(data) {
  return data.reduce((acc, x, i) => {
    if (acc === null) {
      return i;
    }
    if (x > data[acc]) {
      return i;
    }
    return acc;
  }, null);
}
