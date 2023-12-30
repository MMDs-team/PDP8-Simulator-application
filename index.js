///////////////////////////////////////////

const labelItems = document.querySelectorAll(".label--item")
const items = document.querySelectorAll(".left--part")

const textArea = document.getElementById("exampleTextarea")
const sendBtn = document.getElementById("sendAssem")
const fileInput = document.getElementById("formFile")
let assembelyText = []

const acNibbles = document.querySelectorAll(".ac--box .nibble-box")
const pcNibbles = document.querySelectorAll(".pc--box .nibble-box")
const inpNibbles = document.querySelectorAll(".inp--box .nibble-box")
const outNibbles = document.querySelectorAll(".out--box .nibble-box")

const E = document.querySelector('.e--box .e-inner-box')
const IEN = document.querySelector(".ien-box")
const IF = document.querySelector(".if-box")
const OF = document.querySelector(".of-box")

const PCLights = document.querySelectorAll(".pc-lights span")
const ARLights = document.querySelectorAll(".ar-lights span")
const DRLights = document.querySelectorAll(".dr-lights span")
const ACLights = document.querySelectorAll(".ac-lights span")

const switchesVal = document.querySelectorAll(".switch-vl")
const switchesCon = document.querySelectorAll(".switch-control")

const binaryText = document.querySelector(".binary--text")

const instructionWrapper = document.querySelector(".instructions-wrappper")
const currentBtn = document.querySelector(".current-btn")
const upBtn = document.querySelector(".up-btn")
const downBtn = document.querySelector(".down-btn")
const jumpBtn = document.querySelector(".jump-btn")
const addressInput = document.querySelector(".address-inp")

const power = document.querySelector("#power")
const pannelLock = document.querySelector("#pannel-lock")

const InpInput = document.querySelector(".inp-inp")
const inpInputBtn = document.querySelector(".input--label")

let valueSwitches = [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]
let controlSwitches = [0,0,0,0, 0,0,0,0]
let currentMemoryIndex = 0
let ispowered = true
let switchLock = false

const getPcToStart = () => {
    let start = window.api.getProgramCounterMem()
    start = start > 3 ? start - 4 : 0
    return start
}


const updateLights = (registersValues) => {
    const PCVlue = registersValues.pc.bin.split("").reverse().join("");
    for (let i = 0; i < 12; i++) {
        if (PCVlue[i] === '1' && !PCLights[i].classList.contains("active-light"))
            PCLights[i].classList.add("active-light")
        else if (PCVlue[i] === '0' && PCLights[i].classList.contains("active-light"))
            PCLights[i].classList.remove("active-light")
    }

    const ARVlue = registersValues.ar.bin.split("").reverse().join("");
    for (let i = 0; i < 12; i++) {
        if (ARVlue[i] === '1' && !ARLights[i].classList.contains("active-light"))
            ARLights[i].classList.add("active-light")
        else if (ARVlue[i] === '0' && ARLights[i].classList.contains("active-light"))
            ARLights[i].classList.remove("active-light")
    }

    const DRVlue = registersValues.dr.bin.split("").reverse().join("");
    for (let i = 0; i < 16; i++) {
        if (DRVlue[i] === '1' && !DRLights[i].classList.contains("active-light"))
            DRLights[i].classList.add("active-light")
        else if (DRVlue[i] === '0' && DRLights[i].classList.contains("active-light"))
            DRLights[i].classList.remove("active-light")
    }

    const ACVlue = registersValues.ac.bin.split("").reverse().join("");
    for (let i = 0; i < 16; i++) {
        if (ACVlue[i] === '1' && !ACLights[i].classList.contains("active-light"))
            ACLights[i].classList.add("active-light")
        else if (ACVlue[i] === '0' && ACLights[i].classList.contains("active-light"))
            ACLights[i].classList.remove("active-light")
    }
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

    E.textContent = registersValues.e.bin  // updating the E register box in hex
    IF.textContent = registersValues.if.bin
    OF.textContent = registersValues.of.bin
    IEN.textContent = registersValues.ien.bin

    updateLights(registersValues)
}


const createPanel = (startAddress) => {
    const end = startAddress+20<4096 ? startAddress+20 : 4096;
    currentMemoryIndex = startAddress
    instructionWrapper.innerHTML = ""
    for (let i = startAddress; i < end; i++) {
        const {data, instruction, isCurrent, address, RTL} = window.api.findWord(i)
        
        let word = document.createElement("div")
        word.className = isCurrent? "instruction active" : "instruction"
        let addressName = document.createElement("div")
        addressName.className = "address-part"
        addressName.innerHTML = address
        let RTLName = document.createElement("div")
        RTLName.className = "RTL--name"
        RTLName.innerHTML = RTL

        instPart = document.createElement("div")
        instPart.className = "inst-part"

        switch (instruction.length) {
            case 3:
                let dirName = document.createElement("div")
                dirName.className = "dir-name text-info"
                dirName.innerHTML = instruction[2]
                instPart.appendChild(dirName)
            case 2:
                let address2Name = document.createElement("div")
                address2Name.className = "address2-name text-warning"
                address2Name.innerHTML = instruction[1]
                instPart.appendChild(address2Name)
            case 1:
                let instName = document.createElement("div")
                instName.className = "inst-name text-primary"
                instName.innerHTML = instruction[0]
                instPart.appendChild(instName)
            case 0:
                let dataPart = document.createElement("div")
                dataPart.className = "data-part text-success"
                dataPart.innerHTML = data
                word.appendChild(addressName)
                word.appendChild(dataPart)
                break;
            default:
                console.log('instructioin does not exist!!!!!')
                break;
        }
            
        if (instPart.innerHTML!="") {
            word.appendChild(instPart)
        }
        word.appendChild(RTLName)

        word.addEventListener("click", (e)=>{
            if (word.classList.contains("rtl-active")) 
                word.classList.remove("rtl-active")
            else word.classList.add("rtl-active")
        })
    
        instructionWrapper.appendChild(word)
    }
}


