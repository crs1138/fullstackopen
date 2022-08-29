import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => {
        return state
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVote(id))
    }
    return (
        <>
            {[...anecdotes] // prevents `.sort()` from mutating the state
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleVote={() => vote(anecdote.id)}
                    />
                ))}
        </>
    )
}

export default AnecdoteList
