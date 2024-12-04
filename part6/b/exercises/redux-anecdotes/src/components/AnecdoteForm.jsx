import {useDispatch} from 'react-redux'
import { newAnecdote } from '../redux/anecdoteReducer'
import { setNotification, clearNotificationAfter } from '../redux/notificationReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = (eve) => {
        eve.preventDefault()
        const content = eve.target.anecdote.value
        eve.target.anecdote.value = ''
        console.log({content})
        dispatch(newAnecdote(content))
        dispatch(setNotification(`You added a new anecdote: ${content}`))
        clearNotificationAfter(5000, dispatch)
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