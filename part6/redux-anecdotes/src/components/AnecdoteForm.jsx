import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = (eve) => {
        eve.preventDefault()
        const content = eve.target.newAnecdote.value
        eve.target.newAnecdote.value = ''
        dispatch(createAnecdote(content))
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
