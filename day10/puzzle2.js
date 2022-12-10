const { Sign } = require('crypto')
const fs = require('fs')

const input = fs.readFileSync('./day10/given.txt', 'utf-8')
const data = input.split('\n')

class CycleListener {
  id
  amount
  currentCycle
  fireOnCycle
  emitter
  command

  constructor(id, amount, fireOnCycle, command, emitter) {
    this.id = id
    this.amount = amount
    this.currentCycle = 1
    this.fireOnCycle = fireOnCycle
    this.emitter = emitter
    this.command = command
  }

  updateCycle = () => {
    this.currentCycle++;

    console.log(`current cycle for ${this.command} ${this.amount} : ${this.currentCycle}`)

    if (this.currentCycle > this.fireOnCycle) {
      this.emitter.cycleFinish(this)
    }
  }
}

class Emitter {
  globalRegister = 1;
  currentCount = 0; // this is for the id generation
  cycle = 0;
  listeners = new Array();
  signalTrackers = new Array();
  totalSumSignal = 0;

  // {amount, finishCycle}
  addListener = (amount, finishCycle, command) => {
    let newCycleListener = new CycleListener(this.currentCount, amount, finishCycle, command, this)
    this.listeners.push(newCycleListener)
    this.currentCount++
  }

  removeListener = (listener) => {
    this.listeners = this.listeners.filter((e => e.id !== listener.id))
  }

  cycleFinish = (listener) => {
    this.globalRegister += listener.amount
    // console.log('Command Finished', listener.command, listener.amount)
    this.removeListener(listener)
  }

  increaseCycle = () => {
    this.cycle++

    this.listeners.forEach((e) => {
      e.updateCycle();
    })
  }
}


const print = (emitter) => {
  console.log('emitter.cycle', emitter.cycle)
  console.log('emitter.globalRegister', emitter.globalRegister)
  console.log('emitter.listeners.length', emitter.listeners.length)
  console.log('')
}


// set canvas
let canvas = new Array(6).fill(null).map(e => new Array(40).fill(' '));
const printCanvas = () => {
  canvas.forEach((c) => {
    console.log(c.join(''))
    // console.log()
  })
  console.log('------------------------')
}

let emitter = new Emitter();


const doPerCycle = () => {
  // get the current row
  let row = Math.floor(emitter.cycle / 40)
  let drawPosition = emitter.cycle % 40;

  print(emitter)

  // check the position of the sprite against the current cycle
  let sprite = [emitter.globalRegister - 1, emitter.globalRegister, emitter.globalRegister + 1]
  console.log('sprite', sprite)
  console.log('drawPosition', drawPosition)

  if (sprite.includes(drawPosition)) {
    canvas[row][drawPosition] = '#'
  }

  printCanvas();

}

for (let i = 0; i < data.length; ++i) {
  // so cycle initial 

  console.log('command', data[i])

  if (data[i] === 'noop') {
    // execute
    emitter.addListener(0, 1, 'noop')
    // do this initially for i = 0
    doPerCycle()
    // then i = 1 now
    emitter.increaseCycle()

  } else {
    let command = data[i].split(' ')
    emitter.addListener(parseInt(command[1]), 2, 'addx')

    doPerCycle()
    emitter.increaseCycle()
    doPerCycle()
    emitter.increaseCycle()
  }
}



console.log('emitter.totalSumSignal', emitter.totalSumSignal)
