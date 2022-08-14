const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log(
        'Please provide the password as an argument: node mongo.js <password>'
    )
    process.exit(1)
}

const [, , password, name, number] = process.argv
const url = `mongodb+srv://fullstack-phonebook:${password}@cluster0.z4mi9mh.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const personSchema = mongoose.Schema({
    name: String,
    number: String,
})

const Person = mongoose.model('Person', personSchema)

if (!!name && !!number) {
    mongoose
        .connect(url)
        .then(() => {
            const person = new Person({
                name,
                number,
            })
            return person.save()
        })
        .then(() => {
            console.log(`Added ${name} number ${number} to phonebook`)
            return mongoose.connection.close()
        })
}

if (!name && !number) {
    mongoose.connect(url).then(() => {
        Person.find({})
            .then((results) => {
                console.log('phonebook:')
                results.forEach((person) => {
                    console.log(`${person.name} ${person.number}`)
                })
            })
            .then(() => {
                mongoose.connection.close()
            })
    })
}
