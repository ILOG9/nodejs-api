import winston from 'winston'

export default class Logger {
    static #logger: winston.Logger

    private constructor() {}

    static getInstance(): winston.Logger {
        if (!Logger.#logger) {
            Logger.#logger = winston.createLogger({
                level: 'error',
                format: winston.format.json(),
                defaultMeta: { service: 'user-service' },
                transports: [
                    new winston.transports.File({
                        filename: 'error.log',
                        level: 'error',
                    }),
                    new winston.transports.File({
                        filename: 'info.log',
                        level: 'info',
                    }),
                ],
            })
        }
        return Logger.#logger
    }
}
