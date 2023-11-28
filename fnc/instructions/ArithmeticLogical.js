const { AC, E } = require('../registers/AC');
const ProgramConter = require('../ProgramConter')

class ArithmeticLogical extends Instruction {

    CLA() {
        AC.setMem(0);
    }

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
