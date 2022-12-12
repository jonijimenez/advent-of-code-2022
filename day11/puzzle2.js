const fs = require('fs')

const input = fs.readFileSync('./day11/sample.txt', 'utf-8')
const data = input.split('\n')

let monkeys = []
let globalLCD = 1;

class Monkey {
  id;
  items = new Array();
  operation;
  operationStr;
  test;
  trueMonkey;
  falseMonkey;
  inspect = 0;

  constructor(id, items, operation, test, trueMonkey, falseMonkey,operationStr) {
    this.id = id;
    this.items = items;
    this.operation = operation;
    this.test = parseInt(test);
    this.trueMonkey = trueMonkey;
    this.falseMonkey = falseMonkey;
    this.operationStr = operationStr;
  }

  receive = (num) => {
    this.items.push(num)
  }  

  process = () => {
    // printMonkey(this)

    let elem = this.items.shift()
    while (elem) {
      // console.log('elem', elem)

      // perform operation on worry level
      let newWorryLevel = this.operation(parseInt(elem))
      newWorryLevel = newWorryLevel % globalLCD;

      // console.log('newWorryLevel', newWorryLevel)

      if (newWorryLevel % this.test === 0) {
        // console.log(`true: goes to monkey ${this.trueMonkey}`)
        monkeys[this.trueMonkey].receive(newWorryLevel)
      } else {
        // console.log(`false: goes to monkey ${this.falseMonkey}`)
        monkeys[this.falseMonkey].receive(newWorryLevel)
      }
      this.inspect++

      elem = this.items.shift()
    }

  }
}

// let's assume for now that operation has format "old [+-*/] [num|old]"
const convertOperation = (str) => {
  // console.log('str', str)
  let arr = str.split(' ')

  switch (arr[1]) {
    case '+':
      return (old) => {
        return old + (arr[2] === 'old' ? old : parseInt(arr[2]))
      }
    case '-':
    return (old) => {
      return old - (arr[2] === 'old' ? old : parseInt(arr[2]))
    }
    case '*':
    return (old) => {
      return old * (arr[2] === 'old' ? old : parseInt(arr[2]))
    }
    case '/':
    return (old) => {
      return old / (arr[2] === 'old' ? old : parseInt(arr[2]))
    }
  }

}

const printMonkey = (m) => {
  console.log(`monkey ${m.id} has items ${m.items.join(',')} with divisibilty ${m.test} with inspect ${m.inspect}`)
}

// input handling
let i = 0;
while (i !== data.length) {
  // monkey
  if (data[i].startsWith('Monkey')) {

    let regex = new RegExp(/Monkey (\d+):/)
    let monkeyRes = regex.exec(data[i])
    
    // Starting items
    i++
    let items = data[i].match(/\d+/g)
    // console.log('i++', items)

    // Operation
    i++
    let opRegex = new RegExp(/  Operation: new = (.+)/)
    let operationRes = opRegex.exec(data[i])
    // console.log('operation', operationRes)
    let operation = convertOperation(operationRes[1])

    // console.log('operation', operation(54))


    // Test condition
    i++
    let testRegex = new RegExp(/  Test: divisible by (\d+)/)
    let testRes = testRegex.exec(data[i])
    // console.log('testRes', testRes)
    let divisible = testRes[1]

    // test true false 
    i++
    let trueRegex = new RegExp(/    If true: throw to monkey (\d+)/)
    let trueRes = trueRegex.exec(data[i]);
    // console.log('trueRes', trueRes)


    i++
    let falseRegex = new RegExp(/    If false: throw to monkey (\d+)/)
    let falseRes = falseRegex.exec(data[i]);
    // console.log('falseRes', falseRes)
   
    // new Monkey
    let newMonkey = new Monkey(monkeyRes[1], items, operation, testRes[1], trueRes[1], falseRes[1], operationRes[1]);

    globalLCD *= parseInt(newMonkey.test)

    monkeys.push(newMonkey)
  }
  i++
} 

// console.log('globalLCD', globalLCD)

// processing
for (let j = 0; j < 10000; j++) {
  // console.log('round', j)
  monkeys.forEach((m => {
    m.process()
    // printMonkey(m)
  }))
  // console.log('')
}

// output
monkeys.forEach((m => {
  console.log(`Monkey ${m.id} inspected items ${m.inspect} times`) 
}))