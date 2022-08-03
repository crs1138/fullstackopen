import { useState } from 'react'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Persons from './Persons'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456', id: 1 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    const filterByName = (event) => {
        setNameFilter(event.target.value)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const personExists = !!persons.find((person) => person.name === newName)

        if (personExists) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const personObject = {
            name: newName,
            number: newNumber,
        }
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
    }

    const handleNewName = (event) => setNewName(event.target.value)

    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const filteredPersons =
        nameFilter === ''
            ? persons
            : persons.filter((person) => {
                  return person.name
                      .toLowerCase()
                      .includes(nameFilter.toLowerCase())
              })
    return (
        <div>
            <h1>Phonebook</h1>
            <Filter name={nameFilter} filterByName={filterByName} />

            <h2>Add new</h2>
            <PersonForm
                addPerson={addPerson}
                newName={newName}
                handleNewName={handleNewName}
                newNumber={newNumber}
                handleNewNumber={handleNewNumber}
            />

            <h2>Numbers</h2>
            <Persons persons={filteredPersons} />
        </div>
    )
}

export default App
