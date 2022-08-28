import { createSlice } from '@reduxjs/toolkit'

const initialState = [
    {
        content: 'reducer defines how redux store works',
        important: true,
        id: 1,
    },
    {
        content: 'state of store can contain any data',
        important: false,
        id: 2,
    },
]
const generateId = () => Number((Math.random() * 100000000).toFixed(0))

const noteSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        createNote(state, action) {
            const content = action.payload
            state.push({
                content,
                important: false,
                id: generateId(),
            })
        },
        toggleImportanceOf(state, action) {
            const id = action.payload
            return state.map((note) =>
                note.id === id ? { ...note, important: !note.important } : note
            )
        },
    },
})

export const { createNote, toggleImportanceOf } = noteSlice.actions
export default noteSlice.reducer

// const noteReducer = (state = initialState, action) => {
//     console.log('ACTION: ', action)
//     switch (action.type) {
//         case 'NEW_NOTE':
//             return [...state, action.data]

//         case 'TOGGLE_IMPORTANCE':
//             const { id } = action.data
//             return state.map((note) =>
//                 note.id === id ? { ...note, important: !note.important } : note
//             )

//         default:
//             return state
//     }
// }

// export const createNote = (content) => {
//     return {
//         type: 'NEW_NOTE',
//         data: {
//             content,
//             important: false,
//             id: generateId(),
//         },
//     }
// }

// export const toggleImportanceOf = (id) => {
//     return {
//         type: 'TOGGLE_IMPORTANCE',
//         data: { id },
//     }
// }
// export default noteReducer
