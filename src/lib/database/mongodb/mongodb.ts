import mongoose from 'mongoose'
import chalk from 'chalk'

export default class MongoDB {
    constructor() {}

    async init() {
        await this.#connect()
    }

    async #connect() {
        await mongoose
            .connect(
                'mongodb://' +
                    process.env.DB_HOST +
                    '/' +
                    process.env.DB_DATABASE_NAME
            )
            .then(() => {
                console.log(chalk.green('Mongodb database connected'))
            })
            .catch((err: any) => {
                console.error(chalk.red('Mongodb database not connected'))
                throw err
            })
    }
}
