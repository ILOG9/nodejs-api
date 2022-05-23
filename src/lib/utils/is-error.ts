const isError = (error: any): boolean =>
    Object.prototype.toString.call(error) === '[object Error]'

export { isError }
