const ProgramCounter = require('./ProgramCounter.js');
const MemoryReference = require('./instructions/MemoryReference.js');
const ArithmeticLogical = require('./instructions/ArithmeticLogical.js');
const IOT = require('./instructions/IOT.js');
const {AC, E, INPR, OUTR, IEN, IF, OF} = require('./Register.js')

module.exports.PDP = class PDP {

    static #memory = new Array(4096).fill(0);

    static isOn = true

    static #AR = 0

    static #DR = 0

    static singInst = false

    static singStep = false

    static R = false

    static isStop = false

    static setMem(i, value) {
        const val = value & ((1<<16) -1)
        this.#memory[i] = val
    }

    static setAR(value) {
        const val = value & ((1<<12) -1)
        this.#AR = val
    }

    static setDR(value) {
        const val = value & ((1<<16) -1)
        this.#DR = val
    }

    static getMem(i) { return this.#memory[i] }

    static getAR() { return this.#AR }

    static getDR() { return this.#DR }


    static power = () => {
        this.#memory = new Array(4096).fill(0);
        ProgramCounter.load(0)
        AC.setMem(0)
        INPR.setMem(0)
        OUTR.setMem(0)
        IEN.setMem(false)
        E.setMem(false)
        IF.setMem(false)
        OF.setMem(false)
        this.R = false
        this.isOn = true
        this.#AR = 0
        this.#DR = 0
    }

    static start() {
        let IR = this.getMem(ProgramCounter.get())
        if (!this.isOn) return false
        this.decode(IR)
        if (this.R) {
            this.interrupt()
            return true
        }
        ProgramCounter.increment()
        if (!this.isStop && !this.singInst) return true
        return false
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
        let address = IR & ((1 << 12) - 1)

        if (IEN.getMem() && (OF.getMem() || IF.getMem())) this.R = true
        if (d !== 7 && I !== 0) address = this.getMem(address) & ((1 << 12) - 1)
        this.setAR(address)
        this.setDR(PDP.getMem(address))
        
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
                        case 1 << 11:
                            IOT.INP()
                            break;
                        case 1 << 10:
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
                        case 1 << 11:
                            ArithmeticLogical.CLA()
                            break;
                        case 1 << 10:
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
