const mongoose = require('mongoose')

const url = process.env.MONGODB_URL

mongoose
    .connect(url)
    .then((result) => {
        console.log(`Connected to MongoDB`)
    })
    .catch((error) => {
        console.error(`Error connecting to the DB: ${error.message}`)
    })

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
