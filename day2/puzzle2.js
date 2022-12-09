const fs = require('fs')

// build a data structure of givens
// computation for win/lose given combination
const givens = {
  // For rock(A) need to lose(X) will have to play C(scissors) = 3
  A: {
    X: 3,
    Y: 1,
    Z: 2
  },
  // For paper(B) need to lose(X) will have to play A(rock) = 1
  B: {
    X: 1,
    Y: 2,
    Z: 3
  },
  // For scissors(C) need to lose(X) will have to play B(paper) = 2
  C: {
    X: 2,
    Y: 3,
    Z: 1
  }
}

// value per play
// X = lose(0), Y = draw(3), Z = win(6)
const values = {
  X: 0,
  Y: 3,
  Z: 6
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