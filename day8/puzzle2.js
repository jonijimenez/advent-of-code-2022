const fs = require('fs')

// first off, create a 2d array of the square, then 
const input = fs.readFileSync('./day8/given.txt', 'utf-8')
const data = input.split('\n')
const forest = data.map((r) => r.split('').map((c) => parseInt(c)))
const lengthRow = data.length;
const lengthCol = forest[0].length;

// console.log('length', length)

let maxScenicScore = 0;

// what if I create a

for (let i = 0; i < lengthRow; ++i) {
  for (let j = 0; j < lengthCol; ++j) {
    // get the max in the 4 directions
    let scenicScore = 1;


    // top
    let treesFromDirection = 0;
    for (let k = i-1; k >= 0 ; --k) {
      // console.log('top')
      if (forest[k][j] >= forest[i][j]) {
        treesFromDirection++
        break
      }
      treesFromDirection++
    }
    console.log('treesFromDirection top', treesFromDirection)
    scenicScore *= (treesFromDirection);

    // from left
    treesFromDirection = 0;
    for (let k = j-1; k >= 0; --k) {
      // console.log('left', k)
      if (forest[i][k] >= forest[i][j]) {
        treesFromDirection++
        break
      }
      treesFromDirection++
    }
    console.log('treesFromDirection left', treesFromDirection)
    scenicScore *= (treesFromDirection);

    // from bottom
    treesFromDirection = 0;
    for (let k = i+1; k < lengthRow ; ++k) {
      // console.log('bottom')

      if (forest[k][j] >= forest[i][j]) {
        treesFromDirection++
        break
      }
      treesFromDirection++
    }
    console.log('treesFromDirection bottom', treesFromDirection)
    scenicScore *= (treesFromDirection);

    // from right
    treesFromDirection = 0;
    for (let k = j+1; k < lengthCol ; ++k) {
      // console.log('right')
      if (forest[i][k] >= forest[i][j]) {
        treesFromDirection++
        break
      }
      treesFromDirection++
    }
    console.log('treesFromDirection right', treesFromDirection)
    scenicScore *= (treesFromDirection);

    console.log('SCENIC SCOREEE', scenicScore, ' for  i j ', i, j)


    if (scenicScore > maxScenicScore) {
      maxScenicScore = scenicScore
    }
  }
}

console.log('maxScenicScore', maxScenicScore)