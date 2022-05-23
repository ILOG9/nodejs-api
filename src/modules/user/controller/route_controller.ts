import { Request, Response } from 'express'
import Validator from 'validatorjs'
import UserDB from '../db/user-db'
import { HttpStatus } from '../../../lib/http/http-status'
import ChileanValidator from '../../../lib/lib/validator/country-id/chilean-validator'

export default class RouteController {
    constructor() {}

    listUsers = async (request: Request, response: Response) => {}

    createUser = async (request: Request, response: Response) => {
        const validationEmail = new Validator(request.body, {
            email: 'required|email',
            password: 'required|min:7',
        })
        const validationRut = new Validator(request.body, {
            rut: 'required',
            password: 'required|min:7',
        })
        if (validationRut.passes()) {
            if (new ChileanValidator().validateChileanRut(request.body.rut)) {
                const userDB: any = new UserDB()
                await userDB
                    .secureSave(request.body)
                    .then((payload: any) => {
                        response.status(HttpStatus.created).json(payload)
                        return
                    })
                    .catch((error: Error) => {
                        response.status(HttpStatus.conflict).json(error)
                        return
                    })
            } else {
                response.status(HttpStatus.conflict).json('Rut no válido.')
                return
            }
        } else if (validationEmail.passes()) {
            const userDB: any = new UserDB()
            await userDB
                .secureSave(request.body)
                .then((payload: any) => {
                    response.status(HttpStatus.created).json(payload)
                    return
                })
                .catch((error: Error) => {
                    response.status(HttpStatus.conflict).json(error)
                    return
                })
        }
    }

    updateUser = async (request: Request, response: Response) => {
        const validationEmail = new Validator(request.body, {
            email: 'required|email',
        })
        const validationRut = new Validator(request.body, {
            rut: 'required',
        })
        if (validationRut.passes()) {
            if (new ChileanValidator().validateChileanRut(request.body.rut)) {
                const userDB: any = new UserDB()
                userDB
                    .secureUpdate(request.body)
                    .then(function () {
                        response.status(HttpStatus.ok).json({
                            message: 'User updated correctly',
                        })
                        return
                    })
                    .catch(function () {
                        response.status(HttpStatus.badRequest).json({
                            message: 'Error in update user',
                        })
                        return
                    })
            }
        } else if (validationEmail.passes()) {
            const userDB: any = new UserDB()
            userDB
                .secureUpdate(request.body)
                .then(function () {
                    response.status(HttpStatus.ok).json({
                        message: 'User updated correctly',
                    })
                    return
                })
                .catch(function () {
                    response.status(HttpStatus.badRequest).json({
                        message: 'Error in update user',
                    })
                    return
                })
        } else {
            response.status(HttpStatus.badRequest).json({
                message: "doesn't have rut or email",
            })
        }
    }

    showUser = async (request: Request, response: Response) => {}
}