import AnecdoteList from './AnecdoteList'
import AnecdoteForm from './AnecdoteForm'
import Filter from './Filter'
const App = () => (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )

export default App