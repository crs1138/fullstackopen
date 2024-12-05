import { createSlice} from '@reduxjs/toolkit'

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    vote(state, action) {
      const id = action.payload
      return state
        .map(anec => ((anec.id === id) 
          ? {...anec, votes: anec.votes + 1} : anec ))
        .sort((a, b) => (b.votes - a.votes))
    },
    addAnecdote(state, action) {
      console.log({action})
      return [...state, action.payload]
        .sort((a, b) => (b.votes - a.votes))
    },
    setAll(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, vote, setAll }=  anecdoteSlice.actions

export default anecdoteSlice.reducer
