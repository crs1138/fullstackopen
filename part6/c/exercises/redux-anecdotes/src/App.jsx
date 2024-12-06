import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { initializeAnecdotes } from './redux/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const hasNotification = useSelector(state => state.notifications)
  useEffect(() => {
    dispatch(initializeAnecdotes())
  },[])

  return (
    <div>
      {hasNotification && <Notification />}
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )}

export default App