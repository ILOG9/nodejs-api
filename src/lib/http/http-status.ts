/**
 * Codigos de estado para http
 *
 * {@link https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP | https://es.wikipedia.org/wiki/Anexo:C%C3%B3digos_de_estado_HTTP}
 *
 */

export class HttpStatus {
    // 1xx Informational.
    static readonly continue: number = 100
    static readonly switchingProtocols: number = 101
    static readonly processing: number = 102

    // 2xx Success.
    static readonly ok: number = 200
    static readonly created: number = 201
    static readonly accepted: number = 202
    static readonly nonAuthoritativeInformation: number = 203
    static readonly noContent: number = 204
    static readonly resetContent: number = 205
    static readonly partialContent: number = 206
    static readonly multiStatus: number = 207
    static readonly alreadyResported: number = 208
    static readonly imUsed: number = 226

    // 3xx Redirection.
    static readonly multipleChoices: number = 300
    static readonly movedPermanently: number = 301
    static readonly found: number = 302
    static readonly seeOther: number = 303
    static readonly notModified: number = 304
    static readonly useProxy: number = 305
    static readonly unused: number = 306
    static readonly temporaryRedirect: number = 307
    static readonly permanentRedirect: number = 308

    // 4xx Client Error
    static readonly badRequest: number = 400
    static readonly unauthorized: number = 401
    static readonly paymentRequired: number = 402
    static readonly forbidden: number = 403
    static readonly notFound: number = 404
    static readonly methodNotAllowed: number = 405
    static readonly notAcceptable: number = 406
    static readonly proxyAuthenticationRequired: number = 407
    static readonly requestTimeout: number = 408
    static readonly conflict: number = 409
    static readonly gone: number = 410
    static readonly lengthRequired: number = 411
    static readonly preconditionFailed: number = 412
    static readonly requestEntityTooLarge: number = 413
    static readonly requestURITooLong: number = 414
    static readonly unsupportedMediaType: number = 415
    static readonly requestedRangeNotSatisfiable: number = 416
    static readonly expectationFailed: number = 417
    static readonly imATeapot: number = 418
    static readonly enhanceYourCalm: number = 420
    static readonly unprocessableEntity: number = 422
    static readonly locked: number = 423
    static readonly failedDependency: number = 424
    static readonly reservedForWebDAV: number = 425
    static readonly upgradeRequired: number = 426
    static readonly preconditionRequired: number = 428
    static readonly tooManyRequest: number = 429
    static readonly requestHeaderFieldsTooLarge: number = 431
    static readonly noResponse: number = 444
    static readonly retryWith: number = 449
    static readonly blockedByWindowsParentalControl: number = 450
    static readonly unavailableForLegalReasons: number = 451
    static readonly clientClosedRequest: number = 499

    // 5xx Server Error
    static readonly internalServerError: number = 500
    static readonly notImplemented: number = 501
    static readonly badGateway: number = 502
    static readonly serviceUnavailable: number = 503
    static readonly gatewayTimeout: number = 504
    static readonly HTTPVersionNotSupported: number = 505
    static readonly variantAlsoNegotiates: number = 506
    static readonly insufficientStorage: number = 507
    static readonly loopDetected: number = 508
    static readonly bandWidthLimitExceeded: number = 509
    static readonly notExtended: number = 510
    static readonly networkAuthenticationRequired: number = 511
    static readonly networkReadTimeoutError: number = 598
    static readonly networkConnectTimeoutError: number = 100
}
