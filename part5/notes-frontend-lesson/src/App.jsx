import { useState, useEffect } from 'react'
import NoteForm from './components/NoteForm'
import LoginForm from './components/LoginForm'
import Note from './components/Note'
import Footer from './components/Footer'
import Notification from './components/Notification'
import noteService from './services/noteService'
import loginService from './services/loginService'
import './index.css'

const App = () => {
    const [notes, setNotes] = useState([])
    const [newNote, setNewNote] = useState(`a new note…`)
    const [showAllNotes, setShowAllNotes] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        noteService.getAll().then((initialNotes) => {
            setNotes(initialNotes)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            noteService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password })
            console.log('user :', user)
            window.localStorage.setItem(
                'loggedNoteAppUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

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
        noteService
            .update(id, changedNote)
            .then((returnedNote) => {
                setNotes(
                    notes.map((note) => (note.id !== id ? note : returnedNote))
                )
            })
            .catch((error) => {
                setErrorMessage(
                    `The note "${note.content}" was already deleted from the server.`
                )
                setTimeout(() => {
                    setErrorMessage(null)
                }, 5000)
                setNotes(notes.filter((note) => note.id !== id))
            })
    }

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null ? (
                <LoginForm
                    onLogin={handleLogin}
                    username={username}
                    password={password}
                    onUsernameChange={({ target }) => setUsername(target.value)}
                    onPasswordChange={({ target }) => setPassword(target.value)}
                />
            ) : (
                <div>
                    <p>{user.name} logged-in</p>
                    <NoteForm
                        addNote={addNote}
                        onNoteChange={({ target }) => setNewNote(target.value)}
                        onFocus={({ target }) => setNewNote('')}
                        note={newNote}
                    />
                </div>
            )}
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
            <Footer />
        </div>
    )
}

export default App
