const PersonForm = ({
    addPerson,
    newName,
    handleNewName,
    newNumber,
    handleNewNumber,
}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                <label htmlFor="name">name: </label>
                <input
                    onChange={handleNewName}
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
                    onChange={handleNewNumber}
                />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
