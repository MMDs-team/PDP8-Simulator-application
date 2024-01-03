// preload.js

// All the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
// window.addEventListener('DOMContentLoaded', () => {
// })


const { contextBridge } = require('electron')

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
const { IF, OF, INPR } = require('./fnc/Register.js')



contextBridge.exposeInMainWorld('api', {
  addToMemory: (assem) => addToMemory(assem),
  Memory: Memory,
  ProgramConter,
  getProgramCounterMem: () => ProgramConter.get(),
  findWord: (start) => findWord(start),
  assemble: (inp) => assemble(inp),
  IFGetMem: () => IF.getMem(),
  IFSetMem: (inp) => IF.setMem(inp),
  OFGetMem: () => OF.getMem(),
  OFSetMem: (inp) => OF.setMem(inp),
  setInputRegister: (inp) => INPR.setMem(inp),
  Instruction,
  createCodeLine: (inst) => Instruction.createCodeLine(inst),
  power: () => PDP.PDP.power(),
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