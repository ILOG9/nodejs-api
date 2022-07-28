import { Request, Response } from 'express'
import IResourceController from '../../../../lib/module-core/controller/interfaces/http_resource'
import { HttpStatus } from '../../../../lib/http/http-status'

export default class MongoDBResourceController implements IResourceController {
    constructor() {}

    create = async (request: Request, response: Response) => {}

    show = async (request: Request, response: Response) => {}

    modify = async (request: Request, response: Response) => {}

    list = async (request: Request, response: Response) => {}

    delete = async (request: Request, response: Response) => {}
}
