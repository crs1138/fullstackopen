import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import anecdoteServices from '../services/anecdoteServices'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (eve) => {
        eve.preventDefault()
        const content = eve.target.newAnecdote.value
        eve.target.newAnecdote.value = ''
        const newAnecdote = {
            content,
            votes: 0,
        }
        anecdoteServices.save(newAnecdote).then((savedAnecdote) => {
            dispatch(createAnecdote(savedAnecdote))
        })
    }

    return (
        <>
            <h2>create new</h2>

            <form onSubmit={addAnecdote}>
                <div>
                    <input name="newAnecdote" />
                </div>
                <button>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm
