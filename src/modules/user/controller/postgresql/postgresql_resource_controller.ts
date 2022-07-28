import { Request, Response } from 'express'
import HTTPResource from '../../../../lib/module-core/controller/interfaces/http_resource'

export default class PostreSQLResourceController implements HTTPResource {
    constructor() {}

    create = async (request: Request, response: Response) => {}

    show = async (request: Request, response: Response) => {}

    modify = async (request: Request, response: Response) => {}

    list = async (request: Request, response: Response) => {}

    delete = async (request: Request, response: Response) => {}
}
