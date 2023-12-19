const Word = require('../Word.js')

class Instruction extends Word{


    static instructName = {
        'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
        'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
        'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF']
    }

    hex = '0123456789ABCDEF'

    static validateInstruction(inst) {
        // check first address
        for(index = 0 ; index < 3 ; index++) if(!hex.includes(inst[0][index])) throw new Error('address of line is wrong!!!')
        if(inst[0][3] != ":") throw new Error('address of line is wrong!!!')

        switch (inst.length) {
            case 4:
                //check if it is memory refrece and the last element is 'I':  (001: ADD 0A2 I)

                // check instruction
                if(!instructName["mem"].includes(inst[1])) return false

                // check second address
                if(inst[2].length !== 3) return false 
                for(index = 0 ; index < 3 ; index++) if(!hex.includes(inst[2][index])) return false

                // check indirect sign 
                if(inst[3] != "I") return false 

                return true 
            case 3:
                //check if it is memory refrece and the last element and it is indirect : (001: ADD 0BC)

                // check instruction
                if(!instructName["mem"].includes(inst[1])) return false

                // check second address
                if(inst[2].length !== 3) return false 
                for(index = 0 ; index < 3 ; index++) if(!hex.includes(inst[2][index])) return false

                return true 
            case 2:
                //check if it is register refrece or iot refrence or it is data: (00A: CLA)  or (00A: ION) or (00A: B4C2)

                // check instruction
                if(instructName["reg"].includes(inst[1]) || instructName["iot"].includes(inst[1])) return true

                // check data validation of data  
                if(inst[1].length !== 3) return false 
                for(index = 0 ; index < 3 ; index++) if(!hex.includes(inst[1][index])) return false

                return true 
            default :
                // it is wrong!!!!
                
                return false 
        }
    }
}

module.exports = {
    Instruction ,
    validateInstruction : Instruction.validateInstruction ,
}
