import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'
import filterReducer from './reducers/filterReducer'
import { configureStore } from '@reduxjs/toolkit'

const store = configureStore({
    reducer: {
        notes: noteReducer,
        filter: filterReducer,
    },
})

// // import { createNote } from './reducers/noteReducer'
// // import { filterChange } from './reducers/filterReducer'

// const reducer = combineReducers({
//     notes: noteReducer,
//     filter: filterReducer,
// })

// const store = createStore(reducer)
// // store.subscribe(() => console.log(store.getState()))
// // store.dispatch(filterChange('IMPORTANT'))
// // store.dispatch(
// //     createNote('combineReducers forms one reducer for many simple reducers')
// // )

console.log(store.getState())
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <Provider store={store}>
        <App />
    </Provider>
    // <div />
)
