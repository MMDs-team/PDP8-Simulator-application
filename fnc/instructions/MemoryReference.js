const { PDP } = require('../PDP.js')
const { AC, E } = require('../Register.js');
const ProgramCounter = require('../ProgramCounter.js');

class MemoryReference {

    static AND() {
        const ACValue = AC.getMem() 
        const DRValue = PDP.getDR() 
        const answer = ACValue & DRValue
        AC.setMem(answer)
    }

    static ADD() {
        const ACValue = AC.getMem() 
        const DRValue = PDP.getDR() 
        const answer = ACValue + DRValue 
        AC.setMem(answer)
    }

    static LDA() {
        const DRValue = PDP.getDR() 
        AC.setMem(DRValue)
    }

    static STA() {
        const ACValue = AC.getMem() 
        const ARValue = PDP.getAR() 
        PDP.setMem(ARValue , ACValue)
    }

    static BUN() { 
        const DRValue = PDP.getDR() 
        ProgramCounter.load(DRValue) 
    }

    static BSA() {
        var ARValue = PDP.getAR() 
        const PCValue = ProgramCounter.get()
        PDP.setMem(ARValue , PCValue)
        ARValue += 1 
        PDP.setAR(ARValue)
        ProgramCounter.load(ARValue)
    }

    static ISZ() {
        const ARValue = PDP.getAR()
        const DRValue = PDP.getDR() + 1
        PDP.setDR(DRValue)
        PDP.setMem(ARValue , DRValue) 
        if(DR == 0) ProgramCounter.increment() 
    }
}

module.exports = MemoryReference ;