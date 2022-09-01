import noteReducer from './noteReducer'
import filterReducer from './filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer,
    },
})

export default store
