import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './app/store.js'
import { Provider } from 'react-redux'
import { AppProvider } from './context/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppProvider>
      <App />
    </AppProvider>
  </Provider>

)
