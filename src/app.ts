import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import dotenv from 'dotenv'
import express, { Express } from 'express'
import ModuleAutoloader from './lib/module-core/module-autoloader'
import Database from './lib/database/database'
import { routeModules } from './config/route-modules'
import { corsConfig } from './config/cors-config'

/**
 * Clase contenedora de la aplicación, tanto el servidor como las configuraciones, carga de datos y módulos,
 * distintas inicializaciones y en general la clase que será puesta a escuchar en el servidor.
 */
export default class App {
    app: Express = express()

    constructor() {
        this.#config()
    }

    async init() {
        await this.#initModules()
        await this.#initDatabase()
    }

    #config() {
        this.app.use(express.urlencoded({ extended: true }))
        this.app.use(express.json())
        this.app.use(cors(corsConfig))
        this.app.use(helmet())
        dotenv.config()
        if (process.env.APP_DEBUG! == 'true') {
            this.app.use(
                morgan(
                    ':remote-addr :method :url :status :res[content-length] - :response-time ms - [:date[clf]]'
                )
            )
        }
    }

    async #initModules() {
        await new ModuleAutoloader().loadModules(this.app, routeModules())
    }

    async #initDatabase() {
        await new Database().init()
    }
}
