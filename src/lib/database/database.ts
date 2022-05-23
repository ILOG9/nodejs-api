import MongoDB from './mongodb/mongodb'
export default class Database {
    constructor() {}

    /*
     *   Iniciamos la base de datos configurada
     */
    async init() {
        switch (process.env.DB_CONNECTION) {
            case 'mongo':
                await new MongoDB().init()
                break
        }
    }
}
