import { BrowserRouter, Routes, Route } from 'react-router'
import RegisterPage from '../pages/auth/RegisterPage'
import { ThemeToggle } from '../components/ui/ThemeToggle'
import { LanguageSwitcher } from '../components/ui/LanguageSwitcher'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <ThemeToggle />
      <LanguageSwitcher />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        {/* TODO: add more routes as pages are built */}
      </Routes>
    </BrowserRouter>
  )
}
