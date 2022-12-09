const fs = require('fs')

// just  pass a length and what to draw where...
// draw: [{s: [1, 0]}, {T: [5, 0]}]
const printSimulation = (length, draw) => {
  let array2d = new Array(length[1]).fill(null).map(() => new Array(length[0]).fill('.'))
  draw?.forEach(e => {
    let [x, y] = Object.values(e)[0]
    let value = Object.keys(e)[0]
    array2d[x][y] = value
  })

  array2d.forEach(row => {
    console.log(row.join(' '))
  })

  console.log('')
}

const printMessage = (message) => {
  console.log(`== ${message} ==`)
}

// coords = {s: [0. 1], T: [-1, 2], H: [3, 4]}
// this is next level shit ever 
// potek 11:58pm na Dec 9, 2022. 8pm ako nagstart dito. What am I gaining for this?
const transformCoordToArrayValue = (minX, maxY, coords) => {
  let offsetX = 0 - minX;

  let newCoords = JSON.parse(JSON.stringify(coords));

  Object.keys(newCoords).forEach(e => {
    let shouldbeY = newCoords[e][0] + offsetX
    let shouldBeX = newCoords[e][1] >= 0 ? maxY - newCoords[e][1] : maxY + (-1 * newCoords[e][1])
  
    // we have to reverse the x and y 
    newCoords[e][1] = shouldbeY
    newCoords[e][0] = shouldBeX
  })

  return newCoords;
}



// ################# Main ################## //
const main = (data) => {  
  const prepareSTHAndPrint = (length, sTH) => {
    let newCoords = transformCoordToArrayValue(length[0], length[3], sTH)
    let print = [{s: newCoords.s}, {T: newCoords.T}, {H: newCoords.H}]
    printSimulation([length[2] - length[0] + 1, length[3] - length[1] + 1], print)
  }

  let state = {}
  const setState = (change) => {
    state = {
      ...state,
      ...change
    }
  }

  // [minXCoord, minYCoord, maxXCoord, maxYCoord] inclusive
  let length = [0,0,0,0]    
  const computeLength = ([x,y]) => {

    // if X overflows
    if (state.H[0] < length[0] && state.H[0] < 0) {
      length[0] = state.H[0]
    } else if (state.H[0] > length[2] && state.H[0] > 0) {
      length[2] = state.H[0]
    }
  
    // if Y overflows
    if (state.H[1] < length[1] && state.H[1] < 0) {
      length[1] = state.H[1]
    } else if (state.H[1] > length[3] && state.H[1] > 0) {
      length[3] = state.H[1]
    }
  }

  let tCoords = [];
  const moveT = () => {
    // check the difference between H and T
    let x = state.H[0] - state.T[0]
    let y = state.H[1] - state.T[1]

    // check if should move, if touching, don't move
    if (Math.abs(x) < 2 && Math.abs(y) < 2) {
      return
    }

    if (x === 0 || y === 0) {
      moveTStraight(x, y)
    } else {
      moveTDiagonal(x, y)
    }

  }
  // x y coord is difference between H - T
  const moveTStraight = (x, y) => {
    let moveTx = x >= 2 ? 1 : (x <= -2 ? -1 : 0)
    let moveTy = y >= 2 ? 1 : (y <= -2 ? -1 : 0)

    let newStateX = state.T[0] + moveTx;
    let newStateY = state.T[1] + moveTy;

    setState({T: [newStateX, newStateY]})
    setTCoords([newStateX, newStateY])
  }

  // x y coord is difference between H - T
  const moveTDiagonal  = (x, y) => {
    let moveTx = x > 0 ? 1 : (x < 0 ? -1 : 0)
    let moveTy = y > 0 ? 1 : (y < 0 ? -1 : 0)

    let newStateX = state.T[0] + moveTx;
    let newStateY = state.T[1] + moveTy;

    setState({T: [newStateX, newStateY]})
    setTCoords([newStateX, newStateY])
  }

  const setTCoords  = (coords) => {
    console.log('coords', coords)
    let stringify = JSON.stringify(coords);
  
    if (tCoords.includes(stringify)) {
      return;
    }
    tCoords.push(stringify);
  }
  
  // ======= Initial Value ======= //
  // make s, T and H start at the beginning
  setState({s: [0, 0], T: [0, 0], H: [0, 0]})
  setTCoords([0,0])
  printMessage('Initial State')
  prepareSTHAndPrint(length, state)

  // make this acc to the quadrant coordinates
  let moves = {
    R: [1,0],
    L: [-1, 0],
    U: [0, 1],
    D: [0, -1]
  }

  for (let i = 0; i < data.length; ++i) {
    printMessage(data[i])
    let move = data[i].split(' ') // [R, 1]

    let numMoves = parseInt(move[1])
    for (let j = 0; j < numMoves; ++j) {
      // move the head
      let direction = moves[move[0]] // R L U D
      let x = state.H[0] + direction[0]
      let y = state.H[1] + direction[1]

      setState({H:  [x, y]})
      computeLength([x, y])
      moveT()
      // prepareSTHAndPrint(length, state)
    }
  }

  // console.log('tCoords', tCoords)
  console.log('tCoords.length', tCoords.length)
}





// ################# Unit Testing ################## //
// Given array of commands, simulate and check if right
const unitTesting = () => {

}


// ################# Run the Code ################## //

const input = fs.readFileSync('./day9/given.txt', 'utf-8')
const data = input.split('\n')
main(
  // ['R 1', 
  // 'U 2', 
  // 'L 1', 
  // 'R 2',
  // 'L 1',
  // 'U 2',
  // 'R 2',
  // 'L 2',
  // 'R 2'
  // ]
  data
  )

