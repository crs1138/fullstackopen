import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'
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

    return (
        <ul>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    note={note}
                    handleClick={() => {
                        dispatch(toggleImportanceOf(note.id))
                    }}
                />
            ))}
        </ul>
    )
}
export default Notes
