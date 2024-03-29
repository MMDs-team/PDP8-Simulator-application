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

const acOCT = document.querySelectorAll(".ac--box .oct-box")
const pcOCT = document.querySelectorAll(".pc--box .oct-box")
const acDEC = document.querySelector(".ac--box .dec-box")
const pcDEC = document.querySelector(".pc--box .dec-box")

const acBox = document.querySelectorAll(".ac--box .box-wrap-base")
const pcBox = document.querySelectorAll(".pc--box .box-wrap-base")

const E = document.querySelector('.e--box .e-inner-box')
const IEN = document.querySelector(".ien-box")
const IF = document.querySelector(".if-box")
const OF = document.querySelector(".of-box")

const acLabel = document.querySelector(".ac-label-box .base-label")
const pcLabel = document.querySelector(".pc-label-box .base-label")

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

const notification = document.querySelector('#notification')
const txtNotif = document.querySelector('.txt-notif')
const notifBtn = document.querySelector('.notf-btn')
const wrapHole = document.querySelector('#wrap-hole')

const clockTime = document.querySelector("#clock-time")

let valueSwitches = [0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0, 0,0,0]
let controlSwitches = [0,0,0,0, 0,0,0,0]
let currentMemoryIndex = 0
let ispowered = true
let switchLock = false
let clock = 300

let myInterval;

let currentAcBox = 0
let currentPcBox = 0
const baseName = ['hex', 'oct', 'dec']

acBox.forEach((box,i) => {
    box.addEventListener("click", (e) => {
        acBox[currentAcBox].classList.remove("active")
        currentAcBox = currentAcBox < 2 ? currentAcBox + 1 : 0
        acLabel.textContent = baseName[currentAcBox]
        acBox[currentAcBox].classList.add("active")
    })
})
pcBox.forEach((box,i) => {
    box.addEventListener("click", (e) => {
        pcBox[currentPcBox].classList.remove("active")
        currentPcBox = currentPcBox < 2 ? currentPcBox + 1 : 0
        pcLabel.textContent = baseName[currentPcBox]
        pcBox[currentPcBox].classList.add("active")
    })
})

const getPcToStart = () => {
    let start = window.api.getProgramCounterMem()
    start = start > 3 ? start - 4 : 0
    return start
}

