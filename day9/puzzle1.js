const fs = require('fs')

// just  pass a length and what to draw where...
const printSimulation = (array2d) => {
  array2d.forEach(row => {
    console.log(row.join(' '))
  })
}

const printMessage = (message) => {
  console.log(`== ${message} ==`)
}

// ################# Main ################## //
const main = (data, length, center) => {
  let array2d = new Array(length).fill(null).map(r => new Array(length).fill('.'))
  
  // ======= Initial Value ======= //
  // make s, T and H start at the beginning
  array2d[center[0]][center[1]] = 'H'
  printMessage('Initial State')
  printSimulation(array2d)

  let moves = {
    R: [0,1],
    L: [0. -1],
    U: [1, 0],
    D: [-1, 0]
  }

  let keepTrack = {
    s: center,
    T: center,
    H: center
  }

  for (let i = 0; i < data.length; ++i) {
    let move = data[i].split(' ')

    for (let j = 0; j < move[1]; ++i) {

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
main(['R 1'], 11, [5, 5])