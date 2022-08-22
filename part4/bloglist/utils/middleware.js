const logger = require('./logger')
const requestLogger = (req, res, next) => {
    const { body, method, path } = req
    logger.info(`Method: ${method}`)
    logger.info(`Path:   ${path}`)
    logger.info('Body:   ', body)
    logger.info('---')
    next()
}

const unknownEndpoint = (req, res, next) => {
    res.status(404).json({ error: 'Unknown endpoint' })
    next()
}

const errorHandler = (error, req, res, next) => {
    if ('CastError' === error.name) {
        res.status(400).send({ error: 'Malformated id' })
    } else if ('JsonWebTokenError' === error.name) {
        res.status(401).json({ error: 'missing or invalid token' })
    }

    logger.error(error.message)
    next(error)
}

const userExtractor = (req, res, next) => {
    function invalidTokenResponse() {
        return res.status(401).json({ error: 'missing or invalid token' })
    }
    try {
        const jwt = require('jsonwebtoken')
        const authorization = req.get('authorization')
        const token =
            authorization && authorization.toLowerCase().startsWith('bearer ')
                ? authorization.substring(7)
                : null

        if (!token) {
            invalidTokenResponse()
        }
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!decodedToken?.id) {
            invalidTokenResponse()
        }
        req.user = decodedToken.id
        next()
    } catch (exception) {
        next(exception)
    }
}

module.exports = {
    requestLogger,
    unknownEndpoint,
    errorHandler,
    userExtractor,
}
