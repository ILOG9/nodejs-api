import SequelizeConnection from '../sequelize_connection'
export default class SQLServer extends SequelizeConnection {
    constructor() {
        super()
        this.#config()
    }

    #config() {}
}
