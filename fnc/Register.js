class Register{}


class AC extends Register{
    
    static #mem = 0
    
    static setMem(newMem) { this.mem = newMem }

    static getMem() { return this.#mem }

    //other methods
}



class E extends Register{
    
    static #mem = 0

    static setMem(newMem) { this.mem = newMem }

    static getMem() { return this.#mem }
}



class IEN extends Register{}
class IF extends Register{}
class OF extends Register{}
class INPR extends Register{}
class OUTR extends Register{}


module.exports = {AC, E, IEN, IF, OF, INPR, OUTR}

