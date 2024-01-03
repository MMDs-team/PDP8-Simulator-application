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
const { validateInstruction, Instruction} = require('./fnc/instructions/Instruction.js')
const ProgramConter = require('./fnc/ProgramCounter.js')
const { findWord, assemble } = require('./fnc/Word.js')
const PDP = require('./fnc/PDP.js')
const power = () => PDP.PDP.power()
const { IF, OF, INPR } = require('./fnc/Register.js')

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
  assemble: (inp) => assemble(inp),
  IFGetMem: () => IF.getMem(),
  IFSetMem: (inp) => IF.setMem(inp),
  OFGetMem: () => OF.getMem(),
  OFSetMem: (inp) => OF.setMem(inp),
  setInputRegister: (inp) => INPR.setMem(inp),
  PDP,
  Instruction,
  createCodeLine: (inst) => Instruction.createCodeLine(inst),
  power: () => power(),
  start: (inp) => start(inp),
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