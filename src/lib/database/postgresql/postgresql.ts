import SequelizeConnection from '../sequelize_connection'
export default class PostreSQL extends SequelizeConnection {
    constructor() {
        super()
        this.#config()
    }

    #config() {}
}
