const { INP } = require("./instructions/IOT")

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

    answer = {
        ac: {
            hex: AC.getMem().toString(16).toUpperCase(),
            dec: String(AC.getMem()),
            bin: AC.getMem().toString(2),
        },
        pc: {
            hex: PC.getMem().toString(16).toUpperCase(),
            dec: String(PC.getMem()),
            bin: PC.getMem().toString(2),
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
            hex: AR.getMem().toString(16).toUpperCase(),
            dec: String(AR.getMem()),
            bin: AR.getMem().toString(2),
        },
        dr: {
            hex: DR.getMem().toString(16).toUpperCase(),
            dec: String(DR.getMem()),
            bin: DR.getMem().toString(2),
        }
    }
    return answer
} 


module.exports = {AC, E, IEN, IF, OF, INPR, OUTR, getRegistersValues}

