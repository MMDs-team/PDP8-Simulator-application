class Instruction {

    static validateInstruction(inst) {

        // return value status code :
        // 100 : valid instruction 
        // 101 : wrong first address 
        // 102 : wrong second address 
        // 103 : wrong instruction
        // 104 : wrong indirect char 
        // 105 : inst length not enough 

        const instructName = {
            'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
            'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
            'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF']
        }
    
        const hex = '0123456789ABCDEF'

        // check first address
        for(let index = 0 ; index < 3 ; index++) if(!hex.includes(inst[0][index])) return 101
        if(inst[0][3] != ":") return 101 

        switch (inst.length) {
            case 4:
                //check if it is memory reference and the last element is 'I':  (001: ADD 0A2 I)

                // check instruction
                if(!instructName["mem"].includes(inst[1])) return 103

                // check second address
                if(inst[2].length !== 3) return 102 
                for(let index = 0 ; index < 3 ; index++) if(!hex.includes(inst[2][index])) return 102

                // check indirect sign 
                if(inst[3] != "I") return 104 

                return 100 
            case 3:
                //check if it is memory reference and the last element and it is indirect : (001: ADD 0BC)

                // check instruction
                if(!instructName["mem"].includes(inst[1])) return 103

                // check second address
                if(inst[2].length !== 3) return 102
                for(let index = 0 ; index < 3 ; index++) if(!hex.includes(inst[2][index])) return 102

                return 100 
            case 2:
                //check if it is register reference or iot refrence or it is data: (00A: CLA)  or (00A: ION) or (00A: B4C2)

                // check instruction
                if(instructName["reg"].includes(inst[1]) || instructName["iot"].includes(inst[1])) return 100

                // check data validation of data  
                if(inst[1].length !== 3) return 102 
                for(let index = 0 ; index < 3 ; index++) if(!hex.includes(inst[1][index])) return 102

                return 100 
            default :
                // it is wrong!!!!
                
                return 105
        }
    }
}

module.exports = {
    Instruction ,
    validateInstruction : Instruction.validateInstruction ,
}
