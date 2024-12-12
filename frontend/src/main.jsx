
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "./App.css"
import UserState from './context/UserState.jsx'

createRoot(document.getElementById('root')).render(
  <UserState>
    <App />
  </UserState>,
)
