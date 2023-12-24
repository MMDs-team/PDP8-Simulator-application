const ProgramCounter = require('./fnc/ProgramCounter.js')
const PDP= require('./fnc/PDP.js')

const start = () => {}

const loadAdd = (swch) => {
    let value = 0 
    let mul = 1 
    for(let index = 17 ; index >= 6 ; index--){
        value += swch[index] * mul 
        mul *= 2 
    }
    ProgramCounter.load(value)
}

const deposit = (swch) => {
    let address = PDP.PDP.getAR() 
    let value = 0 
    let mul = 1 
    for(let index = 17 ; index >= 2 ; index--){
        value += swch[index] * mul 
        mul *= 2 
    }
    PDP.PDP.setMem(address , value) 
}

const examinate = () => {}

const continueSw = () => {}

const stop = () => {}

const singStep = () => {}

const singInst = () => {}



module.exports = {
    start,
    loadAdd,
    deposit,
    examinate,
    continueSw,
    stop,
    singStep,
    singInst,
}