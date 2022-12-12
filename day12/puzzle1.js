const fs = require('fs')

const input = fs.readFileSync('./day12/given.txt', 'utf-8')
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

  // if (array2d[fromRow][fromCol].charCodeAt(0) + 1 <= array2d[row][col].charCodeAt(0)) {
  // // the value is valid to jump into
  // console.log(`valid jump?? ${array2d[fromRow][fromCol]} + 1 jump to ${array2d[row][col]}`)
  // console.log(`${array2d[fromRow][fromCol].charCodeAt(0)} + 1 jump to ${array2d[row][col].charCodeAt(0)}`)
  // }

  return [1,0].includes(toCharCodeAt - fromCharCodeAt)
}

const computePath = (row, col, fromRow, fromCol, valuesData2) => {
  // check for the number around it, then get the least

  // the row and col is within bounds  
  if (checkInBounds(row, col) && checkValidJump(row, col, fromRow, fromCol)) {
    let value = valuesData2[fromRow][fromCol];
    let newValue = value + 1;

    if (valuesData2[row][col] === "x" ||
        // if there is some lower path somewhere
        newValue < valuesData2[row][col]
      ) {
      valuesData2[row][col] = newValue
      return true
    }
    return false
  }
}

const checkE = (row, col, fromRow, fromCol) => {
  // console.log('E?',   row, col)

  if (!checkInBounds(row, col)) { 
    return false
  }

  if(array2d[row][col] === 'E') { 
    return true;
  }

  return false;
}


// From S, go through each direction and compute
// Stop if we cant gp 
const recursePath = (row, col, valuesData2, visitedData2) => {
  // console.log('RECURSEEE', row, col, array2d[row][col])

  // valuesData2.forEach(e => {
  //   console.log(e.join(' '))
  //   console.log('')
  // })

  // visitedData2.forEach(e => {
  //   console.log(e.join(' '))
  //   console.log('')
  // })


  // top
  // computePath(row-1, col, row, col, valData)
  // // bottom
  // computePath(row+1, col, row, col, valuesData2)
  // // left
  // computePath(row, col-1, row, col, valuesData2)
  // // right
  // computePath(row, col+1, row, col, valuesData2)

  // visited should be true
  visitedData2[row][col] = true;


  if (array2d[row][col] === 'E') {
    console.log('E is', valuesData2[E[0][E[1]]])
    return valuesData2[E[0]][E[1]];
  }


  // // check if any is E
  // let validValues = [[row-1, col], [row+1, col], [row, col-1], [row, col+1]];
  // for (let i = 0; i < validValues.length; ++i) {
  //   if (checkE(validValues[i][0], validValues[i][1], row, col)) {
  //     console.log('check E', valuesData2[row][col] + 1)

  //     return valuesData2[row][col] + 1;
  //   } 
  //   // else {
  //     // console.log(`not e on ${validValues[i]}`)
  //   // }
  // }
  
  let minE = rowLength*colLength;

  [[row-1, col], [row+1, col], [row, col-1], [row, col+1]].forEach((e) => {
    if (checkInBounds(e[0], e[1]) && checkValidJump(e[0], e[1], row, col) && !visitedData2[e[0]][e[1]]) {
      // console.log('call recursePath on',  e[0], e[1])
      let valData = JSON.parse(JSON.stringify(valuesData2));
      // console.log('valData', valData)

      let visData = JSON.parse(JSON.stringify(visitedData2));

      computePath(e[0], e[1], row, col, valData)

      let currentE = recursePath(e[0], e[1], valData, visData)
      // console.log(`current E ${currentE} from ${e[0]} ${e[1]}`)
      if (currentE < minE) {
        minE = currentE;
      }
    } 
    // else {
    //   console.log(`Not able to recurse ${e} from ${row} ${col}`)
    // }

  })

  return minE;
  
}


// create another data of values
let valuesData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill('x'))

// create another value for visited
let visitedData = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(false))

// ok starting to S, go through each values in S
valuesData[S[0]][S[1]] = 0;
visitedData[S[0]][S[1]] = true;

let minE = recursePath(S[0], S[1], valuesData, visitedData)
// valuesData.forEach(e => {
//   console.log(e.join(' '))
//   console.log('')
// })
// console.log('E min', valuesData[E[0]][E[1]]);
console.log('E min', minE);

