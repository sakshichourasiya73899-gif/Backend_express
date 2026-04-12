import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ArenaProvider } from './context/ArenaContext'

import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArenaProvider>
      <App />
    </ArenaProvider>
  </StrictMode>,
)