const showAlert = (txt, status, i='assembly') => {
    notification.classList.add('active')
    txtNotif.textContent = `error in [${i}]: ${txt}. [status code:${status}]`
    wrapHole.classList.add('active')
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

    for (let i = 0; i < 6; i++) { // updating the accumulator register box in oct
        acOCT[i].textContent = registersValues.ac.oct[i]
    }

    for (let i = 0; i < 4; i++) { // updating the program counter register box in oct
        pcOCT[i].textContent = registersValues.pc.oct[i]
    }

    acDEC.textContent = registersValues.ac.dec   // updating the accumulator register box in dec
    pcDEC.textContent = registersValues.pc.dec  // updating the program counter register box in dec   
    
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

const replaceSpace = (inp) => {
    let line = inp.trim()
        while (true) {
            let len = line.length
            line = line.replace("  ", " ")
            if (line.length==len) break
        }
    return line
}


const writeBinary = () => {
    binaryText.innerHTML = ""
    assembelyText.forEach((inst, i) => {
        const wrap = document.createElement("div")
        wrap.className = "element-wrap"

        let line = replaceSpace(inst)
        if (line!='') {
            line = line.split(" ")
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
        }
    })
}



const validateAssembly = () => {
    assembelyText.forEach((inst, i) => {
        const instruction = inst.split(' ')
        
        const status =  window.api.validateInstruction(instruction)
        switch (status) {
            case 100:
                break
            case 101:
                showAlert('wrong first address', status, i)
                return false
            case 102:
                showAlert('wrong second address', status, i)
                return false
            case 103:
                showAlert('wrong instruction', status, i)
                return false
            case 104:
                showAlert('wrong indirect char', status, i)
                return false
            case 105:
                showAlert('wrong data char', status, i)
                return false
            case 106:
                showAlert('data length not enough', status, i)
                return false
            case 107:
                showAlert('inst length not enough', status, i)
                return false
            case 108:
                showAlert('label not find', status, i)
                return false
            case 109:
                showAlert('END not find', status, i)
                return false
            default:
                showAlert('error', status, i)
                return false
        }
        
    })
    return true
}

const startFnc = () => {
    let isNotFinished = true
    let st = true
    myInterval = setInterval( () => {
        isNotFinished = window.api.start(st)
        st = false
        createPanel(getPcToStart())
        updateRegistersBox()
        if (!isNotFinished) {
            clearInterval(myInterval)
            myInterval = null
        }
    }, clock)
}


const checkFunc = (switchNumber) => {
    if (!ispowered) return
    switch (switchNumber) {
        case 0: //start
            startFnc()
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
        inpTxt[i] =  replaceSpace(inpTxt[i]).split(" ")
    }

    return window.api.createCodeLine(inpTxt)
}


power.addEventListener("click", (e) => {
    ispowered = !ispowered
    if (ispowered){
        power.classList.add("active")
    } else {
        power.classList.remove("active")
        window.api.power()
        assembelyText = []
        if (myInterval!=null) clearInterval(myInterval)
        createPanel(getPcToStart())
        updateRegistersBox()
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

    textArea.value = textArea.value.trim()
    assembelyText = textArea.value.split('\n')
    for (let i = 0; i < assembelyText.length; i++) 
        assembelyText[i] = replaceSpace(assembelyText[i])
    
    let first = assembelyText[0].trim()
    first = first.split(" ")
    if (first[0]=="ORG") {
        const answer = convertLabelToBasic(assembelyText)
        
        switch (answer.status) {
            case 100:
                break
            case 101:
                showAlert('wrong first address', answer.status)
                return false
            case 102:
                showAlert('wrong second address', answer.status)
                return false
            case 103:
                showAlert('wrong instruction', answer.status)
                return false
            case 104:
                showAlert('wrong indirect char', answer.status)
                return false
            case 105:
                showAlert('wrong data char', answer.status)
                return false
            case 106:
                showAlert('data length not enough', answer.status)
                return false
            case 107:
                showAlert('inst length not enough', answer.status)
                return false
            case 108:
                showAlert('label not find', answer.status)
                return false
            case 109:
                showAlert('END not find', answer.status)
                return false
            default:
                showAlert('error', answer.status)
                return false
        }

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

notifBtn.addEventListener("click", (e)=>{
    notification.classList.remove("active")
    wrapHole.classList.remove("active")
})
wrapHole.addEventListener("click", (e)=>{
    notification.classList.remove("active")
    wrapHole.classList.remove("active")
})

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
    let savedPosition = textArea.selectionEnd
    textArea.value = textArea.value.toUpperCase()
    textArea.selectionEnd = savedPosition
})


let myTimeOut = null;
clockTime.addEventListener("input", (e) => {
    if (myTimeOut!=null) {
        clearTimeout(myTimeOut)
        myTimeOut = null
    }
    let value = e.target.value
    value = value > 5000 ? 5000 : value < 10 ? 10 : value;
    clock = value
    myTimeOut = setTimeout(() => {
        e.target.value = value
        myTimeOut = null
    }, 1000)
})

OF.addEventListener("click", (e) => {
    const val = ~window.api.OFGetMem()
    window.api.OFSetMem(val)
    updateRegistersBox()
})

IF.addEventListener("click", (e) => { 
    const val = ~window.api.IFGetMem() 
    window.api.IFSetMem(val)
    updateRegistersBox()
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
    const amount = parseInt(value, 16)
    window.api.setInputRegister(amount)
    updateRegistersBox()
})

updateRegistersBox()
createPanel(getPcToStart())