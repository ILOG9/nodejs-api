import { Sequelize } from 'sequelize'
import chalk from 'chalk'

type databases = 'mysql' | 'mariadb' | 'postgres' | 'mssql'

export default abstract class SequelizeConnection {
    sequelize: Sequelize
    #databases: any = {
        mysql: ['mysql', 'MySQL'],
        mariadb: ['mariadb', 'MariaDB'],
        postgres: ['postgres', 'PostgreSQL'],
        mssql: ['mssql', 'Microsoft SQL Server'],
    }

    constructor() {
        try {
            this.sequelize = new Sequelize(
                process.env.DB_DATABASE_NAME_DEVELOP! ||
                    process.env.DB_DATABASE_NAME!,
                process.env.DB_USERNAME!,
                process.env.DB_PASSWORD!,
                {
                    host: process.env.DB_HOST!,
                    dialect: this.#databases[process.env.DB_CONNECTION!][0],
                    pool: {
                        max: 5,
                        min: 0,
                        idle: 5000,
                    },
                }
            )
        } catch (err: any) {
            throw err
        }
    }

    testConnetion() {
        if (this.sequelize) {
            console.log(
                chalk.green(
                    this.#databases[process.env.DB_CONNECTION!][1] +
                        ' database ' +
                        (process.env.DB_DATABASE_NAME_DEVELOP! ||
                            process.env.DB_DATABASE_NAME!) +
                        ' connected.'
                )
            )
        } else {
            console.log(
                chalk.red(
                    this.#databases[process.env.DB_CONNECTION!][1] +
                        ' database not connected'
                )
            )
        }
    }
}
