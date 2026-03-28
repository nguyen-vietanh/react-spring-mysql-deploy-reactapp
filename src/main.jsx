import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// i18n must be imported before any component that calls useTranslation
import './lib/i18n/i18n.js'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AppRouter from './routes/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRouter />
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  </StrictMode>,
)
