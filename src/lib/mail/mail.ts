export type emailStructure = {
    from: string
    to: string
    subject: string
    text: string
    html?: ''
    template?: string
    context?: any
}
export default class Mail {
    #nodemailer = require('nodemailer')
    #nodemailerExpressHandlerbars = require('nodemailer-express-handlebars')

    /*
     * Variable transporter
     */
    #transporter = this.#nodemailer.createTransport({
        host: process.env.MAIL_HOST!.trim(),
        port: process.env.MAIL_PORT!.trim(),
        auth: {
            user: process.env.MAIL_USERNAME!.trim(),
            pass: process.env.MAIL_PASSWORD!.trim(),
        },
        tls: {
            cifrados: 'SSLv3',
        },
    })

    constructor() {}

    /*
     * Configuramos la ruta del template HTML si es que usaremos alguno,
     * la extensión de este archivo es .handlebars
     */
    public configExpressHandlebars(viewPath: string) {
        this.#transporter.use(
            'compile',
            this.#nodemailerExpressHandlerbars({
                viewEngine: {
                    extName: '.handlebars',
                    partialsDir: viewPath,
                    defaultLayout: false,
                },
                viewPath: viewPath,
                extName: '.handlebars',
            })
        )
    }

    /*
     * Enviamos un correo en base a los datos encontrados en el archivo .env
     */
    public async sendEmail(email: emailStructure): Promise<boolean> {
        this.#transporter
            .sendMail(email)
            .then(function () {
                return true
            })
            .catch((error: any) => {
                console.error(error)
            })
        return false
    }
}
