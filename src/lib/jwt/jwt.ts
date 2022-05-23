import JsonWebToken from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { Response, Request, NextFunction } from 'express'
import { HttpStatus } from '../http/http-status'
import { base64ToUtf } from '../utils/transformers'

type tokenToObjectStructure = {
    header: { alg: string; typ: string }
    payload: any
    hmac: string
}

/**
 * Json Web Token
 */
export default class JWT {
    /**
     * Instancia singleton
     */
    static #instance: JWT
    /**
     * Tiempo de validez del token, 15 minutos por defecto, recibe un valor en segundos
     */
    #expireTime: number = 900

    private constructor(expireTime: number) {
        this.#expireTime = expireTime
    }

    /**
     *  Retornamos un singleton de JWT
     * @param expireTime
     * @returns Singleton JWT
     */
    static getInstance(expireTime: number = 900): JWT {
        if (!JWT.#instance) {
            JWT.#instance = new JWT(expireTime)
        }
        return JWT.#instance
    }

    /**
     * Creamos un token valido
     *
     * @public
     * @param payload - payload aportado por el cliente
     * @return Promise<string>
     */
    async createToken(
        payload: any,
        expireTime: number = 0
    ): Promise<{ token: string; sessionId: string }> {
        let sessionId: string
        if (!payload.hasOwnProperty('sessionId')) {
            sessionId = uuidv4()
            payload['sessionId'] = sessionId
        } else {
            sessionId = payload.sessionId
        }
        const token = JsonWebToken.sign(payload, process.env.APP_KEY!, {
            expiresIn: expireTime != 0 ? expireTime : this.#expireTime,
        })
        return { token, sessionId }
    }

    /**
     * Refrescamos un token valido
     *
     * @public
     * @param token - token JWT.
     * @return Promise<{ token: string; sessionId: string } | boolean>
     */
    async refreshToken(
        token: string
    ): Promise<{ token: string; sessionId: string } | Error> {
        if (await this.verifyToken(token)) {
            const splittedToken = await this.tokenToObject(token)
            delete splittedToken.payload.iat
            delete splittedToken.payload.exp
            const payload = splittedToken.payload
            const newToken = await this.createToken(payload)
            return newToken
        }
        return new Error()
    }

    /**
     * Verificamos la validez del token.
     *
     * @public
     * @param token - token JWT.
     * @return Promise<boolean>
     */
    async verifyToken(token: string): Promise<boolean> {
        let isValid: boolean
        JsonWebToken.verify(token, process.env.APP_KEY!, (error, payload) => {
            isValid = !error
        })
        return isValid!
    }

    /**
     * Verificamos si un token viene en el encabezado authorize
     * y posteriormente verificamos su validez.
     *
     * @param request
     * @param response
     * @param nextFunction
     */
    async verifyTokenMiddleware(
        request: Request,
        response: Response,
        nextFunction: NextFunction
    ) {
        if (request.headers.hasOwnProperty('authorization')) {
            if (await this.verifyToken(request.headers.authorization!)) {
                nextFunction()
                return
            }
            response.status(HttpStatus.unauthorized).json({
                message: 'Debe proporcionar un token valido.',
            })
            return
        }
        response.status(HttpStatus.badRequest).json({
            message: 'No cuenta con el encabezado Authorization.',
        })
    }

    /**
     * Separamos el token en su estructura como objeto.
     *
     * @public
     * @param token - token JWT.
     * @return Promise<{header: { alg: string; typ: string }payload: anyhmac: string}>
     */
    async tokenToObject(token: string): Promise<tokenToObjectStructure> {
        const splittedToken = token.split('.')
        const objectToken = {
            header: JSON.parse(base64ToUtf(splittedToken[0])),
            payload: JSON.parse(base64ToUtf(splittedToken[1])),
            hmac: base64ToUtf(splittedToken[2]),
        }
        return objectToken
    }
}
