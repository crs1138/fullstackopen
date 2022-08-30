import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
import noteService from '../services/notes'
import Note from './Note'

const Notes = () => {
    const dispatch = useDispatch()

    const notes = useSelector(({ notes, filter }) => {
        if (filter === 'ALL') {
            return notes
        }
        return filter === 'IMPORTANT'
            ? notes.filter((note) => note.important)
            : notes.filter((note) => !note.important)
    })

    const toggleImportance = async (note) => {
        const updateNoteObj = { ...note, important: !note.important }
        const updatedNote = await noteService.update(note.id, updateNoteObj)
        dispatch(toggleImportanceOf(updatedNote))
    }

    return (
        <ul>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => toggleImportance(note)}
                />
            ))}
        </ul>
    )
}
export default Notes
