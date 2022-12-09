const fs = require('fs')

// first off, create a 2d array of the square, then 
const input = fs.readFileSync('./day8/given.txt', 'utf-8')
const data = input.split('\n')
const forest = data.map((r) => r.split('').map((c) => parseInt(c)))


// console.log('forest', forest)

const lengthRow = data.length;
const lengthCol = forest[0].length;

let forestLog = [];

// console.log('forest', forest, " rows ", data.length, " columns ", forest[0].length)

// let's make a mnemonic for a key 
// Rows are R1... Columns are C1, bottom left is R1C1
// store in an array if visible .. 
let visibleTrees = [];
let visibleTreesDebug = {top: [], bottom: [], right: [], left: []};

// The way I see it, just go through each from the top, then right, then left, then bottom
// But we prolly have to traverse the 2d array 4x
// if we go diagonally, top-right, and then bottom-left, then we'll only go twice

// #1 go through this diagonally?

// #2 start from outside and carefully make way to the inner squares until we go through the center
// - for this, we need to have to record the higest tree, per row fro the right, which is n, then from the top = 2
// - then from the bottom = n, left = n = 4n 
// 2d array is enticing but I think a hash is better to store 
// like { RL1: 9, CT2: 3, RR27: 6, CB98: 7 }
// Highest in the row1 looking from left is 9
// Highest in column 2 looking from top is 2
// Highest in row27 looking from right is 6
// Highest in column98 looking from left is 7
// once we reach 9 for row or column, then we can stop the comparison :) 
const currentHighest = {}


// How to we loop outer to inner??
// how to traverse a 2d array in spiral?


// we dont need to traverse in spiral, be we also need the reverse!!! 
// we have to actually loop 4x hahaha
// then start with row1 left to right ... 
for (let i = 0; i < lengthRow; ++i) {
  forestLog.push(forest[i].map(e => e + "OOOO"));

  for (let j = 0; j < lengthCol; ++j) {
    // we have 2 vars, looking from left and looking from the top :) 
    // from the left
    let left = `RL${i}`
    // from the top
    let top = `CT${j}`
    // treeId
    let treeId = `R${i}C${j}`

    // console.log('treeId', treeId, ' has value ', forest[i][j])

    // check if tree is visible according to the highest in left... 
    let leftCurrentHighest = currentHighest[left];

    if ((!leftCurrentHighest && leftCurrentHighest !== 0) || forest[i][j] > leftCurrentHighest) {
      currentHighest[left] = forest[i][j]

      // console.log('currentHighestLeft', currentHighest)

      if (!visibleTrees.includes(treeId)) {
        visibleTrees.push(treeId)
        forestLog[i][j] = forest[i][j] + "L" + forestLog[i][j].slice(2)

      }

      if (!visibleTreesDebug.left.includes(treeId)) {
        visibleTreesDebug.left.push(treeId)
      }

      // console.log('visibleTrees', visibleTrees)

    }

    // now check from the top 
    let topCurrentHighest = currentHighest[top];
    if ((!topCurrentHighest && topCurrentHighest !== 0) || forest[i][j] > topCurrentHighest) {
      currentHighest[top] = forest[i][j]

      // console.log('currentHighestTop', currentHighest)


      if (!visibleTrees.includes(treeId)) {
        visibleTrees.push(treeId)
        forestLog[i][j] = forestLog[i][j].slice(0, 2) + "T" + forestLog[i][j].slice(3)

      }
      // console.log('visibleTrees', visibleTrees)

      if (!visibleTreesDebug.top.includes(treeId)) {
        visibleTreesDebug.top.push(treeId)

      }

    }
  }
}

// then start with right and bottom
for (let i = lengthRow - 1; i >= 0; --i) {
  for (let j = lengthCol - 1; j >= 0; --j) {
    // we have 2 vars, looking from left and looking from the top :) 
    // from the left
    let right = `RR${i}`
    // from the top
    let bottom = `CB${j}`
    // treeId
    let treeId = `R${i}C${j}`

    // check if tree is visible according to the highest in left... 
    let rightCurrentHighest = currentHighest[right];
    if ((!rightCurrentHighest && rightCurrentHighest !== 0 ) || forest[i][j] > rightCurrentHighest) {
      currentHighest[right] = forest[i][j]

      // console.log('currentHighestBottom', currentHighest)

      if (!visibleTrees.includes(treeId)) {
        visibleTrees.push(treeId)
        forestLog[i][j] = forestLog[i][j].slice(0, 3) + "R" + forestLog[i][j].slice(4)
      }    

      if (!visibleTreesDebug.right.includes(treeId)) {
        visibleTreesDebug.right.push(treeId)
      }


    }

    // now check from the top 
    let bottomCurrentHighest = currentHighest[bottom];
    if ((!bottomCurrentHighest && bottomCurrentHighest !== 0) || forest[i][j] > bottomCurrentHighest) {
      currentHighest[bottom] = forest[i][j]

      if (!visibleTrees.includes(treeId)) {
        visibleTrees.push(treeId)
        forestLog[i][j] = forestLog[i][j].slice(0, 4) + "B"
      }

      if (!visibleTreesDebug.bottom.includes(treeId)) {
        visibleTreesDebug.bottom.push(treeId)

      }
    }
  }
}


console.log('forestLog', forestLog)

// console.log('visibleTrees', JSON.stringify(visibleTrees))
// console.log('visibleTreesDebug', JSON.stringify(visibleTreesDebug))

console.log('visibleTrees.length', visibleTrees.length)

// current answer 1857 is wrong...
// correct is 1843



