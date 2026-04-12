
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'   // ✅ import this
import { store } from './app/app.store.js'    // ✅ adjust path if needed
import './index.css'
import App from './app/App.jsx'

createRoot(document.getElementById('root')).render(

    <Provider store={store}>
      <App />
    </Provider>

)