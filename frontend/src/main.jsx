import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> //严格模式下react-beautiful-dnd报错
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>,
)
