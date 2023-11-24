

class Word{
    #mem = 0;

    setMem(newMem) {
        this.#mem = newMem
    }

    getMem() { return this.#mem;}
    
}

module.exports = Word;
