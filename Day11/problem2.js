/*

--- Day 11: Seating System ---

Your plane lands with plenty of time to spare. The final leg of your journey is a ferry that goes directly to the tropical island where you can finally start your vacation. As you reach the waiting area to board the ferry, you realize you're so early, nobody else has even arrived yet!

By modeling the process people use to choose (or abandon) their seat in the waiting area, you're pretty sure you can predict the best place to sit. You make a quick map of the seat layout (your puzzle input).

The seat layout fits neatly on a grid. Each position is either floor (.), an empty seat (L), or an occupied seat (#). For example, the initial seat layout might look like this:

L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL

Now, you just need to model the people who will be arriving shortly. Fortunately, people are entirely predictable and always follow a simple set of rules. All decisions are based on the number of occupied seats adjacent to a given seat (one of the eight positions immediately up, down, left, right, or diagonal from the seat). The following rules are applied to every seat simultaneously:

    If a seat is empty (L) and there are no occupied seats adjacent to it, the seat becomes occupied.
    If a seat is occupied (#) and four or more seats adjacent to it are also occupied, the seat becomes empty.
    Otherwise, the seat's state does not change.

Floor (.) never changes; seats don't move, and nobody sits on the floor.

After one round of these rules, every seat in the example layout becomes occupied:

#.##.##.##
#######.##
#.#.#..#..
####.##.##
#.##.##.##
#.#####.##
..#.#.....
##########
#.######.#
#.#####.##

After a second round, the seats with four or more occupied adjacent seats become empty again:

#.LL.L#.##
#LLLLLL.L#
L.L.L..L..
#LLL.LL.L#
#.LL.LL.LL
#.LLLL#.##
..L.L.....
#LLLLLLLL#
#.LLLLLL.L
#.#LLLL.##

This process continues for three more rounds:

#.##.L#.##
#L###LL.L#
L.#.#..#..
#L##.##.L#
#.##.LL.LL
#.###L#.##
..#.#.....
#L######L#
#.LL###L.L
#.#L###.##

#.#L.L#.##
#LLL#LL.L#
L.L.L..#..
#LLL.##.L#
#.LL.LL.LL
#.LL#L#.##
..L.L.....
#L#LLLL#L#
#.LLLLLL.L
#.#L#L#.##

#.#L.L#.##
#LLL#LL.L#
L.#.L..#..
#L##.##.L#
#.#L.LL.LL
#.#L#L#.##
..L.L.....
#L#L##L#L#
#.LLLLLL.L
#.#L#L#.##

At this point, something interesting happens: the chaos stabilizes and further applications of these rules cause no seats to change state! Once people stop moving around, you count 37 occupied seats.

Simulate your seating area by applying the seating rules repeatedly until no seats change state. How many seats end up occupied?

*/

import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day11/Input.txt').toString();
const lines = input.split('\n');
let room = [];
const h = lines.length;
const w = lines[0].length;
let didChange = true;

for (let i = 0; i < lines.length; i++) {
  room.push(lines[i].split(''));
}
let i = 0;
let j = 0;
let total = 0;
while (didChange == true) {
  console.log(room);
  didChange = false;
  const copy = JSON.parse(JSON.stringify(room));

  for (i = 0; i < room.length; i++) {
    for (j = 0; j < room[i].length; j++) {
      if (copy[i][j] === 'L') {
        if (oc === 0) {
          room[i][j] = '#';
          didChange = true;
        }
      } else if (copy[i][j] === '#') {
        const oc = countAdjecent(i, j, copy);
        if (oc >= 5) {
          room[i][j] = 'L';
          didChange = true;
        }
      }
    }
  }
}

function countAdjecent(i, j, room) {
  let s1 = 0;
  let s2 = 0;
  let s3 = 0;
  let s4 = 0;
  let s5 = 0;
  let s6 = 0;
  let s7 = 0;
  let s8 = 0;
  if (i > 0 && j < h - 1) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i - pos][j + pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s6 = 1;
      } else if (char === 'L') {
        s6 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (j > 0 && i < h - 1) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i + pos][j - pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s7 = 1;
      } else if (char === 'L') {
        s7 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (i > 0) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i - pos][j];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s1 = 1;
      } else if (char === 'L') {
        s1 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (j > 0) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i][j - pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s2 = 1;
      } else if (char === 'L') {
        s2 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (j > 0 && i > 0) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i - pos][j - pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s3 = 1;
      } else if (char === 'L') {
        s3 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (i < h - 1) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i + pos][j];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s4 = 1;
      } else if (char === 'L') {
        s4 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (j < h - 1) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i][j + pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s5 = 1;
      } else if (char === 'L') {
        s5 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  if (j < h - 1 && i < h - 1) {
    let char = '.';
    let pos = 1;
    while (char === '.') {
      try {
        char = room[i + pos][j + pos];
      } catch (e) {
        break;
      }
      if (char === '#') {
        s8 = 1;
      } else if (char === 'L') {
        s8 = 0;
      } else if (char === '.') {
        pos++;
      }
    }
  }
  const adj = s1 + s2 + s3 + s4 + s5 + s6 + s7 + s8;
  return adj;
}
for (i = 0; i < room.length; i++) {
  for (j = 0; j < room[i].length; j++) {
    if (room[i][j] === '#') {
      total += 1;
    }
  }
}
console.log(total); // 2119
