import { useState, useEffect } from 'react'
import connectService from './services/connect'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')

    useEffect(() => {
        connectService.getAll().then((allPersons) => {
            setPersons(allPersons)
        })
    }, [])

    const filterByName = (event) => {
        setNameFilter(event.target.value)
    }

    const handleNewName = (event) => setNewName(event.target.value)

    const handleNewNumber = (event) => setNewNumber(event.target.value)

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find((person) => person.name === newName)
        const isNewPerson = !existingPerson

        let personObject = {
            name: newName,
            number: newNumber,
        }

        if (isNewPerson) {
            connectService.save(personObject).then((returnedPerson) => {
                setPersons(persons.concat(returnedPerson))
                setNewName('')
                setNewNumber('')
            })
        } else {
            const confirmation = window.confirm(
                `${newName} already exists in your phonebook\nDo you want to replace their number with a new one?`
            )
            if (!confirmation) {
                return
            }
            connectService
                .update(existingPerson.id, personObject)
                .then((returnedPerson) => {
                    setPersons(
                        persons.map((person) =>
                            person.id === returnedPerson.id
                                ? returnedPerson
                                : person
                        )
                    )
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const removePerson = (event) => {
        event.preventDefault()
        const id = Number(event.target.id.replace('button-', ''))
        const personToBeDeleted = persons.find((person) => person.id === id)

        const confirmation = window.confirm(
            `Are you sure you want to delete the number of ${personToBeDeleted.name}?\nThis action cannot be undone.`
        )
        if (!confirmation) {
            return
        }
        connectService
            .remove(id)
            .catch((error) => {
                console.error(
                    `The number of ${personToBeDeleted.name} has been already deleted from the server.`
                )
                console.error(error)
            })
            .finally(() => {
                setPersons(persons.filter((person) => person.id !== id))
            })
    }

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
            <Persons persons={filteredPersons} removePerson={removePerson} />
        </div>
    )
}

export default App
