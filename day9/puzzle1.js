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
main(['R 1', 'U 2', 'L 1', 'R 2'], 11, [5, 5])