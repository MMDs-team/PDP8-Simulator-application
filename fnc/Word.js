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

    let result = "RTL: "
    switch (d) {
        case 0:
            break;
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
        case 5:
            break;
        case 6:
            break;
        case 7:
            if (!I) { // Arithmetic & Logical
                // ["CLA", "CLE", "CMA", "CME", "CIR", "CIL", "INC", "SPA", "SNA", "SZA", "SZE", "HLT"]
                switch (address) {
                    case 1 << 11: // CLA
                        // RTL: AC ← 0

                        result += "AC ← 0"
                        break;
                    case 1 << 10: // CLE
                        // RTL: E ← 0

                        result += "E ← 0"
                        break;
                    case 1 << 9: // CMA
                        // RTL: AC ← ~AC

                        {
                            let notAcVal = ~AC.getMem() & ((1 << 16) - 1)
                            notAcVal = notAcVal.toString(16).toUpperCase().slice(-4)
                            notAcVal = '0'.repeat(4 - notAcVal.length) + notAcVal
                            result += "AC ← " + notAcVal + "(~AC)";
                        }
                        break;
                    case 1 << 8: // CME
                        // RTL: E ← !E

                        result += "E ← " + (!E.getMem() ? '1' : '0') + "(!E)"
                        break;
                    case 1 << 7: // CIR
                        // RTL: E ← AC(0), AC(15) ← E, AC[14: 0] ← shr(AC)

                        {
                            let acVal = AC.getMem()
                            let shiftedVal = (acVal >> 1).toString(16).toUpperCase().slice(-4)
                            shiftedVal = '0'.repeat(4 - shiftedVal.length) + shiftedVal

                            result += "E ← " + (Boolean(acVal & 1) ? '1' : '0')
                                + "(AC(0)), AC(15) ← " + (E.getMem() ? '1' : '0')
                                + "(E), AC[14: 0] ← " + shiftedVal + "shr(AC)";
                        }
                        break;
                    case 1 << 6: // CIL
                        // RTL: E ← AC(15), AC(0) ← E, AC[15: 1] ← shr(AC)

                        {
                            let acVal = AC.getMem()
                            let shiftedVal = (acVal << 1).toString(16).toUpperCase().slice(-4)
                            shiftedVal = '0'.repeat(4 - shiftedVal.length) + shiftedVal

                            result += "E ← " + (Boolean(acVal & (1 << 15)) ? '1' : '0')
                                + "(AC(15)), AC(0) ← " + (E.getMem() ? '1' : '0')
                                + "(E), AC[15: 1] ← " + shiftedVal + "shl(AC)";
                        }
                        break;
                    case 1 << 5: // INC
                        // RTL: AC ← AC + 1

                        {
                            let incrementedAc = (AC.getMem() + 1) & ((1 << 16) - 1)
                            incrementedAc = incrementedAc.toString(16).toUpperCase().slice(-4)
                            incrementedAc = '0'.repeat(4 - incrementedAc.length) + incrementedAc

                            result += "AC ← " + incrementedAc + "(AC + 1)"
                        }
                        break;
                    case 1 << 4: // SPA
                        // RTL: if(AC >= 0) then PC ← PC + 1

                        {
                            // maybe we can make some changes in result
                            let acVal = AC.getMem().toString(16).toUpperCase().slice(-4)
                            acVal = '0'.repeat(4 - acVal.length) + acVal

                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + acVal + "(AC) ≥ 0) then PC ← " + incrementedPCVal + "(PC + 1)"
                        }
                        break;
                    case 1 << 3: // SNA
                        // RTL: if(AC < 0) then PC ← PC + 1

                        {
                            let acVal = AC.getMem().toString(16).toUpperCase().slice(-4)
                            acVal = '0'.repeat(4 - acVal.length) + acVal

                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + acVal + "(AC) < 0) then PC ← " + incrementedPCVal + "(PC + 1)"
                        }
                        break;
                    case 1 << 2: // SZA
                        // RTL: if(AC = 0) then PC ← PC + 1

                        {
                            let acVal = AC.getMem().toString(16).toUpperCase().slice(-4)
                            acVal = '0'.repeat(4 - acVal.length) + acVal

                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + acVal + "(AC) = 0) then PC ← " + incrementedPCVAl + "(PC + 1)"
                        }
                        break;
                    case 1 << 1: // SZE
                        // RTL: if(E = 0) then PC ← PC + 1

                        {
                            let eVal = E.getMem()
                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + (eVal ? '1' : '0') + "(E) = 0) then PC ← PC + 1"
                        }
                        break;
                    case 1: // HLT
                        // RTL: PDP.isOn ← FALSE

                        result += "PDP.isOn ← FALSE"
                }
            }
            else { // I/O
                // ["INP", "OUT", "SKI", "SKO", "ION", "IOF"]
                switch (address) {
                    case 1 << 11: // INP
                        // RTL: AC[7: 0] ← INPR, IF ← 0

                        {
                            let inpVal = INPR.getMem().toString(16).toUpperCase().slice(-2)
                            inpVal = '0'.repeat(2 - inpVal.length) + inpVal

                            result += "AC[7: 0] ← " + inpVal + "(INPR), IF ← 0"
                        }
                        break;
                    case 1 << 10: // OUT
                        // RTL: OUT ← AC[7: 0], OF ← 0

                        {
                            let acLowerVal = AC.getMem().toString(16).toUpperCase().slice(-2)
                            acLowerVal = '0'.repeat(2 - acLowerVal.length) + acLowerVal

                            result += "OUT ← " + acLowerVal + "(AC[7: 0]), OF ← 0"
                        }
                        break;
                    case 1 << 9: // SKI
                        // RTL: if(IF = 1) then PC ← PC + 1

                        {
                            let iFVal = IF.getMem()
                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + (iFVal ? '1' : '0') + "(IF) = 1) then PC ← " + incrementedPCVal + "(PC + 1)"
                        }
                        break;
                    case 1 << 8: // SKO
                        // RTL: if(OF = 1) then PC ← PC + 1

                        {
                            let oFVal = OF.getMem()
                            let incrementedPCVal = (ProgramCounter.get() + 1).toString(16).toUpperCase().slice(-3)
                            incrementedPCVal = '0'.repeat(3 - incrementedPCVal.length) + incrementedPCVal

                            result += "if(" + (oFVal ? '1' : '0') + "(OF) = 1) then PC ← " + incrementedPCVal + "(PC + 1)"
                        }
                        break;
                    case 1 << 7: // ION
                        // RTL: IEN ← 1

                        result += "IEN ← 1"
                        break;
                    case 1 << 6: // IOF
                        // RTL: IEN ← 0

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
    
    if (answer.instruction.length) answer.RTL = _toRTL(answer.instruction)

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

    const isInst = toCon[0] in instOpCode
    if (isInst && typeof (instOpcode[toCon[0]]) === 'number') {
        let result = instOpcode[toCon[0]] << 12;
        if (toCon.length === 3) result |= 1 << 15

        let address = parseInt(toCon[1], 16)
        result |= address

        result = result.toString(2).toUpperCase().slice(-16)
        result = '0'.repeat(16 - result.length) + result

        return result
    }
    else if (isInst) {
        let result = parseInt(toCon[0], 16).toString(2).slice(-16)
        return '0'.repeat(16 - result.length) + result
    }
    else {
        let result = parseInt(instOfcode[toCon[0]], 16).toString(2).slice(-16)
        return '0'.repeat(16 - result.length) + result
    }
}

module.exports = { Word, findWord, assemble };
