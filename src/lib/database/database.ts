import MongoDB from './mongodb/mongodb'
import Redis from './redis/redis'
import chalk from 'chalk'
import SequelizeManager from './sequelize/sequelize_manager'
import SequelizeConnection from './sequelize/sequelize_connection'

export default class Database {
    sequelizeConnection?: SequelizeConnection

    constructor() {}

    /*
     *   Iniciamos la base de datos configurada
     */
    async init() {
        try {
            const defaultDB = 'default'
            const databases: any = {
                mongo: () => {
                    new MongoDB()
                },
                redis: () => {
                    new Redis()
                },
                postgres: () => {
                    this.sequelizeConnection = new SequelizeManager()
                },
                mysql: () => {
                    this.sequelizeConnection = new SequelizeManager()
                },
                mssql: () => {
                    this.sequelizeConnection = new SequelizeManager()
                },
                mariadb: () => {
                    this.sequelizeConnection = new SequelizeManager()
                },
                default: () => {
                    console.log(chalk.red('Unselected Database'))
                },
            }
            databases[process.env.DB_CONNECTION || defaultDB]()
        } catch (err: any) {
            console.error(err)
        }
    }
}
