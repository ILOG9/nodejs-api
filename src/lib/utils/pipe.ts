const pipe =
    (...fns: Array<Function>) =>
    (x: Function) =>
        fns.reduce((v: any, f: any) => f(v), x)

export { pipe }
