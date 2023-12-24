


class ProgramCounter {

    static #mem = 0;

    static load(ref) {
        this.#mem = ref
    }

    static increment() {
        this.#mem = this.#mem + 1
    }

    static clear() {
        this.#mem = 0
    }

    static get() {
        return this.#mem
    }


}

module.exports = ProgramCounter;