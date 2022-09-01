import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleNewAnecdote = (eve) => {
        eve.preventDefault()
        const content = eve.target.newAnecdote.value
        eve.target.newAnecdote.value = ''
        const anecdoteToBeAdded = {
            content,
            votes: 0,
        }
        dispatch(addAnecdote(anecdoteToBeAdded))
        dispatch(showNotification(`Added "${content}"`, 3))
    }

    return (
        <>
            <h2>create new</h2>

            <form onSubmit={handleNewAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
