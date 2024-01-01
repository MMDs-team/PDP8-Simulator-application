const PDP = require('../PDP.js')
const { AC, E } = require('../Register.js');
const ProgramCounter = require('../ProgramCounter.js');

class MemoryReference {

    static AND() {
        const ACValue = AC.getMem() 
        const DRValue = PDP.PDP.getDR() 
        const answer = ACValue & DRValue
        AC.setMem(answer)
    }

    static ADD() {
        const ACValue = AC.getMem() 
        const DRValue = PDP.PDP.getDR() 
        const answer = ACValue + DRValue 
        AC.setMem(answer)
    }

    static LDA() {
        const DRValue = PDP.PDP.getDR() 
        AC.setMem(DRValue)
    }

    static STA() {
        const ACValue = AC.getMem() 
        const ARValue = PDP.PDP.getAR() 
        PDP.PDP.setMem(ARValue , ACValue)
    }

    static BUN() { 
        const ARValue = PDP.PDP.getAR() 
        ProgramCounter.load(ARValue - 1) 
    }

    static BSA() {
        var ARValue = PDP.PDP.getAR() 
        const PCValue = ProgramCounter.get()
        PDP.PDP.setMem(ARValue , PCValue + 1)
        PDP.PDP.setAR(ARValue)
        ProgramCounter.load(ARValue)
    }

    static ISZ() {
        const ARValue = PDP.PDP.getAR()
        const DRValue = PDP.PDP.getDR() + 1
        PDP.PDP.setDR(DRValue)
        PDP.PDP.setMem(ARValue , DRValue) 
        if(PDP.PDP.getDR() == 0) ProgramCounter.increment() 
    }
}

module.exports = MemoryReference ;