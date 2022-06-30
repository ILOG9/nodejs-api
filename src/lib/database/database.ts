import MongoDB from './mongodb/mongodb'
import PostreSQL from './postgresql/postgresql'
import Redis from './redis/redis'
import chalk from 'chalk'
import MySQL from './mysql/mysql'
import SQLServer from './sqlserver/sqlserver'
import MariaDB from './mariadb/mariadb'
export default class Database {
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
                postgres: () => {
                    new PostreSQL()
                },
                redis: () => {
                    new Redis()
                },
                mysql: () => {
                    new MySQL()
                },
                mssql: () => {
                    new SQLServer()
                },
                mariadb: () => {
                    new MariaDB()
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
