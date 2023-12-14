const { AC, E } = require('../Register.js');
const ProgramConter = require('../ProgramConter.js');
const Instruction = require('./Instruction.js');

class ArithmeticLogical extends Instruction {

    constructor() {
        super()
    }

    CLA() {
        AC.setMem(0) 
    }

    CLE() {
        E.setMem(0)
    }

    CMA() {
        const ACValue = AC.getMem() 
        AC.setMem(~ ACValue) 
    }

    CME() {
        const EValue = E.getMem() 
        E.setMem(~ EValue) 
    }

    CIR() {
        const ACValue = AC.getMem() 
        if(ACValue & 1) E.setMem(1)
        else E.setMem(0)

        AC.setMem(ACValue >> 1)
    }

    CIL() {
        const ACValue = AC.getMem() 
        if(ACValue >= 0) E.setMem(0)
        else E.setMem(1)

        AC.setMem(ACValue << 1)
    }

    INC() {
        AC.increment()
    }

    SPA() {
        const ACValue = AC.getMem() 
        if(ACValue > 0) ProgramConter.increment()
    }

    SNA() {
        const ACValue = AC.getMem() 
        if(ACValue < 0) ProgramConter.increment()
    }

    SZA() {
        const ACValue = AC.getMem() 
        if(ACValue == 0) ProgramConter.increment()
    }

    SZE() {
        const EValue = E.getMem() 
        if(EValue == 0) ProgramConter.increment()
    }

    HLT() {
        // break 
    }
}


module.exports = ArithmeticLogical;