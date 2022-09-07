import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { TodosContextProvider } from './context/todosContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TodosContextProvider>
      <App />
    </TodosContextProvider>
  </React.StrictMode>
)
