import { useDispatch, useSelector } from 'react-redux'
import { incrementVote } from '../reducers/anecdoteReducer'
import anecdoteServices from '../services/anecdoteServices'
import {
    setNotification,
    removeNotification,
} from '../reducers/notificationReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
    const anecdotes = useSelector((state) => state.anecdotes)
    const filter = useSelector((state) => state.filter)
    const dispatch = useDispatch()

    const vote = async (id, message) => {
        const anecdote = anecdotes.find((anec) => anec.id === id)
        await anecdoteServices.update(id, {
            ...anecdote,
            votes: anecdote.votes + 1,
        })
        dispatch(incrementVote(id))
        showNotification(`You voted for '${message}'`)
    }

    const showNotification = (message) => {
        dispatch(setNotification(message))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
    }
    const filteredAnecdotes =
        filter.length >= 3
            ? anecdotes.filter((anecdote) => anecdote.content.includes(filter))
            : anecdotes

    return (
        <>
            {[...filteredAnecdotes] // prevents `.sort()` from mutating the state
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
