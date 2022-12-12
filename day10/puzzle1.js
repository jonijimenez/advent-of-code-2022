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
    this.currentCycle = 0
    this.fireOnCycle = fireOnCycle
    this.emitter = emitter
    this.command = command
  }

  updateCycle = () => {
    this.currentCycle++;
    if (this.currentCycle > this.fireOnCycle) {
      this.emitter.cycleFinish(this)
    }
  }
}

class SignalStrengthTracker {
  id
  currentCycle
  fireOnCycle
  emitter

  constructor(id, fireOnCycle, emitter) {
    this.id = id
    this.fireOnCycle = fireOnCycle
    this.emitter = emitter
    this.currentCycle = 0
  }

  updateCycle = () => {
    // console.log('updateCycle ', this.fireOnCycle, ' currentCycle ', this.currentCycle)
    this.currentCycle++;
    if (this.currentCycle === this.fireOnCycle) {
      this.emitter.signalStrengthLog(this)
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

    this.signalTrackers.forEach((e) => {
      e.updateCycle();
    })
  }

  addSignalStrengthTracker = (finishCycle) => {
    let newSignalTracker = new SignalStrengthTracker(this.currentCount, finishCycle, this)
    this.signalTrackers.push(newSignalTracker)
    this.currentCount++
  }

  signalStrengthLog = (signalTracker) => {
    let totalSignal = this.cycle * this.globalRegister

    console.log(`Signal Tracker Fire on ${this.cycle}th cycle with index ${this.globalRegister} `,
      `for total strength of ${totalSignal}`)

    this.totalSumSignal += totalSignal

    this.removeSignalTracker(signalTracker)
  }

  removeSignalTracker = (listener) => {
    this.signalTrackers = this.signalTrackers.filter((e => e.id !== listener.id))
  }


}


const print = (emitter) => {
  console.log('emitter.cycle', emitter.cycle)
  console.log('emitter.globalRegister', emitter.globalRegister)
  console.log('emitter.listeners.length', emitter.listeners.length)
  console.log('')
}

let emitter = new Emitter();

// implement my own setTimeout multithreading thing

// initialize signalTrackers
[20, 60, 100, 140, 180, 220].forEach((e) => {
  emitter.addSignalStrengthTracker(e);
})

for (let i = 0; i < data.length; ++i) {
  // console.log('command: ', data[i])

  if (data[i] === 'noop') {
    emitter.addListener(0, 1, 'noop')
    emitter.increaseCycle()

  } else {
    let command = data[i].split(' ')
    emitter.addListener(parseInt(command[1]), 2, 'addx')
    emitter.increaseCycle()
    emitter.increaseCycle()
  }


  // print(emitter)

}

console.log('emitter.totalSumSignal', emitter.totalSumSignal)
