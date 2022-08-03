import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '123-456-789' },
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map((person) => {
                const { name, number } = person
                return <p key={name}>{`${name}: ${number}`}</p>
            })}
        </div>
    )
}

export default App
