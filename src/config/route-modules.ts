import path from 'path'

const routeModules = (): Array<string> => {
    return [path.join(__dirname, '..', 'modules')]
}

export { routeModules }
