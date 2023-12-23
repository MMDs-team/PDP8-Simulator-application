const ProgramCounter  = require('./ProgramConter.js');
const {Instruction} = require('./instructions/Instruction.js');
const MemoryRefrence = require('./instructions/MemoryRefrence.js');
const ArithmeticLogical = require('./instructions/ArithmeticLogical.js');
const IOT = require('./instructions/IOT.js');

class PDP{

   static #memory = new Array(4096).fill(0);

   static getMem(i) { return this.#memory[i]}
   
   static setMem(i,value)  { this.#memory[i] = value }
    
}

class Control {
    isOn = false

    static start() {
        let IR = PDP.getMem(ProgramCounter.get())
        this.decode(IR)
        ProgramCounter.increment()
        if (isOn) this.start()
    }

    static decode(IR) {
        let I = IR & (1 << 15)
        let d = (IR & ~(1<<15)) >> 12
        let address = IR & ~( (1<<12)-1 )
        let instruction = new Object();

        if (d!==7 && I===1) address = PDP.getMem(address) & ~( (1<<12)-1 )
        
        switch (d) {
            case 0:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.AND()
                break;
            case 1:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.ADD()
                break;
            case 2:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.LDA() 
                break;
            case 3:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.STA()           
                break;
            case 4:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.BUN()         
                break;
            case 5:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.BSA()            
                break;
            case 6:
                instruction = new MemoryRefrence(address, PDP.getMem(address))
                instruction.ISZ()         
                break;
            case 7:
                const upCode = PDP.getMem(address) & ~( (1<<12)-1 )
                if (I) {
                    switch (upCode) {
                        case 1<11:
                            instruction = new IOT()
                            instruction.INP()
                            break;
                        case 1<10:
                            instruction = new IOT()
                            instruction.OUT()
                            break;
                        case 1<<9:
                            instruction = new IOT()
                            instruction.SKI()
                            break;
                        case 1<<8:
                            instruction = new IOT()
                            instruction.SKO()
                            break;
                        case 1<<7:
                            instruction = new IOT()
                            instruction.ION()
                            break;
                        case 1<<6:
                            instruction = new IOT()
                            instruction.IOF()
                            break;
                        default:
                            console.log('error while decodeing !!!!')
                            break;
                    }
                } else {
                    switch (upCode) {
                        case 1<11:
                            instruction = new ArithmeticLogical()
                            instruction.CLA()
                            break;
                        case 1<10:
                            instruction = new ArithmeticLogical()
                            instruction.CLE()
                            break;
                        case 1<<9:
                            instruction = new ArithmeticLogical()
                            instruction.CMA()
                            break;
                        case 1<<8:
                            instruction = new ArithmeticLogical()
                            instruction.CME()
                            break;
                        case 1<<7:
                            instruction = new ArithmeticLogical()
                            instruction.CIR()
                            break;
                        case 1<<6:
                            instruction = new ArithmeticLogical()
                            instruction.CIL()
                            break;
                        case 1<<5:
                            instruction = new ArithmeticLogical()
                            instruction.INC()
                            break;
                        case 1<<4:
                            instruction = new ArithmeticLogical()
                            instruction.SPA()
                            break;
                        case 1<<3:
                            instruction = new ArithmeticLogical()
                            instruction.SNA()
                            break;
                        case 1<<2:
                            instruction = new ArithmeticLogical()
                            instruction.SZA()
                            break;
                        case 1<<1:
                            instruction = new ArithmeticLogical()
                            instruction.SZE()
                            break;
                        case 1:
                            instruction = new ArithmeticLogical()
                            instruction.HLT()
                            break;
                        default:
                            console.log('error while decodding!!')
                            break;
                    }
                }
                break;
        
            default:
                console.log('error while decodeing!!!')
                break;
        }

    }
}

