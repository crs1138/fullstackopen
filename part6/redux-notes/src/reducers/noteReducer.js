import { createSlice } from '@reduxjs/toolkit'
import noteService from '../services/notes'

const initialState = []

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        // createNote(state, action) {
        //     state.push(action.payload)
        // },
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

export const { toggleImportanceOf, appendNote, setNotes } = noteSlice.actions

export const initializeNotes = () => {
    return async (dispatch) => {
        const notes = await noteService.getAll()
        dispatch(setNotes(notes))
    }
}

export const createNote = (content) => {
    return async (dispatch) => {
        const newNote = await noteService.createNew(content)
        dispatch(appendNote(newNote))
    }
}

export const toggleNoteImportance = (note) => {
    return async (dispatch) => {
        const newNote = { ...note, important: !note.important }
        const updatedNote = await noteService.update(note.id, newNote)
        dispatch(toggleImportanceOf(updatedNote))
    }
}

export default noteSlice.reducer
