const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456',
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523',
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345',
    },
    {
        id: 4,
        name: 'Mary Poppendieck',
        number: '39-23-6423122',
    },
]

app.get('/', (req, res) => {
    res.send(`<h1>Phonebook Server</h1>`)
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/info', (req, res) => {
    let output = ''
    output += `<p>Phonebook has info for ${persons?.length} people</p>`
    const currentDate = new Date()
    output += `<p>${currentDate.toString()}</p>`
    res.send(output)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find((person) => person.id === id)

    if (!person) {
        return res.status(404).json({ error: 'Person not found' })
    }

    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter((person) => person.id !== id)

    res.status(204).end()
})

const generateId = () => {
    return Math.floor(Math.random() * 100000000000)
}

app.post('/api/persons', (req, res) => {
    const id = generateId()
    const { name, number } = req.body
    const person = {
        name,
        number,
        id,
    }
    persons = persons.concat(person)
    res.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
