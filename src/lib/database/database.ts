import MongoDB from './mongodb/mongodb'
import PostreSQL from './postgresql/postgresql'
import Redis from './redis/redis'
import chalk from 'chalk'
export default class Database {
    constructor() {}

    /*
     *   Iniciamos la base de datos configurada
     */
    async init() {
        try {
            const defaultDB = 'default'
            const databases: any = {
                mongo: async () => {
                    await new MongoDB().init()
                },
                postresql: async () => {
                    await new PostreSQL().init()
                },
                redis: async () => {
                    await new Redis().init()
                },
                default: async () => {
                    console.log(chalk.red('Unselected Database'))
                },
            }
            await databases[process.env.DB_CONNECTION || defaultDB]()
        } catch (err: any) {
            console.error(err)
        }
    }
}
