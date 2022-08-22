import { useState, useEffect } from 'react'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteService from './services/noteService'
import './index.css'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(`a new note…`)
    const [showAllNotes, setShowAllNotes] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)

    useEffect(() => {
        console.log('Effect')
        // axios.get('http://localhost:3001/notes').then((response) => {
        //     console.log(`Promise fulfilled`)
        //     setNotes(response.data)
        // })
        noteService.getAll().then((initialNotes) => {
            console.log(`Promise fulfilled`)
            setNotes(initialNotes)
        })
    }, [])
    console.log(`Render ${notes.length} notes`)

    const notesToShow = showAllNotes
        ? notes
        : notes.filter((note) => note.important)

    const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
            content: newNote,
            date: new Date().toISOString(),
            important: Math.random() < 0.5,
            // id: notes.length + 1, // `id` added automatically by JSON server
        }
        // axios
        //     .post('http://localhost:3001/notes', noteObject)
        //     .then((response) => {
        //         setNotes(notes.concat(response.data))
        //         setNewNote('')
        //     })
        noteService.create(noteObject).then((returnedNote) => {
            setNotes(notes.concat(returnedNote))
            setNewNote('')
        })
    }

    function toggleImportance(id) {
        const note = notes.find((note) => note.id === id)
        const changedNote = { ...note, important: !note.important }
        // axios.put(url, changedNote).then((response) => {
        //     setNotes(
        //         notes.map((note) => (note.id !== id ? note : response.data))
        //     )
        // })
        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : returnedNote))
                )
            })
            .catch((error) => {
                // alert(
                //     `the note ${note.content} was already deleted from the server`
                // )
                setErrorMessage(
                    `The note "${note.content}" was already deleted from the server.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter((note) => note.id !== id))
            })
    }

    function handleNoteChange(event) {
        setNewNote(event.target.value)
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
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
                    return (
                        <Note
                            key={note.id}
                            note={note}
                            toggleImportance={() => {
                                toggleImportance(note.id)
                            }}
                        />
                    )
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
            <Footer />
        </div>
    )
}

export default App
