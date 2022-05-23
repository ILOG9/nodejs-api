const randomString = (length: number) =>
    [...Array(length + 10)]
        .map((value) => (Math.random() * 1000000).toString(36).replace('.', ''))
        .join('')
        .substring(0, length)

export { randomString }
