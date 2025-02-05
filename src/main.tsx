import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { WebZjsProvider } from './context/WebzjsContext.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <WebZjsProvider>
      <App />
    </WebZjsProvider>
  </StrictMode>,
)
