const PDP = require("./PDP")
const ProgramCounter = require("./ProgramCounter")

class Word{
    #mem = 0;

    setMem(newMem) {
        this.#mem = newMem
    }

    getMem() { return this.#mem; }
}

const _instIdentify = (toCon) => {
    result = [/*inst, blank/targetAddr, blank/I*/]

    let I = Boolean(toCon & (1 << 15))
    let d = (toCon & ~(1 << 15)) >> 12
    let address = toCon & ((1 << 12) - 1)

    const memRefInsts = ["AND", "ADD", "LDA", "STA", "BUN", "BSA", "ISZ"]
    const registerInsts = ["CLA", "CLE", "CMA", "CME", "CIR", "CIL", "INC", "SPA", "SNA", "SZA", "SZE", "HLT"]
    const iO = ["INP", "OUT", "SKI", "SKO", "ION", "IOF"]

    if (I && d !== 7) address = PDP.getMem(address)

    switch (d) {
        case 7:
            // Identify the data elems from counting pop bits of the adress and then control the flow!
            let popCnt = 0
            let cmdFlag = -1
            for (let i = 0; i < 12; i++) {
                if (Boolean(address & (1 << i))) {
                    cmdFlag = 12 - i - 1 /* Because of index basing equal to ZERO */;
                    popCnt++
                }
            }

            if (popCnt != 1) break;

            if (!I) result.push(registerInsts[cmdFlag])
            else result.push(iO[cmdFlag])

            break;

        default:
            address = address.toString(16).toUpperCase().slice(-3)
            address = '0'.repeat(3 - address.length) + address

            result.push(memRefInsts[d], address)
            if (I) result.push('I')
    }

    return result
}

const findWord = (address) => {
    const arbWord = PDP.PDP.getMem(address)

    let answer = {
        'data': arbWord.toString(16).toUpperCase().slice(-4),
        'instruction': _instIdentify(arbWord),
        'isCurrent': ProgramCounter.get() === address,
        'address': address.toString(16).toUpperCase().slice(-3)
    }

    answer.data = '0'.repeat(4 - answer.data.length) + answer.data
    answer.address = '0'.repeat(3 - answer.address.length) + answer.address
    
    return answer
}

module.exports = { Word, findWord };
