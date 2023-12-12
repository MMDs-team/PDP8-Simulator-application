const PDP = require('../PDP.js')
const Instruction = require('./Instruction');
const { AC, E} = require('../Register.js');
const ProgramCounter = require('../ProgramConter.js');
const { Module } = require('module');


class MemoryRefrecne extends Instruction{

    AR = 0
    DR = 0

    constructor(AR, DR) {
        super()
        this.AR = AR
        this.DR = DR
    }

    AND(ref) {
        const memVal = PDP.getMem(ref) 
        const ACValue = AC.getMem() 
        const answer = ACValue & memVal 
        AC.setMem(answer)
    }

    ADD(ref) {
        const memVal = PDP.getMem(ref) 
        const ACValue = AC.getMem() 
        const answer = ACValue + memVal 
        AC.setMem(answer)
    }

    LDA(ref) {
        const memVal = PDP.getMem(ref) 
        AC.setMem(memVal)
    }

    STA(ref) {
        const ACValue = AC.getMem() 
        PDP.setMem(ref , getMemVal)
    }

    BUN(ref) {
        const memVal = PDP.getMem(ref) 
        ProgramCounter.load(memVal) 
    }

    BSA(ref) {
        const ACValue = AC.getMem()
        PDP.setMem(ref , ACValue)
        ref += 1 
        AC.setMem(ref)
    }

    ISZ(ref) {
        DR = PDP.getMem(ref) + 1 
        PDP.setMem(ref , DR) 
        if(DR == 0) ProgramCounter.increment() 
    }
}

module.exports = MemoryRefrecne;