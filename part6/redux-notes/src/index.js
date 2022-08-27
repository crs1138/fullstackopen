import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import noteReducer from './reducers/noteReducer'

const store = createStore(noteReducer)

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'the app state is in redux store',
//         important: true,
//         id: 1,
//     },
// })

// store.dispatch({
//     type: 'NEW_NOTE',
//     data: {
//         content: 'state changes are made with actions',
//         important: false,
//         id: 2,
//     },
// })

const root = ReactDOM.createRoot(document.getElementById('root'))
// const renderApp = () => {
root.render(
    <Provider store={store}>
        <App />
    </Provider>
)
// }
// renderApp()
// store.subscribe(renderApp)
