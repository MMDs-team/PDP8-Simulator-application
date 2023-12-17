const { AC, E } = require('../registers/AC');
const ProgramConter = require('../ProgramConter')

class ArithmeticLogical extends Instruction {

    CLA() {
        AC.setMem(0);
    }

    CLE() {
        E.setMem(false);
    }

    CMA() {
        const currVal = AC.getMem()
        AC.setMem(((1 << AC.size()) - 1) - currVal)
    }

    CME() { E.setMem(!E.getMem()) }

    CIR() {
        const eVal = E.getMem();
        E.setMem(AC.getMem() && 1);

        const toAssign = (AC.getMem() >> 1) & (eVal << 16);
        AC.setMem(toAssign);
    }

    CIL() {

    }

    INC() {}

    SPA() {}

    SNA() {}

    SZA() {}

    SZE() {}

    HLT() {}
}
