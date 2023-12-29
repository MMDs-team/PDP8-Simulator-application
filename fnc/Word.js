const PDP = require("./PDP")
const ProgramCounter = require("./ProgramCounter")
const { AC, E, INPR, IF, OF } = require("./Register.js")

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

    switch (d) {
        case 7:
            // Identify the data elems from counting pop bits of the address and then control the flow!
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

const _toRTL = (instWord) => {
    let I = Boolean(instWord & (1 << 15))
    let d = (instWord & ~(1 << 15)) >> 12
    let address = instWord & ((1 << 12) - 1)

    let addr = address.toString(16).toUpperCase().slice(-3)
    addr = '0'.repeat(3 - addr.length) + addr

    let result = "RTL: "
    switch (d) { // 0 to 6: Memory reference instructions:
        // ["AND", "ADD", "LDA", "STA", "BUN", "BSA", "ISZ"]
        case 0: // AND
            if (I) result += "Address ← Mem[" + addr + "] then AC ← AC & Mem[Address]"
            else result += "AC ← AC & Mem[" + addr + "]"
            break;
        case 1: // ADD
            if (I) result += "Address ← Mem[" + addr + "] then AC ← AC + Mem[Address]"
            else result += "AC ← AC + Mem[" + addr + "]"
            break;
        case 2: // LDA
            if (I) result += "Address ← Mem[" + addr + "] then AC ← Mem[Address]"
            else result += "AC ← Mem[" + addr + "]"
            break;
        case 3: // STA
            if (I) result += "Address ← Mem[" + addr + "] then Mem[Address] ← AC"
            else result += "Mem[" + addr + "] ← AC"
            break;
        case 4: // BUN
            if (I) result += "Address ← Mem[" + addr + "] then PC ← Mem[Address]"
            else result += "PC ← Mem[" + addr + "]"
            break;
        case 5: // BSA
            if (I) result += "Address ← Mem[" + addr + "] then Mem[Address] ← PC, Address ← Address + 1 then PC ← Address"
            else {
                let incrementedAddr = (address + 1).toString(16).toUpperCase().slice(-3)
                incrementedAddr = '0'.repeat(3 - addr.length) + incrementedAddr

                result += "Mem[" + addr + "] ← PC, Address ← " + incrementedAddr + " then PC ← Address"
            }
            break;
        case 6: // ISZ
            if (I) result += "Address ← Mem[" + addr + "] then Mem[Address] ← Mem[Address] + 1 then if(Mem[Address] = 0) then PC ← PC + 1"
            else result += "Mem[" + addr + "] ← Mem[" + addr + "] + 1 then if(Mem[" + addr + "] = 0) then PC ← PC + 1"
            break;
        case 7:
            if (!I) { // Arithmetic & Logical
                // ["CLA", "CLE", "CMA", "CME", "CIR", "CIL", "INC", "SPA", "SNA", "SZA", "SZE", "HLT"]
                switch (address) {
                    case 1 << 11: // CLA
                        result += "AC ← 0"
                        break;
                    case 1 << 10: // CLE
                        result += "E ← 0"
                        break;
                    case 1 << 9: // CMA
                        result += "AC ← ~AC"
                        break;
                    case 1 << 8: // CME
                        result += "E ← !E"
                        break;
                    case 1 << 7: // CIR
                        result += "E ← AC(0), AC(15) ← E, AC[14: 0] ← shr(AC)"
                        break;
                    case 1 << 6: // CIL
                        result += "E ← AC(15), AC(0) ← E, AC[15: 1] ← shl(AC)"
                        break;
                    case 1 << 5: // INC
                        result += "AC ← AC + 1"
                        break;
                    case 1 << 4: // SPA
                        result += "if(AC ≥ 0) then PC ← PC + 1"
                        break;
                    case 1 << 3: // SNA
                        result += "if(AC < 0) then PC ← PC + 1"
                        break;
                    case 1 << 2: // SZA
                        result += "if(AC = 0) then PC ← PC + 1"
                        break;
                    case 1 << 1: // SZE
                        result += "if(E = 0) then PC ← PC + 1"
                        break;
                    case 1: // HLT
                        result = "END OF COMPUTING!"
                }
            }
            else { // I/O
                // ["INP", "OUT", "SKI", "SKO", "ION", "IOF"]
                switch (address) {
                    case 1 << 11: // INP
                        result += "AC[7: 0] ← INPR, IF ← 0"
                        break;
                    case 1 << 10: // OUT
                        result += "OUT ← AC[7: 0], OF ← 0"
                        break;
                    case 1 << 9: // SKI
                        result += "if(IF = 1) then PC ← PC + 1"
                        break;
                    case 1 << 8: // SKO
                        result += "if(OF = 1) then PC ← PC + 1"
                        break;
                    case 1 << 7: // ION
                        result += "IEN ← 1"
                        break;
                    case 1 << 6: // IOF
                        result += "IEN ← 0"
                        break;
                }
            }
    }

    return result
}

const findWord = (address) => {
    const arbWord = PDP.PDP.getMem(address)

    let answer = {
        'data': arbWord.toString(16).toUpperCase().slice(-4),
        'instruction': _instIdentify(arbWord),
        'isCurrent': ProgramCounter.get() === address,
        'RTL': "",
        'address': address.toString(16).toUpperCase().slice(-3)
    }

    answer.data = '0'.repeat(4 - answer.data.length) + answer.data
    answer.address = '0'.repeat(3 - answer.address.length) + answer.address
    
    if (answer.instruction.length) answer.RTL = _toRTL(arbWord)

    return answer
}

const assemble = (toCon) => {
    // [CMD, ADDR(optional), I(optional)] or [DATA]
    const instOpcode = {
        // Memory reference:
        'AND': 0,
        'ADD': 1,
        'LDA': 2,
        'STA': 3,
        'BUN': 4,
        'BSA': 5,
        'ISZ': 6,

        // Arithmetic & Logic: 
        'CLA': '7800',
        'CLE': '7400',
        'CMA': '7200',
        'CME': '7100',
        'CIR': '7080',
        'CIL': '7040',
        'INC': '7020',
        'SPA': '7010',
        'SNA': '7008',
        'SZA': '7004',
        'SZE': '7002',
        'HLT': '7001',

        // I/O:
        'INP': 'F800',
        'OUT': 'F400',
        'SKI': 'F200',
        'SKO': 'F100',
        'ION': 'F080',
        'IOF': 'F040',
    }

    const isInst = toCon[0] in instOpcode
    if (isInst && typeof (instOpcode[toCon[0]]) === 'number') {
        let result = instOpcode[toCon[0]] << 12;
        if (toCon.length === 3) result |= 1 << 15

        let address = parseInt(toCon[1], 16)
        result |= address

        result = result.toString(2).slice(-16)
        result = '0'.repeat(16 - result.length) + result

        return result
    }
    else if (isInst) {
        let result = parseInt(instOpcode[toCon[0]], 16).toString(2).slice(-16)
        return '0'.repeat(16 - result.length) + result
    }
    else {
        let result = parseInt(toCon[0], 16).toString(2).slice(-16)
        return '0'.repeat(16 - result.length) + result
    }
}

module.exports = { Word, findWord, assemble };
