const fs = require('fs')

const input = fs.readFileSync('./day7/given.txt', 'utf-8')
const data = input.split('\n')

// count only file size < 100000
// sum would be the sum of those < 100000
// total would be the accumulated sum? hahaha or not haha
const MAX = 100000;

const countFileSize = (treeNode) => {
  // console.log('treeNode.name', treeNode.name, ' has total ', treeNode.total)

  if (treeNode.treeNodes.length === 0) {     
    let ss = 0;

    if (treeNode.total <= MAX) {
      ss = treeNode.total;
    }
    return {
      sum: ss,
      total: treeNode.total
    }
  } else {
    let total2 = treeNode.total;
    let ss = 0;

    for (let k = 0; k < treeNode.treeNodes.length; ++k) {
      let objRet = countFileSize(treeNode.treeNodes[k]);

      ss += objRet.sum;
      total2 += objRet.total;
    }
    if (total2 <= MAX) {
      ss += total2
    }
    return {
      sum: ss,
      total: total2
    }
  }
}

const logRoot = (treeNode) => {
  // if (!treeNode) {
  //   console.log('undefined')
  //   return {error: 'undefined'}
  // }
  // else 
  if (treeNode.treeNodes.length === 0) {
    return {
        [treeNode.name]: {
        total: treeNode.total,
        treeNodes: {}
      }
    }
    
  } else {
    let nodes = {};
    for (let l = 0; l < treeNode.treeNodes.length; ++l) {
      let ret = logRoot(treeNode.treeNodes[l])
      nodes = {
        ...nodes,
        ...ret
      }
    }

    // console.log('nodes', nodes)

    return {
      [treeNode.name]: {
        total: treeNode.total,
        treeNodes: nodes
      }
    }
  }
}


class TreeNode {
  total = 0;
  name = '';
  treeNodes = null; 
  parent = null;

  constructor(name, parent) {
    this.name = name;
    this.parent = parent;    
    this.treeNodes = new Array(0);
    this.total = 0;
  }
}

const root = new TreeNode('/', null);
let pointer = root;

// console.log('pointer at the start', pointer)

let i = 0;
while (data[i]) {
  // console.log(`currentPointer: ${pointer.name}, ${pointer.total} - with nodes ${pointer.treeNodes.length}`)
  // console.log('data[i]', data[i])
  // console.log('current logRoot(root)', JSON.stringify(logRoot(root)));

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
        // console.log('pointer', pointer)
        let j = 0;

        for (j = 0; j < pointer.treeNodes.length; ++j) {
          if (pointer.treeNodes[j].name === info[2]) {
            pointer = pointer.treeNodes[j];

            console.log('pointer.name', pointer.name, ' has total ', pointer.total, ' and length ', pointer.treeNodes.length)
            break;
          }
        }

        // comment this out, assume all nodes have been added before hand
        // if (j == pointer.treeNodes.length) {
        //   // that means there is no TreeNode of that name
        //   let newTreeNode = new TreeNode(info[2], pointer);
        //   pointer.treeNodes.push(newTreeNode);
        //   pointer = newTreeNode;
        // }
      }
    } else if (info [1] === 'ls') {
      // iterate until we get a line that starts with "$", then we go back one as i++ at the end handles it
      ++i;

      while (data[i] && !data[i].startsWith('$')) {
        // console.log('data[i]', data[i])
        // console.log('current logRoot(root)', JSON.stringify(logRoot(root)));

        let info2 = data[i].split(' ');
        if (info2[0] === 'dir') {
          pointer.treeNodes.push(new TreeNode(info2[1], pointer))
          // console.log('pointer.treeNodes.length', pointer.treeNodes.length, ' of treeName ', pointer.name)
        } else {
          pointer.total += parseInt(info2[0])
          // console.log('pointer.total ', pointer.total, ' of treeName ', pointer.name)
        }
        ++i;
      }
      --i;
    }
  }

  i++
}

// then on the 2nd part, try to count using recursion
// console.log('\n\n2nd PART IF THE CODE')
let totalSum =  countFileSize(root)

let logroot = logRoot(root);

console.log('logroot', JSON.stringify(logroot))
console.log('total', totalSum)
