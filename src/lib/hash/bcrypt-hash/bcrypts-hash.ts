import bcrypt from 'bcrypt'

/**
 * Algoritmo de hashing bcrypt
 *
 * {@link https://www.npmjs.com/package/bcrypt | https://www.npmjs.com/package/bcrypt}
 */
export default class BcryptHash {
    /**
     * Salt y rounds integrados
     * Salt = cadena de texto diseñada para m'axima aleatoriedad
     * Rounds = Cantidad de saltos en el algoritmo de hashing, a más cantidad más seguridad.
     */
    #saltRounds: number

    /**
     * Cantidad de saltrounds a hashear.
     *
     * @param saltRounds
     */
    constructor(saltRounds: number = 8) {
        this.#saltRounds = saltRounds
    }

    /**
     * Creamos un hash a partir de una entrada en formato string.
     *
     * @param stringToHash - Cadena de string a transformar en hash.
     * @returns Promise<string | Error>
     */
    async createHash(stringToHash: string): Promise<string> {
        let payload: string
        await bcrypt
            .hash(stringToHash, this.#saltRounds)
            .then(function (hash) {
                payload = hash
            })
            .catch(function (error) {
                throw error
            })
        return payload!
    }

    /**
     * Transformamos un string a hash y luego comparamos si es correcto contra el hash de verificación.
     *
     * @param stringToHash - cadena de texto a comparar
     * @param hash - hash con el que comparar
     * @returns Promise<boolean | Error>
     */
    async compareHash(stringToHash: string, hash: string): Promise<boolean> {
        let payload: boolean

        await bcrypt
            .compare(stringToHash, hash)
            .then(function (response) {
                payload = response
            })
            .catch(function (error) {
                throw error
            })
        return payload!
    }
}
