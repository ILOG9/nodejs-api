const thunk =
    (fn: Function) =>
    (...args: any[]) =>
    () =>
        fn(...args)

export { thunk }
