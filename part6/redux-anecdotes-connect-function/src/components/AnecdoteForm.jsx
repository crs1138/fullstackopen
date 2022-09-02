import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const handleNewAnecdote = (eve) => {
        eve.preventDefault()
        const content = eve.target.newAnecdote.value
        eve.target.newAnecdote.value = ''
        const anecdoteToBeAdded = {
            content,
            votes: 0,
        }
        props.addAnecdote(anecdoteToBeAdded)
        props.showNotification(`Added "${content}"`, 3)
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

const mapDispatchToProps = {
    addAnecdote,
    showNotification,
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm
