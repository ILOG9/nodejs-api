import PostreSQLResourceController from '../../../modules/user/controller/postgresql/postgresql_resource_controller'
import MongoDBResourceController from '../../../modules/user/controller/mongodb/mongodb_resource_controller'
import RedisResourceController from '../../../modules/user/controller/redis/redis_resource_controller'
import chalk from 'chalk'
export default abstract class ARouteController {
    protected mongoDBResourceController: MongoDBResourceController =
        new MongoDBResourceController()

    protected postreSQLResourceController: PostreSQLResourceController =
        new PostreSQLResourceController()

    protected redisResourceController: RedisResourceController =
        new RedisResourceController()

    protected defaultDef: string = 'default'

    constructor() {}

    protected defaultDB = () => {
        console.log(chalk.red('Unselected Database'))
    }
}
