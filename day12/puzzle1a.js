const fs = require('fs')

const input = fs.readFileSync('./day12/sample2.txt', 'utf-8')
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
let valuesData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill('x'))

// create another value for visited
let visitedData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(false))


const checkInBounds = (row, col) => {
  if (0 <= row && row < rowLength && 0 <= col && col < colLength) {
    return true
  }
  return false
}

const checkValidJump = (row, col, fromRow, fromCol) => {
  if (array2d[row][col] === 'E') {
    if (array2d[fromRow][fromCol] === 'z') {
      return true;
    } else {
      return false;
    }
  }

  if (array2d[fromRow][fromCol] === 'S') {
    if (array2d[row][col] === 'a') {
      return true;
    } else {
      return false;
    }
  }

  let fromCharCodeAt = array2d[fromRow][fromCol].charCodeAt(0);
  let toCharCodeAt = array2d[row][col].charCodeAt(0);

  return [1,0].includes(toCharCodeAt - fromCharCodeAt)
}

const computePath = (row, col, fromRow, fromCol) => {
  console.log(`compute path ${row} ${col} from ${fromRow} ${fromCol}`)

  // the row and col is within bounds  
  if (checkInBounds(row, col) && checkValidJump(row, col, fromRow, fromCol)) {
    let value = valuesData[fromRow][fromCol];
    let newValue = value + 1;

    console.log(`compute path ${row} ${col} with valuesData ${valuesData[row][col]} and newValue ${newValue}`)


    if (valuesData[row][col] === "x" ||
        // if there is some lower path somewhere
        newValue < valuesData[row][col]
      ) {
      valuesData[row][col] = newValue

      console.log('valuesData', valuesData)
      console.log('visitedData', visitedData)

      return true
    }
    return false
  }
}

// From S, go through each direction and compute
// Stop if we cant go
const recursePath = (row, col) => {
  console.log(`Recurse Path ${row} ${col}`)
  valuesData.forEach(e => {
    console.log(e.join(' '))
    console.log('')
  })
  console.log('')

  // visited should be true
  visitedData[row][col] = true;

  [[row-1, col], [row+1, col], [row, col-1], [row, col+1]].forEach((e) => {
    console.log(`Check ${e[0]} ${e[1]}`)
    
    computePath(e[0], e[1], row, col)

    // console.log('checkInBounds(e[0], e[1])', checkInBounds(e[0], e[1]))
    // console.log('checkValidJump(e[0], e[1], row, col)', checkValidJump(e[0], e[1], row, col))
    // console.log('!visibleData[row][col]', !visibleData[row][col]);

    if (checkInBounds(e[0], e[1]) && checkValidJump(e[0], e[1], row, col) && !visitedData[e[0]][e[1]]) {

      console.log(`For recursion ${e[0]} ${e[1]}`);
      recursePath(e[0], e[1])

    } else {
      console.log(`Not recursion ${e[0]} ${e[1]} from ${row} ${col}`)
    }
  })

  return;
}




// ok starting to S, go through each values in S
valuesData[S[0]][S[1]] = 0;
visitedData[S[0]][S[1]] = true;

let minE = recursePath(S[0], S[1], valuesData, visitedData)
valuesData.forEach(e => {
  console.log(e.join(' '))
  console.log('')
})
console.log('E min', valuesData[E[0]][E[1]]);
// console.log('E min', minE);

