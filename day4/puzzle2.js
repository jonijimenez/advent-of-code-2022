const fs = require('fs');

const input = fs.readFileSync('./day4/given.txt', 'utf-8');
const data = input.split('\n');
const length = data.length

let totalRev = 0;

// check if there is a subset here
for (let i = 0; i < length; ++i) {
  let [num1, num2] = data[i].split(',');
  num1 = num1.split('-');
  num2 = num2.split('-');


  if (parseInt(num1[0]) < parseInt(num2[0]) && parseInt(num1[1]) < parseInt(num2[0])) {
    totalRev++;
    continue;
  } else if (parseInt(num2[0]) < parseInt(num1[0]) && parseInt(num2[1]) < parseInt(num1[0])) {
    totalRev++;
    continue;
  }
}

console.log(totalRev)

console.log('total', length - totalRev)