import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// i18n must be imported before any component that calls useTranslation
import './lib/i18n/i18n.js'
import AppRouter from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
  </StrictMode>,
)
