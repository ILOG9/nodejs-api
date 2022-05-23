const utfToBase64 = (str: any) => Buffer.from(str).toString('base64')
const base64ToUtf = (str: any) => Buffer.from(str, 'base64').toString()

export { utfToBase64, base64ToUtf }
