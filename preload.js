// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
// })


const { contextBridge } = require('electron')

const sayHello = () => { return "Hello World"}

const {Memory, addToMemory, getBinHex} = require('./fnc/Memory.js')

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
const { validateInstruction} = require('./fnc/instructions/Instruction.js')
const ProgramConter = require('./fnc/ProgramCounter.js')
const { findWord } = require('./fnc/Word.js')


const getProgramCounterMem = () => ProgramConter.get()

contextBridge.exposeInMainWorld('api', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  sayHello: () => sayHello(),
  addToMemory: (assem) => addToMemory(assem),
  Memory: Memory,
  ProgramConter,
  getProgramCounterMem: () => getProgramCounterMem(),
  findWord: (start) => findWord(start),

  start: () => start(),
  loadAdd: (value) => loadAdd(value),
  deposit: (value) => deposit(value),
  examinate: () => examinate(),
  continueSw: () => continueSw(),
  stop: () => stop(),
  singStep: () => singStep(),
  singInst: () => singInst(),

  getRegistersValues: () => getRegistersValues(),
  validateInstruction: (inst) => validateInstruction(inst),
  // Instruction: Instruction,
  // we can also expose variables, not just functions

})