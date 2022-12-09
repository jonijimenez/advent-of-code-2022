const fs = require('fs');

try {
  const input = fs.readFileSync("./day1/given.txt", "utf-8")
  
  // Read each line one by one
  let data = input.split('\n')
  let max = 0;
  let current = 0;

  let i = 0;
  while (i < data.length) {
    // determine max and reset current
    if (data[i] === '') {
      if (current > max) {
        max = current;
      }
      current = 0;
    } else {
      current += parseInt(data[i]);
    }

    ++i;
  }

  console.log('data', max)
} catch (error) {
  console.log('error', error)
}