import SequelizeConnection from './sequelize_connection'
export default class SequelizeManager extends SequelizeConnection {
    constructor() {
        super()
        this.#config()
    }

    #config() {}
}
