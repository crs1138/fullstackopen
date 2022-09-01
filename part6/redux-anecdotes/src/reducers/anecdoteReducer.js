import { createSlice } from '@reduxjs/toolkit'

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
            const newAnecdote = { ...action.payload, votes: 0 }
            return [...state, newAnecdote]
        },
        populateAnecdotes(state, action) {
            const anecdotes = action.payload
            return [...anecdotes]
        },
    },
})

export const { incrementVote, createAnecdote, populateAnecdotes } =
    anecdoteSlice.actions
export default anecdoteSlice.reducer
