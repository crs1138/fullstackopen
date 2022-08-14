import { useState, useEffect } from 'react'
import connectService from './services/connectService'
import Notification from './components/Notification'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [nameFilter, setNameFilter] = useState('')
    const [notification, setNotification] = useState(null)
    const [notificationType, setNotificationType] = useState()

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

    const displayNotification = (message, type) => {
        setNotification(message)
        setNotificationType(type)
        setTimeout(() => {
            setNotification(null)
            setNotificationType()
        }, 5000)
    }

    const addPerson = (event) => {
        event.preventDefault()
        const existingPerson = persons.find((person) => person.name === newName)
        const isNewPerson = !existingPerson

        let personObject = {
            name: newName,
            number: newNumber,
        }

        if (isNewPerson) {
            connectService
                .save(personObject)
                .then((returnedPerson) => {
                    setPersons(persons.concat(returnedPerson))
                    displayNotification(
                        `Added ${returnedPerson.name}`,
                        'success'
                    )
                })
                .catch((err) => {
                    displayNotification(err.response.data.error, 'error')
                    const { personAlreadyInDb } = err.response.data
                    if (!!personAlreadyInDb) {
                        setPersons(persons.concat(personAlreadyInDb))
                    }
                })
                .finally(() => {
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
                    displayNotification(
                        `Updated ${returnedPerson.name}`,
                        'success'
                    )
                })
                .catch((err) => {
                    displayNotification(err.response.data.error, 'error')
                    if (err.response.status === 404) {
                        setPersons(
                            persons.filter(
                                (person) => person.id !== existingPerson.id
                            )
                        )
                    }
                })
                .finally(() => {
                    setNewName('')
                    setNewNumber('')
                })
        }
    }

    const removePerson = (event) => {
        event.preventDefault()
        const id = event.target.id.replace('button-', '')
        const personToBeDeleted = persons.find((person) => person.id === id)
        const confirmation = window.confirm(
            `Are you sure you want to delete the number of ${personToBeDeleted.name}?\nThis action cannot be undone.`
        )
        if (!confirmation) {
            return
        }
        connectService
            .remove(id)
            .then(() => {
                displayNotification(
                    `${personToBeDeleted.name} has been removed`,
                    'error'
                )
            })
            .catch(() => {
                displayNotification(
                    `${personToBeDeleted.name} has been already removed from the server`,
                    'error'
                )
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
            <Notification message={notification} className={notificationType} />
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
