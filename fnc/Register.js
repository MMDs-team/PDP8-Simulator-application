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
            hex: '',
            dec: '',
            bin: '',
        },
        pc: {
            hex: '',
            dec: '',
            bin: '',
        },
        inp: {
            hex: '',
            dec: '',
            bin: '',
        },
        out: {
            hex: '',
            dec: '',
            bin: '',
        },
        e: {
            hex: '',
            dec: '',
            bin: '',
        },
    }
    return answer
}


module.exports = {AC, E, IEN, IF, OF, INPR, OUTR, getRegistersValues}

