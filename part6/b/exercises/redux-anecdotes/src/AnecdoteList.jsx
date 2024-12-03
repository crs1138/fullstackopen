import {useDispatch, useSelector} from 'react-redux'
import { vote } from './redux/anecdoteReducer'
const Anecdote = ({anecdote}) => {
    const dispatch = useDispatch()
    return (
        <div style={{marginBottom: "8px"}}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
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
    return (
        <div>
            {anecdotes.map((anecdote) =>(
                <Anecdote key={anecdote.id} anecdote={anecdote}/>
            ))}
        </div>
    )
}

export default AnecdoteList