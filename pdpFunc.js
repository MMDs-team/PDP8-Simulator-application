const ProgramCounter = require('./fnc/ProgramCounter.js')
const PDP = require('./fnc/PDP.js')

const start = () => {
    PDP.PDP.start()
}

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
    const address = ProgramCounter.get() 
    PDP.PDP.setAR(address)
    let value = 0 
    let mul = 1 
    for(let index = 17 ; index >= 2 ; index--){
        value += swch[index] * mul 
        mul *= 2 
    }
    PDP.PDP.setDR(value)
    PDP.PDP.setMem(address , value) 
    ProgramCounter.increment()
}

const examinate = () => {
    const address = ProgramCounter.get()
    PDP.PDP.setAR(address)
    const memValue = PDP.PDP.getMem(address)
    PDP.PDP.setDR(memValue)
    ProgramCounter.increment()
}

const continueSw = () => {
    PDP.PDP.isOn = true 
    PDP.PDP.start()
}

const stop = () => {
    PDP.PDP.isOn = false
}

const singStep = () => {}

const singInst = () => {
    if(PDP.PDP.singInst) PDP.PDP.singInst = false 
    else PDP.PDP.singInst = true  
}



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