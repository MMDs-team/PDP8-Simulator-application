const { AC, E } = require('../registers/AC')
const ProgramConter = require('../ProgramConter')
const { Control } = require('../PDP.js')

class ArithmeticLogical extends Instruction {

    CLA() { AC.setMem(0); }

    CLE() { E.setMem(false); }

    CMA() {
        const currVal = AC.getMem()
        AC.setMem(((1 << AC.size()) - 1) - currVal)
    }

    CME() { E.setMem(!E.getMem()) }

    CIR() {
        const eVal = Number(E.getMem())
        E.setMem(Boolean(AC.getMem() & 1))

        const toAssign = (AC.getMem() >> 1) | (eVal << (AC.size() - 1 /* Index base: 0 */))
        AC.setMem(toAssign)
    }

    CIL() {
        const eVal = Number(E.getMem())
        E.setMem(Boolean(AC.getMem() & (1 << (AC.size() - 1 /* Index base: 0 */))))

        const toAssign = ((AC.getMem() << 1) | eVal)
        AC.setMem(toAssign)
    }

    INC() {
        const toAssign = AC.getMem() + 1;
        AC.setMem(toAssign)
        E.setMem(Boolean(toAssign & (1 << AC.size() /* Index base: 0 */)))
    }

    SPA() {
        // In this instruction we include zero to positive values too!
        if (!(Boolean(AC.getMem() & (1 << (AC.size() - 1))))) ProgramCounter.increment()
    }

    SNA() {
        if (Boolean(AC.getMem() & (1 << (AC.size() - 1)))) ProgramConter.increment()
    }

    SZA() {
        if (AC.getMem() == 0) ProgramCounter.increment()
    }

    SZE() {
        if (!E.getMem()) ProgramCounter.increment()
    }

    HLT() { Control.isOn = false; }
}
