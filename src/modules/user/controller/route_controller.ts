import { Request, Response } from 'express'
import HTTPResource from '../../../lib/module-core/controller/interfaces/http_resource'
import ARouteController from '../../../lib/module-core/controller/abstracts/a_route_controller'
import MongoDBResourceController from './mongodb/mongodb_resource_controller'
import PostreSQLResourceController from './postgresql/postgresql_resource_controller'
import RedisResourceController from './redis/redis_resource_controller'

export default class RouteController
    extends ARouteController
    implements HTTPResource
{
    #mongoDBResourceController: MongoDBResourceController =
        new MongoDBResourceController()

    #postreSQLResourceController: PostreSQLResourceController =
        new PostreSQLResourceController()

    #redisResourceController: RedisResourceController =
        new RedisResourceController()

    constructor() {
        super()
    }

    create = async (request: Request, response: Response) => {
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
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDBRef]()
    }

    show = async (request: Request, response: Response) => {
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
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDBRef]()
    }

    modify = async (request: Request, response: Response) => {
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
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDBRef]()
    }

    list = async (request: Request, response: Response) => {
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
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDBRef]()
    }

    delete = async (request: Request, response: Response) => {
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
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDBRef]()
    }
}
