
const PDP = require('./PDP.js')


class Memory {

    static findValue(inst) {
        const instOpcode = {
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

        const instructName = {
            'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
            'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
            'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF']
        }
        
        let instruction = inst.split(' ')
        // convert a 4 carachter address to a decimal
        const address = parseInt(instruction[0].slice(0,-1), 16)
        let value = ''
        // if it is memeory reference
        if (instructName['mem'].includes(instruction[1])) {
            if (instruction[3]==='I')
                value = instOpcode[instruction[1]][1] + instruction[2]
            else
                value = instOpcode[instruction[1]][0] + instruction[2]
        } else if (instructName['reg'].includes(instruction[1])) { // if it is register reference
            value = instOpcode[instruction[1]]
        } else if (instructName['iot'].includes[instruction[1]]) { // if it is input output reference
            value = instOpcode[instruction[1]]
        } else {// if it is data
            value = instruction[1]
        } 
        const answer = [address, parseInt(value, 16), value]
        return answer
    }

    
    static getBinHex(instructions) {
        let answer = new Array(instructions.length)
        instructions.forEach((inst, i) => {
            const [address, amount, value] = this.findValue(inst)
            answer[i] = {
                'dec': amount, 
                'bin': '0'.repeat(16 - amount.toString(2).slice(-16).length) + amount.toString(2).slice(-16),
                'hex': value,
                'address': address,
            }
        })
        return answer
    }
    
    static addToMemory(instructions) {        
        instructions.forEach((inst, i) => {
            const [address, amount, value] = this.findValue(inst)
            
            PDP.PDP.setMem(address, amount)
        })
    }

}

module.exports = {
    Memory, 
    addToMemory: Memory.addToMemory,
    getBinHex: Memory.getBinHex,
}

