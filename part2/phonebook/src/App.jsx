import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([{ name: 'Arto Hellas' }])
    const [newName, setNewName] = useState('')

    const addPerson = (event) => {
        event.preventDefault()
        const personExists = !!persons.find((person) => person.name === newName)

        if (personExists) {
            alert(`${newName} is already added to phonebook`)
            return
        }
        const personObject = {
            name: newName,
        }
        setPersons(persons.concat(personObject))
        setNewName('')
    }
    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addPerson}>
                <div>
                    name:{' '}
                    <input
                        onChange={(event) => {
                            setNewName(event.target.value)
                        }}
                        value={newName}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map((person) => (
                <p key={person.name}>{person.name}</p>
            ))}
        </div>
    )
}

export default App
