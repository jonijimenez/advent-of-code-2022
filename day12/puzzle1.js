const fs = require('fs')

const input = fs.readFileSync('./day12/sample.txt', 'utf-8')
const data = input.split('\n')

let S;
let E;

// create 2darray, determine S and E
const array2d = data.map((e, i) => {
  if (e.indexOf('S') !== -1) {
    S = [i, e.indexOf('S')]
  }
  if (e.indexOf('E') !== -1) {
    E = [i, e.indexOf('E')]
  }
  return e.split('');
})

// have to know where S is haha
console.log('S', S) 
console.log('E', E)

const rowLength = array2d.length
const colLength = array2d[0].length

// create another data of values
let valuesData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(null))

// create another value for visited
let visitedData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(false))


const checkInBounds = (row, col) => {
  if (0 <= row && row < rowLength && 0 <= col && col < colLength) {
    return true
  }
  return false
}

const checkValidJump = (row, col, fromRow, fromCol) => {
  // console.log('fromRow', array2d[fromRow][fromCol].charCodeAt(0))
  // console.log('first', first)

  // the value is valid to jump into
  return array2d[fromRow][fromCol].charCodeAt(0) <= array2d[row][col].charCodeAt(0)
}

const computePath = (row, col, fromRow, fromCol) => {
  // check for the number around it, then get the least

  // the row and col is within bounds  
  if (checkInBounds(row, col) && checkValidJump(row, col, fromRow, fromCol)) {
    let value = valuesData[fromRow][fromCol];
    let newValue = value + 1;

    if (valuesData[row][col] === null ||
        // if there is some lower path somewhere
        newValue < valuesData[row][col]
      ) {
      valuesData[row][col] = newValue
      return true
    }
    return false
  }
}

const checkE = (row, col, fromRow, fromCol) => {
  if (!checkInBounds(row, col) || !checkValidJump(row, col, fromRow, fromCol)) { 
    return false
  }

  if(array2d[row][col] === 'E') { 
    return true;
  }
  
  return false;
}


// From S, go through each direction and compute
// Stop if we cant gp 
const recursePath = (row, col) => {
  console.log('recurse', row, col, array2d[row][col])

  // top
  computePath(row-1, col, row, col)
  // bottom
  computePath(row+1, col, row, col)
  // left
  computePath(row, col-1, row, col)
  // right
  computePath(row, col+1, row, col)

  // visited should be true
  visitedData[row][col] = true;

  // valuesData.forEach(e => {
  //   console.log(e.join(' '))
  //   console.log('')
  // })

  // visitedData.forEach(e => {
  //   console.log(e.join(' '))
  //   console.log('')
  // })

  // check if any is E
  let validValues = [[row-1, col], [row+1, col], [row, col-1], [row, col+1]];
  for (let i = 0; i < validValues.length; ++i) {
    if (checkE(validValues[i][0], validValues[i][1], row, col)) {
      // console.log('check E')
      return;
    }
  }
  
  [[row-1, col], [row+1, col], [row, col-1], [row, col+1]].forEach((e) => {
    if (checkInBounds(e[0], e[1]) && checkValidJump(e[0], e[1], row, col) && !visitedData[e[0]][e[1]]) {
      console.log('call recursePath on',  e[0], e[1])
      recursePath(e[0], e[1])
    } else {
      console.log('not valid jump ', e[0], e[1])
    }
  })
  
}


// ok starting to S, go through each values in S
valuesData[S[0]][S[1]] = 0;
visitedData[S[0]][S[1]] = true;

recursePath(S[0], S[1])
valuesData.forEach(e => {
  console.log(e.join(' '))
  console.log('')
})
console.log('E min', valuesData[E[0]][E[1]]);

