/*

*/
import fs from 'fs';
const input = fs.readFileSync(process.cwd() + '/Day8/input.txt').toString();

const lines = input.split('\n');
const mem = [];
let acc = 0;

for (let i = 0; i < lines.length; ) {
  if (mem.includes(i)) {
    break;
  } else {
    mem.push(i);
  }
  const { opt, number } = parseLine(i);
  switch (opt) {
    case 'acc':
      acc += number;
      i++;
      break;
    case 'jmp':
      i += number;
      break;
    case 'nop':
      i++;
      break;
  }
}

function parseLine(i) {
  const line = lines[i];
  const opt = line.split(' ')[0];
  const number = Number(line.split(' ')[1]);
  return { opt, number };
}

// acc is the answer here
console.log(acc); // 2025
