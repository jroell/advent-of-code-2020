/*

--- Part Two ---

Before you can give the destination to the captain, you realize that the actual action meanings were printed on the back of the instructions the whole time.

Almost all of the actions indicate how to move a waypoint which is relative to the ship's position:

    Action N means to move the waypoint north by the given value.
    Action S means to move the waypoint south by the given value.
    Action E means to move the waypoint east by the given value.
    Action W means to move the waypoint west by the given value.
    Action L means to rotate the waypoint around the ship left (counter-clockwise) the given number of degrees.
    Action R means to rotate the waypoint around the ship right (clockwise) the given number of degrees.
    Action F means to move forward to the waypoint a number of times equal to the given value.

The waypoint starts 10 units east and 1 unit north relative to the ship. The waypoint is relative to the ship; that is, if the ship moves, the waypoint moves with it.

For example, using the same instructions as above:

    F10 moves the ship to the waypoint 10 times (a total of 100 units east and 10 units north), leaving the ship at east 100, north 10. The waypoint stays 10 units east and 1 unit north of the ship.
    N3 moves the waypoint 3 units north to 10 units east and 4 units north of the ship. The ship remains at east 100, north 10.
    F7 moves the ship to the waypoint 7 times (a total of 70 units east and 28 units north), leaving the ship at east 170, north 38. The waypoint stays 10 units east and 4 units north of the ship.
    R90 rotates the waypoint around the ship clockwise 90 degrees, moving it to 4 units east and 10 units south of the ship. The ship remains at east 170, north 38.
    F11 moves the ship to the waypoint 11 times (a total of 44 units east and 110 units south), leaving the ship at east 214, south 72. The waypoint stays 4 units east and 10 units south of the ship.

After these operations, the ship's Manhattan distance from its starting position is 214 + 72 = 286.

Figure out where the navigation instructions actually lead. What is the Manhattan distance between that location and the ship's starting position?


*/
import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day12/input.txt').toString();
const lines = input.split('\n');

let currentPosition = { e: 0, n: 0, w: 0, s: 0 };
let e = 10;
let n = 1;
let w = 0;
let s = 0;
let temp;

for (let i = 0; i < lines.length; i++) {
  let [instruction, ...units] = lines[i].split('');
  units = Number(units.join(''));
  switch (instruction) {
    case 'E':
      e += units;
      break;
    case 'N':
      n += units;
      break;
    case 'W':
      w += units;
      break;
    case 'S':
      s += units;
      break;
    case 'L':
      if (units == 270) {
        temp = n;
        n = w;
        w = s;
        s = e;
        e = temp;
        break;
      }
      if (units == 180) {
        temp = n;
        n = s;
        s = temp;
        temp = e;
        e = w;
        w = temp;
        break;
      }
      if (units == 90) {
        temp = n;
        n = e;
        e = s;
        s = w;
        w = temp;
        break;
      }
    case 'R':
      if (units == 180) {
        temp = n;
        n = s;
        s = temp;
        temp = e;
        e = w;
        w = temp;
        break;
      }
      if (units == 90) {
        temp = n;
        n = w;
        w = s;
        s = e;
        e = temp;
        break;
      }
      if (units == 270) {
        temp = n;
        n = e;
        e = s;
        s = w;
        w = temp;
        break;
      }
      break;
    case 'F':
      currentPosition.e += units * e;
      currentPosition.n += units * n;
      currentPosition.s += units * s;
      currentPosition.w += units * w;
      break;
    default:
      break;
  }
}

const ns = Math.abs(currentPosition.n - currentPosition.s);
const ew = Math.abs(currentPosition.e - currentPosition.w);
const answer = Math.abs(currentPosition.n - currentPosition.s) + Math.abs(currentPosition.e - currentPosition.w);
console.log(answer); // 20873
