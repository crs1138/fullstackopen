const Persons = ({ persons, removePerson }) => {
    return persons.map((person) => {
        const { name, number, id } = person
        return (
            <p key={id}>
                {`${name}: ${number}`}{' '}
                <button id={`button-${id}`} onClick={removePerson}>
                    delete
                </button>
            </p>
        )
    })
}

export default Persons
