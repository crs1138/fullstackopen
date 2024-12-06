import {useDispatch, useSelector} from 'react-redux'
import { vote } from '../redux/anecdoteReducer'
import { showNotification } from '../redux/notificationReducer'
const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()

    const handleVote = () => {      
      dispatch(vote(anecdote.id))
      dispatch(showNotification(`You voted for "${anecdote.content}"`, 1.5))
    }
    
    return (
        <div style={{marginBottom: "8px"}}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={handleVote}>vote</button>
        </div>
      </div>
    )
}

const AnecdoteList = () => {
    const anecdotes = useSelector(({anecdotes, filter}) => {
      return filter 
      ? anecdotes.filter(anecdote => {
        return anecdote.content.toLowerCase().includes(filter.toLowerCase()) 
      }) 
      : anecdotes
    })
    if (anecdotes.length <= 0) { return null}
    return (
        <div>
            {anecdotes.map((anecdote) =>(
                <Anecdote key={anecdote.id} anecdote={anecdote}/>
            ))}
        </div>
    )
}

export default AnecdoteList