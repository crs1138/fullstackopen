import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
    const dispatch = useDispatch()

    const addNote = (eve) => {
        eve.preventDefault()
        const content = eve.target.note.value
        eve.target.note.value = ''
        dispatch(createNote(content))
    }

    return (
        <form onSubmit={addNote}>
            <label htmlFor="newNote">New note:</label>
            <input id="newNote" type="text" name="note" />
            <button type="submit">Add</button>
        </form>
    )
}

export default NewNote
