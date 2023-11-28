const { AC, E } = require('../Register.js');
const ProgramConter = require('../ProgramConter.js');
const Instruction = require('./Instruction.js');

class ArithmeticLogical extends Instruction {



    constructor() {
        super()
    }

    CLA() {}

    CLE() {}

    CMA() {}

    CME() {}

    CIR() {}

    CIL() {}

    INC() {}

    SPA() {}

    SNA() {}

    SZA() {}

    SZE() {}

    HLT() {}
}


module.exports = ArithmeticLogical;