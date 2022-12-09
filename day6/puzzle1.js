const fs = require('fs')

const input = fs.readFileSync('./day6/given.txt', 'utf-8')
const data = input.split('');

// return the index of the first repeating character
const repeatingCharIndex = (arr) => {
  let i = 0
  for (i = 0; i < arr.length; ++i) {
    for (let j = i+1; j < arr.length; ++j) {
      if (arr[i] === arr[j]) {
        return i;
      }
    }
  }
  return i;
}

// this is the index of the first character in windowOf4
let index = 0;
let windowOf4 = data.slice(index, 4);

// we need to know if there's a repeating character within the window of 4, if none, return the length
let indexOfRepeating = repeatingCharIndex(windowOf4)

// 4 bec that's the length meaning, there's no repeating
while (indexOfRepeating !== 4) {
  // move the windowOf4 depending on the index of repeating
  // [a, b, c, a] = [b, c, a, x]; index = 0, just move it 1 step ahead
  // [a, b, b, c] = [b, c, x, y]; index = 1, move it 2 steps ahead
  // [a, b, c, c] = [c, x, y, z]; index = 2, move it 3 steps ahead

  // set newIndex as we move our window forward the string
  let newIndex = index + indexOfRepeating + 1;
  // set the window
  windowOf4 = data.slice(newIndex, newIndex + 4);
  index = newIndex;
  // get the repeating index again
  indexOfRepeating = repeatingCharIndex(windowOf4)
}

console.log('index', index + 4)