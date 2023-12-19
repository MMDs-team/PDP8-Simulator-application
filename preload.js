// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
// })


const { contextBridge } = require('electron')

const sayHello = () => { return "Hello World"}

const {Memory, addToMemory, sayHi} = require('./fnc/Memory.js')

// const Instruction = require('./fnc/instructions/Instruction.js')

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  sayHello: () => sayHello(),
  sayHi: () => sayHi(),
  addToMemory: () => addToMemory(),
  Memory: Memory,
//   Instruction: Instruction,
  // we can also expose variables, not just functions

})