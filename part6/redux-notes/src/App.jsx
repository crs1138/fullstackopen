import { createNote, toggleImportanceOf } from './reducers/noteReducer'
import { useSelector, useDispatch } from 'react-redux'

const App = () => {
    const dispatch = useDispatch()
    const notes = useSelector((state) => state)
    const addNote = (eve) => {
        eve.preventDefault()
        const content = eve.target.note.value
        eve.target.note.value = ''
        dispatch(createNote(content))
    }

    const toggleImportance = (id) => {
        dispatch(toggleImportanceOf(id))
    }
    return (
        <div>
            <form onSubmit={addNote}>
                <label htmlFor="newNote">New note:</label>
                <input id="newNote" type="text" name="note" />
                <button type="submit">Add</button>
            </form>
            <ul>
                {notes.map((note) => (
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

export default App
