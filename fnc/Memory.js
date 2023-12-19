
const Instruction = require('./instructions/Instruction.js')
const PDP = require('./PDP.js')


class Memory {
    
    static instOpcode = {
        'AND': [ '0', '8' ],
        'ADD': [ '1', '9' ],
        'LDA': [ '2', 'A' ], 
        'STA': [ '3', '8' ],
        'BUN': [ '4', 'B' ],
        'BSA': [ '5', 'C' ],
        'ISZ': [ '6', 'D' ],
        
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

        'INP': 'F800',
        'OUT': 'F400',
        'SKI': 'F200',
        'SKO': 'F100',
        'ION': 'F080',
        'IOF': 'F040',
    }
    
    static addToMemory(instructions) {
        let amount = 0;
        instructions.forEach((inst, i) => {
            let instruction = inst.split(' ')
            // convert a 4 carachter address to a decimal
            let address = Tools.HexStringToDecimal(instruction[0])
            let value = ''
            // if it is memeory refrefrece
            if (Instruction.instructName['mem'].includes(instruction[1])) {
                if (instruction[3]==='I')
                    value = this.instOpcode[instruction[1]][1] + instruction[2]
                else
                    value = this.instOpcode[instruction[1]][0] + instruction[2]
            } else if (Instruction.instructName['reg'].includes(instruction[1])) { // if it is register refrence
                value = this.instOpcode[instruction[1]]
            } else if (Instruction.instructName['iot'].includes[instruction[1]]) { // if it is input output refrence
                value = this.instOpcode[instruction[1]]
            } else {// if it is data
                value = instruction[1]
            } 
            amount = parseInt(value, 16)
            
        })
        PDP.setMem(address, amount)
    }

    static sayHi() {
        return "Hiii!!"
    }
    
}

module.exports = {
    Memory, 
    addToMemory: Memory.addToMemory, 
    sayHi: Memory.sayHi
}

