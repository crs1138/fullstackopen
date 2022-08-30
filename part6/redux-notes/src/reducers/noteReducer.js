import { createSlice } from '@reduxjs/toolkit'

const initialState = []

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            state.push(action.payload)
        },
        toggleImportanceOf(state, action) {
            const { id } = action.payload
            return state.map((note) => {
                return note.id === id
                    ? { ...note, important: !note.important }
                    : note
            })
        },
        appendNote(state, action) {
            state.push(action.payload)
        },
        setNotes(state, action) {
            return action.payload
        },
    },
})

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
    noteSlice.actions
export default noteSlice.reducer
