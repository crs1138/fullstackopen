import {useDispatch} from 'react-redux'
import { newAnecdote } from './redux/anecdoteReducer'
const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const handleSubmit = (eve) => {
        eve.preventDefault()
        const content = eve.target.anecdote.value
        eve.target.anecdote.value = ''
        console.log({content})
        dispatch(newAnecdote(content))
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