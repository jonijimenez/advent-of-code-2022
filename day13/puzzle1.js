const fs = require('fs')

// I. Parsing the input
// 1. Have a way of separating per index, left and right
// in an array? as string [ [left, right], [left, right], [left, right] ]

// Q: Is there a way to solve this aside from following the rules?


// 2. Parse left and right acc to the list or integer
// [1, 2, [3, 4]] as string will be parsed as array


// II. MEAT: Compare left and right, index by index
// 1. If integer vs integer, just compare

// 2. If integer vs list, convert integer to a list... then do 3

// 3. List vs list, do a recursion thing going on .. and compare


// II.A. Check order, 
// 1. Integer vs integer, if left < right, right order
// 2. List vs list, if left < right or left ran out of item, right order... 


// III. Do for all and take note of the index

// ================

// I. Create interfaces first: 
const parseInput = (dataA) => {

  // For each array, parse left and right
  const parseListToArray = (list) => {
    // Q: how to capture list? let's do recursion ... xD

    // one by one, when we get a list we recurse ... 
    // split by "[", "]" and integer ... 
    // [1, 2, [3, 4]] should split by 1, 2, [, 3, 4, ]

    // Let's do maybe an outer then inner ... 

    // Assume list, so remove the outer brackets
    let string = list.slice(1, -1)
    // split by commas - '1', '2', '[3', '4]'
    let entries = string.split(',')

    // the array containing parsed
    let array = [];

    let i = 0;
    while (i < entries.length) {
      // Case: List - have to find the outer array ... 
      // case: [ 1, 2, [3, 4] ]  (inner array)
      // case: [1, 2], [3, 4] (consecutive array)
      if (entries[i] && entries[i].startsWith('[')) {
        // Make a stack thing going on .. 

        // Case '[[[2] - a single entry has multiple open and/or close brackets

        let outerArrayString = entries[i];


        // make a note how many open bracket passed before the closing
        // [1, 2 [3, 4, [5]]] - 3 open brackets before the closing one, make sure to get the right closing bracket
        let openBrackets = (entries[i].match(/\[/g) || []).length
        openBrackets -= (entries[i].match(/\]/g) || []).length

        // go through the array ... 
        // openBracket should be 0
        while (openBrackets > 0) {
          ++i
          // if startsWith [, updateOpenBrackets
          if (entries[i] && entries[i].startsWith('[')) {
            openBrackets += (entries[i].match(/\[/g) || []).length;
          }
          if (entries[i] && entries[i].endsWith(']')) {
            openBrackets -= (entries[i].match(/\]/g) || []).length;
          }

          outerArrayString += `,${entries[i]}`
        }

        let result = parseListToArray(outerArrayString)
        array.push(result);

      }
      
      // Case: Integer 
      else {
        // check if entry is empty, if not, then parse
        if (entries[i]) {
          array.push(parseInt(entries[i]))
        } 
      }

      ++i
    }

    return array;
  }
  
  // for each data, separate the string in an array of strings
  let i = 0;
  let parsedInput = [];

  while (dataA[i]) {
    // create an entry array
    let entry = [];
    
    // parse the first one first, then
    // push the first one
    let left = parseListToArray(dataA[i])

    entry.push(left)
    ++i;

    // parse the second one, then
    // push the second one
    let right = parseListToArray(dataA[i])
    entry.push(right)

    // push to the parsedInput
    parsedInput.push(entry)

    // this is for the space
    ++i;

    // this is for the next line
    ++i
  }

  return parsedInput;

}



// II. Compare left and right, index by index
const recurseList = (parsedInputA) => {
  let left = parsedInputA[0];
  let right = parsedInputA[1];

  console.log('left, right', left, right)

  // compare with the left, if ran out first, then right order
  // If any equality here resulted to false, then it's false
  for (let i = 0; i < left.length; ++i) {
    // check if array or list
    
    // 1. Case: List vs List - Recurse
    if (Array.isArray(left[i]) && Array.isArray(right[i])) {
      console.log('list vs list')

      if (left[i].length !== 0 || right[i].length !== 0) {
        let response = recurseList([left[i], right[i]])
        // 3 values - true, false and null, 
        // on null, move to the next... 
        if (response !== null) {
          return response
        }
      }
    } 
    // 2. Case: Integer vs Integer
    // If the left side is more, then in order, return true.. right should be defined
    else if (!Array.isArray(left[i]) && !Array.isArray(right[i]) && right[i] !== undefined) {
      console.log('int vs int')
      if (right[i] < left[i]) {
        console.log('right < left')
        return false;
      } else if (left[i] < right[i]) {
        console.log('left < right')
        return true;
      }
    }
    // 3. Case: List vs Integer respectively
    // Convert integer to list, then recurse
    else if (Array.isArray(left[i]) && !Array.isArray(right[i]) && right[i] !== undefined) {
      let response = recurseList([left[i], [right[i]]])
      // 3 values - true, false and null, 
      // on null, move to the next... 
      if (response !== null) {
        return response
      }
    }
    // 4. Case: Integer vs List respectively
    else if (!Array.isArray(left[i]) && Array.isArray(right[i])) {
      let response = recurseList([[left[i]], right[i]])
      // 3 values - true, false and null, 
      // on null, move to the next... 
      if (response !== null) {
        return response
      }
    }
    // 5. Case right ran out first
    else if (right[i] === undefined) {
      console.log('here - right undefined')
      return false;
    }

  }

  return true;
}

// III. Main - Do for all
// parse input is already an output of array of arrays of left & right
// const input = fs.readFileSync('./day13/sample.txt', 'utf-8')
const input = fs.readFileSync('./day13/given.txt', 'utf-8')
const data = input.split('\n')

let parsedInput = parseInput(data);

let sum = 0;
for (let i = 0; i < parsedInput.length; ++i) {
  let response = recurseList(parsedInput[i])
  console.log('response', i + 1, ' ', response)
  console.log('')

  if (response === true) {
    sum += i + 1
  }
}

console.log('sum', sum)
