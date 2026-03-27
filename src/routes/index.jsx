import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from '../pages/auth/RegisterPage'
import { ThemeToggle } from '../components/ui/ThemeToggle'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/* TODO: add more routes as pages are built */}
      </Routes>
    </BrowserRouter>
  )
}
