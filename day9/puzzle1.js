const fs = require('fs')

// just  pass a length and what to draw where...
// draw: [{s: [1, 0]}, {T: [5, 0]}]
const printSimulation = (length, draw) => {
  let array2d = new Array(length).fill(null).map(() => new Array(length).fill('.'))
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


// ################# Main ################## //
const main = (data, length, center) => {  
  const prepareSTHAndPrint = (sTH) => {
    let print = [{s: sTH.s}, {T: sTH.T}, {H: sTH.H}]
    printSimulation(length, print)
  }

  let state = {}
  const setState = (change) => {
    state = {
      ...state,
      ...change
    }
  }

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

    setState({T: [state.T[0] + moveTx, state.T[1] + moveTy]})
  }

  // x y coord is difference between H - T
  const moveTDiagonal  = (x, y) => {
    let moveTx = x > 0 ? 1 : (x < 0 ? -1 : 0)
    let moveTy = y > 0 ? 1 : (y < 0 ? -1 : 0)

    setState({T: [state.T[0] + moveTx, state.T[1] + moveTy]})
  }

  
  // ======= Initial Value ======= //
  // make s, T and H start at the beginning
  setState({s: [5, 5], T: [5,5], H: [5,5]})
  printMessage('Initial State')
  prepareSTHAndPrint(state)

  let moves = {
    R: [0,1],
    L: [0, -1],
    U: [-1, 0],
    D: [1, 0]
  }

  let keepTrack = {
    s: center,
    T: center,
    H: center
  }

  for (let i = 0; i < data.length; ++i) {
    printMessage(data[i])
    let move = data[i].split(' ') // [R, 1]

    let numMoves = parseInt(move[1])
    for (let j = 0; j < numMoves; ++j) {
      // move the head
      let direction = moves[move[0]]
      let x = state.H[0] + direction[0]
      let y = state.H[1] + direction[1]

      setState({H:  [x, y]})
      moveT()
      prepareSTHAndPrint(state)
    }
    
  }
}





// ################# Unit Testing ################## //
// Given array of commands, simulate and check if right
const unitTesting = () => {

}


// ################# Run the Code ################## //

// const input = fs.readFileSync('./day9/given.txt', 'utf-8')
// const data = input.split('\n')
main(
  ['R 1', 
  'U 2', 
  'L 1', 
  'R 2',
  'L 1',
  'U 2',
  'R 2',
  'L 2',
  'R 2',
  'U 2'
  ], 11, [5, 5])