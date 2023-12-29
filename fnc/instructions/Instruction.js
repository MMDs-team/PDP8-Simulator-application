class Instruction {

        // return value status code :
        // 100 : valid instruction 
        // 101 : wrong first address 
        // 102 : wrong second address 
        // 103 : wrong instruction
        // 104 : wrong indirect char 
        // 105 : wrong data char 
        // 106 : data length not enough
        // 107 : inst length not enough 

    static validateInstruction(inst) {

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
                if(inst[1].length !== 4) return 106 
                for(let index = 0 ; index < 4 ; index++) if(!hex.includes(inst[1][index])) return 105

                return 100 
            default :
                // it is wrong!!!!
                return 107
        }
    }

    static createCodeLine(inst){
        let codeLine = []
        let labels = {}
        let instLen = inst.length
        let lineNumber = parseInt(inst[0][1] , 16) ;
        let validateRes = 0 
        let lineLen = 0
        let txtLen = 0
        let hexaNum = 0

        let pushArr = []
        let pushAdd = 0

        for(let index = 1 ; index < instLen - 1 ; index++){
            validateRes = this.validateCodeLine(inst[index])
            if(validateRes != 100) return {'status' : validateRes , 'assembly': codeLine}
            
            txtLen = inst[index][0].length 
            if(inst[index][0][txtLen - 1] == ','){
                hexaNum = lineNumber.toString(16) ; 
                if(hexaNum.length == 1) hexaNum = "00" + hexaNum
                else if (hexaNum.length == 2) hexaNum = "0" + hexaNum
                labels[inst[index][0].slice(0 , txtLen - 1)] = hexaNum.toUpperCase() ;
            }
            lineNumber += 1 
        }

        lineNumber = parseInt(inst[0][1] , 16) ;

        for(let index = 1 ; index < instLen - 1 ; index++){
            lineLen = inst[index].length 
            pushArr = []

            pushAdd = lineNumber.toString(16) ;
            if(pushAdd.length == 1) pushAdd = "00" + pushAdd + ":"
            else if(pushAdd.length == 2) pushAdd = "0" + pushAdd + ":"
            else pushAdd = pushAdd + ":"
            pushArr.push(pushAdd.toUpperCase())

            
            switch(lineLen){
                case 1:
                    pushArr.push(inst[index][0])
                    break ; 
                case 2:
                    if(inst[index][0][inst[index][0].length - 1] == ','){
                        pushArr.push(inst[index][1])
                    }else{
                        pushArr.push(inst[index][0])
                        pushArr.push(labels[inst[index][1]])
                    }
                    break ;
                case 3:
                    pushArr.push(inst[index][0])
                    pushArr.push(labels[inst[index][1]])
                    pushArr.push(inst[index][2])
                    break ;
                }
            codeLine.push(pushArr)
            lineNumber += 1 
        }
        return {'status' : 100 , 'assembly': codeLine}
    }


    static validateCodeLine(inst){
        
        const instructName = {
            'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
            'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
            'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF'],
        }
    
        const hex = '0123456789ABCDEF'

        switch (inst.length) {
            case 1:
                // this line only can be a register or I/O instruction 

                if(instructName["reg"].includes(inst[0]) || instructName["iot"].includes(inst[0])) return 100
                return 103
            case 2:
                // label, data 
                if(inst[0].length >= 1 && inst[0][inst[0].length - 1] == ','){
                    // check data validation of data  
                    if(inst[1].length !== 4) return 106 
                    for(let index = 0 ; index < 4 ; index++) if(!hex.includes(inst[1][index])) return 105
                    return 100
                }
                // inst label (this line only can be a memory instruction)
                else if(instructName["mem"].includes(inst[0])) return 100 

                return 103              
            case 3:
                // inst label I (this line only can be a memory instruction)
                if(!instructName["mem"].includes(inst[0])) return 103 

                // check indirect char 
                if(inst[2] != "I") return 104 

                return 100
            default :
                // length not enough or to long 
                return 107 
        }
    }
}

module.exports = {
    Instruction ,
    validateInstruction : Instruction.validateInstruction ,
}