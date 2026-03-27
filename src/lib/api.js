import axios from 'axios'
import i18n from './i18n/i18n'

const api = axios.create({
  baseURL: `${import.meta.env.VITE_BE_BASE_URL}/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15_000,
})

// ---------------------------------------------------------------------------
// Request interceptor — attach auth token and language preference
// ---------------------------------------------------------------------------
api.interceptors.request.use((config) => {
  // Add Accept-Language header based on current locale
  config.headers['Accept-Language'] = i18n.language || 'vi'

  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// ---------------------------------------------------------------------------
// Response interceptor — normalise errors into a consistent shape so callers
// never have to inspect axios internals.
//
// Normalised error shape (thrown as plain Error with extra fields):
//   error.code    — application-level code string, e.g. 'EMAIL_ALREADY_EXISTS'
//   error.message — human-readable summary
//   error.errors  — array of { field, message } for field-level errors
//   error.status  — HTTP status number
// ---------------------------------------------------------------------------
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const body = error.response?.data

    // Network / timeout — no response at all
    if (!error.response) {
      const networkError = new Error('NETWORK_ERROR')
      networkError.code = 'NETWORK_ERROR'
      networkError.status = null
      networkError.errors = []
      return Promise.reject(networkError)
    }

    const normalised = new Error(body?.message ?? 'Unknown error')
    normalised.code = body?.code ?? 'UNKNOWN_ERROR'
    normalised.status = status
    normalised.errors = body?.errors ?? []

    return Promise.reject(normalised)
  },
)

export default api