const writeBinary = () => {
    binaryText.innerHTML = ""
    assembelyText.forEach((inst, i) => {
        const wrap = document.createElement("div")
        wrap.className = "element-wrap"
        let line = inst.split(" ")
        const label = document.createElement("div")
        label.className = "bin-label"
        label.innerHTML = line[0].slice(0,3)

        line = line.slice(1)
        const binAns = window.api.assemble(line)
        const element = document.createElement("div")
        element.className = "bin-assembeled"
        let ans = binAns.slice(0,4) + " " + binAns.slice(4,8) + " " + binAns.slice(8,12) + " " + binAns.slice(12,16)
        element.innerHTML = ans
        element.appendChild = label
        wrap.appendChild(label)
        wrap.appendChild(element)
        binaryText.appendChild(wrap)
    })
}



const validateAssembly = () => {
    assembelyText.forEach((inst, i) => {
        let instruction = inst.split(' ')
        
        const statuse =  window.api.validateInstruction(instruction)
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

const convertLabelToBasic = (inpTxt) => {
    for (let i = 0; i < inpTxt.length; i++) {
        let line = inpTxt[i].trim()
        while (true) {
            let len = line.length
            line = line.replace("  ", " ")
            if (line.length==len) break
        }
        inpTxt[i] = line.split(" ")
    }

    return window.api.createCodeLine(inpTxt)
}


power.addEventListener("click", (e) => {
    ispowered = !ispowered
    if (ispowered){
        window.api.power()
        power.classList.add("active")
        createPanel(getPcToStart())
        updateRegistersBox()
    } else {
        power.classList.remove("active")
    }
})

pannelLock.addEventListener("click", () => {
    switchLock = !switchLock
    if (switchLock) {
        pannelLock.classList.add("active")
    } else {
        pannelLock.classList.remove("active")
    }
}) 


sendBtn.addEventListener("click", (e) => {
    e.preventDefault()

    assembelyText = textArea.value.split('\n')
    let first = assembelyText[0].trim()
    first = first.split(" ")
    if (first[0]=="ORG") {
        const answer = convertLabelToBasic(assembelyText)
        if (answer.status!==100) return

        for (let i = 0; i < answer.assembly.length; i++) 
            answer.assembly[i] = answer.assembly[i].join(' ')               
        assembelyText = answer.assembly
    }

    if (validateAssembly()) {
        window.api.addToMemory(assembelyText)
        fileInput.value = null
    }

    writeBinary()

    createPanel(getPcToStart())
})

// assembly
let lastLabelItem = labelItems[0]
let lastItem = items[0]

labelItems.forEach((label, i) => {
    label.addEventListener("click", () => {
        if (label.classList.contains("active")) return
        label.classList.add("active")
        lastLabelItem.classList.remove("active")
        items[i].classList.add("active")
        lastItem.classList.remove("active")
        lastItem = items[i]
        lastLabelItem = label
    })
})


switchesVal.forEach((swch, i) => {
    swch.addEventListener("click", (e) => {
        if (switchLock) return
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
        if (switchLock) return
        if (controlSwitches[i] === 0) {
            controlSwitches[i] = 1;
            swch.classList.add("active")
            checkFunc(i)
            createPanel(getPcToStart())
            if (i<6) {
                setTimeout(() => {
                    controlSwitches[i] = 0
                    swch.classList.remove("active")
                }, 300)
            }
        } else {
            if (i>=6) {
                checkFunc(i)
                createPanel(getPcToStart())
            }
            controlSwitches[i] = 0
            swch.classList.remove("active")
        }
    })
})


fileInput.onchange = () => {
    if (fileInput.files.length==0) return
    const selectedFile = fileInput.files[0];
    const reader = new FileReader()

    reader.addEventListener(
        "load",
        () => {
          textArea.value = reader.result;
        },
        false,
      );
    
      if (selectedFile) {
        reader.readAsText(selectedFile);
      }
}

textArea.addEventListener("keyup", () => {
    textArea.value = textArea.value.toUpperCase()
})



// /////////  memory panel ////////////////

currentBtn.addEventListener("click", (e) => {
    let start = window.api.getProgramCounterMem()
    createPanel(start)
})

upBtn.addEventListener("click", (e) => {
    let start = currentMemoryIndex > 0 ? currentMemoryIndex - 1 : 0;
    createPanel(start)
})

downBtn.addEventListener("click", (e) => {
    let start = currentMemoryIndex < 4095 ? currentMemoryIndex + 1 : 4095;
    createPanel(start)
})

jumpBtn.addEventListener("click", (e) => {
    if (addressInput.value=="") return
    let start = parseInt(addressInput.value, 16)
    if (start<0) start = 0
    if (start>4095) start = 4095
    createPanel(start)
})

inpInputBtn.addEventListener("click", (e) => {
    const value = InpInput.value.toUpperCase()
    const ans = window.api.assignToINPR(value)
    console.log(ans)
    if (!ans) // show alert
    updateRegistersBox()
})

updateRegistersBox()
createPanel(getPcToStart())