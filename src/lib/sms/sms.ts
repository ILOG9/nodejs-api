import chalk from 'chalk'
import { HttpStatus } from '../http/http-status'

/**
 * typo para los sms
 */
export type SMSStructure = {
    to: string
    from: string
    body: string
}

/**
 * typo para los sms response
 */
export type SMSResponse = {
    code: number
    message: string
}

export default class SMS {
    #twilioClient?

    /**
     * Iniciamos una instancia de Twilio client si existe un account-sid y un auth-token
     */
    constructor() {
        if (
            process.env.TWILIO_ACCOUNT_SID != 'NA' &&
            process.env.TWILIO_AUTH_TOKEN != 'NA'
        ) {
            this.#twilioClient = require('twilio')(
                process.env.TWILIO_ACCOUNT_SID,
                process.env.TWILIO_AUTH_TOKEN,
                {
                    lazyLoading: true,
                }
            )
            console.log(
                chalk.green('Successful connection with twilio sms instance')
            )
        } else {
            console.error(
                new Error(
                    chalk.red('Connection failed with twilio sms instance')
                )
            )
        }
    }
    /**
     * Enviamos un mensaje SMS mediante la plataforma twilio
     */
    async setSMS(SMS: SMSStructure): Promise<SMSResponse> {
        let SMSRes: SMSResponse
        if (this.#twilioClient) {
            await this.#twilioClient.messages
                .create(SMS)
                .then((msg: any) => {
                    SMSRes = {
                        code: HttpStatus.ok,
                        message: msg,
                    }
                })
                .catch((error: any) => {
                    let msg: string
                    if (error.code == 21211) {
                        msg =
                            'Intentó iniciar una llamada telefónica saliente, pero el número de teléfono que proporcionó no era un número de teléfono válido o tenía un formato incorrecto. Especifique un formato E164'
                    } else if (error.code == 21606) {
                        msg =
                            'Solo puede enviar mensajes SMS desde un número de teléfono proporcionado por Twilio'
                    } else {
                        msg = 'Error desconocido al enviar SMS'
                    }
                    SMSRes = {
                        code: HttpStatus.badRequest,
                        message: msg!,
                    }
                })
        } else {
            console.log(chalk.red('the twilio sms instance is disabled'))
            SMSRes = {
                code: HttpStatus.forbidden,
                message: 'El servicio SMS de Twilio esta deshabilitado',
            }
        }
        return SMSRes!
    }
}
