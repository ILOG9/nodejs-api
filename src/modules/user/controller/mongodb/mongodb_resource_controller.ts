import { Request, Response } from 'express'
import HTTPResource from '../../../../lib/module-core/controller/interfaces/http_resource'
import { HttpStatus } from '../../../../lib/http/http-status'
import userDb from '../../db/user-db'
import ChileanValidator from '../../../../lib/validator/country-id/chilean-validator'
import Validator from 'validatorjs'

export default class MongoDBResourceController implements HTTPResource {
    constructor() {}

    create = async (request: Request, response: Response) => {
        const validationEmail = new Validator(request.body, {
            email: 'required|email',
            password: 'required',
        })
        const validationRut = new Validator(request.body, {
            rut: 'required',
            password: 'required',
        })
        if (validationRut.passes()) {
            if (new ChileanValidator().validateChileanRut(request.body.rut)) {
                const userDB: any = new userDb()
                await userDB
                    .secureSave(request.body)
                    .then((payload: any) => {
                        response.status(HttpStatus.created).json(payload)
                    })
                    .catch((error: Error) => {
                        response.status(HttpStatus.conflict).json(error)
                    })
                return
            } else {
                response.status(HttpStatus.conflict).json('Rut no válido.')
                return
            }
        } else if (validationEmail.passes()) {
            const userDB: any = new userDb()
            await userDB
                .secureSave(request.body)
                .then((payload: any) => {
                    response.status(HttpStatus.created).json(payload)
                })
                .catch((error: Error) => {
                    response.status(HttpStatus.conflict).json(error)
                })
            return
        }
        response.status(HttpStatus.ok).json({
            message: 'Valid data ratio',
        })
    }

    show = async (request: Request, response: Response) => {
        response
            .status(HttpStatus.ok)
            .json(await new userDb().secureShow(request.body.id))
    }

    modify = async (request: Request, response: Response) => {
        const validationEmail = new Validator(request.body, {
            email: 'required|email',
        })
        const validationRut = new Validator(request.body, {
            rut: 'required',
        })
        if (validationRut.passes()) {
            if (new ChileanValidator().validateChileanRut(request.body.rut)) {
                const userDB: any = new userDb()
                userDB
                    .secureUpdate(request.body)
                    .then(function () {
                        response.status(HttpStatus.ok).json({
                            message: 'User updated correctly',
                        })
                    })
                    .catch(function () {
                        response.status(HttpStatus.badRequest).json({
                            message: 'Error in update user',
                        })
                    })
                return
            }
        } else if (validationEmail.passes()) {
            const userDB: any = new userDb()
            userDB
                .secureUpdate(request.body)
                .then(function () {
                    response.status(HttpStatus.ok).json({
                        message: 'User updated correctly',
                    })
                })
                .catch(function () {
                    response.status(HttpStatus.badRequest).json({
                        message: 'Error in update user',
                    })
                })
            return
        } else {
            response.status(HttpStatus.badRequest).json({
                message: "doesn't have rut or email",
            })
            return
        }
        response.status(HttpStatus.ok).json({
            message: 'Valid data ratio',
        })
    }

    list = async (request: Request, response: Response) => {
        response.status(HttpStatus.ok).json(await new userDb().secureList())
    }

    delete = async (request: Request, response: Response) => {}
}
