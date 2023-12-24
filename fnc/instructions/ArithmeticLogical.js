const { AC, E } = require('../Register.js')
const ProgramCounter = require('../ProgramCounter.js')
const { Control } = require('../PDP.js')

class ArithmeticLogical {
    static CLA() { AC.setMem(0); }

    static CLE() { E.setMem(false); }

    static CMA() {
        const currVal = AC.getMem()
        AC.setMem(((1 << AC.size()) - 1) - currVal)
    }

    static CME() { E.setMem(!E.getMem()) }

    static CIR() {
        const eVal = Number(E.getMem())
        E.setMem(Boolean(AC.getMem() & 1))

        const toAssign = (AC.getMem() >> 1) | (eVal << (AC.size() - 1 /* Index base: 0 */))
        AC.setMem(toAssign)
    }

    static CIL() {
        const eVal = Number(E.getMem())
        E.setMem(Boolean(AC.getMem() & (1 << (AC.size() - 1 /* Index base: 0 */))))

        const toAssign = ((AC.getMem() << 1) | eVal)
        AC.setMem(toAssign)
    }

    static INC() {
        const toAssign = AC.getMem() + 1;
        AC.setMem(toAssign)
        E.setMem(Boolean(toAssign & (1 << AC.size() /* Index base: 0 */)))
    }

    static SPA() {
        // In this instruction we include zero to positive values too!
        if (!(Boolean(AC.getMem() & (1 << (AC.size() - 1))))) ProgramCounter.increment()
    }

    static SNA() {
        if (Boolean(AC.getMem() & (1 << (AC.size() - 1)))) ProgramConuter.increment()
    }

    static SZA() {
        if (AC.getMem() == 0) ProgramCounter.increment()
    }

    static SZE() {
        if (!E.getMem()) ProgramCounter.increment()
    }

    static HLT() { Control.isOn = false; }
}


module.exports = ArithmeticLogical;