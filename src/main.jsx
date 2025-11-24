import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './reset.css'
import { BrowserRouter } from 'react-router-dom'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { AppRouter } from './routers/AppRouter'

createRoot(document.getElementById('root')).render(

  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
