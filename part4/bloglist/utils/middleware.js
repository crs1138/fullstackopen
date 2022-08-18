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
    }

    logger.error(error.message)
    next(error)
}

module.exports = { requestLogger, unknownEndpoint, errorHandler }
