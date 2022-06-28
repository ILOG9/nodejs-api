import { Request, Response } from 'express'
import IResourceController from '../../../lib/module-core/interfaces/i_resource_controller'
import chalk from 'chalk'
import MongoDBResourceController from './mongodb/mongodb_resource_controller'
import PostreSQLResourceController from './postgresql/postgresql_resource_controller'
import RedisResourceController from './redis/redis_resource_controller'

export default class RouteController implements IResourceController {
    #mongoDBResourceController: MongoDBResourceController =
        new MongoDBResourceController()

    #postreSQLResourceController: PostreSQLResourceController =
        new PostreSQLResourceController()

    #redisResourceController: RedisResourceController =
        new RedisResourceController()
    constructor() {}

    create = async (request: Request, response: Response) => {
        const defaultDB = 'default'
        const databases: any = {
            mongo: () => {
                this.#mongoDBResourceController.create(request, response)
            },
            postresql: () => {
                this.#postreSQLResourceController.create(request, response)
            },
            redis: () => {
                this.#redisResourceController.create(request, response)
            },
            default: () => {
                console.log(chalk.red('Unselected Database'))
            },
        }
        databases[process.env.DB_CONNECTION || defaultDB]()
    }

    show = async (request: Request, response: Response) => {
        const defaultDB = 'default'
        const databases: any = {
            mongo: () => {
                this.#mongoDBResourceController.show(request, response)
            },
            postresql: () => {
                this.#postreSQLResourceController.show(request, response)
            },
            redis: () => {
                this.#redisResourceController.show(request, response)
            },
            default: () => {
                console.log(chalk.red('Unselected Database'))
            },
        }
        databases[process.env.DB_CONNECTION || defaultDB]()
    }

    modify = async (request: Request, response: Response) => {
        const defaultDB = 'default'
        const databases: any = {
            mongo: () => {
                this.#mongoDBResourceController.modify(request, response)
            },
            postresql: () => {
                this.#postreSQLResourceController.modify(request, response)
            },
            redis: () => {
                this.#redisResourceController.modify(request, response)
            },
            default: () => {
                console.log(chalk.red('Unselected Database'))
            },
        }
        databases[process.env.DB_CONNECTION || defaultDB]()
    }

    list = async (request: Request, response: Response) => {
        const defaultDB = 'default'
        const databases: any = {
            mongo: () => {
                this.#mongoDBResourceController.list(request, response)
            },
            postresql: () => {
                this.#postreSQLResourceController.list(request, response)
            },
            redis: () => {
                this.#redisResourceController.list(request, response)
            },
            default: () => {
                console.log(chalk.red('Unselected Database'))
            },
        }
        databases[process.env.DB_CONNECTION || defaultDB]()
    }

    delete = async (request: Request, response: Response) => {
        const defaultDB = 'default'
        const databases: any = {
            mongo: () => {
                this.#mongoDBResourceController.delete(request, response)
            },
            postresql: () => {
                this.#postreSQLResourceController.delete(request, response)
            },
            redis: () => {
                this.#redisResourceController.delete(request, response)
            },
            default: () => {
                console.log(chalk.red('Unselected Database'))
            },
        }
        databases[process.env.DB_CONNECTION || defaultDB]()
    }
}
