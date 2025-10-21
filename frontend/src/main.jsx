import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuhtProvider } from './context/AuthContext.jsx'
import {MessageProvider} from './context/MessageContaxt.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuhtProvider>
      <MessageProvider>
        <App />
      </MessageProvider>
    </AuhtProvider>
  </BrowserRouter>
  
)

