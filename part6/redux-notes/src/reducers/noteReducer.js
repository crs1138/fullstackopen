const noteReducer = (state = [], action) => {
    switch (action.type) {
        case 'NEW_NOTE':
            // return state.push(action.data) // mutates state => bad
            // return state.concat(action.data)
            return [...state, action.data]

        case 'TOGGLE_IMPORTANCE':
            const { id } = action.data
            return state.map((note) =>
                note.id === id ? { ...note, important: !note.important } : note
            )

        default:
            return state
    }
}

export default noteReducer
