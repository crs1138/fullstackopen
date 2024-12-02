import { createStore } from "redux"

const counterReducer = (state= 0, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1
    case "DECREMENT":
      return state - 1
      case "ZERO":
        return 0
    default:
      return state
  }
}

export const store = createStore(counterReducer)

function App() {

  return (
    <div>
      <div>{store.getState()}</div>
      <button onClick={e => store.dispatch({type: 'INCREMENT'})}>plus</button>
      <button onClick={e => store.dispatch({type: 'DECREMENT'})}>minus</button>
      <button onClick={e => store.dispatch({type: 'ZERO'})}>zero</button>
    </div>
  )
}

export default App
