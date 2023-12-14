const HEX_BASE = 16

class Tools {
    static toBin() { }

    static addressStringToDecimal(address) {}

    static HexStringToDecimal(toConvert) {
        let value = 0
        let multiplier = 1
        for (let i = toConvert.length - 1; i >= 0; i--, multiplier *= HEX_BASE)
            value += Number(toConvert[i]) * multiplier

        return value
    }
}


module.exports = Tools;
