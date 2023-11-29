const PDP = require('../PDP.js')
const Instruction = require('./Instruction');
const { AC, E} = require('../Register.js');
const ProgramCounter = require('../ProgramConter.js');
const { Module } = require('module');


class MemoryRefrecne extends Instruction{

    AR = 0
    DR = 0

    constructor( AR, DR) {
        super()
        this.AR = AR
        this.DR = DR
    }


    AND(ref) {
        const getMemVal = PDP.getMem(ref) 
        const ACValue = AC.getMem() 
        const answer = ACValue & getMemVal 
        AC.setMem(answer)
    }

    ADD(ref) {}

    LDA(ref) {}

    STA(ref) {}

    BUN(ref) {}

    BSA(ref) {}

    ISZ(ref) {}
}

module.exports = MemoryRefrecne;