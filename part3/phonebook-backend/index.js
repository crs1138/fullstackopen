require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

const app = express()

app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('body', function (req, res) {
    return req.method === 'POST' && JSON.stringify(req.body)
})
app.use(
    morgan(
        ':method :url :status :res[content-length] - :response-time ms :body'
    )
)

app.get('/', (req, res) => {
    res.send(`<h1>Phonebook Server</h1>`)
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then((result) => {
        res.json(result)
    })
    // res.json(persons)
})

app.get('/info', (req, res, next) => {
    Person.find({})
        .then((persons) => {
            let output = ''
            output += `<p>Phonebook has info for ${persons?.length} people</p>`
            const currentDate = new Date()
            output += `<p>${currentDate.toString()}</p>`
            res.send(output)
        })
        .catch((error) => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
    const { id } = req.params
    Person.findById(id)
        .then((foundPerson) => {
            console.log({ foundPerson })
            if (foundPerson !== null) {
                res.json(foundPerson)
            } else {
                res.status(404).json({
                    error: `Person with id: ${id} no longer exits in the db`,
                })
            }
        })
        .catch((error) => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
    Person.findByIdAndRemove(req.params.id)
        .then((result) => {
            console.log({ result })
            if (result !== null) {
                res.status(204).end()
            } else {
                res.status(404).json({
                    error: `Person already deleted from db`,
                })
            }
        })
        .catch((error) => next(error))
})

app.post('/api/persons', async (req, res, next) => {
    const { name, number } = req.body
    const personAlreadyInDb = await Person.findOne({ name }).exec()

    if (personAlreadyInDb !== null) {
        return res.status(400).json({
            error: `Person "${name}" already exists`,
            personAlreadyInDb,
        })
    }

    const person = new Person({
        name,
        number,
    })
    person
        .save()
        .then((savedPerson) => {
            res.json(savedPerson)
        })
        .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
    const { name, number } = req.body

    const person = {
        name,
        number,
    }

    Person.findByIdAndUpdate(req.params.id, person, {
        new: true,
        runValidators: true,
        context: 'query',
    })
        .then((updatedPerson) => {
            if (updatedPerson === null) {
                res.status(404).json({
                    error: `The person "${name}" has been already deleted from the server`,
                    code: 404,
                })
            } else {
                res.json(updatedPerson)
            }
        })
        .catch((error) => next(error))
})

const unknownEndpoint = (req, res, next) => {
    res.status(404).send({ error: `unknown endpoint` })
    next()
}
app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
    console.error({ error })

    if ('CastError' === error.name) {
        return res.status(400).send({ error: `malformatted id` })
    } else if ('ValidationError' === error.name) {
        return res.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
