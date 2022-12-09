const fs = require('fs');
const { getCharValue } = require('./utils');

const input = fs.readFileSync('./day3/given.txt', 'utf-8');
const data = input.split('\n');
const length = data.length

let sum = 0;


// separate into 3 lines
for (let i = 0; i < length / 3; ++i) {
  let lines = [data[(i*3) + 0].split(''), data[(i*3) + 1].split(''), data[(i*3) + 2].split('')];

  // find the lines that repeat across all 3
  // start with the first 2
  let charsRepeatFirst2 = [];
  for (let j = 0; j < lines[0].length; ++j) {
    if (lines[1].includes(lines[0][j]) && !charsRepeatFirst2.includes(lines[0][j])) {
      charsRepeatFirst2.push(lines[0][j])
    }
  }

  // then for repeatedChars
  for (let j = 0; charsRepeatFirst2.length; ++j) {
    if (lines[2].includes(charsRepeatFirst2[j])) {
      sum += getCharValue(charsRepeatFirst2[j])
      break;
    }
  }

}

console.log('sum', sum)