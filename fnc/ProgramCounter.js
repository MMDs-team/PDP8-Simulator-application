


class ProgramCounter {

    static #mem = 0;

    static load(val) {
        this.#mem = val & ((1<<12) -1)
    }

    static increment() {
        const value = this.#mem + 1
        this.load(value)
    }

    static clear() {
        this.#mem = 0
    }

    static get() {
        return this.#mem
    }


}

module.exports = ProgramCounter;