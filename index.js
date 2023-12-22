///////////////////////////////////////////

const labelItems = document.querySelectorAll(".label--item")
const items = document.querySelectorAll(".left--part")

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

// ////////////example/////////////////////
// const x = document.getElementById("right--pdp")
// x.textContent = window.api.sayHello()
// document.getElementById("right--pdp").textContent = window.api.sayHello()
// document.getElementById("right--pdp").textContent = window.api.sayHi()
// console.log(window.api)
////////////////////////////////


const textArea = document.getElementById("exampleTextarea")
const sendBtn = document.getElementById("sendAssem")
let assembelyText = []

const validateAssembly = () => {
    assembelyText.forEach((inst, i) => {
        let instruction = inst.split(' ')
        try {
            window.api.validateInstruction(inst)
        } catch (error) {
            // alert and return
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



///////////////////////// PDP-8 //////////////////////////

const switchesVal = document.querySelectorAll(".switch-vl")
const switchesCon = document.querySelectorAll(".switch-control")


let valueSwitches = [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]
let controlSwitches = [0,0,0,0, 0,0,0,0]


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
}

switchesVal.forEach((swch, i) => {
    swch.addEventListener("click", (e) => {
        valueSwitches[i] = valueSwitches[i] === 0 ? 1 : 0

        // change the swich shape
    })
})



switchesCon.forEach((swch, i) => {
    swch.addEventListener("click", (e) => {
        controlSwitches[i] = controlSwitches[i] === 0 ? 1 : 0

        // change the switch shape
    })
})



// ////////////////////////////////////////


const acNibbles = document.querySelectorAll(".ac--box .nibble-box")
const pcNibbles = document.querySelectorAll(".pc--box .nibble-box")
const inpNibbles = document.querySelectorAll(".inp--box .nibble-box")
const outNibbles = document.querySelectorAll(".out--box .nibble-box")

const e = document.querySelector('.e--box .e-inner-box')


const updateLights = () => {
    
}


const updateRegistersBox = () => {
    const registersValues = window.api.getRegistersValues()

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


    updateLights()
}

updateRegistersBox()

