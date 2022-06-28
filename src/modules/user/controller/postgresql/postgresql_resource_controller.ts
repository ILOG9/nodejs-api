import { Request, Response } from 'express'
import IResourceController from '../../../../lib/module-core/interfaces/i_resource_controller'

export default class PostreSQLResourceController
    implements IResourceController
{
    constructor() {}

    create = async (request: Request, response: Response) => {}

    show = async (request: Request, response: Response) => {}

    modify = async (request: Request, response: Response) => {}

    list = async (request: Request, response: Response) => {}

    delete = async (request: Request, response: Response) => {}
}
