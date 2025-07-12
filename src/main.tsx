import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { ThemeProvider } from './contexts/ThemeContext.tsx'
import { BoardProvider } from './contexts/BoardContext.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <BoardProvider>
    <App />
      </BoardProvider>

    </ThemeProvider>
    
  </StrictMode>,
)
