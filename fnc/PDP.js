const ProgramCounter = require('./ProgramCounter.js');
const MemoryReference = require('./instructions/MemoryReference.js');
const ArithmeticLogical = require('./instructions/ArithmeticLogical.js');
const IOT = require('./instructions/IOT.js');
const {IEN, IF, OF, INPR, OUTR} = require('./Register.js')

module.exports.PDP = class PDP {

    static #memory = new Array(4096).fill(0);

    static isOn = true

    static #AR = 0

    static #DR = 0

    static singInst = false

    static singStep = false

    static R = false

    static getMem(i) { return this.#memory[i] }

    static setMem(i, value) { this.#memory[i] = value }

    static getAR() { return this.#AR }

    static getDR() { return this.#DR }

    static setAR(value) { this.#AR = value }

    static setDR(value) { this.#DR = value }

    static start() {
        let IR = this.getMem(ProgramCounter.get())
        this.decode(IR)
        if (R) {
            this.interrupt()
            return
        }
        ProgramCounter.increment()
        if (this.isOn && !this.singInst) this.start()
    }

    static interrupt() {
        IEN.setMem(false)
        this.R = false
        this.setMem(0, ProgramCounter.get())
        ProgramCounter.setMem(0)
        this.start()
    }

    static decode(IR) {
        let I = IR & (1 << 15)
        let d = (IR & ~(1 << 15)) >> 12
        let address = IR & ~((1 << 12) - 1)

        if (IEN.getMem() && (OF.getMem() || IF.getMem())) this.R = true

        if (d !== 7 && I === 1) address = this.getMem(address) & ~((1 << 12) - 1)
        switch (d) {
            case 0:
                MemoryReference.AND()
                break;
            case 1:
                MemoryReference.ADD()
                break;
            case 2:
                MemoryReference.LDA()
                break;
            case 3:
                MemoryReference.STA()
                break;
            case 4:
                MemoryReference.BUN()
                break;
            case 5:
                MemoryReference.BSA()
                break;
            case 6:
                MemoryReference.ISZ()
                break;
            case 7:
                const upCode = IR & ((1 << 12) - 1)
                if (I) {
                    switch (upCode) {
                        case 1 < 11:
                            IOT.INP()
                            break;
                        case 1 < 10:
                            IOT.OUT()
                            break;
                        case 1 << 9:
                            IOT.SKI()
                            break;
                        case 1 << 8:
                            IOT.SKO()
                            break;
                        case 1 << 7:
                            IOT.ION()
                            break;
                        case 1 << 6:
                            IOT.IOF()
                            break;
                        default:
                            console.log('error while decodeing !!!!')
                            break;
                    }
                } else {
                    switch (upCode) {
                        case 1 < 11:
                            ArithmeticLogical.CLA()
                            break;
                        case 1 < 10:
                            ArithmeticLogical.CLE()
                            break;
                        case 1 << 9:
                            ArithmeticLogical.CMA()
                            break;
                        case 1 << 8:
                            ArithmeticLogical.CME()
                            break;
                        case 1 << 7:
                            ArithmeticLogical.CIR()
                            break;
                        case 1 << 6:
                            ArithmeticLogical.CIL()
                            break;
                        case 1 << 5:
                            ArithmeticLogical.INC()
                            break;
                        case 1 << 4:
                            ArithmeticLogical.SPA()
                            break;
                        case 1 << 3:
                            ArithmeticLogical.SNA()
                            break;
                        case 1 << 2:
                            ArithmeticLogical.SZA()
                            break;
                        case 1 << 1:
                            ArithmeticLogical.SZE()
                            break;
                        case 1:
                            ArithmeticLogical.HLT()
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
