import mongoose from 'mongoose'
import chalk from 'chalk'

export default class MongoDB {
    constructor() {
        this.#connect()
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
                console.log(
                    chalk.green(
                        'MongoDB database ' +
                            (process.env.DB_DATABASE_NAME_DEVELOP! ||
                                process.env.DB_DATABASE_NAME!) +
                            ' connected.'
                    )
                )
            })
            .catch((err: any) => {
                console.error(chalk.red('MongoDB database not connected'))
                throw err
            })
    }
}
