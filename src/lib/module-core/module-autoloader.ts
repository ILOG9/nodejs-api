import fs from 'fs'
import { Express } from 'express'
import chalk from 'chalk'
import path from 'path'

/**
 * Clase encargada de cargar los módulos de la aplicación automaticamente,
 * estos se pueden encontrar en cualquier parte de la aplicacíon,
 * pero se de debe pasar la ubicacion de estos mismos en un arreglo de rutas.
 */
export default class ModuleAutoloader {
    constructor() {}

    /**
     *  Cargamos los módulos en el servidor.
     *  recibimos el servidor y la carpeta contenedora.
     *
     * @param app - Aplicación de express
     * @param routeArrangement  - Arreglo con las rutas en las que se encuentran los módulos a cargar en memoria.
     * @returns Promise<any[]>
     */
    async loadModules(
        app: Express,
        routeArrangement: Array<string>
    ): Promise<any[]> {
        let start: any = Date.now()
        let modules = new Array()
        const numberOfRoutes: number = routeArrangement.length
        for (let k = 0; k < numberOfRoutes; k++) {
            modules.concat(
                await this.#createArrayModules(app, routeArrangement[k])
            )
        }
        let end: any = Date.now()
        console.log(chalk.green(`All modules loaded in ${end - start} ms`))
        return modules
    }

    /**
     *  Creamos un array de un módulo a partir de un string,
     * esta pensado para ser concatenado y devuelto por el método loadModules.
     *
     * @param app - Aplicacón de express.
     * @param path - Path del modulo a cargar en memoria.
     * @returns Promise<any[]>
     */
    async #createArrayModules(app: Express, inputPath: any): Promise<any[]> {
        let modules = []
        const modulesFolder = fs.readdirSync(inputPath)
        const modulesFolderLength = modulesFolder.length
        for (let k = 0; k < modulesFolderLength; k++) {
            try {
                let start: any = Date.now()
                const requiredModule = await require(path.join(
                    inputPath,
                    modulesFolder[k],
                    'init'
                )).default
                modules.push(new requiredModule(app))
                let end: any = Date.now()
                process.stdout.write(
                    `Module ${modulesFolder[k]} - ${end - start} ms \n`
                )
            } catch (err: any) {
                console.log(
                    chalk.red(err.name) +
                        ': Error loading module ' +
                        modulesFolder[k] +
                        ', ' +
                        err.message
                )
            }
        }
        return modules
    }
}
