import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './anecdoteReducer'

const store = configureStore({
    reducer: anecdoteReducer,
})

export default store
