const Word = require('../Word.js')

class Instruction extends Word{


    static instructName = {
        'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
        'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
        'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF']
    }

    hex = '0123456789ABCDEF'

    static validateInstruction(inst) {
        // check if the address is 3 hex number
        if (inst[0].length!==3) throw new Error('address of line is wrong!!!')

        switch (inst.length) {
            case 4:
                //check if it is memory refrece and the last element is 'I':  (001 ADD 0A2 I)
                break;
            case 3:
                //check if it is memory refrece and the last element and it is indirect : (001 ADD 0BC)
                break;
            case 2:
                //check if it is register refrece or iot refrence or it is data: (00A CLA)  or (00A ION) or (00A B4C2)
                break
            default:
                // it is wrong!!!!
                break;
        }
    }
}

module.exports = Instruction;
