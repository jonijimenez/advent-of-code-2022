const fs = require('fs')

const input = fs.readFileSync('./day5/given.txt', 'utf-8');
const data = input.split('\n');

// first off, we need to put then in an array
//                 [M]     [W] [M]    
//             [L] [Q] [S] [C] [R]    
//             [Q] [F] [F] [T] [N] [S]
//     [N]     [V] [V] [H] [L] [J] [D]
//     [D] [D] [W] [P] [G] [R] [D] [F]
// [T] [T] [M] [G] [G] [Q] [N] [W] [L]
// [Z] [H] [F] [J] [D] [Z] [S] [H] [Q]
// [B] [V] [B] [T] [W] [V] [Z] [Z] [M]
//  1   2   3   4   5   6   7   8   9 
// stack are in fifo structure ... so 
// stack1 = [BZT]
// stack2 = [VHTDN]
// [stack1, stack2, stack3]

let given = (new Array(9)).fill(null).map(() => new Array());

console.log('given intial', given)

let i = 0;
while (data[i] !== '') {
  // get the stack
  // split string per 4 characters 
  let stacks = data[i].match(/.{1,4}/g);
  // console.log('stacks', stacks)

  // array unshift per stack
  for (let j = 0; j < stacks.length; ++j) {
    // need to capture
    let regex = new RegExp(/\[([A-Z])\]\s?/, 'g'); 
    let res = regex.exec(stacks[j])
    

    if (res) {
      // console.log(`For line ${i} for stack ${j} : ${res[1]}`)
      given[j].unshift(res[1]);
    } 

  }
  ++i;
}

// then proceed to the moves :) 
++i;

while (data[i]) {
  // capture the numbers
  let regex = new RegExp(/move (\d+) from (\d+) to (\d+)/, 'g'); 
  let res = regex.exec(data[i])

  // then we will simulate this movement
  // we'll use slice and concat :) 
  let times = parseInt(res[1]);
  let fromStack = parseInt(res[2]);
  let toStack = parseInt(res[3]);
  
  let fromStackLength = given[fromStack - 1].length;

  // add to toStack
  given[toStack - 1] = given[toStack - 1].concat(given[fromStack - 1].slice(fromStackLength - times));
  // remove from fromStack
  given[fromStack - 1] = given[fromStack - 1].slice(0, fromStackLength - times)

  ++i
}

console.log('given', given)

// then at the end, just append the letters at the top
let str = "";
for (let l = 0; l < given.length; ++l) {
  if (given[l].length) {
    let stackLength = given[l].length
    str += given[l][stackLength - 1]
  }
}

console.log('str', str)