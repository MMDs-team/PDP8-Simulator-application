const { AC, INPR, IF, OUTR, OF } = require("../Register.js")
const ProgramCounter = require("../ProgramCounter.js")


class IOT {

    static INP() {
        if (IF.getMem()) {
            const acVal = AC.getMem()
            const inpVal = INPR.getMem()

            const toAssign = ((acVal >> 8) << 8) + inpVal
            AC.setMem(toAssign)
            IF.setMem(false)
        }
    }
    static OUT() {
        if (OF.getMem()) {
            const toAssign = AC.getMem() & ((1 << 8) - 1)

            OUTR.setMem(toAssign)
            OF.setMem(false)
        }
    }
    static SKI() {
        if (IF.getMem()) ProgramCounter.load(ProgramCounter.get() + 1)
    }
    static SKO() {
        if (OF.getMem()) ProgramCounter.load(ProgramCounter.get() + 1)
    }
    static ION() { IEN.setMem(true) }
    static IOF() { IEN.setMem(false) }

    static assignToINPR(data) {
    }
}

module.exports = IOT;