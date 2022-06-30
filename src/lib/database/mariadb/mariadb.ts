import SequelizeConnection from '../sequelize_connection'
export default class MariaDB extends SequelizeConnection {
    constructor() {
        super()
        this.#config()
    }

    #config() {}
}
