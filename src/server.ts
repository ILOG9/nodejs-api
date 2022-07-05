import App from './app'
import chalk from 'chalk'
import ip from 'ip'
class WWW {
    constructor() {}

    listener(port: string = '3001') {
        port = process.env.PORT ?? port
        const app: App = new App()
        app.app.listen(port, () => {
            console.log('---------------------------------------------')
            process.stdout.write(chalk.rgb(243, 86, 34)('|'))
            console.log('CHLABS ~ Tecnología Chilena')
            process.stdout.write('software: ')
            console.log(
                chalk.green(
                    `${process.env.APP_NAME} V${process.env.APP_VERSION}`
                )
            )
            process.stdout.write('ip: ')
            console.log(chalk.green(ip.address()))
            process.stdout.write('port: ')
            console.log(chalk.green(port))
            console.log('---------------------------------------------')
            app.init()
        })
    }
}
new WWW().listener()
