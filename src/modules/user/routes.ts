import RouteController from './controller/route_controller'
import { Express } from 'express'
export default class Routes {
    private routeController: RouteController

    readonly userPrefix: string = '/api/user/'

    constructor(app: Express, routeController: RouteController) {
        this.routeController = routeController
        this.configureRoutes(app)
    }

    /*
     * Establecemos los endpoints para el modulo, utilizando el paquete express
     */
    private configureRoutes(app: Express) {
        app.route(this.userPrefix + 'create').post(this.routeController.create)
        app.route(this.userPrefix + 'list').get(this.routeController.list)
        app.route(this.userPrefix + 'show').post(this.routeController.show)
        app.route(this.userPrefix + 'update').post(this.routeController.modify)
    }
}
