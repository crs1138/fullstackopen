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
    name: {
        type: String,
        minLength: 3,
        required: [true, `The name is required`],
        unique: true,
        // validate: {
        //     validator: async (name) => {
        //         const person = await Person.findOne({ name })
        //         if (!!person) {
        //             return false
        //         }
        //         return true
        //     },
        //     message: (props) =>
        //         `The person ${props.name} already exists in the db`,
        // },
    },
    number: {
        type: String,
        required: [true, `The phone number is required`],
        validate: {
            validator: (v) => {
                return /^\d{2,3}-\d{6,}$/.test(v)
            },
            message: (props) => `${props.value} is not a valid phone number`,
        },
    },
})

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    },
})

module.exports = mongoose.model('Person', personSchema)
