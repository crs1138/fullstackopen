import { createStore } from 'redux'

function App() {
    // const [counter, setCounter] = useState(0)

    const counterReducer = (state = 0, action) => {
        switch (action.type) {
            case 'INCREMENT':
                return state + 1
            case 'DECREMENT':
                return state - 1
            case 'ZERO':
                return 0
            default: // if none of the above matches, code comes here
                return state
        }
    }

    const store = createStore(counterReducer)

    return (
        <div className="App">
            <div>{store.getState()}</div>
            <div>
                <button onClick={(e) => store.dispatch({ type: 'INCREMENT' })}>
                    plus
                </button>
                <button onClick={(e) => store.dispatch({ type: 'DECREMENT' })}>
                    minus
                </button>
                <button onClick={(e) => store.dispatch({ type: 'ZERO' })}>
                    zero
                </button>
            </div>
        </div>
    )
}

export default App
