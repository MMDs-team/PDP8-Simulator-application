const { INP } = require("./instructions/IOT")
const ProgramCounter = require("./ProgramCounter.js")
const PDP = require("./PDP.js")

class Register{}


class AC extends Register{
    
    static #mem = 0

    static size = () => { return 16 }
    
    static setMem(newMem) { 
        this.#mem = newMem & ((1<<16) -1)
    }

    static getMem() { return this.#mem }

    static increment() { 
        const value = this.#mem + 1
        this.setMem(value)
    }

    //other methods
}



class E extends Register{
    
    static #mem = false

    static size = () => { return 1 }

    static setMem(newMem) { this.#mem = newMem }

    static getMem() { return this.#mem }
}



class IEN extends Register{
    static #mem = false

    static size = () => { return 1}

    static setMem(newMem) { this.#mem = newMem }

    static getMem() { return this.#mem }
}
class IF extends Register{
    static #mem = false

    static size = () => { return 1}

    static setMem(newMem) { this.#mem = newMem }

    static getMem() { return this.#mem }
}
class OF extends Register{
    static #mem = false

    static size = () => { return 1}

    static setMem(newMem) { this.#mem = newMem }

    static getMem() { return this.#mem }
}
class INPR extends Register{
    static #mem = 0

    static size = () => { return 8}

    static setMem(newMem) { 
        this.#mem = newMem & ((1<<16) -1)
    }

    static getMem() { return this.#mem }
}
class OUTR extends Register{
    static #mem = 0

    static size = () => { return 8}

    static setMem(newMem) { 
        this.#mem = newMem & ((1<<16) -1)
    }

    static getMem() { return this.#mem }
}

const getRegistersValues = () => {
    const pcVal = ProgramCounter.get()
    const arVal = PDP.PDP.getAR()
    const drVal = PDP.PDP.getDR()

    answer = {
        ac: {
            hex: AC.getMem().toString(16).toUpperCase().slice(-4),
            dec: String(AC.getMem()),
            oct: AC.getMem().toString(8).slice(-6),
            bin: AC.getMem().toString(2).slice(-16),
        },
        pc: {
            hex: pcVal.toString(16).toUpperCase().slice(-3),
            dec: String(pcVal),
            oct: pcVal.toString(8).slice(-4),
            bin: pcVal.toString(2).slice(-12),
        },
        inp: {
            hex: INPR.getMem().toString(16).toUpperCase().slice(-2),
            dec: String(INPR.getMem()),
            oct: INPR.getMem().toString(8).slice(-3),
            bin: INPR.getMem().toString(2).slice(-8),
        },
        if: {
            hex: IF.getMem() ? '1' : '0',
            dec: IF.getMem() ? '1' : '0',
            oct: IF.getMem() ? '1' : '0',
            bin: IF.getMem() ? '1' : '0'
        },
        out: {
            hex: OUTR.getMem().toString(16).toUpperCase().slice(-2),
            dec: String(OUTR.getMem()),
            oct: OUTR.getMem().toString(8).slice(-3),
            bin: OUTR.getMem().toString(2).slice(-8),
        },
        of: {
            hex: OF.getMem() ? '1' : '0',
            dec: OF.getMem() ? '1' : '0',
            oct: OF.getMem() ? '1' : '0',
            bin: OF.getMem() ? '1' : '0'
        },
        e: {
            hex: E.getMem() ? '1' : '0',
            dec: E.getMem() ? '1' : '0',
            oct: E.getMem() ? '1' : '0',
            bin: E.getMem() ? '1' : '0',
        },
        ien: {
            hex: IEN.getMem() ? '1' : '0',
            dec: IEN.getMem() ? '1' : '0',
            oct: IEN.getMem() ? '1' : '0',
            bin: IEN.getMem() ? '1' : '0'
        },
        ar: {
            hex: arVal.toString(16).toUpperCase().slice(-3),
            dec: String(arVal),
            oct: arVal.toString(8).slice(-4),
            bin: arVal.toString(2).slice(-12),
        },
        dr: {
            hex: drVal.toString(16).toUpperCase().slice(-4),
            dec: String(drVal),
            oct: drVal.toString(8).slice(-6),
            bin: drVal.toString(2).slice(-16),
        }
    }

    answer.ac.hex = '0'.repeat(4 - answer.ac.hex.length) + answer.ac.hex
    answer.ac.bin = '0'.repeat(16 - answer.ac.bin.length) + answer.ac.bin

    answer.pc.hex = '0'.repeat(3 - answer.pc.hex.length) + answer.pc.hex
    answer.pc.bin = '0'.repeat(12 - answer.pc.bin.length) + answer.pc.bin

    answer.inp.hex = '0'.repeat(2 - answer.inp.hex.length) + answer.inp.hex
    answer.inp.bin = '0'.repeat(8 - answer.inp.bin.length) + answer.inp.bin

    answer.out.hex = '0'.repeat(2 - answer.out.hex.length) + answer.out.hex
    answer.out.bin = '0'.repeat(8 - answer.out.bin.length) + answer.out.bin

    answer.ar.hex = '0'.repeat(3 - answer.ar.hex.length) + answer.ar.hex
    answer.ar.bin = '0'.repeat(12 - answer.ar.bin.length) + answer.ar.bin

    answer.dr.hex = '0'.repeat(4 - answer.dr.hex.length) + answer.dr.hex
    answer.dr.bin = '0'.repeat(16 - answer.dr.bin.length) + answer.dr.bin

    return answer
}


module.exports = { AC, E, IEN, IF, OF, INPR, OUTR, getRegistersValues }