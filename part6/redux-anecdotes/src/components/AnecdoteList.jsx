import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import {
    setNotification,
    removeNotification,
} from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const dispatch = useDispatch()

    const vote = (id, message) => {
        dispatch(incrementVote(id))
        showNotification(`You voted for '${message}'`)
    }

    const showNotification = (message) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }

    return (
        <>
            {[...anecdotes] // prevents `.sort()` from mutating the state
                .sort((a, b) => b.votes - a.votes)
                .map((anecdote) => (
                    <Anecdote
                        key={anecdote.id}
                        anecdote={anecdote}
                        handleVote={() => vote(anecdote.id, anecdote.content)}
                    />
                ))}
        </>
    )
}

export default AnecdoteList
