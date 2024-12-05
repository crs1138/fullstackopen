import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useSelector } from 'react-redux'

const App = () => {
  const hasNotification = useSelector(state => state.notifications)

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