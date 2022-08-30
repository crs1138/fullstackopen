import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'
import noteService from '../services/notes'

const NewNote = () => {
    const dispatch = useDispatch()

    const addNote = async (eve) => {
        eve.preventDefault()
        const content = eve.target.note.value
        eve.target.note.value = ''
        const newNote = await noteService.createNew(content)
        dispatch(createNote(newNote))
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
