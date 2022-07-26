import { useState } from 'react'

const NoteForm = ({ createNote }) => {
    const [newNote, setNewNote] = useState('a new note…')

    const addNote = (event) => {
        event.preventDefault()
        createNote({
            content: newNote,
            important: Math.random() > 0.5,
        })
        setNewNote('')
    }
    return (
        <form onSubmit={addNote}>
            <input
                type="text"
                onChange={({ target }) => setNewNote(target.value)}
                value={newNote}
                onFocus={() => setNewNote('')}
                data-cy="new-note-input"
            />
            <button type="submit" data-cy="submit">
                save
            </button>
        </form>
    )
}
export default NoteForm
