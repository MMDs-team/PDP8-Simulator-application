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
        // 108 : label not find
        // 109 : END not find 

        static instructName = {
            'mem': [ 'AND', 'ADD', 'LDA', 'STA', 'BUN', 'BSA', 'ISZ'],
            'reg': [ 'CLA', 'CLE', 'CMA', 'CME', 'CIR', 'CIL', 'INC', 'SPA', 'SNA', 'SZA', 'SZE', 'HLT'],
            'iot': [ 'INP', 'OUT', 'SKI', 'SKO', 'ION', 'IOF']
        }
    
        static hex = '0123456789ABCDEF'

    static validateInstruction(inst) {
        for(let index = 0 ; index < 3 ; index++) if(!Instruction.hex.includes(inst[0][index])) return 101
        if(inst[0][3] != ":") return 101 

        switch (inst.length) {
            case 4:
                if(!Instruction.instructName["mem"].includes(inst[1])) return 103
                if(inst[2].length !== 3) return 102 
                for(let index = 0 ; index < 3 ; index++) if(!Instruction.hex.includes(inst[2][index])) return 102
                if(inst[3] != "I") return 104 
                return 100 
            case 3:
                if(!Instruction.instructName["mem"].includes(inst[1])) return 103
                if(inst[2].length !== 3) return 102
                for(let index = 0 ; index < 3 ; index++) if(!Instruction.hex.includes(inst[2][index])) return 102

                return 100 
            case 2:
                if(Instruction.instructName["reg"].includes(inst[1]) || Instruction.instructName["iot"].includes(inst[1])) return 100
                if(inst[1].length !== 4) return 106 
                for(let index = 0 ; index < 4 ; index++) if(!Instruction.hex.includes(inst[1][index])) return 105
                return 100 
            default :
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

        for(let index = 1 ; index < instLen ; index++){
            validateRes = this.validateCodeLine(inst[index])
            if(validateRes != 100) return {'status' : validateRes , 'assembly': codeLine}
            if(index == instLen - 1) break ;
            
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
                        if(inst[index][1] in labels) pushArr.push(labels[inst[index][1]]) ;
                        else return {'status' : 108 , 'assembly': []}
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

        switch (inst.length) {
            case 1:
                if(inst[0] == "END") return 100
                if(Instruction.instructName["reg"].includes(inst[0]) || Instruction.instructName["iot"].includes(inst[0])) return 100
                return 103
            case 2:
                if(inst[0].length >= 1 && inst[0][inst[0].length - 1] == ','){
                    if(inst[1].length !== 4) return 106 
                    for(let index = 0 ; index < 4 ; index++) if(!Instruction.hex.includes(inst[1][index])) return 105
                    return 100
                }
                else if(Instruction.instructName["mem"].includes(inst[0])) return 100 
                return 103              
            case 3:
                if(!Instruction.instructName["mem"].includes(inst[0])) return 103 
                if(inst[2] != "I") return 104 
                return 100
            default :
                return 107 
        }
    }
}

module.exports = {
    Instruction ,
    validateInstruction : Instruction.validateInstruction ,
}