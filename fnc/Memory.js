const Word = require('./Word.js');
const PDP = require('./PDP.js');


const textBox = document.getElementById("text-box")
const File = document.getElementById("file-inp")
const sendFile = document.getElementById("send-file")

sendFile.addEventListener("click", () => {
    let text = File.value
    text = text.split('\n')

    text.forEach(t => {
        console.log(t)
        console.log('hello')
    });
})


class Memory extends Word{
    
    

}


