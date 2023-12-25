///////////////////////////////////////////

const labelItems = document.querySelectorAll(".label--item")
const items = document.querySelectorAll(".left--part")

const textArea = document.getElementById("exampleTextarea")
const sendBtn = document.getElementById("sendAssem")
let assembelyText = []

const acNibbles = document.querySelectorAll(".ac--box .nibble-box")
const pcNibbles = document.querySelectorAll(".pc--box .nibble-box")
const inpNibbles = document.querySelectorAll(".inp--box .nibble-box")
const outNibbles = document.querySelectorAll(".out--box .nibble-box")

const e = document.querySelector('.e--box .e-inner-box')

const PCLights = document.querySelectorAll(".pc-lights span")
const ARLights = document.querySelectorAll(".ar-lights span")
const DRLights = document.querySelectorAll(".dr-lights span")
const ACLights = document.querySelectorAll(".ac-lights span")

const switchesVal = document.querySelectorAll(".switch-vl")
const switchesCon = document.querySelectorAll(".switch-control")

let valueSwitches = [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]
let controlSwitches = [0,0,0,0, 0,0,0,0]



const updateLights = (registersValues) => {
    const PCVlue = registersValues.pc.bin
    for (let i = 0; i < 12; i++) {
        if (PCVlue[i] === '1' && !PCLights[i].classList.contains("active-light"))
            PCLights[i].classList.add("active-light")
        else if (PCVlue[i] === '0' && PCLights[i].classList.contains("active-light"))
            PCLights[i].classList.remove("active-light")
    }

    const ARVlue = registersValues.ar.bin
    for (let i = 0; i < 12; i++) {
        if (ARVlue[i] === '1' && !ARLights[i].classList.contains("active-light"))
            ARLights[i].classList.add("active-light")
        else if (ARVlue[i] === '0' && ARLights[i].classList.contains("active-light"))
            ARLights[i].classList.remove("active-light")
    }

    const DRVlue = registersValues.dr.bin
    for (let i = 0; i < 16; i++) {
        if (DRVlue[i] === '1' && !DRLights[i].classList.contains("active-light"))
            DRLights[i].classList.add("active-light")
        else if (DRVlue[i] === '0' && DRLights[i].classList.contains("active-light"))
            DRLights[i].classList.remove("active-light")
    }

    const ACVlue = registersValues.ac.bin
    for (let i = 0; i < 16; i++) {
        if (ACVlue[i] === '1' && !ACLights[i].classList.contains("active-light"))
            ACLights[i].classList.add("active-light")
        else if (ACVlue[i] === '0' && ACLights[i].classList.contains("active-light"))
            ACLights[i].classList.remove("active-light")
    }
}


const updateRegistersBox = () => {
    const registersValues = window.api.getRegistersValues()
    console.log(registersValues)

    for (let i = 0; i < 4; i++) { // updating the accumulator register box in hex
        acNibbles[i].textContent = registersValues.ac.hex[i]
    }

    for (let i = 0; i < 3; i++) { // updating the program counter register box in hex
        pcNibbles[i].textContent = registersValues.pc.hex[i]
    }

    for (let i = 0; i < 2; i++) { // updating the input register box in hex
        inpNibbles[i].textContent = registersValues.inp.hex[i]
    }

    for (let i = 0; i < 2; i++) { // updating the output register box in hex
        outNibbles[i].textContent = registersValues.out.hex[i]
    }

    e.textContent = registersValues.e.hex  // updating the E register box in hex


    updateLights(registersValues)
}



labelItems[0].addEventListener("click", () => {
    if (labelItems[0].classList.contains("active")) return
    labelItems[0].classList.add("active")
    labelItems[1].classList.remove("active")
    items[0].classList.add("active")
    items[1].classList.remove("active")
})

labelItems[1].addEventListener("click", () => {
    if (labelItems[1].classList.contains("active")) return
    labelItems[1].classList.add("active")
    labelItems[0].classList.remove("active")
    items[1].classList.add("active")
    items[0].classList.remove("active")
})



const validateAssembly = () => {
    assembelyText.forEach((inst, i) => {
        let instruction = inst.split(' ')
        
        const statuse =  window.api.validateInstruction(inst)
        switch (statuse) {
            case 100:
                return true
            case 101:
                // show allert
                return false
            case 102:
                // show allert
                return false
            case 103:
                // show allert
                return false
            case 104:
                // show allert
                return false
            case 105:
                // show allert
                return false
            default:
                return false
        }
        
    })
    return true
}


sendBtn.addEventListener("click", (e) => {
    e.preventDefault()

    assembelyText = textArea.value.splite('\n')
    if (validateAssembly()) {
        window.api.addToMemory(assembelyText)
    }
})

const checkFunc = (switchNumber) => {
    switch (switchNumber) {
        case 0: //start
            window.api.start()
            break;
        case 1: // load address
            window.api.loadAdd(valueSwitches)
            break;
        case 2: // deposit
            window.api.deposit(valueSwitches)
            break;
        case 3: // examinate
            window.api.examinate()
            break;
        case 4: // continue
            window.api.continueSw()
            break;
        case 5: // stop
            window.api.stop()
            break;
        case 6: // sing step
            window.api.singStep()
            break;
        case 7: // sing inst
            window.api.singInst()
            break;
        default: 
            break;
    }
    updateRegistersBox()
}

switchesVal.forEach((swch, i) => {
    swch.addEventListener("click", (e) => {
        if (valueSwitches[i] === 0) {
            valueSwitches[i] = 1;
            swch.classList.add("active")
        } else {
            valueSwitches[i] = 0
            swch.classList.remove("active")
        }
    })
})



switchesCon.forEach((swch, i) => {
    swch.addEventListener("click", (e) => {
        if (controlSwitches[i] === 0) {
            controlSwitches[i] = 1;
            swch.classList.add("active")
            checkFunc(i)
        } else {
            controlSwitches[i] = 0
            swch.classList.remove("active")
        }
    })
})


updateRegistersBox()
