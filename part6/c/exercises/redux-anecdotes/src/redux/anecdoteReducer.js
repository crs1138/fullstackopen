import { createSlice} from '@reduxjs/toolkit'
import AnecdoteService from '../services/anecdotes'
import { showNotification } from './notificationReducer'

const initialState = []

const sortByVotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      return [...state, action.payload]
        .sort((a, b) => (b.votes - a.votes))
    },
    setAll(state, action) {
      return action.payload
    },
  }
})

export const { addAnecdote, setAll }=  anecdoteSlice.actions

export const initializeAnecdotes = () => async (dispatch) => {
  try {
    const anecdotes = await AnecdoteService.getAll()
    const sortedAnecdotes = sortByVotes(anecdotes)
    dispatch(setAll(sortedAnecdotes))
  } catch (err) {
    console.error('Failed to fetch anecdotes.', err)
    dispatch(setAll([]))
  }
}

export const createAnecdote = (content) => async (dispatch) => {
  try {
    const newAnecdote = await AnecdoteService.create(content)
    dispatch(showNotification(`You added a new anecdote: ${content}`, 5))
    dispatch(addAnecdote(newAnecdote))
  } catch (err) {
    console.error('Failed to create a new anecdote.', err)
    dispatch(showNotification('Failed to create a new anecdote.', 5))
  }
}

export const vote = (id) => {
  return async (dispatch, getState) => {
    const oldAnecdotes = getState().anecdotes
    const newAnecdotes = oldAnecdotes.map(anecdote => {
      if(anecdote.id === id) { return { ...anecdote, votes: anecdote.votes +1 } }
      return anecdote;
    })
    const [votedAnecdote] = newAnecdotes.filter(anecdote => anecdote.id === id)
    const sortedAnecdotes = sortByVotes(newAnecdotes)
    dispatch(setAll(sortedAnecdotes)) //
    await AnecdoteService.update(votedAnecdote)
  }
}

export default anecdoteSlice.reducer
