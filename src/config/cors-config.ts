import { HttpStatus } from '../lib/http/http-status'

const corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: HttpStatus.ok,
    allowedHeaders: 'Content-Type,Authorization',
}

export { corsConfig }
