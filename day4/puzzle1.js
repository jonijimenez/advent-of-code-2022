const fs = require('fs');

const input = fs.readFileSync('./day4/given.txt', 'utf-8');
const data = input.split('\n');
const length = data.length

let total = 0;

// check if there is a subset here
for (let i = 0; i < length; ++i) {
  let [num1, num2] = data[i].split(',');
  num1 = num1.split('-');
  num2 = num2.split('-');

  console.log('num1', num1)
  console.log('num2', num2)
  console.log('')

  if (parseInt(num1[0]) >= parseInt(num2[0]) && parseInt(num1[1]) <=parseInt(num2[1])) {
    total++;
    continue;
  } else if (parseInt(num2[0]) >= parseInt(num1[0]) && parseInt(num2[1]) <=parseInt(num1[1])) {
    total++;
    continue;
  }
}

console.log('total', total)