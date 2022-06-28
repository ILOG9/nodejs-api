import { Request, Response } from 'express'
import chalk from 'chalk'
import IRouteController from '../../../lib/module-core/interfaces/i_route_controller'
import ARouteController from '../../../lib/module-core/abstracts/a_route_controller'

export default class RouteController
    extends ARouteController
    implements IRouteController
{
    constructor() {
        super()
    }

    create = async (request: Request, response: Response) => {
        const databases: any = {
            mongo: () => {
                this.mongoDBResourceController.create(request, response)
            },
            postresql: () => {
                this.postreSQLResourceController.create(request, response)
            },
            redis: () => {
                this.redisResourceController.create(request, response)
            },
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDef]()
    }

    show = async (request: Request, response: Response) => {
        const databases: any = {
            mongo: () => {
                this.mongoDBResourceController.show(request, response)
            },
            postresql: () => {
                this.postreSQLResourceController.show(request, response)
            },
            redis: () => {
                this.redisResourceController.show(request, response)
            },
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDef]()
    }

    modify = async (request: Request, response: Response) => {
        const databases: any = {
            mongo: () => {
                this.mongoDBResourceController.modify(request, response)
            },
            postresql: () => {
                this.postreSQLResourceController.modify(request, response)
            },
            redis: () => {
                this.redisResourceController.modify(request, response)
            },
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDef]()
    }

    list = async (request: Request, response: Response) => {
        const databases: any = {
            mongo: () => {
                this.mongoDBResourceController.list(request, response)
            },
            postresql: () => {
                this.postreSQLResourceController.list(request, response)
            },
            redis: () => {
                this.redisResourceController.list(request, response)
            },
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDef]()
    }

    delete = async (request: Request, response: Response) => {
        const databases: any = {
            mongo: () => {
                this.mongoDBResourceController.delete(request, response)
            },
            postresql: () => {
                this.postreSQLResourceController.delete(request, response)
            },
            redis: () => {
                this.redisResourceController.delete(request, response)
            },
            default: this.defaultDB,
        }
        databases[process.env.DB_CONNECTION || this.defaultDef]()
    }
}
