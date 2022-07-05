import MongoDB from './mongodb/mongodb'
import PostreSQL from './postgresql/postgresql'
import Redis from './redis/redis'
import chalk from 'chalk'
import MySQL from './mysql/mysql'
import SQLServer from './sqlserver/sqlserver'
import MariaDB from './mariadb/mariadb'
import SequelizeConnection from './sequelize_connection'

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
                    this.sequelizeConnection = new PostreSQL()
                },
                mysql: () => {
                    this.sequelizeConnection = new MySQL()
                },
                mssql: () => {
                    this.sequelizeConnection = new SQLServer()
                },
                mariadb: () => {
                    this.sequelizeConnection = new MariaDB()
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
