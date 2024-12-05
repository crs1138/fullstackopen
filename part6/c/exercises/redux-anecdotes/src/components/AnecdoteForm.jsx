import {useDispatch} from 'react-redux'
import { addAnecdote } from '../redux/anecdoteReducer'
import { setNotification, clearNotificationAfter } from '../redux/notificationReducer'
import AnecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = async (eve) => {
        eve.preventDefault()
        const content = eve.target.anecdote.value
        eve.target.anecdote.value = ''
        try {
            const newAnecdote = await AnecdoteService.create(content)
            dispatch(addAnecdote(newAnecdote))
            dispatch(setNotification(`You added a new anecdote: ${content}`))
            clearNotificationAfter(5000, dispatch)
        } catch (err) {
            console.error('Failed to create an anecdote.', err)
            dispatch(setNotification('Failed to create an anecdote.'))
            clearNotificationAfter(5000, dispatch)
        }
    }

    return (      
    <>
        <h2>create new</h2>
        <form onSubmit={handleSubmit}>
          <div><input name="anecdote" type="text" /></div>
          <button type="submit">create</button>
        </form>
    </>
)}

export default AnecdoteForm