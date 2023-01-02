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

const rowLength = array2d.length
const colLength = array2d[0].length

// dijkstra
let shortestPath = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(null))

// create another value for visited
let visitedNode = new Array(rowLength).fill(null).map(() => new Array(colLength).fill(false))

// create queue of nodes to visit
let nodesToVisit = []

const printArray = (arrayD) => {
  arrayD.forEach((r, i) => {
    // console.log(r.map((c, j) => ((c === null ? 'x' : c) + array2d[i][j]).padEnd(5, ' ') ). join(' '))
    console.log(r.map((c, j) => (c === null ? 'x' : c)).join(' '))
  })
}

const getValidSidePoints = ([row, col]) => {
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
  
    let diff = toCharCodeAt - fromCharCodeAt;

    return diff <= 1; 

    // return [1,0].includes(toCharCodeAt - fromCharCodeAt)
  }

  console.log('[row, col]', [row, col], ' with value ', array2d[row][col], ' and points ', shortestPath[row][col])

  let validPoints = [[1, 0], [-1, 0], [0, 1], [0, -1]].reduce((a, e) => {
    let newRow = row + e[0];
    let newCol = col + e[1];

    console.log('newRow, newCol', [newRow, newCol])

    if (checkInBounds(newRow, newCol)) {
      console.log('with value ', array2d[newRow][newCol])

      if (checkValidJump(newRow, newCol, row, col)) {
        console.log('Valid')
        a.push([newRow, newCol])
      } else {
        console.log('Not valid')
      }
    } else {
      console.log('not inbounds', )
    }

    return a;
  }, [])

  console.log('')

  return validPoints;
}


// Pseudocode
// start with S
shortestPath[S[0]][S[1]] = 0;

nodesToVisit.push([S[0],S[1]]);

while (nodesToVisit.length > 0) {
  let currentNode = nodesToVisit.shift();

  // continue if visited
  if (visitedNode[currentNode[0]][currentNode[1]] === true) {
    continue;
  }

  // get valid side points
  let validSidePoints = getValidSidePoints(currentNode);

  // put in the nodeToVisit
  nodesToVisit = nodesToVisit.concat(validSidePoints);


  // set visitedNode of current to true
  visitedNode[currentNode[0]][currentNode[1]] = true;

  // get the current point of the node
  let currentNodePoint = shortestPath[currentNode[0]][currentNode[1]]

  // compute the smallest path for the visited 
  validSidePoints.forEach((e) => {
    // get the current side point
    let currentSidePoint = shortestPath[e[0]][e[1]];

    // if side point is null, then assign the point to it + 1
    if(currentSidePoint === null) {
      shortestPath[e[0]][e[1]] = currentNodePoint + 1;
    } else {
      // else, assign only if side point is smaller
      if (currentNodePoint + 1 < currentSidePoint) {
        shortestPath[e[0]][e[1]] = currentNodePoint + 1
      }
    }
  })

  // continue... 
}


printArray(shortestPath)
printArray(array2d)

console.log('E', E)
console.log('E', shortestPath[E[0]][E[1]])
console.log('visitedNode[E[0]][E[1]]', visitedNode[E[0]][E[1]])




