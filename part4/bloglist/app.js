const express = require('express')
const mongoose = require('mongoose')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

logger.info(`Connecting to ${config.MONGODB_URI}`)
mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        logger.info(`Connected to MongoDB`)
    })
    .catch((err) => {
        logger.error(`There was a problem connecting to MongoDB.`, err.message)
    })

const app = express()
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogsRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app
