import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AnecdoteService from './services/anecdotes'
import { setAll } from './redux/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  const hasNotification = useSelector(state => state.notifications)
  useEffect(() => {
    (async function populateStoreWithAnecdotes() {
      try {
        const anecdotes = await AnecdoteService.getAll()
        dispatch(setAll(anecdotes))
      } catch (err) {
        console.error('Failed to fetch anecdotes:', err)
        dispatch(setAll([]));
      }
    })()
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