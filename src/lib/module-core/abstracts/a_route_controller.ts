import chalk from 'chalk'
export default abstract class ARouteController {
    protected defaultDBRef: string = 'default'

    constructor() {}

    protected defaultDB = () => {
        console.log(chalk.red('Unselected Database'))
    }
}
