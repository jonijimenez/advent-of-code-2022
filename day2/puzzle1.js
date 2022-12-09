const fs = require('fs')

// build a data structure of givens
// computation for win/lose given combination
// win: 6, draw: 3, lose: 0
const givens = {
  // A(rock) play with paper(Y) = win = 6
  A: {
    X: 3,
    Y: 6,
    Z: 0
  },
  // B(paper) play with scissors(Z) = win = 6
  B: {
    X: 0,
    Y: 3,
    Z: 6
  },
  // C(scissors) play with rock(X) = win = 6
  C: {
    X: 6,
    Y: 0,
    Z: 3
  }
}

// value per play
// rock: 1, paper: 2, scissors: 3
const values = {
  X: 1,
  Y: 2,
  Z: 3
}


// calculate the score you will get
try {
  const input = fs.readFileSync('./day2/given.txt', 'utf-8');
  const data = input.split('\n');

  let total = 0;

  // each data calculate the score
  const length = data.length;
  for(let i = 0; i < length; ++i) {
    // A X
    let line = data[i];
    // separate per game
    let play = line.split(' ');
    
    total += givens[play[0]][play[1]] + values[play[1]];
  }

  console.log('total', total);

} catch (error) {
  console.log('error', error)
}