/*

--- Part Two ---

Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?

*/

import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day5/input.txt').toString();

const lines = input.split('\n');
const ids = [];

function findMissingNumber() {
  const sorted = ids.sort((a, b) => a - b);
  let prev = null;
  let seat = null;
  for (let i = 0; i < sorted.length; i++) {
    if (seat === null) {
      if (prev === null) {
        prev = sorted[i];
      } else if (sorted[i] - prev === 2) {
        seat = prev + 1;
      } else {
        prev = sorted[i];
      }
    }
  }
  return seat;
}

function createIdsList() {
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const pp = line.split('').reduce(
      (acc, x) => {
        return handleCharCode(x, acc);
      },
      {
        row: { start: 0, end: 127 },
        column: { start: 0, end: 7 },
        seatId: (row, column) => {
          return row * 8 + column;
        },
      }
    );
    ids.push(pp.seatId(pp.row.start, pp.column.start));
  }
}

function handleCharCode(x, acc) {
  // should refactor to reduce redundancy
  if (x === 'F') {
    const subtract = (acc.row.end - acc.row.start) / 2;
    acc.row.end = acc.row.end - Math.ceil(subtract);
  } else if (x === 'B') {
    const add = (acc.row.end - acc.row.start) / 2;
    acc.row.start = Math.ceil(add) + acc.row.start;
  } else if (x === 'R') {
    const add = (acc.column.end - acc.column.start) / 2;
    acc.column.start = Math.ceil(add) + acc.column.start;
  } else if (x === 'L') {
    const subtract = (acc.column.end - acc.column.start) / 2;
    acc.column.end = acc.column.end - Math.ceil(subtract);
  }
  return acc;
}

createIdsList();
let seat = findMissingNumber();

console.log(seat); // 527
