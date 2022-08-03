import { useState } from 'react'

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
            <div>
                <label htmlFor="">Filter by name: </label>
                <input
                    type="text"
                    name="nameFilter"
                    id="nameFilter"
                    value={nameFilter}
                    onChange={filterByName}
                />
            </div>
            <h2>Add new</h2>
            <form onSubmit={addPerson}>
                <div>
                    <label htmlFor="name">name: </label>
                    <input
                        onChange={(event) => {
                            setNewName(event.target.value)
                        }}
                        value={newName}
                        id="name"
                        name="name"
                    />
                </div>
                <div>
                    <label htmlFor="number">number:</label>
                    <input
                        type="text"
                        name="number"
                        id="number"
                        value={newNumber}
                        onChange={(event) => setNewNumber(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {filteredPersons.map((person) => {
                const { name, number } = person
                return <p key={name}>{`${name}: ${number}`}</p>
            })}
        </div>
    )
}

export default App
