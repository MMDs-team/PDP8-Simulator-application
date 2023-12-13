const Instruction = require('./fnc/instructions/Instruction.js')
const Memory = require('./fnc/Memory.js')

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

////////////////////////////////////

const textArea = document.getElementById("exampleTextarea")
const sendBtn = document.getElementById("sendAssem")
let assembelyText = []

const validateAssembly = () => {
    assembelyText.forEach((inst, i) => {
        let instruction = inst.split(' ')
        try {
            Instruction.validateInstruction(inst)
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
        Memory.addToMemory(assembelyText)
    }

})