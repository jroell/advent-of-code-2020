/*
--- Day 12: Rain Risk ---

Your ferry made decent progress toward the island, but the storm came in faster than anyone expected. The ferry needs to take evasive actions!

Unfortunately, the ship's navigation computer seems to be malfunctioning; rather than giving a route directly to safety, it produced extremely circuitous instructions. When the captain uses the PA system to ask if anyone can help, you quickly volunteer.

The navigation instructions (your puzzle input) consists of a sequence of single-character actions paired with integer input values. After staring at them for a few minutes, you work out what they probably mean:

    Action N means to move north by the given value.
    Action S means to move south by the given value.
    Action E means to move east by the given value.
    Action W means to move west by the given value.
    Action L means to turn left the given number of degrees.
    Action R means to turn right the given number of degrees.
    Action F means to move forward by the given value in the direction the ship is currently facing.

The ship starts by facing east. Only the L and R actions change the direction the ship is facing. (That is, if the ship is facing east and the next instruction is N10, the ship would move north 10 units, but would still move east if the following action were F.)

For example:

F10
N3
F7
R90
F11

These instructions would be handled as follows:

    F10 would move the ship 10 units east (because the ship starts by facing east) to east 10, north 0.
    N3 would move the ship 3 units north to east 10, north 3.
    F7 would move the ship another 7 units east (because the ship is still facing east) to east 17, north 3.
    R90 would cause the ship to turn right by 90 degrees and face south; it remains at east 17, north 3.
    F11 would move the ship 11 units south to east 17, south 8.

At the end of these instructions, the ship's Manhattan distance (sum of the absolute values of its east/west position and its north/south position) from its starting position is 17 + 8 = 25.

Figure out where the navigation instructions lead. What is the Manhattan distance between that location and the ship's starting position?


*/
import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day12/input.txt').toString();
const lines = input.split('\n');

let direction = 'E';
let northSouth = 0;
let eastWest = 0;

for (let i = 0; i < lines.length; i++) {
  let [instruction, ...units] = lines[i].split('');
  units = Number(units.join(''));
  switch (instruction) {
    case 'E':
      eastWest += units;
      break;
    case 'N':
      northSouth += units;
      break;
    case 'W':
      eastWest -= units;
      break;
    case 'S':
      northSouth -= units;
      break;
    case 'L':
      if (units == 270) {
        if (direction === 'E') {
          direction = 'S';
          break;
        }
        if (direction === 'W') {
          direction = 'N';
          break;
        }
        if (direction === 'N') {
          direction = 'E';
          break;
        }
        if (direction === 'S') {
          direction = 'W';
          break;
        }
      }
      if (units == 180) {
        if (direction === 'E') {
          direction = 'W';
          break;
        }
        if (direction === 'W') {
          direction = 'E';
          break;
        }
        if (direction === 'N') {
          direction = 'S';
          break;
        }
        if (direction === 'S') {
          direction = 'N';
          break;
        }
      } else if (units == 90) {
        if (direction === 'E') {
          direction = 'N';
          break;
        }
        if (direction === 'W') {
          direction = 'S';
          break;
        }
        if (direction === 'N') {
          direction = 'W';
          break;
        }
        if (direction === 'S') {
          direction = 'E';
          break;
        }
      }
    case 'R':
      if (units == 270) {
        if (direction === 'E') {
          direction = 'N';
          break;
        }
        if (direction === 'W') {
          direction = 'S';
          break;
        }
        if (direction === 'N') {
          direction = 'W';
          break;
        }
        if (direction === 'S') {
          direction = 'E';
          break;
        }
      }
      if (units == 180) {
        if (direction === 'E') {
          direction = 'W';
          break;
        }
        if (direction === 'W') {
          direction = 'E';
          break;
        }
        if (direction === 'N') {
          direction = 'S';
          break;
        }
        if (direction === 'S') {
          direction = 'N';
          break;
        }
      } else if (units == 90) {
        if (direction === 'E') {
          direction = 'S';
          break;
        }
        if (direction === 'W') {
          direction = 'N';
          break;
        }
        if (direction === 'N') {
          direction = 'E';
          break;
        }
        if (direction === 'S') {
          direction = 'W';
          break;
        }
      }
      break;
    case 'F':
      if (direction === 'E') {
        eastWest += units;
        break;
      }
      if (direction === 'W') {
        eastWest -= units;
        break;
      }
      if (direction === 'N') {
        northSouth += units;
        break;
      }
      if (direction === 'S') {
        northSouth -= units;
        break;
      }
      break;
    default:
      break;
  }
}
const answer = Math.abs(northSouth) + Math.abs(eastWest);
console.log(answer);
