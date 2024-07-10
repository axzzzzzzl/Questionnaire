import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import store from './app/store'
import { Provider } from 'react-redux'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> //严格模式下react-beautiful-dnd报错
    <Provider store={store}>
      <App />
    </Provider>
  // </React.StrictMode>,
)
