const { ProgramConter } = require('fnc/ProgramConter.js')
const PDP = require('fnc/PDP.js')

const start = () => {}

const loadAdd = (swch) => {
    var value = 0 
    var mul = 1 
    for(var index = 17 ; index >= 6 ; index--){
        value += swch[index] * mul 
        mul *= 2 
    }
    ProgramConter.load(value)
}

const deposit = (swch) => {
    var address = PDP.getAR() 
    var value = 0 
    var mul = 1 
    for(var index = 17 ; index >= 2 ; index--){
        value += swch[index] * mul 
        mul *= 2 
    }
    PDP.setMem(address , value) 
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