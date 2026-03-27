import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from '../pages/auth/RegisterPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/* TODO: add more routes as pages are built */}
      </Routes>
    </BrowserRouter>
  )
}
