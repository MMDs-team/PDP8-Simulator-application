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

    AND() {
        const ACValue = AC.getMem() 
        const answer = ACValue & this.DR 
        AC.setMem(answer)
    }

    ADD() {
        const ACValue = AC.getMem() 
        const answer = ACValue + this.DR 
        AC.setMem(answer)
    }

    LDA() {
        AC.setMem(this.DR)
    }

    STA() {
        const ACValue = AC.getMem() 
        PDP.setMem(this.AR , ACValue)
    }

    BUN() { 
        ProgramCounter.load(this.DR) 
    }

    BSA() {
        const PCValue = ProgramCounter.get()
        PDP.setMem(this.AR , PCValue)
        ProgramCounter.load(this.AR + 1)
    }

    ISZ() {
        PDP.setMem(this.AR , this.DR++) 
        if(DR == 0) ProgramCounter.increment() 
    }
}

module.exports = MemoryRefrecne;