import { createSlice } from '@reduxjs/toolkit'
import anecdoteServices from '../services/anecdoteServices'
const initialState = []

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState,
    reducers: {
        incrementVote(state, action) {
            const id = action.payload
            return state.map((anecdote) => {
                return anecdote.id === id
                    ? { ...anecdote, votes: anecdote.votes + 1 }
                    : anecdote
            })
        },
        createAnecdote(state, action) {
            return [...state, { ...action.payload, votes: 0 }]
        },
        populateAnecdotes(state, action) {
            const anecdotes = action.payload
            return [...anecdotes]
        },
    },
})

export const { incrementVote, createAnecdote, populateAnecdotes } =
    anecdoteSlice.actions

export const initAnecdotes = () => {
    return async (dispatch) => {
        const anecdotes = await anecdoteServices.getAll()
        dispatch(populateAnecdotes(anecdotes))
    }
}

export const addAnecdote = (newAnecdote) => {
    return async (dispatch) => {
        console.log('newAnecdote :', newAnecdote)
        const addedAnecdote = await anecdoteServices.save(newAnecdote)
        dispatch(createAnecdote(addedAnecdote))
    }
}

export const addVote = (anecdote) => {
    return async (dispatch) => {
        const anecdoteToUpdate = { ...anecdote, votes: anecdote.votes + 1 }
        const updatedAnecdote = await anecdoteServices.update(
            anecdoteToUpdate.id,
            anecdoteToUpdate
        )
        dispatch(incrementVote(updatedAnecdote.id))
    }
}

export default anecdoteSlice.reducer
