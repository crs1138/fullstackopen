import { useState } from 'react'
import Note from './components/Note'

const App = (props) => {
    const [notes, setNotes] = useState(props.notes)
    const [newNote, setNewNote] = useState(`a new note…`)
    const [showAllNotes, setShowAllNotes] = useState(true)

    const notesToShow = showAllNotes
        ? notes
        : notes.filter((note) => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            id: notes.length + 1,
        }
        setNotes(notes.concat(noteObject))
        setNewNote('')
    }

    const handleNoteChange = (event) => {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <div>
                <button
                    onClick={() => setShowAllNotes(!showAllNotes)}
                    type="button"
                >
                    Show {showAllNotes ? 'important' : 'all'}
                </button>
            </div>
            <ul>
                {notesToShow.map((note) => {
                    return <Note key={note.id} note={note} />
                })}
            </ul>
            <form onSubmit={addNote}>
                <input
                    type="text"
                    onChange={handleNoteChange}
                    value={newNote}
                />
                <button type="submit">save</button>
            </form>
        </div>
    )
}

export default App
