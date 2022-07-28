import { Request, Response } from 'express'

export default interface HTTPResource {
    create(request: Request, response: Response): void

    show(request: Request, response: Response): void

    modify(request: Request, response: Response): void

    list(request: Request, response: Response): void

    delete(request: Request, response: Response): void
}
