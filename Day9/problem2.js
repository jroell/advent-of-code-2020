/*
--- Part Two ---

The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576

In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
*/
import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day9/Input.txt').toString();
const lines = input.split('\n').map(x => Number(x));
const invalidNumber = 105950735;
let i = 0;
let j = 1;
while (j < lines.length) {
  let sum = lines.slice(i, j + 1).reduce((acc, x) => acc + x, 0);
  sum;
  if (sum > invalidNumber) {
    i++;
    j = i + 1;
  }
  if (sum < invalidNumber) {
    j++;
  }
  if (sum === invalidNumber) {
    console.log(invalidNumber);
    console.log(i);
    console.log(j + 1);
    break;
  }
}
const sorted = lines.slice(i, j).sort((a, b) => a - b);
const high = sorted[sorted.length - 1];
const low = sorted[0];
const answer = high + low;
console.log(answer); // 13826915
