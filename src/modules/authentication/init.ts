import { Express } from 'express'
import Routes from './routes'
import RouteController from './controller/route_controller'

export default class AuthenticationModule {
    public routes: Routes

    constructor(app: Express) {
        this.routes = new Routes(app, new RouteController())
    }
}
