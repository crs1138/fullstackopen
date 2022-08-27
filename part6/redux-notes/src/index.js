import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'the app state is in redux store',
        important: true,
        id: 1,
    },
})

store.dispatch({
    type: 'NEW_NOTE',
    data: {
        content: 'state changes are made with actions',
        important: false,
        id: 2,
    },
})

const generateId = () => Number((Math.random() * 100000000).toFixed(0))
const App = () => {
    const addNote = (eve) => {
        eve.preventDefault()
        const content = eve.target.note.value
        eve.target.note.value = ''
        store.dispatch({
            type: 'NEW_NOTE',
            data: { content, important: false, id: generateId() },
        })
    }

    const toggleImportance = (id) => {
        console.log({ id })
        store.dispatch({ type: 'TOGGLE_IMPORTANCE', data: { id } })
    }
    return (
        <div>
            <form onSubmit={addNote}>
                <label htmlFor="newNote">New note:</label>
                <input id="newNote" type="text" name="note" />
                <button type="submit">Add</button>
            </form>
            <ul>
                {store.getState().map((note) => (
                    <li
                        key={note.id}
                        onClick={() => {
                            toggleImportance(note.id)
                        }}
                    >
                        {note.content}{' '}
                        <strong>{note.important ? 'important' : ''}</strong>
                    </li>
                ))}
            </ul>
        </div>
    )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
const renderApp = () => {
    root.render(<App />)
}
renderApp()
store.subscribe(renderApp)
