const fs = require('fs');
const { getCharValue } = require('./utils');

const input = fs.readFileSync('./day3/given.txt', 'utf-8');
const data = input.split('\n');
const length = data.length;

let sum = 0;

// for each line, we have to half, we know only 1 character repeats
for (let i = 0; i < length; ++i) {
  let line = data[i];
  const dataChars = line.split('');
  const charLength = dataChars.length;

  const half1 = dataChars.slice(0, charLength / 2);
  const half2 = dataChars.slice(charLength / 2);

  for (let j = 0; j < charLength / 2; ++j) {
    // loop through until we see the repeating character
    if (half2.includes(half1[j])) {
      sum += getCharValue(half1[j]);
      break;
    }
  }
}

console.log('sum', sum)

