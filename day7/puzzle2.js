const fs = require('fs')

const input = fs.readFileSync('./day7/given.txt', 'utf-8')
const data = input.split('\n')

const TOTAL_SPACE = 70000000;
const NEEDED_SPACE = 30000000;

const getSmallestThatCanBeDeleted = (treeNode, moreSpace) => {
  if (treeNode.treeNodes.length === 0) {
    let space = NEEDED_SPACE
    if (treeNode.total >= moreSpace && treeNode.total < space) {
      space = treeNode.total;
    }
    console.log('space in IF', space.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

    return {
      space: space,
      total: treeNode.total
    }
  } else {
    let total2 = treeNode.total;
    let space = NEEDED_SPACE;

    for (let k = 0; k < treeNode.treeNodes.length; ++k) {
      let objRet = getSmallestThatCanBeDeleted(treeNode.treeNodes[k], moreSpace);
      total2 += objRet.total;
     
      console.log('space IN ELSE', objRet.space.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));

      // we are assuming that space is already more than neededSpace
      // if (objRet.space < space && objRet.space >= moreSpace) {
      if (objRet.space < space) {
        space = objRet.space;
      }
    }

    // if (total2 < space && total2 >= moreSpace) {
    if (total2 < space && total2 >= moreSpace) {
      console.log('ELSE IF', total2.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
      space = total2;
    }
    return {
      space: space,
      total: total2
    }
  }
}

class TreeNode {
  total = 0;
  name = '';
  treeNodes = null; 
  parent = null;
  // nthGen = 1;

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;    
    this.treeNodes = new Array(0);
    this.total = 0;
    // root has nthGen = 1, child of root has nthGen of 2, etc
    // this.nthGen = parent === null ? 1 : parent.nthGen + 1;

  }
}

const root = new TreeNode('/', null);
let pointer = root;
let totality = root.total;

let i = 0;
while (data[i]) {
  // first thing to do is separate by spaces
  let info = data[i].split(' ');

  if (info[0] === '$') {
    // that means this is a command
    if (info[1] === 'cd') {
      // we need to be able to "get in" and "out" of directories
      // need to have a treeNode for this one
      // we also need a current pointer

      if (info[2] === '/') {
        pointer = root;
      } else if (info[2] === '..') {
        pointer = pointer.parent;
      } else {
        let j = 0;

        for (j = 0; j < pointer.treeNodes.length; ++j) {
          if (pointer.treeNodes[j].name === info[2]) {
            pointer = pointer.treeNodes[j];
            break;
          }
        }
      }
    } else if (info [1] === 'ls') {
      // iterate until we get a line that starts with "$", then we go back one as i++ at the end handles it
      ++i;
      while (data[i] && !data[i].startsWith('$')) {

        let info2 = data[i].split(' ');
        if (info2[0] === 'dir') {
          pointer.treeNodes.push(new TreeNode(info2[1], pointer))
        } else {
          totality += parseInt(info2[0]);
          pointer.total += parseInt(info2[0])
        }
        ++i;
      }
      --i;
    }
  }

  i++
}

// the second problem requires  a sorting of sorts, and a binary search ... 
// maybe we can combine them both... 
// actually I don't need to sort them, just go through them and see if they are the smallest largest
// actually, we need to get the total first? haha

const freeSpace = TOTAL_SPACE - totality;
const moreSpace = NEEDED_SPACE - freeSpace;
console.log('freeSpace', freeSpace)
console.log('moreSpace', moreSpace)
let totalNeededSpace = getSmallestThatCanBeDeleted(root, moreSpace)

console.log('total', totalNeededSpace)

