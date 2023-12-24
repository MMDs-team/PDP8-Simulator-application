const { INP } = require("./instructions/IOT")
const ProgramCounter = require("./ProgramCounter.js")
const { PDP } = require("./PDP.js")

class Register{}


class AC extends Register{
    
    static #mem = 0

    static size = () => { return 16 }
    
    static setMem(newMem) { this.mem = newMem }

    static getMem() { return this.#mem }

    static increment() { this.#mem = this.#mem + 1}

    //other methods
}



class E extends Register{
    
    static #mem = 0

    static size = () => { return 1 }

    static setMem(newMem) { this.mem = newMem }

    static getMem() { return this.#mem }
}



class IEN extends Register{}
class IF extends Register{}
class OF extends Register{}
class INPR extends Register{}
class OUTR extends Register{}

const getRegistersValues = () => {
    const pcVal = ProgramCounter.get()
    const arVal = PDP.getAR()
    const drVal = PDP.getDR()

    answer = {
        ac: {
            hex: AC.getMem().toString(16).toUpperCase().slice(-4),
            dec: String(AC.getMem()),
            bin: AC.getMem().toString(2).slice(-16),
        },
        pc: {
            hex: pcVal.toString(16).toUpperCase().slice(-3),
            dec: String(pcVal),
            bin: pcVal.toString(2).slice(-12),
        },
        inp: {
            hex: '00',
            dec: '0',
            bin: '00000000',
        },
        out: {
            hex: '00',
            dec: '0',
            bin: '00000000',
        },
        e: {
            hex: String(E.getMem() ? String(1) : String(0)),
            dec: String(E.getMem() ? String(1) : String(0)),
            bin: String(E.getMem() ? String(1) : String(0)),
        },
        ar: {
            hex: arVal.toString(16).toUpperCase().slice(-4),
            dec: String(arVal),
            bin: arVal.toString(2).slice(-16),
        },
        dr: {
            hex: drVal.toString(16).toUpperCase().slice(-4),
            dec: String(drVal),
            bin: drVal.toString(2).slice(-16),
        }
    }

    answer.ac.hex = '0'.repeat(4 - answer.ac.hex.length) + answer.ac.hex
    answer.ac.bin = '0'.repeat(16 - answer.ac.bin.length) + answer.ac.bin

    answer.pc.hex = '0'.repeat(3 - answer.pc.hex.length) + answer.pc.hex
    answer.pc.bin = '0'.repeat(12 - answer.pc.bin.length) + answer.pc.bin

    answer.ar.hex = '0'.repeat(4 - answer.ar.hex.length) + answer.ar.hex
    answer.ar.bin = '0'.repeat(16 - answer.ar.bin.length) + answer.ar.bin

    answer.dr.hex = '0'.repeat(4 - answer.dr.hex.length) + answer.dr.hex
    answer.dr.bin = '0'.repeat(16 - answer.dr.bin.length) + answer.dr.bin

    return answer
}


module.exports = { AC, E, IEN, IF, OF, INPR, OUTR, getRegistersValues }