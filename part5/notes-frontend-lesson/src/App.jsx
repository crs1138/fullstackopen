import { useState, useEffect, useRef } from 'react'
import Toggable from './components/Toggable'
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

    const [showAllNotes, setShowAllNotes] = useState(true)
    const [errorMessage, setErrorMessage] = useState(null)
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

    const handleLogin = async ({ username, password }) => {
        try {
            const user = await loginService.login({ username, password })
            window.localStorage.setItem(
                'loggedNoteAppUser',
                JSON.stringify(user)
            )
            noteService.setToken(user.token)
            setUser(user)
        } catch (exception) {
            setErrorMessage('Wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const logout = () => {
        window.localStorage.removeItem('loggedNoteAppUser')
        setUser(null)
    }

    const notesToShow = showAllNotes
        ? notes
        : notes.filter((note) => note.important)

    const addNote = (noteObject) => {
        console.log('noteFormRef :', noteFormRef)
        noteFormRef.current.toggleVisibility()
        noteService.create(noteObject).then((returnedNote) => {
            setNotes(notes.concat(returnedNote))
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

    const noteFormRef = useRef()
    const noteForm = () => (
        <Toggable buttonLabel="New note" ref={noteFormRef}>
            <NoteForm createNote={addNote} />
        </Toggable>
    )

    return (
        <div>
            <h1>Notes</h1>
            <Notification message={errorMessage} />
            {user === null ? (
                <Toggable buttonLabel="Login">
                    <LoginForm handleLogin={handleLogin} />
                </Toggable>
            ) : (
                <div>
                    <p>
                        {user.name} logged-in{' '}
                        <button type="button" onClick={logout}>
                            Logout
                        </button>
                    </p>
                    {noteForm()}
                    {/* <Toggable buttonLabel="New note">
                        <NoteForm createNote={addNote} />
                    </Toggable> */}
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
