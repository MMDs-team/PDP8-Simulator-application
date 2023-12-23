// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
// })


const { contextBridge } = require('electron')

const sayHello = () => { return "Hello World"}

const {Memory, addToMemory} = require('./fnc/Memory.js')

const {
  start,
  loadAdd,
  deposit,
  examinate,
  continueSw,
  stop,
  singStep,
  singInst,

} = require('./pdpFunc.js')

const { getRegistersValues } = require('./fnc/Register.js')


// const Instruction = require('./fnc/instructions/Instruction.js')

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  sayHello: () => sayHello(),
  addToMemory: () => addToMemory(),
  Memory: Memory,

  start: () => start(),
  loadAdd: () => loadAdd(value),
  deposit: () => deposit(value),
  examinate: () => examinate(),
  continueSw: () => continueSw(),
  stop: () => stop(),
  singStep: () => singStep(),
  singInst: () => singInst(),

  getRegistersValues: () => getRegistersValues(),
  // Instruction: Instruction,
  // we can also expose variables, not just functions

})