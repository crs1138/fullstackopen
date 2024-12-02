import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App, {store} from './App.tsx'

const root = createRoot(document.getElementById('root')!)

const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  )
}

renderApp()
store.subscribe(renderApp)