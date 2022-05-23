export default class ChileanValidator {
    constructor() {}
    /**
     * Verificamos un rut chileno {@link https://validarutchile.cl/calcular-digito-verificador.php | https://validarutchile.cl/calcular-digito-verificador.php}
     *
     * @param chileanRut
     * @returns
     */
    validateChileanRut(chileanRut: string): boolean {
        chileanRut = chileanRut.split('.').join('').split('-').join('')
        const checkDigit: string = chileanRut.substring(chileanRut.length - 1)
        chileanRut = chileanRut.substring(0, chileanRut.length - 1)
        let invertedChileanRut: string = ''
        for (let k = chileanRut.length; 0 < k; k--) {
            invertedChileanRut = invertedChileanRut + chileanRut[k - 1]
        }

        let flag = true
        let multiplier = 2
        let index = 0
        let summation: number = 0
        do {
            multiplier = multiplier == 8 ? 2 : multiplier
            summation =
                summation + parseInt(invertedChileanRut[index]) * multiplier
            index++
            multiplier++
            flag = !(index == invertedChileanRut.length)
        } while (flag)

        const multiplierSplited = (summation / 11).toString().split('.')
        const multipliedValue = parseInt(multiplierSplited[0]) * 11

        let rest = summation - multipliedValue
        if (rest < 0) {
            rest = rest * -1
        }

        let checkDigitCalculated: any = 11 - rest
        checkDigitCalculated =
            checkDigitCalculated == 11 ? 0 : checkDigitCalculated
        checkDigitCalculated =
            checkDigitCalculated == 10 ? 'k' : checkDigitCalculated
        return checkDigit == checkDigitCalculated
    }
}
