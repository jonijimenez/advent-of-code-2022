const fs = require('fs');

try {
  const input = fs.readFileSync("./day1/given.txt", "utf-8")
  
  // Read each line one by one
  let data = input.split('\n')
  let current = 0;
  let top3 = [0, 0, 0];

// if current is greater than top3, then check if greater than top2, then check if greater than top 1 
// if greater than top3, dethrone top3
// if greater than top 2, move top2 to top2 and put current to top2
// if greater than top1, move top 1, to top2 and current to top1


  let i = 0;
  while (i < data.length) {
    // determine max and reset current
    if (data[i] === '') {
      // check which top it is: 
      // opt 1. sort the 4 of them, and get top 3. Sorting is expensive
      // opt 2. check one by one ... and insert insert - this would be better, let's see
      //    - maybe we could do slices here to insert and concat

      // loop through the top3, start with the bottom
      // determine the index to be put
      let j = 2;
      while (j >= 0 && current > top3[j]) {
        --j;
      }

      // this becomes index of insertion
      j = j+1

      // slice the array acc to where to insert the 
      if (j < 3) {
        top3 = [
          ...top3.slice(0, j),
          current,
          ...top3.slice(j, 2),
        ]
      }

      current = 0;

    } else {
      current += parseInt(data[i]);
    }

    ++i;
  }

  console.log('top3', top3)

  top3.re

  let sum = top3.reduce((a,v) => {return a + v}, 0);

  console.log('sum', sum)
} catch (error) {
  console.log('error', error)
}