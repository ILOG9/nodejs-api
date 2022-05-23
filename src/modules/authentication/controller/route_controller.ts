import { Request, Response } from 'express'
import { HttpStatus } from '../../../lib/http/http-status'
import UserDB, { userType } from '../../user/db/user-db'
import BcryptHash from '../../../lib/hash/bcrypt-hash/bcrypts-hash'
import JWT from '../../../lib/jwt/jwt'
import SMS from '../../../lib/sms/sms'
import Mail from '../../../lib/mail/mail'
import Logger from '../../../lib/logger/logger'
import { randomString } from '../../../lib/utils/random'

export default class RouteController {
    constructor() {}

    /**
     * Autorizamos a un usuario a partir de su usuario (rut o correo) y contraseña
     *
     * @param request
     * @param response
     */
    authorize = async (request: Request, response: Response) => {
        let user: userType | any
        if (request.body.hasOwnProperty('rut')) {
            user = await UserDB.findOne({ rut: request.body.rut })
        }
        if (request.body.hasOwnProperty('email')) {
            user = await UserDB.findOne({ email: request.body.email })
        }
        if (user) {
            if (
                await new BcryptHash().compareHash(
                    request.body.password,
                    user.password
                )
            ) {
                user = user.toObject()
                let userToToken: any = {}
                if (user.hasOwnProperty('rut')) {
                    userToToken['rut'] = user.rut
                } else if (user.hasOwnProperty('email')) {
                    userToToken['email'] = user.email
                }
                const createTokenPayload = await JWT.getInstance().createToken(
                    userToToken
                )

                response.status(HttpStatus.ok).json({
                    message: 'Usuario autenticado',
                    token: createTokenPayload.token,
                })
                return
            }
        }
        response.status(HttpStatus.unauthorized).json({
            message: 'Usuario no autenticado',
        })
        return
    }

    /**
     * Refrescamos un token valido manteniento el payload
     *
     * @public
     * @param request
     * @param response
     */
    refreshToken = async (request: Request, response: Response) => {
        const newToken = await JWT.getInstance().refreshToken(
            request.headers.authorization!
        )

        if (!(newToken instanceof Error)) {
            response.status(HttpStatus.ok).json({
                message: 'Token valido',
                token: newToken.token,
            })
        } else {
            response.status(HttpStatus.unauthorized).json({
                message: 'Token no valido',
            })
        }
    }

    /**
     * Recuperamos las cuenta a través del rut,
     * puede ser a través de un email verificado o un teléfono verificado
     *
     * @param request
     * @param response
     * @returns
     */
    recoverAccount = async (request: Request, response: Response) => {
        if (
            request.body.hasOwnProperty('rut') &&
            request.body.hasOwnProperty('method')
        ) {
            const user: any = await UserDB.findOne({ rut: request.body.rut })

            if (!user) {
                response.status(HttpStatus.notFound).json({
                    message: 'user not found',
                })
                return
            }
            const rndString = randomString(8)

            user.verificationCode = rndString
            user.save()
                .then(function () {
                    setTimeout(async () => {
                        user.verificationCode = ''
                        user.save()
                    }, 600000)
                })
                .catch(function (err: any) {
                    Logger.getInstance().warn({ err })
                    throw new Error()
                })

            if (request.body.method == 'email') {
                new Mail()
                    .sendEmail({
                        from: 'CHLABS I-ROBOT <iolivares@chlabs.cl>',
                        to: user.email,
                        subject: 'Recuperación de cuenta',
                        text: 'Código de recuperación: ' + rndString,
                    })
                    .then(function () {
                        response.status(HttpStatus.ok).json({
                            message: 'email sent',
                        })
                    })
                    .catch(function (err: any) {
                        response.status(HttpStatus.badRequest).json({
                            err: err,
                        })
                    })
                return
            }
            if (request.body.method == 'sms') {
                new SMS()
                    .setSMS({
                        to: '+56999244386',
                        from: process.env.TWILIO_ACTIVE_NUMBER!,
                        body: 'Código de recuperación: ' + rndString,
                    })
                    .then(function (payload: any) {
                        response.status(HttpStatus.ok).json({
                            message: 'sms sent',
                        })
                    })
                    .catch(function (err: any) {
                        response.status(HttpStatus.badRequest).json({
                            err: err,
                        })
                    })
                return
            }
        }
    }

    /**
     * Validamos que el código de recuperación sea el correcto
     *
     * @param request
     * @param response
     * @returns
     */
    validateCodeToRecoverAccount = async (
        request: Request,
        response: Response
    ) => {
        if (!request.body.hasOwnProperty('rut')) {
            response.status(HttpStatus.badRequest).json({
                message: 'require rut in request body',
            })
            return
        }

        const user: any = await UserDB.findOne({ rut: request.body.rut })

        if (user) {
            if (user.verificationCode == request.body.verificationCode) {
                response.status(HttpStatus.ok).json({
                    message: 'ok',
                })
                return
            }
            return
        } else {
            response.status(HttpStatus.notFound).json({
                message: 'user not found',
            })
            return
        }
    }

    /**
     * Cambiamos el password a partir de un codigo de recuperación
     *
     * @param request
     * @param response
     * @returns
     */
    changePasswordAfterRecoverAccount = async (
        request: Request,
        response: Response
    ) => {
        if (!request.body.hasOwnProperty('rut')) {
            response.status(HttpStatus.badRequest).json({
                message: 'require rut in request body',
            })
            return
        }
        if (!request.body.hasOwnProperty('verificationCode')) {
            response.status(HttpStatus.badRequest).json({
                message: 'require verificationCode in request body',
            })
            return
        }
        if (request.body.password == request.body.confirmPassword) {
            const user: any = await UserDB.findOne({ rut: request.body.rut })

            if (user) {
                if (!user.emailIsVerified) {
                    response.status(HttpStatus.unauthorized).json({
                        message: 'the email has not been confirmed yet',
                    })
                    return
                }
                if (!user.phoneIsVerified) {
                    response.status(HttpStatus.unauthorized).json({
                        message: 'the phone has not been confirmed yet',
                    })
                    return
                }
                if (user.verificationCode == '') {
                    response.status(HttpStatus.unauthorized).json({
                        message: 'there are no pending password changes',
                    })
                    return
                }
                user.password = await new BcryptHash().createHash(
                    request.body.password
                )
                user.verificationCode = ''
                user.save()
                    .then(function () {
                        response.status(HttpStatus.ok).json({
                            message: 'ok',
                        })
                    })
                    .catch(function (err: any) {
                        response.status(HttpStatus.conflict).json({
                            message: 'could not be stored correctly',
                            error: err,
                        })
                    })
                return
            }
            response.status(HttpStatus.badRequest).json({
                message: 'user not found',
            })
            return
        }
        response.status(HttpStatus.badRequest).json({
            message: 'the password and confirm password does not match',
        })
        return
    }
}
