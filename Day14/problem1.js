// /*

// */
// import fs from 'fs';
// const input = fs.readFileSync(process.cwd() + '/Day14/testinput.txt').toString();

// const numbers = input.split(',').map(x => Number(x));
// let previousNumberIndex;
// let previousNumberValue;
// let turn = 0;
// while (turn < 15) {
//   turn = numbers.length + 1;
//   turn;
//   previousNumberIndex = turn - 2;
//   previousNumberIndex;
//   previousNumberValue = numbers[previousNumberIndex];
//   previousNumberValue;
//   const copy = [...numbers];
//   var count = copy
//     .slice(0, numbers.length - 1)
//     .reverse()
//     .findIndex(x => x === previousNumberValue);
//   count;
//   let alreadySeenIndex;
//   if (count >= 0) {
//     alreadySeenIndex = numbers.length - 1 - count - 1;
//     alreadySeenIndex;
//   }
//   let turnNumber;
//   if (alreadySeenIndex >= 0 && alreadySeenIndex !== previousNumberIndex) {
//     previousNumberIndex;
//     alreadySeenIndex;
//     previousNumberValue;
//     turnNumber = previousNumberIndex - alreadySeenIndex;
//   } else {
//     turnNumber = 0;
//   }
//   turnNumber;
//   numbers.push(turnNumber);
//   turn++;
// }
// turn;
// previousNumberValue;
// console.log(numbers);
// console.log(numbers[numbers.length - 1]);
