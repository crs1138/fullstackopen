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

const generateId = () => Number((Math.random() * 100000000).toFixed(0))

export const createNote = (content) => {
    return {
        type: 'NEW_NOTE',
        data: {
            content,
            important: false,
            id: generateId(),
        },
    }
}

export const toggleImportanceOf = (id) => {
    return {
        type: 'TOGGLE_IMPORTANCE',
        data: { id },
    }
}

export default noteReducer
