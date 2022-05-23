import RouteController from './controller/route_controller'
import { Express } from 'express'
export default class Routes {
    private routeController: RouteController

    readonly authenticationPrefix: string = '/api/authentication/'

    constructor(app: Express, routeController: RouteController) {
        this.routeController = routeController
        this.configureRoutes(app)
    }

    /*
     * Establecemos los endpoints para el modulo, utilizando el paquete express
     */
    private configureRoutes(app: Express) {
        app.route(this.authenticationPrefix + 'authorize').post(
            this.routeController.authorize
        )

        app.route(this.authenticationPrefix + 'refresh-token').post(
            this.routeController.refreshToken
        )

        app.route(this.authenticationPrefix + 'recover-account').post(
            this.routeController.recoverAccount
        )

        app.route(this.authenticationPrefix + 'validate-code').post(
            this.routeController.validateCodeToRecoverAccount
        )

        app.route(this.authenticationPrefix + 'change-pw-with-code').post(
            this.routeController.changePasswordAfterRecoverAccount
        )
    }
}
