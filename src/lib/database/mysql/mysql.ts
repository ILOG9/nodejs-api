import SequelizeConnection from '../sequelize_connection'
export default class MySQL extends SequelizeConnection {
    constructor() {
        super()
        this.#config()
    }

    #config() {}
}
